var exec = require('child_process').exec
var fs = require('fs')
var github = require('github-basic')
var uid = require('uid')
var appname = require('./package.json').name.replace(/@(.+)\/.+/, '$1')
var config = require('rc')(appname)

module.exports = function (deck, msg, cb) {
  var token = config['github-token']
  var company = config['github-namespace']

  if (!token) {
    return console.error('Cannot upstream, need github token, see @deck/upstream Readme')
  }
  if (!company) {
    return console.error('Cannot upstream, need github namespace, see @deck/upstream Readme')
  }

  var client = github({
    auth: config.token,
    version: 3
  })

  var localDeck = deck
  var remoteDeck = deck
  if (typeof deck === 'object') {
    localDeck = deck.local
    remoteDeck = deck.remote
  }
  var localDir = process.env.HOME + '/.decks/lib/node_modules/' + localDeck
  if (!fs.existsSync(localDir)) {
    throw Error('deck does not exist locally, dir: ' + localDir)
  }
  function clean (err) {
    clean.err = err
    client.delete('/repos/' + company + '/' + remoteDeck + '/git/' + clean.meta.ref, {})
      .then(function () {
        cb(err)
      })
      .catch(function (e) {
        err.message += ' \nALSO UNABLE TO REMOVE CREATED BRANCH:\n ' + e.message
        cb(err)
      })
  }
  exec('npm get init.author.name', function (err, author, stderr) {
    var title = 'PR from ' + author
    var branch = uid()

    if (err) {
      cb(err)
      return
    }

    client.exists(company, remoteDeck)
      .then(function (exists) {
        if (!exists) {
          throw Error('deck does not exist remotely')
        }
        return client.branch(company, remoteDeck, 'master', branch)
      })
      .catch(cb)
      .then(function (meta) {
        clean.meta = meta
        return client.commit(company, remoteDeck, {
          branch: branch,
          message: title,
          updates: [{
            content: fs.readFileSync(localDir + '/deck.md') + '',
            path: 'deck.md'
          }]
        })
      })
      .catch(clean)
      .then(function (res) {
        if (clean.err) {
          return
        }
        var master = {user: company, repo: remoteDeck, branch: 'master'}
        var message = {
          title: title,
          body: msg
        }
        return client.pull({
          __proto__: master,
          branch: branch
        }, master, message)
      })
      .catch(clean)
      .then(function (pr) {
        if (clean.err) {
          return
        }
        var url = pr.url
          .replace('https://api.', 'https://')
          .replace('/repos/', '/')
          .replace('/pulls/', '/pull/')
        cb(null, url)
      })
  })
}

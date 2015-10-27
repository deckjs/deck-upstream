# @deck/upstream

Creates an automatic PR against a slide decks remote Github repository based on local edits made.

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Creates a new branch on GitHub, pushes modified content and 
makes a pull request with the change. 

The slide deck does not need to be a git repository for `upstream`
to function - however Github keys are required see below.

## Configuration

Deck needs a configuration file with the following content:

```json
{
  "github-token": "<your-github-token>",
  "github-namespace":"<company name>"
}
```
See [Creating a github token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/) for more details.

The config file must be located on one of the following places:

* a local `.deckrc` or the first found looking in `./ ../ ../../ ../../../` etc.
* `$HOME/.deckrc`
* `$HOME/.deck/config`
* `$HOME/.config/deck`
* `$HOME/.config/deck/config`
* `/etc/deckrc`
* `/etc/deck/config`

See the [rc package](https://www.npmjs.com/package/rc) for more details about passing configuration content.

## Usage

In the presentation deck folder (where the `deck.md` file is located) run the following command:

```sh
deck upstream [<slide deck path>]
```

## Ecosystem

To view other pieces of the deck system see <https://github.com/nearform/deck>

## Issues and PR's

* Please open any issues for any deck related module on the <https://github.com/nearform/deck> community repo.
* Any module specific PR's are welcomed on the corresponding repo.

## Credits

Sponsored by <a href="http://nearform.com">nearForm</a>

### Contributors

  * David Mark Clements
  * Mihai Dima
  * Cristian Kiss

### Contributing

Deck is an **OPEN Open Source Project**. This means that:

> Individuals making significant and valuable contributions are given commit-access to a project to contribute as they see fit. A project is more like an open wiki than a standard guarded open source project.

See the [`CONTRIBUTING.md`](CONTRIBUTING.md) file for more details.


# deck-upstream

Takes your local modified deck material, creates a branch on github, pushes the modifications on the branch and makes a Pull Request against the modification.

## Upstream configuration

You must create a github configuration file with the following content:

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

## Upstream usage

In the presentation deck folder (where the `deck.md` file is located) run the following command:

```sh
deck upstream "<material name>"
```

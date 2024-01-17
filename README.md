## Gamma Jammy Gammy!

Install [tweego](https://www.motoslave.net/tweego/) and the [snowman 2.0.2](https://videlais.github.io/snowman/#/2/) storyformat in your working directory.

## Running the game locally

- `npx tailwindcss -i ./css/main.css -o ./twine_src/css/output.css --watch`
- `tweego -o output.html twine_src -w`
- `python3 -m http.server 9001`
- `open http://localhost:9001/output.html`

## Useful resources

- Jon Cinque, [Making Twine Games, Programmer Edition](https://jonc.dev/twine-games-tutorial)
  - [repo](https://github.com/joncinque/joncinque.github.io/tree/b284b8a70026a3e797debbc8420e496e34057631/twinegames)

# npm-ui

This is an electron app for visualising NPM cli commands. It aims to provide a
view for running scripts defined in your package.json (as well as adding +
removing scripts) and viewing/updating a projects dependencies.

The initial idea of this project is credited to
[Sunil Pai](https://github.com/threepointone)

This project is currently in its very early stages and is very much a WIP, PRs
are welcome!

## Running development mode

1. `npm i .`
2. `npm run dev`

Currently, in development mode you can only see scripts that are located within
this project itself (hopefully,
[#7](https://github.com/alex-saunders/npm-ui/issues/7) fixes this in the near
future).

## Running tests

Run `npm test` to execute the full test-suite. The tests are implemented using
[jest](https://facebook.github.io/jest/). The UI is tested by unit-testing each
react component using [enzyme](http://airbnb.io/enzyme/). For now, the tests
ensure that each component is shallow-rendering without trowing an error as well
as the correct processing of UI events. Stateless components are also tested
using snapshots.

## Contributing

Please see the issues page for a current list of what needs to be done and feel
free to get working on anything you see, as well as adding your own bug
reports/feature requests, everyone is welcome!

## License

MIT.

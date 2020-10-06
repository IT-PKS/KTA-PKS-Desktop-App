# KTA Desktop

This is an [Electron](http://electron.atom.io/) application, based on [React](https://facebook.github.io/react/) and [Webpack](http://webpack.github.io/docs/) for rapid application development.

## Install

⚠ Requires a node version >= 7 and an npm version >= 4 ⚠

First, clone the repo via git:

```
$ git clone git@github.com:IT-PKS/kta-desktop.git
$ cd kta-desktop
$ git submodule update --init
```

And then install dependencies with yarn.

```
$ yarn
```
**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn) for some reason, try `npm install`.

## Run

Start the app in the `development` environment. This starts the renderer process in [hot-module-replacement](https://webpack.js.org/concepts/hot-module-replacement/) mode and starts a server that sends hot updates to the renderer process:

```
$ yarn dev
```

## Build

For Windows:
```
$ yarn build-win
```
Then locate .exe file in `release` folder for installation.

## Styling

WIP

## DevTools

#### Toggle Chrome DevTools

OS X: Cmd + Alt + I or F12

#### DevTools Extension

This project includes the following DevTools extensions:

* [React Developer Tools](https://github.com/facebook/react-devtools) - Install via [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer).
* [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) - Install via [electron-devtools-installer](https://github.com/MarshallOfSound/electron-devtools-installer).

You can find the tabs on Chrome DevTools.

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

## How to Add Modules to the Project

⚠ Please read following section before installing any dependencies ⚠

### Module Structure

This project uses a [two package.json structure](https://www.electron.build/tutorials/two-package-structure). This means, you will have two `package.json` files.

1. `./package.json` in the root of your project
1. `./app/package.json` inside `app` folder

### Which `package.json` File to Use

1. If the module is native to a platform (like node-postgres or sqlite3) or otherwise should be included with the published package (i.e. bcrypt, openbci), it should be listed under `dependencies` in `./package.json` and `./app/package.json`.
2. If a module is `imported` by another module, include it in `dependencies` in `./package.json`. See [this ESLint rule](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md). Examples of such modules are `material-ui`, `redux-form`, and `moment`.
3. Otherwise, modules used for building, testing and debugging should be included in `devDependencies` in `./package.json`.


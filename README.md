statc
=====



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/statc.svg)](https://npmjs.org/package/statc)
[![CircleCI](https://circleci.com/gh/jdxcode/statc/tree/master.svg?style=shield)](https://circleci.com/gh/jdxcode/statc/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/jdxcode/statc?branch=master&svg=true)](https://ci.appveyor.com/project/jdxcode/statc/branch/master)
[![Codecov](https://codecov.io/gh/jdxcode/statc/branch/master/graph/badge.svg)](https://codecov.io/gh/jdxcode/statc)
[![Downloads/week](https://img.shields.io/npm/dw/statc.svg)](https://npmjs.org/package/statc)
[![License](https://img.shields.io/npm/l/statc.svg)](https://github.com/jdxcode/statc/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g statc
$ statc COMMAND
running command...
$ statc (-v|--version|version)
statc/0.0.0 darwin-x64 node-v8.11.2
$ statc --help [COMMAND]
USAGE
  $ statc COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`statc hello [FILE]`](#statc-hello-file)
* [`statc help [COMMAND]`](#statc-help-command)

## `statc hello [FILE]`

describe the command here

```
USAGE
  $ statc hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ statc hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/jdxcode/statc/blob/v0.0.0/src/commands/hello.ts)_

## `statc help [COMMAND]`

display help for statc

```
USAGE
  $ statc help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.0.5/src/commands/help.ts)_
<!-- commandsstop -->

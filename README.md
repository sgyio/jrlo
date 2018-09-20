# jrlo

[![Build Status](https://travis-ci.org/sgyio/jrlo.svg?branch=develop)](https://travis-ci.org/sgyio/jrlo) [![npm version](https://badge.fury.io/js/jrlo.svg)](https://badge.fury.io/js/jrlo)

Command-line tool to brige workflow between Jira and Trello.

# Installation and configuration

```
$ npm i -g jrlo
```

Interactive setup for each service:

    $ jrlo conf jira
    $ jrlo conf trello

Configuration of this app is kept with `configstore`. All passwords and secrets are kept with `keytar`.

See [instructions here](https://github.com/atom/node-keytar#on-linux) for installing on Linux.

# Usage

See `jrlo --help` for detailed usage.

Examples:

```
jrlo get issue SOC-232
jrlo list issue --query "project=JRLO AND status in (Open, 'In Progress') AND sprint = openSprints() ORDER by priority"
```

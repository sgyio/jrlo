#!/usr/bin/env node

import 'reflect-metadata';

import * as yargs from 'yargs';

import { container } from './containers';
import TYPES from './containers/types';

import {
  ICommand,
  IConsoleService,
  IUpdateNotifierService,
} from './interfaces';

const consoleService = container.get<IConsoleService>(TYPES.ConsoleService);

yargs
  .usage(consoleService.getAppLogo())
  .command(container.getNamed<ICommand>(TYPES.Command, 'get'))
  .command(container.getNamed<ICommand>(TYPES.Command, 'configure'))
  .command(container.getNamed<ICommand>(TYPES.Command, 'list'))
  .command(container.getNamed<ICommand>(TYPES.Command, 'open'))
  .command(container.getNamed<ICommand>(TYPES.Command, 'card'))
  .demandCommand(1, consoleService.error('At least one command is required.'))
  .choices('source', ['jira', 'trello'])
  .choices('type', ['issue', 'card'])
  .alias('h', 'help')
  .alias('v', 'version')
  .describe('h', 'Show help')
  .example('→ get: ', `jrlo get issue SOC-323`)
  .example('→ configure: ', `jrlo configure trello`)
  .option('j', {
    alias: 'json',
    demandOption: false,
    describe: 'Set output to JSON (can be used with jq)',
    type: 'boolean',
  })
  .check((argv) => {
    if ('width' in argv) {
      if (isNaN(argv.width)) {
        throw new Error('Provide a number for width.');
      }

      if (parseInt(argv.width, 10) < 0) {
        throw new Error('Provide a positive number for width.');
      }
    }

    return true;
  })
  .help()
  .epilog('Project site: github.com/sgyio/jrlo').argv;

const updateNotifierService = container.get<IUpdateNotifierService>(
  TYPES.UpdateNotifierService,
);
updateNotifierService.check();

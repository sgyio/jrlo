import { injectable } from 'inversify';

import * as boxen from 'boxen';
import chalk from 'chalk';
import * as inquirer from 'inquirer';

import { table } from 'table';

import { IConsoleService } from '../../interfaces';

@injectable()
export class ConsoleService implements IConsoleService {
  public render = chalk;

  public writeInfo(message: string): void {
    console.log(chalk.bgRgb(0, 0, 64).white(' INFO '), chalk.white(message));
  }

  public error(message: string): string {
    return chalk.bgRed.bold.white(' ERR '), chalk.red(message);
  }

  public writeError(message: string): void {
    console.log(this.error(message));
  }

  public writeBoxedMessage(message: string, color = 'gray'): void {
    console.log(
      chalk[color](
        boxen(message, {
          margin: { bottom: 1 },
          padding: { left: 1, right: 1 },
        }),
      ),
    );
  }

  public write(message: string): void {
    console.log(message);
  }

  public writeLine(message: string): void {
    console.log(`${message}\n`);
  }

  public insertLine(count = 1): void {
    console.log('\n');
  }

  // TODO: property to get chalk, ie: this.consoleService.render`some string`;
  public getChalk(): any {
    return chalk;
  }

  public prompt(questions: inquirer.Questions): Promise<inquirer.Answers> {
    return inquirer.prompt(questions);
  }

  public getAppLogo(): string {
    return chalk.yellow(
      boxen(`jrlo ${this.getVersion()}`, {
        borderStyle: 'round',
        padding: { left: 32, top: 1, right: 32, bottom: 1 },
        borderColor: 'green',
        dimBorder: false,
      }),
    );
  }

  public getVersion(): string {
    return require('../../../package').version;
  }

  public generateTable(data: any): void {
    console.log(
      table(data, {
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
        },
      }),
    );
  }
}

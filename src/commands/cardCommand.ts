import { inject, injectable, named } from 'inversify';
import TYPES from '../containers/types';

import { Argv } from 'yargs';
import { ICommand } from '../interfaces';

@injectable()
export class CardCommand implements ICommand {
  public readonly command = ['card', 'c'];
  public readonly describe = 'Card command';
  public builder: (yargs: Argv) => Argv;

  constructor(
    @inject(TYPES.Command)
    @named('cardCreate')
    private createCommand: ICommand,
  ) {
    this.builder = (yargs: Argv): Argv => yargs.command(this.createCommand);
  }

  public handler(args: any): void {
    console.log('card command');
  }
}

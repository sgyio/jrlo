import { injectable } from 'inversify';

import { container } from '../containers';
import TYPES from '../containers/types';

import { ICommand, IConfigurator, IConsoleService } from '../interfaces';

@injectable()
export class ConfigureCommand implements ICommand {
  public readonly command = ['configure <source>', 'conf'];
  public readonly describe = 'Configure sources';
  public builder = {};

  public handler(args: any): void {
    const { source } = args;

    const consoleService = container.get<IConsoleService>(TYPES.ConsoleService);

    try {
      const configurator = container.getNamed<IConfigurator>(
        TYPES.Configurator,
        source,
      );

      configurator.configure();
    } catch (err) {
      process.exitCode = 1;

      if (
        err.message.includes('No matching bindings found for serviceIdentifier')
      ) {
        consoleService.writeError(
          `Configuration of ${source} is not possible.`,
        );
      } else {
        throw new Error(err);
      }
    }
  }
}

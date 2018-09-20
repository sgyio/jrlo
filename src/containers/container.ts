import { Container } from 'inversify';
import TYPES from './types';

import {
  CardCommand,
  CardCreateCommand,
  ConfigureCommand,
  GetCommand,
  ListCommand,
  OpenCommand,
} from './../commands';

import {
  ICardService,
  ICommand,
  IConfigManagerService,
  IConfigstoreConfig,
  IConfigurator,
  IConsoleService,
  ICredentialManagerService,
  IJiraConfigurationService,
  IJiraService,
  IRequestService,
  ITrelloConfig,
  ITrelloConfigurationService,
  ITrelloService,
  IUpdateNotifierService,
} from '../interfaces';

import {
  BoardMapper,
  IArrayMapper,
  IssueMapper,
  IToArrayMapper,
} from '../mappers';

import {
  CardService,
  ConfigManagerService,
  ConsoleService,
  CredentialManagerService,
  JiraConfigurationService,
  JiraConfiguratorService,
  JiraService,
  RequestService,
  TrelloConfigurationService,
  TrelloConfiguratorService,
  TrelloService,
  UpdateNotifierService,
} from '../services';

export const container = new Container({ autoBindInjectable: true });

/** Application Services */

container.bind<IJiraService>(TYPES.JiraService).to(JiraService);
container.bind<ITrelloService>(TYPES.TrelloService).to(TrelloService);
container
  .bind<IJiraConfigurationService>(TYPES.JiraConfigurationService)
  .to(JiraConfigurationService);
container
  .bind<ITrelloConfigurationService>(TYPES.TrelloConfigurationService)
  .to(TrelloConfigurationService);

container.bind<ICardService>(TYPES.CardService).to(CardService);

/** Application Commands */

container
  .bind<ICommand>(TYPES.Command)
  .to(ConfigureCommand)
  .whenTargetNamed('configure');

container
  .bind<ICommand>(TYPES.Command)
  .to(GetCommand)
  .whenTargetNamed('get');

container
  .bind<ICommand>(TYPES.Command)
  .to(ListCommand)
  .whenTargetNamed('list');

container
  .bind<ICommand>(TYPES.Command)
  .to(OpenCommand)
  .whenTargetNamed('open');

container
  .bind<ICommand>(TYPES.Command)
  .to(CardCommand)
  .whenTargetNamed('card');

container
  .bind<ICommand>(TYPES.Command)
  .to(CardCreateCommand)
  .whenTargetNamed('cardCreate');

/** Application Mappers */

container.bind<IToArrayMapper>(TYPES.BoardMapper).to(BoardMapper);
container.bind<IArrayMapper>(TYPES.IssueMapper).to(IssueMapper);

/** Infrastructure */

container.bind<IConsoleService>(TYPES.ConsoleService).to(ConsoleService);

container
  .bind<IConfigManagerService>(TYPES.ConfigManagerService)
  .to(ConfigManagerService);

container
  .bind<ICredentialManagerService>(TYPES.CredentialManagerService)
  .to(CredentialManagerService);

container.bind<IRequestService>(TYPES.RequestService).to(RequestService);
container
  .bind<IUpdateNotifierService>(TYPES.UpdateNotifierService)
  .to(UpdateNotifierService);

container
  .bind<IConfigstoreConfig>(TYPES.ConfigstoreConfig)
  .toConstantValue({ name: 'jrlo' });

container
  .bind<ITrelloConfig>(TYPES.TrelloConfig)
  .toConstantValue({ appKey: '240c2d18d455b3f2cd4ca07da9ef1740' });

container
  .bind<IConfigurator>(TYPES.Configurator)
  .to(TrelloConfiguratorService)
  .whenTargetNamed('trello');

container
  .bind<IConfigurator>(TYPES.Configurator)
  .to(JiraConfiguratorService)
  .whenTargetNamed('jira');

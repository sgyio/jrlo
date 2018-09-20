const TYPES = {
  BoardMapper: Symbol.for('BoardMapper'),
  CardService: Symbol.for('CardService'),
  ConfigManagerService: Symbol.for('ConfigManagerService'),
  Command: Symbol.for('Command'),
  Configurator: Symbol.for('Configurator'),
  ConfigstoreConfig: Symbol.for('ConfigstoreConfig'),
  ConsoleService: Symbol.for('ConsoleService'),
  CredentialManagerService: Symbol.for('CredentialManagerService'),
  IssueMapper: Symbol.for('IssueMapper'),
  JiraService: Symbol.for('JiraService'),
  JiraConfigurationService: Symbol.for('JiraConfigurationService'),
  RequestService: Symbol.for('RequestService'),
  TrelloConfig: Symbol.for('TrelloConfig'),
  TrelloService: Symbol.for('TrelloService'),
  TrelloConfigurationService: Symbol.for('TrelloConfigurationService'),
  UpdateNotifierService: Symbol.for('UpdateNotifierService'),
};

export default TYPES;

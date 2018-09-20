import { IJiraConfig } from '../interfaces';

export interface IJiraConfigurationService {
  getJiraConfig(): Promise<IJiraConfig>;
  configure(): Promise<IJiraConfig>;
}

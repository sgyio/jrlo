import { inject, injectable } from 'inversify';
import TYPES from '../../containers/types';

import { getBorderCharacters, table } from 'table';

import {
  IConsoleService,
  IJiraConfig,
  IJiraConfigurationService,
  IJiraService,
  IRequestService,
} from '../../interfaces';

import { IToArrayMapper } from './../../mappers/interfaces/IToArrayMapper';

@injectable()
export class JiraService implements IJiraService {
  constructor(
    @inject(TYPES.RequestService) private requestService: IRequestService,
    @inject(TYPES.IssueMapper) private issueMapper: IToArrayMapper,
    @inject(TYPES.ConsoleService) private consoleService: IConsoleService,
    @inject(TYPES.JiraConfigurationService)
    private jiraConfigurationService: IJiraConfigurationService,
  ) {}

  public async getIssue(key: string): Promise<any> {
    const jiraConfig: IJiraConfig = await this.jiraConfigurationService.getJiraConfig();

    try {
      const response = await this.requestService.get(
        `https://${jiraConfig.host}/rest/api/latest/issue/${key}`,
        { username: jiraConfig.username, password: jiraConfig.password },
      );
      this.consoleService.write(JSON.stringify(this.issueMapper.map(response)));
    } catch (err) {
      this.handleError(err, jiraConfig.host);
    }
  }

  public async listIssuesFromQuery(query: string, options: any): Promise<any> {
    const jiraConfig: IJiraConfig = await this.jiraConfigurationService.getJiraConfig();

    try {
      const response = await this.requestService.get(
        `https://${
          jiraConfig.host
        }/rest/api/latest/search?jql=${query}&validateQuery&fields=summary,description,issuetype,assignee,timeestimate,status,priority&expand`,
        {
          username: jiraConfig.username,
          password: jiraConfig.password,
        },
      );

      if (response.total === 0) {
        if (options.json) {
          this.consoleService.write(JSON.stringify({ message: 'No result' }));
        } else {
          this.consoleService.writeInfo('No result');
        }
        return;
      } else {
        if (options.json) {
          this.consoleService.write(
            JSON.stringify(this.issueMapper.mapArray(response.issues)),
          );
        } else {
          const mappedData = this.issueMapper.mapArray(response.issues);
          const issuesTableData = this.issueMapper.mapToArray(mappedData);

          console.log(
            table(issuesTableData, {
              border: getBorderCharacters(`void`),
              columnDefault: {
                paddingLeft: 1,
                paddingRight: 1,
              },
              drawHorizontalLine: () => {
                return false;
              },
              columns: {
                0: {
                  paddingLeft: 5,
                  width: 11,
                },
                4: {
                  width: options.width,
                  truncate: options.width,
                },
              },
            }),
          );
        }
      }
    } catch (err) {
      this.handleError(err, jiraConfig.host);
    }
  }

  public openIssue(url: string): void {
    console.log('open link');
  }

  private handleError(err: any, host: string): void {
    process.exitCode = 1;
    if (err.message.includes('401')) {
      this.consoleService.writeError('Connection to JIRA API is unauthorized.');
    } else if (err.message.includes('getaddrinfo ENOTFOUND')) {
      this.consoleService.writeError(
        `JIRA host '${host}' is unreachable.  Please check JIRA config.`,
      );
    } else if (err.message.includes('403')) {
      this.consoleService.writeError(
        `You are unauthorized to access ${host}.  Please check JIRA config.`,
      );
    } else {
      this.consoleService.writeError(`Cannot connect to JIRA API.`);
    }
  }
}

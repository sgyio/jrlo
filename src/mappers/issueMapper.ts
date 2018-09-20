import { injectable } from 'inversify';

import { IToArrayMapper } from './interfaces/IToArrayMapper';

@injectable()
export class IssueMapper implements IToArrayMapper {
  public map(response: any): any {
    return {
      key: response.key,
      issueType: response.fields.issuetype.name,
      summary: response.fields.summary,
      status: response.fields.status.name,
      priority: response.fields.priority.name,
      assignee:
        (response.fields.assignee && response.fields.assignee.displayName) ||
        'None',
      description: response.fields.description,
    };
  }

  public mapArray(response: any[]): any[] {
    return response.map(this.map);
  }

  public mapToArray(data: any[]): any[][] {
    return data.map((line) => [
      line.key,
      line.issueType,
      line.status,
      line.priority,
      line.summary,
    ]);
  }
}

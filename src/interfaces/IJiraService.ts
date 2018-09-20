export interface IJiraService {
  getIssue(key: string): Promise<any>;
  listIssuesFromQuery(query: string, options: any): any;
  openIssue(url: string): void;
}

export interface ICardService {
  createFromIssue(key: string): Promise<void>;
}

import { IBasicAuth } from './IBasicAuth';

export interface IRequestService {
  get(ressource: string, basicAuth?: IBasicAuth): Promise<any>;
}

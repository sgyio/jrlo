import axios from 'axios';
import { injectable } from 'inversify';

import { IBasicAuth, IRequestService } from '../../interfaces';

@injectable()
export class RequestService implements IRequestService {
  public async get(ressource: string, basicAuth?: IBasicAuth): Promise<any> {
    const url = `${ressource}`;

    const options = {
      auth: basicAuth,
    };

    const response = await axios.get(url, options);

    return response.data;
  }
}

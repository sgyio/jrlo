import * as Configstore from 'configstore';
import { inject, injectable } from 'inversify';
import * as keytar from 'keytar';

import TYPES from '../../containers/types';

import {
  IConfigstoreConfig,
  ICredentialManagerService,
  IKeySecretPair,
} from '../../interfaces';

@injectable()
export class CredentialManagerService implements ICredentialManagerService {
  private conf: Configstore;
  private serviceName: string;

  constructor(
    @inject(TYPES.ConfigstoreConfig) configStoreConfig: IConfigstoreConfig,
  ) {
    this.conf = new Configstore(configStoreConfig.name);
    this.serviceName = configStoreConfig.name;
  }

  public async getKeyAndSecret(prop: string): Promise<IKeySecretPair> {
    const key = this.conf.get(prop);
    if (!key) {
      return;
    }
    const secret = await keytar.getPassword(this.serviceName, key);
    return { key, secret };
  }

  public async storeKeyAndSecret(prop, key, secret) {
    this.conf.set(prop, key);
    await keytar.setPassword(this.serviceName, key, secret);
  }

  public async clearKeyAndSecret(prop) {
    const key = this.conf.get(prop);
    await keytar.deletePassword(this.serviceName, key);
  }
}

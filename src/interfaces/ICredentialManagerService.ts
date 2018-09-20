import { IKeySecretPair } from './IKeySecretPair';

export interface ICredentialManagerService {
  getKeyAndSecret(prop: string): Promise<IKeySecretPair>;
  storeKeyAndSecret(prop: string, key: string, secret: string): Promise<void>;
  clearKeyAndSecret(prop: string): Promise<void>;
}

import { injectable } from 'inversify';
import * as updateNotifier from 'update-notifier';
const pkg = require('../../../package.json');

import { IUpdateNotifierService } from '../../interfaces';

@injectable()
export class UpdateNotifierService implements IUpdateNotifierService {
  public check(): void {
    updateNotifier({ pkg }).notify();
  }
}

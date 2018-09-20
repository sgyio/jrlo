export interface IConfigManagerService {
  getUserConfigValue(key: string): string;
  getUserConfigPath(): string;
  setUserConfigValue(key: string, value: string): void;
  writeSecurityWarning(): void;
}

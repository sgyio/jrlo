import * as inquirer from 'inquirer';

export interface IConsoleService {
  render: any;
  error(message: string): string;
  generateTable(data: any): void;
  getVersion(): string;
  getAppLogo(): string;
  getChalk(): any;
  insertLine(count?: number): void;
  prompt(questions: inquirer.Questions): Promise<inquirer.Answers>;
  write(message: string): void;
  writeBoxedMessage(message: string, color?: string);
  writeError(message: string): void;
  writeInfo(message: string): void;
  writeLine(message: string): void;
}

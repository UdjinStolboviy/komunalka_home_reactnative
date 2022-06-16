export interface ILoggerService {
  info(message: string, additionalInfo?: any): void;
  warning(message: string, additionalInfo?: any): void;
  error(message: string, additionalInfo?: any): void;
}

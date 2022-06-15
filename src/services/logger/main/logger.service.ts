import { ILoggerService } from "./logger.service.interface";
import { inject, injectable } from "inversify";
import { TYPES } from "app/data/ioc/types";
import { GlobalStorage } from "app/data/storage/global.storage";




@injectable()
export class LoggerService implements ILoggerService {


  public error(message: string, additionalMessage?: any): void {

    console.error('ERROR: ' + message + ' ' + additionalMessage);

  }

  public info(message: string, additionalMessage?: any): void {

    console.info('INFO: ' + message + ' ' + additionalMessage);

  }

  public warning(message: string, additionalMessage?: any): void {

    console.warn('WARNING: ' + message + ' ' + additionalMessage);

  }

}

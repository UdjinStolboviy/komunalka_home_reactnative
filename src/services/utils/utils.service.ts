import { TYPES } from "app/data/ioc/types";
import { GlobalStorage } from "app/data/storage/global.storage";
import { inject, injectable } from "inversify";
import { IRESTService } from "../http/rest.service.interface";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { IUtilsService } from "./utils.service.interface";
import storage, { firebase } from '@react-native-firebase/storage';

@injectable()
export class UtilsService implements IUtilsService {

  private readonly UPLOAD_CARE_URL = 'https://upload.uploadcare.com/base/';
  private readonly UPLOAD_CARE_PREFIX_URL = 'https://ucarecdn.com/';


  @inject(TYPES.Logger) private logger: ILoggerService;
  //@inject(TYPES.RESTService) private restService: IRESTService;


  public async localUrlToRemote(uri: string, fileName: string, type: string): Promise<string | null> {
    //const reference = storage().ref(uri);
    const reference = firebase
      .app()
      .storage('gs://komunalka-home.appspot.com').ref(`${fileName}`);
    const pathToFile = `${uri}`;
    console.log('pathToFile_______', pathToFile);
    try {
      await reference.putFile(pathToFile);
      const getUrl = await storage().ref(`${fileName}`).getDownloadURL();

      console.log('getUrl', getUrl);

      return getUrl;
    } catch (e) {
      this.logger.error(e.message || e.error);
      return null;
    }
  }

}

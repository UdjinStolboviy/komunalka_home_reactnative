export interface IUtilsService {
  localUrlToRemote(uri: string, fileName: string, type: string): Promise<string | null>
}

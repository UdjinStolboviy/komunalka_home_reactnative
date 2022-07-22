import { FirebaseDynamicLinksTypes } from "@react-native-firebase/dynamic-links";
import { Flat } from "app/data/storage/flat/flat.model";


export interface IDeepLinkService {

  composeShortLink(link: string): Promise<string>
  composeSocialShortLink(link: string, socialParams: FirebaseDynamicLinksTypes.DynamicLinkSocialParameters): Promise<string>;
  handleOpportunityDeepLink(link: string): Promise<void>;
  onDeepLinkOpened(link: any): Promise<void>;
  getInitialLink(): Promise<void>;
  onLink(): void;
  createFlatDeepLink(flat: Flat): Promise<string>;
}

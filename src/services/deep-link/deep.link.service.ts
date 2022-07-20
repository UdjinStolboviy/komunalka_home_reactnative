import { inject, injectable } from "inversify";
import { IDeepLinkService } from "./deep.link.service.interface";
import dynamicLinks, { FirebaseDynamicLinksTypes } from '@react-native-firebase/dynamic-links';
import config from "../../config/config";
import { TYPES } from "app/data/ioc/types";
import { ILoggerService } from "../logger/main/logger.service.interface";
import { GlobalStorage } from "app/data/storage/global.storage";
import { INavigationService } from "../navigation/navigation.service.interface";
import { appCoreService } from "app/data/ioc/inversify.config";
import { Screens } from "app/assets/constants/codes/Screens";
import { Flat } from "app/data/storage/flat/flat.model";



@injectable()
export class DeepLinkService implements IDeepLinkService {

  @inject(TYPES.Logger) private logger!: ILoggerService;
  @inject(TYPES.NavigationService) private navigationService!: INavigationService;

  @inject(TYPES.Storage) private storage!: GlobalStorage;



  public async createFlatDeepLink(flat: Flat): Promise<string> {
    const link = config.host.domain + 'explore/flats/' + flat.getId();
    const overlay = '-/overlay//';
    const deepLink = await this.composeSocialShortLink(link,
      {
        title: 'Продажа квартиры',
        descriptionText: 'Продажа квартиры',
        imageUrl: undefined,
      }
    );
    return deepLink;
  }

  public async getInitialLink() {
    try {
      const link = await dynamicLinks().getInitialLink();
      if (link) {
        await this.onDeepLinkOpened(link);
      }
    } catch (e: any) {
      appCoreService.logger.error(e.message || e.error)
    }
  }


  public async onDeepLinkOpened(link: any) {
    try {
      if (!link.url) return;
      const isExplore = link.url.includes("explore");
      const isCompany = link.url.includes("companies");
      const isEmployee = link.url.includes("introduction")
      if (isExplore) {
        await this.handleOpportunityDeepLink(link.url);
      }
      if (isCompany) {
        await this.handleCompanyDeepLink(link.url);
      }
      if (isEmployee) {
        await this.handleEmployeeDeepLink(link.url);
      }
    } catch (e: any) {
      appCoreService.logger.error(e.message || e.error)
    }
  };

  public onLink(): void {
    const unsubscribe = dynamicLinks().onLink(this.onDeepLinkOpened.bind(this));
    this.storage.getListenerState().setDeepLinkListener(unsubscribe);
  }


  public async composeShortLink(link: string): Promise<string> {
    try {
      const params: FirebaseDynamicLinksTypes.DynamicLinkParameters = this.provideParameters(link);
      const shortLink = await dynamicLinks().buildShortLink(params);
      return shortLink;
    } catch (e: any) {
      this.logger.error(e.message || e.error);
      return link;
    }
  }

  public async composeSocialShortLink(link: string, socialParams: FirebaseDynamicLinksTypes.DynamicLinkSocialParameters): Promise<string> {
    try {
      const params: FirebaseDynamicLinksTypes.DynamicLinkParameters = this.provideParameters(link, socialParams);
      const shortLink = await dynamicLinks().buildShortLink(params);
      return shortLink;
    } catch (e: any) {
      this.logger.error(e.message || e.error);
      return link;
    }
  }

  public async handleOpportunityDeepLink(link: string): Promise<void> {
    try {
      this.navigationService.navigate(Screens._POLICY);
      const arr: string[] = link.split('/');
      const opportunityId: string = arr[arr.length - 1];
      const blockedEntities = this.storage.getBlockedEntitiesState().getBlockedEntities();

      this.navigationService.goBack();


    } catch (e: any) {
      this.navigationService.goBack();
      this.logger.error('Failed to handle link: ' + link, e);
    }
  }

  public async handleCompanyDeepLink(link: string): Promise<void> {
    try {
      this.navigationService.navigate(Screens._POLICY);
      const arr: string[] = link.split('/');


    } catch (e: any) {
      this.navigationService.goBack();
      this.logger.error('Failed to handle link: ' + link, e);
    }
  }

  public async handleEmployeeDeepLink(link: string): Promise<void> {
    try {
      this.navigationService.navigate(Screens._POLICY);
      const arr: string[] = link.split('=');
      const companyId = arr[1].split("&")[0];
      const employeeId = arr[2];
      const blockedEntities = this.storage.getBlockedEntitiesState().getBlockedEntities();


    } catch (e: any) {
      this.navigationService.goBack();
      this.logger.error('Failed to handle link: ' + link, e);
    }
  }

  private provideParameters(link: string, socialParameters?: FirebaseDynamicLinksTypes.DynamicLinkSocialParameters): FirebaseDynamicLinksTypes.DynamicLinkParameters {
    const parameters: FirebaseDynamicLinksTypes.DynamicLinkParameters = {
      link: link,
      domainUriPrefix: config.deep_link.prefix,
      social: socialParameters,
      navigation: {
        forcedRedirectEnabled: true,
      },
    };
    if (config.app.env === 'prod') {
      parameters.android = {
        packageName: config.app.bundle
      };
      parameters.ios = {
        bundleId: config.app.bundle,
        appStoreId: config.app.app_store_id
      }
    }
    return parameters;

  }


}

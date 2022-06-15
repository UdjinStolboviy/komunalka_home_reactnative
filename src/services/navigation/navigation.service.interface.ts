export interface INavigationService {

    setNavigator(navigator: any): void;

    navigate(screen: string, params?: object): void

    goBack(): void;

    getRouteName(): string;

}

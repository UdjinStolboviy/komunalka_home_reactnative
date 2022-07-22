import { INavigationService } from "./navigation.service.interface";
import { injectable } from "inversify";

@injectable()
export class NavigationService implements INavigationService {

    public initialized: boolean = false;
    private navigator: any;

    public goBack(): void {
        if (this.navigator) {
            this.navigator.goBack();
        }
    }

    public navigate(screen: string, params?: object): void {
        if (this.navigator) {
            const payload = {
                routeName: screen,
                params: params
            };
            this.navigator.navigate(screen, params);
        }
    }

    public setNavigator(navigator: any): void {
        if (!navigator) return;
        this.navigator = navigator;
    }

    public getRouteName(): string {
        try {
            const currentRoute = this.navigator.getCurrentRoute();
            return currentRoute.name
        } catch (e) {
            return ""
        }
    }

}

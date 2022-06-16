import { NavigationState } from "@react-navigation/native";

export interface IListenerService {
  listenToAuthStateChange(): void;
  onNavigationStateChange(state: NavigationState | undefined): void
  setupListeners(): void;
}

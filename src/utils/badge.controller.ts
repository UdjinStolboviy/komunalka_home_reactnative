// import { Platform } from "react-native";
// import PushNotificationIOS from "@react-native-community/push-notification-ios";

// const BadgeAndroid = require('react-native-android-badge');

// export interface IBadgeController {
//   setBadgeCount(count: number): Promise<void>;
// }

// class BadgeController implements IBadgeController {

//   public async setBadgeCount(count: number): Promise<void> {
//     try {
//       if (Platform.OS === 'ios') {
//         PushNotificationIOS.setApplicationIconBadgeNumber(count)
//       } else {
//         await BadgeAndroid.setBadgeCount(count);
//       }
//     } catch (e) {
//     }
//   }
// }

// const badgeController = new BadgeController();
// export default badgeController;

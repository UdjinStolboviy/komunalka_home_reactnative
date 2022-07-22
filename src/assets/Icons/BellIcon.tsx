import {useAppInjection} from 'app/data/ioc/inversify.config';
import {IAppCoreService} from 'app/services/core/app.core.service.interface';
import {observer} from 'mobx-react';
import * as React from 'react';
import {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '../constants/colors/Colors';
export interface BellIconIconProps {
  active?: boolean;
}

export const BellIcon = observer((props: BellIconIconProps) => {
  const app: IAppCoreService = useAppInjection();
  const unreadNotificationsCount = app.storage
    .getNotificationsState()
    .getUnreadNotificationsCount();

  useEffect(() => {}, [unreadNotificationsCount]);

  const _formatMessagesCount = () => {
    if (unreadNotificationsCount < 10) {
      return unreadNotificationsCount;
    } else {
      return '9+';
    }
  };
  return (
    <View>
      <Svg width={45} height={45} fill="none" {...props}>
        <Path
          d="M12.09 14.943c.23-2.069.344-3.103.644-3.96a8 8 0 0 1 5.76-5.155c.884-.203 1.925-.203 4.006-.203 2.081 0 3.122 0 4.006.203a8 8 0 0 1 5.76 5.156c.3.856.415 1.89.644 3.959l.472 4.249c.175 1.566.262 2.35.497 3.095.032.102.066.204.102.305.265.735.67 1.41 1.481 2.762l2.096 3.492c.805 1.343 1.208 2.014.921 2.522-.287.507-1.07.507-2.636.507H9.157c-1.566 0-2.349 0-2.636-.507-.287-.508.116-1.18.921-2.522l2.095-3.492c.811-1.351 1.217-2.027 1.482-2.762.036-.101.07-.203.102-.305.236-.746.322-1.529.497-3.095l.472-4.25Z"
          stroke="#007AFF"
          strokeWidth={2}
        />
        <Path
          d="M17.067 33.121c.32 1.794 1.026 3.38 2.009 4.51.982 1.131 2.186 1.744 3.424 1.744s2.442-.613 3.424-1.744c.983-1.13 1.689-2.716 2.01-4.51"
          stroke="#007AFF"
          strokeWidth={2}
          strokeLinecap="round"
        />
      </Svg>
      {unreadNotificationsCount > 0 ? (
        <View style={TabBarIconStyle.badge}>
          <Text style={TabBarIconStyle.badgeText}>
            {_formatMessagesCount()}
          </Text>
        </View>
      ) : null}
    </View>
  );
});

const TabBarIconStyle = StyleSheet.create({
  container: {},
  badge: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    right: -2,
    top: -2,
    backgroundColor: Colors._F63535,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 8,
    color: Colors._FFFFFF,
  },
});

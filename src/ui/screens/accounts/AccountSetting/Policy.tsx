import React from 'react';
import { View, ScrollView } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import WebView from 'react-native-webview';
import { AccountStyle } from '@scm/styles/App/MyAccountStyle';

export const Policy: React.FC = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={AccountStyle.webWiev}>
          <WebView source={{ uri: 'https://www.iubenda.com/privacy-policy/58844855/full-legal' }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

import React from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import WebView from 'react-native-webview';
import { AccountStyle } from '@scm/styles/App/MyAccountStyle';

export const Terms: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={AccountStyle.webWiev}>
        <WebView
          source={{ uri: 'https://www.iubenda.com/terms-and-conditions/58844855' }}
          containerStyle={{ marginTop: -120 }}
          overScrollMode="content"
        />
      </View>
    </SafeAreaView>
  );
};

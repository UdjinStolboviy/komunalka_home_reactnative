import {Colors} from 'app/assets/constants/colors/Colors';
import {AppHeader} from 'app/ui/components/Common/AppHeader/AppHeader';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {CircularProgressBar} from '../../components/Charts/CircularProgressBar';
import {TooltipLabels} from '../../components/Charts/TooltipLabelBar';

export interface HomePageChartsProps {
  colorIcon?: string;
}

export const HomePageCharts = (props: HomePageChartsProps) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={() => console.log('Charts home1')}
        style={{
          width: '50%',
        }}>
        <CircularProgressBar colorIcon={Colors._CF480E} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log('Charts home2')}
        style={{
          width: '50%',
        }}>
        <CircularProgressBar colorIcon={Colors._979797} />
      </TouchableOpacity>
    </View>
  );
};

import {View, Text} from 'react-native';
import React from 'react';
import {observer} from 'mobx-react';
import {IFlat} from 'app/data/storage/flat/flat.model';

export interface FlatCardAdvancedInfoProps {
  flat: IFlat;
  index: number;
  onPublishPress?: () => void;
}

export const FlatCardAdvancedInfo = observer(
  ({flat, onPublishPress}: FlatCardAdvancedInfoProps) => {
    return (
      <View style={[FlatCardAdvancedInfoStyle.container]}>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
        <Text>OpportunityCardAdvancedInfo</Text>
      </View>
    );
  },
);

const FlatCardAdvancedInfoStyle = {
  container: {
    width: '100%',
    height: 300,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingBottom: '4%',
  },
};

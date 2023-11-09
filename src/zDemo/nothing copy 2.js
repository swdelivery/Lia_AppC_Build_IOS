import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text, TouchableOpacity } from 'react-native';
import { WHITE } from '../Constant/Color';

const HEADER_HEIGHT = 220;

const Scrollnothing2 = ((props) => {
  if (props?.isActiveTab) {
    return (
      <View style={{ flex: 1 }}>


        <View style={{}}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(item => {
              return (
                <View style={{ borderWidth: 1, paddingVertical: 48 }}>
                  <Text>
                    {item}
                  </Text>
                </View>
              )
            })
          }
        </View>
      </View>
    );
  } else {
    return <></>
  }

});



export default Scrollnothing2;
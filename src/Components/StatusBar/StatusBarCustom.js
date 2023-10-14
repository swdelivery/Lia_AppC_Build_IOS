import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Platform, View } from 'react-native';
import { BASE_COLOR } from '../../Constant/Color';
import { _heightScale } from '../../Constant/Scale';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';

const StatusBarCustom = memo((props) => {
    return (
        <>
            <StatusBar backgroundColor={props?.bgColor || BASE_COLOR} translucent={false} barStyle={props?.barStyle || 'light-content'} />
            {
                !props?.rmStatusBarHeight && Platform.OS == 'ios' &&
                <View style={{
                    height: _heightScale(getStatusBarHeight() + _heightScale(8)),
                    backgroundColor: props?.bgColor || BASE_COLOR
                }} >
                    {
                        props?.gradient ?
                            <LinearGradient
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                locations={[0, 0.6, 1]}
                                colors={[
                                    BASE_COLOR,
                                    '#8c104e',
                                    '#db0505',
                                ]}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    // borderRadius: _moderateScale(8),
                                }} />
                            :
                            <></>
                    }

                </View>
            }
        </>
    );
});



export default StatusBarCustom;
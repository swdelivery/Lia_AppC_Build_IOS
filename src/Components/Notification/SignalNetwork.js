import React, { memo } from 'react';
import { Text, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useSelector } from 'react-redux';
import { RED, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';


const SignalNetwork = memo((props) => {

    const networkInfoRedux = useSelector(state => state.networkReducer.networkInfo)


    return (
        <Collapsible
            collapsed={networkInfoRedux}>
            <View style={{paddingVertical:_moderateScale(4), backgroundColor:RED}}>
                <Text style={[stylesFont.fontNolan500,{color:WHITE, alignSelf:'center', fontSize:_moderateScale(14)} ]}>
                    Mất kết nối mạng ...
                </Text> 
            </View>
        </Collapsible>
    );
});



export default SignalNetwork;
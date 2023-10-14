import React, { memo, useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Animated,
    Image,
    TouchableWithoutFeedback, TouchableOpacity 
} from 'react-native'
import { BG_GREY_OPACITY_9, GREY_FOR_TITLE, SECOND_COLOR, WHITE } from '../../Constant/Color';
import { navigation } from '../../../rootNavigation';
import { _moderateScale } from '../../Constant/Scale';
import { sizeIcon } from '../../Constant/Icon';

const index = memo((props) => {

    const [heightModal, setHeightModal] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.spring(heightModal,{
            toValue: Dimensions.get('window').height - _moderateScale(80),
            duration: 100,
            bounciness: 10,
            speed: 20,
        }).start()
    }, [])


    return (

        <View style={{
            width: "100%",
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                width: "100%",
                height: "100%",
            }} >
                <TouchableWithoutFeedback
                    style={{
                        width: "100%", 
                        height: '100%',
                        alignItems: 'center',
                        backgroundColor: 'rgba(71, 71, 71,0.5)',
                        justifyContent:'flex-end'
                    }}
                    onPress={() => navigation.goBack()}>
                        
                    <Animated.View style={{
                        width: "100%",
                        height: heightModal,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} >
                        <TouchableWithoutFeedback>
                            <View style={{
                                width: Dimensions.get('window').width - _moderateScale(12),
                                height: '100%%',
                                backgroundColor: 'white',
                                borderTopStartRadius: _moderateScale(12),
                                borderTopEndRadius: _moderateScale(12),
                                padding: _moderateScale(16)
                            }}>
                                <View style={[styles.headOfModal]}>
                                    <Text style={[styles.titleModal]}>
                                        CHI TIẾT MODAL FAKE
                                    </Text>
                                   <TouchableOpacity 
                                   hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                                   onPress={()=>navigation.goBack()}>
                                    <Image style={[sizeIcon.xs]} source={require('../../Icon/cancel.png')} />
                                   </TouchableOpacity>
                                </View>
                                <View style={[styles.bodyOfModal]}>
                                    <Text>
                                       Body modal fake
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>

                </TouchableWithoutFeedback>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    headOfModal:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 1,
        borderColor: BG_GREY_OPACITY_9,
        paddingBottom:_moderateScale(12)
    },
    titleModal:{
        color: SECOND_COLOR,
        fontSize:_moderateScale(16)
    },
    bodyOfModal:{
        flex:1,
        paddingVertical: _moderateScale(16)
    }
});

export default index;
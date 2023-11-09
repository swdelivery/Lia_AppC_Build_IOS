import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BG_GREY_OPACITY_3, BLACK, BTN_PRICE, GREY, WHITE } from '../../../Constant/Color';

import ItemQA from './Components/ItemQA'
import { getQuestionAnswer } from '../../../Redux/Action/InfoAction';
import StatusBarCustom from '../../../Components/StatusBar/StatusBarCustom';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';

const QAAffiliate = (props) => {
    const [listQA, setListQA] = useState([])

    useEffect(() => {
        _getQuestionAnswer()
    }, [])


    const _getQuestionAnswer = async () => {
        let result = await getQuestionAnswer({
            condition: {
                type: {
                    equal: 'collaborator'
                }
            },
            limit: 1000
        })
        if (result?.isAxiosError) return
        setListQA(result?.data?.data)
    }

    return (
        <View style={{flex:1,backgroundColor:WHITE}}>
            <StatusBarCustom bgColor={WHITE} barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'row',
                paddingHorizontal: _moderateScale(8 * 2),
                alignItems: 'center',
                paddingTop: _moderateScale(8 * 1.5),
                paddingBottom: _moderateScale(8*2),
                borderBottomWidth: _moderateScale(0.5),
                borderBottomColor: BG_GREY_OPACITY_3,
                backgroundColor: WHITE,
            }}>
                <View style={[{ width: _moderateScale(8 * 5) }, { alignItems: 'flex-start' }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => navigation.goBack()}>
                        <Image
                            style={[sizeIcon.lg]}
                            source={require('../../../Icon/back_bold.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>

                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(16), color: BLACK }]} numberOfLines={2}>
                        Hỏi đáp
                    </Text>
                </View>
            </View>
            <ScrollView scrollIndicatorInsets={{ right: 1 }} style={{ flex: 1 }}>
                <View style={{ marginTop: _moderateScale(8 * 1) }}>
                    {
                        listQA?.map((item, index) => {
                            return (
                                <ItemQA data={item} index={index} key={index} />
                            )
                        })
                    }
                </View>
                <View style={{ height: 50 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({


})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 11
}



export default QAAffiliate;
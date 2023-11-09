import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet, Text, Image, ScrollView } from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { BTN_PRICE, GREY, WHITE } from '../../../Constant/Color';

import ItemQA from './Components/ItemQA'
import { getQuestionAnswer } from '../../../Redux/Action/InfoAction';

const index = (props) => {
    const [listQA, setListQA] = useState([])

    useEffect(() => {
        _getQuestionAnswer()
    }, [])

   
    const _getQuestionAnswer = async () => {
        let result = await getQuestionAnswer( {
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
        <ScrollView scrollIndicatorInsets={{ right: 1 }} style={{ flex: 1 }}>
            <View style={{ marginTop: _moderateScale(8 * 1) }}>
                {
                    listQA?.map((item, index) => {
                        return(
                            <ItemQA data={item} key={index}/>
                        )
                    })
                }
            </View>
            <View style={{height:50}}/>
        </ScrollView>
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



export default index;
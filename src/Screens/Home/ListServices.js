import React, { memo, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { navigation } from '../../../rootNavigation';
import { GREY, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';
import ScreenKey from '../../Navigation/ScreenKey';
import ItemService from './Components/ItemService'
import { sizeIcon } from '../../Constant/Icon';
import { useDispatch } from 'react-redux';
import { getAllService } from '../../Redux/Action/Service'
import { getAllProduct } from '../../Redux/Action/Product'

import { useSelector } from 'react-redux';

const ListServices = memo((props) => {
    const dispatch = useDispatch();

    const listServiceRedux = useSelector(state => state.serviceReducer?.listServiceHome)
    const listProductRedux = useSelector(state => state.productReducer?.listProductHome)

    useEffect(() => {
      if(props?.flag === 'service')
      {
        dispatch(getAllService()) 
      }
      if(props?.flag === 'product')
      {
        dispatch(getAllProduct()) 
      } 
    }, [])

    return (
        <View>
            <View style={{ paddingHorizontal: _moderateScale(8 * 2), flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[stylesFont.fontNolanBold, {
                    fontSize: _moderateScale(16),
                    color: GREY, marginLeft: _moderateScale(8 * 2)
                }]}>
                    {
                        props?.title
                    }
                </Text>

                <TouchableOpacity style={{ paddingHorizontal: _moderateScale(8 * 2) }} onPress={() => props?.navigation ? navigation.navigate(props.navigation) : console.log('none')}>
                    <Image
                        style={[sizeIcon.xxs]}
                        source={require('../../Icon/rightArrow.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: _moderateScale(8 * 2) }}>
                <ScrollView

                    contentContainerStyle={{ paddingVertical: _moderateScale(8), paddingHorizontal: _moderateScale(8 * 3) }}
                    showsHorizontalScrollIndicator={false}
                    horizontal>
                    {
                        props?.flag === 'service' ?
                            <>
                                {
                                    listServiceRedux?.map((item, index) => {
                                        return(
                                            <ItemService key={index} data={item} flag={props?.flag} />
                                        )
                                    })
                                }
                            </>
                            : <></>
                    }
                    {
                        props?.flag === 'product' ?
                            <>
                                {
                                    listProductRedux?.map((item, index) => {
                                        return(
                                            <ItemService key={index} data={item} flag={props?.flag} />
                                        )
                                    })
                                }
                            </>
                            : <></>
                    }
                    {/* <ItemService flag={props?.flag} />
                    <ItemService flag={props?.flag} />
                    <ItemService flag={props?.flag} /> */}
                </ScrollView>
            </View>
        </View>
    );
});



export default ListServices;
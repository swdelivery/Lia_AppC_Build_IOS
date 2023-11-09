import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import { WHITE } from '../../Constant/Color';
import { navigation } from '../../../rootNavigation';
import { styleElement } from '../../Constant/StyleElement';
import { _moderateScale } from '../../Constant/Scale';
import { sizeIcon } from '../../Constant/Icon';
import { stylesFont } from '../../Constant/Font';
import CardAssistance from './Components/Card'
import { getListSocialAssistancePost } from '../../Redux/Action/SocialAssistanceAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';

const index = memo((props) => {

    const [listSocialAssistancePost, setListSocialAssistancePost] = useState([])

    useEffect(() => {
        _getListSocialAssistancePost()
    }, [])

    const _getListSocialAssistancePost = async () => {
        let result = await getListSocialAssistancePost({})
        if (result?.isAxiosError) return
        setListSocialAssistancePost(result?.data?.data)
    }

    return (
        <View style={{ flex: 1, backgroundColor: WHITE }}>
            <StatusBarCustom/>
            <ImageBackground
                style={{ width: "100%", paddingBottom: _moderateScale(8 * 2) }}
                source={require('../../Image/header/header1.png')}>
                <View style={[styleElement.rowAliCenter, { paddingHorizontal: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }]}>
                    <TouchableOpacity
                        hitSlop={styleElement.hitslopSm}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Image
                            style={[sizeIcon.llg]}
                            source={require('../../Icon/back_left_white.png')} />
                    </TouchableOpacity>

                    <View style={[styleElement.rowAliCenter, { flex: 1, justifyContent: 'space-between', marginLeft: _moderateScale(8 * 2) }]}>
                        <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(18), color: WHITE }]}>
                            Dự án xã hội
                        </Text>
                    </View>
                </View>
            </ImageBackground>

            <ScrollView style={{ paddingHorizontal: _moderateScale(8 * 2), paddingVertical: _moderateScale(8 * 2) }}>
                {
                    listSocialAssistancePost?.map((item, index) => {
                        return (
                            <CardAssistance key={item?._id} data={item} />
                        )
                    })
                }

                <View style={{ height: 100 }} />
            </ScrollView>

        </View>
    );
});



export default index;
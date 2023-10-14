import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native'
import { WHITE, BLACK_OPACITY_8, BTN_PRICE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, GREY } from '../../../Constant/Color';
import { navigation } from '../../../../rootNavigation';
import { styleElement } from '../../../Constant/StyleElement';
import { _moderateScale } from '../../../Constant/Scale';
import { sizeIcon } from '../../../Constant/Icon';
import { stylesFont } from '../../../Constant/Font';
import ScreenKey from '../../../Navigation/ScreenKey'
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';
import ModalIframeYoutube from '../../../Components/ModalIframeYoutube/ModalIframeYoutube';

const ListVideo = memo((props) => {

    const [playingYoutube, setPlayingYoutube] = useState({
        show: false,
        playList: []
    })

    if (props?.isActiveTab) {
        return (
            <View>

                <ModalIframeYoutube
                    playList={playingYoutube?.playList}
                    hide={() => {
                        setPlayingYoutube(old => {
                            return {
                                ...old,
                                show: false,
                                playList: []
                            }
                        })
                    }}
                    show={playingYoutube?.show} />

                {props?.listVideoSocialAssistance?.map((item, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setPlayingYoutube(old => {
                                    return {
                                        ...old,
                                        show: true,
                                        playList: [item?.file?.link]
                                    }
                                })
                            }}
                            activeOpacity={0.8}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: _moderateScale(8)
                            }}>
                            <Image style={[sizeIcon.lg, { marginRight: _moderateScale(4) }]} source={require('../../../Icon/play.png')} />
                            <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}>
                                {item?.file?.name}
                            </Text>

                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    } else {
        return <></>
    }
});



export default ListVideo;
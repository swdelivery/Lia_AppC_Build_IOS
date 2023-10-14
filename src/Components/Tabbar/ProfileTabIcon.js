import { includes } from 'lodash';
import React, { memo } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useSelector } from "react-redux";
import * as Color from '../../Constant/Color';
import { sizeIcon } from '../../Constant/Icon';
import { _moderateScale } from '../../Constant/Scale';



const TimelineTabIcon = memo((props) => {

    const notificationRedux = useSelector(state => state.notificationReducer)
    const infoUserRedux = useSelector(state => state.infoUserReducer)

    return (
        <>
            <ImageBackground
                style={[sizeIcon.lxlg]}
                source={
                    props.focused ?
                        require('../../NewIcon/a_profile.png')
                        :
                        require('../../NewIcon/i_profile.png')
                }
            >
                {/* {
                    notificationRedux?.listMyNotificationsForPost?.find(itemFind => {
                        return (!includes(itemFind.viewerIdArr, infoUserRedux.infoUser._id))
                    }) ?
                        <View style={styles.dotNewNotifi} />
                        :
                        <>
                        </>
                } */}
            </ImageBackground>

        </>
    );
});


const styles = StyleSheet.create({
    dotNewNotifi: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: Color.RED,
        position: 'absolute',
        right: 0,
        top: 0

    }
})


export default TimelineTabIcon;
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Screen from '@Components/Screen'
import VideoPlayer from './Components/VideoPlayer'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { _height, _heightScale, _moderateScale, _width } from '@Constant/Scale'
import { FlatList } from 'react-native-gesture-handler'
import { BLACK, WHITE } from '@Constant/Color'
import { IconBackWhite } from '@Components/Icon/Icon'
import { styleElement } from '@Constant/StyleElement'
import { navigation } from 'rootNavigation'
import ModalListComments from './Components/ModalListComments'

const VerticalVideoPlayer = (props) => {

    const [videosData, setVideosData] = useState([])
    const { top } = useSafeAreaInsets()
    const refFlatlist = useRef()

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [showModalComment, setShowModalComment] = useState({
        isShow: false,
        data: null
    })

    useEffect(() => {
        console.log({ activeVideoIndex });

    }, [activeVideoIndex])

    useEffect(() => {
        if (videosData?.length > 0) {
            if (props?.route?.params?.idx) {
                setTimeout(() => {
                    refFlatlist?.current?.scrollToIndex({ animated: false, index: props?.route?.params?.idx })
                }, 500);
            }

            //
        }

    }, [videosData])


    useEffect(() => {

        if (props?.route?.params?.data?.length > 0) {
            console.log({ x: props?.route?.params?.data });
            setVideosData(props?.route?.params?.data)
        }
    }, [props?.route?.params?.data])

    return (
        <View style={{
            flex: 1,
            marginTop: Platform.OS == 'ios' ? 0 : top
        }}>

            <ModalListComments
                isShow={showModalComment?.isShow}
                onHideModal={() => {
                    setShowModalComment({
                        isShow: false,
                        data: null
                    })
                }} />

            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                    setActiveVideoIndex(-1)
                }}
                hitSlop={styleElement.hitslopSm}
                style={{
                    position: 'absolute',
                    top: top,
                    zIndex: 1,
                    left: _moderateScale(8 * 2)
                }}>
                <IconBackWhite />
            </TouchableOpacity>

            <FlatList
                ref={refFlatlist}
                removeClippedSubviews={false}
                data={videosData}
                pagingEnabled
                renderItem={({ item, index }) => (
                    <VideoPlayer
                        setShowModalComment={setShowModalComment}
                        data={item}
                        isActive={activeVideoIndex == index}
                    />
                )}
                onScroll={e => {
                    const index = Math.round(
                        e.nativeEvent.contentOffset.y / _height,
                    );
                    setActiveVideoIndex(index);
                }}
            />


        </View>
    )
}

export default VerticalVideoPlayer

const styles = StyleSheet.create({})

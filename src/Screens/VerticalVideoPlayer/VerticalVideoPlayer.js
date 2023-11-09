import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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

    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [showModalComment, setShowModalComment] = useState({
        isShow: false,
        data: null
    })



    useEffect(() => {
        console.log({ activeVideoIndex });

    }, [activeVideoIndex])

    useEffect(() => {

       
    },[])

    // useEffect(() => {
    //     setVideosData([
    //         {
    //             id: 1,
    //             name: 'cutedog',
    //             uri: 'https://media.soyoung.com/13ed1819bc850e8652d2f99ed65aad71/77c8441b/video/tos/vod/tos-vod-cn-v-ab60f0641af09d5d/oYTQUxnWEIhTTTp4hIZwu8PQJow2wCPwjHQBA/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b8d52a57dd12483bb34db3247d2ca5cb%2F20230909%2F%2F%2Faws4_request&X-Amz-Date=20230909T095520Z&X-Amz-Expires=315360619&X-Amz-Signature=a1e7115809ea786e0db6a75ca2e647499711d077539ddbbb414b11e33e88d3d1&X-Amz-SignedHeaders=host&X-Amz-SignedQueries=X-Amz-Algorithm%3BX-Amz-Credential%3BX-Amz-Date%3BX-Amz-Expires%3BX-Amz-SignedHeaders%3BX-Amz-SignedQueries%3BX-Amz-UriRange%3Bcdn-host&X-Amz-UriRange=0%2C+83&a=0&br=868&bt=868&cd=0%7C0%7C0&cdn-host=bWVkaWEuc295b3VuZy5jb20&ch=0&cr=0&cs=0&dr=0&ds=3&er=0&l=20230909175520E78D061BFF0DFB5F0FFF&lr=sy_logo&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M204d3B5djY3bTQzNDRlM0ApNDM6M2g4Ojs7N2loZjY3M2dwNWlkLS42LnJgLS1kXjBzczMtNl42XjZeMzUuX2FiNGE6Yw%3D%3D&vl=&vr=',
    //             caption: 'Cute dog shaking hands #cute #puppy',
    //             musicName: 'Song #1',
    //             likes: 4321,
    //             comments: 2841,
    //             avatarUri: 'https://wallpaperaccess.com/full/1669289.jpg',
    //         },
    //         {
    //             id: 2,
    //             name: 'meow',
    //             uri: 'https://media.soyoung.com/a6a0e392e5b00801deef0bc849fc01d5/77d8fd4e/video/tos/vod/tos-vod-cn-v-ab60f0641af09d5d/oEQrkkQAYy3BaBe9ARsfaZeaDjffEIdIkUIoHZ/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b8d52a57dd12483bb34db3247d2ca5cb%2F20230922%2F%2F%2Faws4_request&X-Amz-Date=20230922T022157Z&X-Amz-Expires=315360609&X-Amz-Signature=e076021ddfe53ba130da45a6a6b160cdcc3c8f5b7ac680fc7f75cabf9a87cf33&X-Amz-SignedHeaders=host&X-Amz-SignedQueries=X-Amz-Algorithm%3BX-Amz-Credential%3BX-Amz-Date%3BX-Amz-Expires%3BX-Amz-SignedHeaders%3BX-Amz-SignedQueries%3BX-Amz-UriRange%3Bcdn-host&X-Amz-UriRange=0%2C+84&a=0&br=552&bt=552&cd=0%7C0%7C0&cdn-host=bWVkaWEucHVzaGVuZ3l6LmNvbQ&ch=0&cr=0&cs=0&dr=0&ds=3&er=0&l=20230922102157C3DACB693043D9DF8A86&lr=sy_logo&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amlld3B5dmhpbjQzNDRlM0ApaDo4OzRpPGQ2NzZnNmU6OGdqZmlkLS42aDNgLS1kXjBzc14yMy80MmE1LWJhNi1gYzQ6Yw%3D%3D&vl=&vr=',
    //             caption: 'Doggies eating candy #cute #puppy',
    //             musicName: 'Song #2',
    //             likes: 2411,
    //             comments: 1222,
    //             avatarUri: 'https://wallpaperaccess.com/thumb/266770.jpg',
    //         },
    //         {
    //             id: 3,
    //             name: 'yummy',
    //             uri: 'https://media.soyoung.com/bd32333debc5fd37370519690f42ec33/77d438d5/video/tos/vod/tos-vod-cn-v-ab60f0641af09d5d/oEgBSADolAOJaB51GfBeYQWCgbWQNIPF56YXQW/?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=b8d52a57dd12483bb34db3247d2ca5cb%2F20230918%2F%2F%2Faws4_request&X-Amz-Date=20230918T113436Z&X-Amz-Expires=315360609&X-Amz-Signature=b4206be643af5138d7e5c00f34f8df4f343086e44c876392183818b28bdfca71&X-Amz-SignedHeaders=host&X-Amz-SignedQueries=X-Amz-Algorithm%3BX-Amz-Credential%3BX-Amz-Date%3BX-Amz-Expires%3BX-Amz-SignedHeaders%3BX-Amz-SignedQueries%3BX-Amz-UriRange%3Bcdn-host&X-Amz-UriRange=0%2C+84&a=0&br=714&bt=714&cd=0%7C0%7C0&cdn-host=bWVkaWEucHVzaGVuZ3l6LmNvbQ&ch=0&cr=0&cs=0&dr=0&ds=3&er=0&l=2023091819343657DAFC43C166A4AE3649&lr=sy_logo&mime_type=video_mp4&net=0&pl=0&qs=0&rc=ajNqdXR5dmg2bjQzNDRlM0ApOTllOGdmZjwzN2k0aDg3Z2dpZi9pLS42XzFgLS1kXmFzczFeNGEtXy8xYV5hXi1gXjQ6Yw%3D%3D&vl=&vr=',
    //             caption: 'Brown little puppy #cute #puppy',
    //             musicName: 'Song #3',
    //             likes: 3100,
    //             comments: 801,
    //             avatarUri: 'https://wallpaperaccess.com/thumb/384178.jpg',
    //         },
    //     ])
    // }, [])

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
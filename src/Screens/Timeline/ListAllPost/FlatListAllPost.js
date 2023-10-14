import { isEmpty } from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import ItemPost from '../../../Components/Timeline/ItemPost';
import { GREY_FOR_TITLE, WHITE } from '../../../Constant/Color';
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale } from '../../../Constant/Scale';
import { getAllPosts, getMorePosts } from '../../../Redux/Action/PostAction';






const FlatListAllPost = memo((props) => {
    const dispatch = useDispatch()
    const listAllPostsRedux = useSelector(state => state?.postReducer?.listAllPosts)

    const [refreshing, setRefreshing] = useState(false)
    const [flagLoadmorePost, setFlagLoadMorePost] = useState(true)
    const [onEndReachedCalledDuringMomentum, setOnEndReachedCalledDuringMomentum] = useState(true)


    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    const _handleRefresh = () => {
        setRefreshing(true)
        dispatch(getAllPosts(setRefreshing, setFlagLoadMorePost))
    }

    const _handleEndReached = () => {
        dispatch(getMorePosts({
            lastPostId: listAllPostsRedux[listAllPostsRedux.length - 1]._id
        }, setFlagLoadMorePost))
    }

    const _renderItemPost = useCallback(({ item, index }) => {
        return (
            <ItemPost lasted={index == listAllPostsRedux?.length - 1} data={item} />
        )
    }, [listAllPostsRedux])

    const _awesomeChildListKeyExtractor = useCallback((item) => `awesome-child-key-${item._id}`, []);

    return (
        <>
            {
                !isEmpty(listAllPostsRedux) ?
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                titleColor={GREY_FOR_TITLE}
                                progressViewStyle={'bar'}
                                title={'Đang tải..'}
                                refreshing={refreshing}
                                onRefresh={_handleRefresh}
                            />
                        }
                        onEndReachedThreshold={0.5}
                        onEndReached={() => {
                            if (!onEndReachedCalledDuringMomentum) {
                                _handleEndReached()
                                setOnEndReachedCalledDuringMomentum(true)
                            }
                            // _handleEndReached()
                        }}
                        onMomentumScrollBegin={() => {
                            setOnEndReachedCalledDuringMomentum(false)
                        }}
                        ListFooterComponent={() => {
                            if (flagLoadmorePost) {
                                return (
                                    <ActivityIndicator
                                        style={{ color: '#000' }}
                                    />
                                )
                            } else {
                                return (
                                    <View style={[{width:"100%", paddingVertical:_moderateScale(8*2), backgroundColor:WHITE, borderRadius:_moderateScale(8)}]}>
                                        <Text style={[stylesFont.fontNolan500, {color:GREY_FOR_TITLE, fontSize:_moderateScale(15), alignSelf:'center'}]}>
                                            Hết bài viết 
                                        </Text>
                                    </View>
                                )
                            }
                        }}
                        ListFooterComponentStyle={{ marginVertical: _moderateScale(8 * 1.5) }}
                        data={!isEmpty(listAllPostsRedux) ? listAllPostsRedux : []}
                        renderItem={_renderItemPost}
                        // renderItem={({ item: itemPost, index }) => {
                        //     return (
                        //         <ItemPost lasted={index == postsRedux?.listAllPosts?.length - 1} data={itemPost} />
                        //     )
                        // }}
                        keyExtractor={_awesomeChildListKeyExtractor}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text>
                            Đang tải dữ liệu...
                        </Text>
                    </View>
            }
        </>
    );
});



export default FlatListAllPost;
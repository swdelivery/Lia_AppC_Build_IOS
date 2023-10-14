import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { navigation } from '../../../rootNavigation';
import { BASE_COLOR, BG_BEAUTY, BG_GREY_OPACITY_3, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BLACK_OPACITY_8, BLUE, BLUE_FB, BLUE_OCEAN, BLUE_TITLE, GREY, GREY_FOR_TITLE, MAIN_OPACITY_8, RED, SECOND_COLOR, THIRD_COLOR, WHITE, BG_GREY_OPACITY_9, BLACK_OPACITY_7, BG_GREY_OPACITY_2 } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import FastImage from '../../Components/Image/FastImage';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import ItemFeed from './Component/ItemFeed';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import ImagePicker from 'react-native-image-crop-picker';
import { TabBar, TabView } from 'react-native-tab-view';
import ListDiaryForCreatePost from './ListDiaryForCreatePost';
import { updatePartnerDiaryv2, updatePartnerDailyDiaryv2 } from '../../Redux/Action/PartnerDiary';
import { alertCustomNotAction } from '../../Constant/Utils';
import { uploadModule } from '../../Redux/Action/BookingAction';
import ImageView from "react-native-image-viewing";
import ModalEditDescriptionDailyDiary from './Component/ModalEditDescriptionDailyDiary';
import ModalPickSingleNotSearch from '../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch';
import { createPost, getPostByIdv2, updatePostv2 } from '../../Redux/Action/PostAction';
import { getPartnerDiaryv2, getPartnerDiaryByIdv2 } from '../../Redux/Action/Diary';
import cloneDeep from 'lodash/cloneDeep';
import * as ActionType from '../../Redux/Constants/ActionType'


const UpdatePost = (props) => {
    const scrollA = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch()


    const infoUserRedux = useSelector(state => state.infoUserReducer?.infoUser)

    const [description, setDescription] = useState('')

    const [currPartnerDiary, setCurrPartnerDiary] = useState(null)

    const [routes] = useState([
        { key: 'second', title: 'Hình ảnh' },
    ]);
    const [index, setIndex] = useState(0);

    const [indexCurrImageView, setIndexCurrImageView] = useState(0)
    const [showImageViewing, setShowImageViewing] = useState(false)
    const [listImagesSeeCurr, setListImagesSeeCurr] = useState([])

    const [listAnotherImage, setListAnotherImage] = useState([])

    const [showModalEditDesDailyDiary, setShowModalEditDesDailyDiary] = useState({
        show: false,
        data: {}
    })

    const [showModalPickScope, setShowModalPickScope] = useState(false)
    const [currScope, setCurrScope] = useState({
        name: 'Công khai',
        slug: 'PUBLIC'
    })


    useEffect(() => {
        console.log({ props });
        _getPostById()

    }, [])

    const _getPostById = async () => {
        let result = await getPostByIdv2(props?.route?.params?.idPost)
        if (result?.isAxiosError) return
        setDescription(result?.data?.data?.content)
        if (result?.data?.data?.scope == "PRIVATE") {
            setCurrScope({
                name: 'Chỉ mình tôi',
                slug: 'PRIVATE'
            })
        }
        setListAnotherImage(result?.data?.data?.images)
        _getDiaryById(result?.data?.data?.template?.data?.partnerDiaryId)
    }

    const _getDiaryById = async (id) => {
        let result = await getPartnerDiaryByIdv2(id)
        if (result?.isAxiosError) return
        setCurrPartnerDiary(result?.data?.data)
    }

    const pickImageBefore = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
        }).then(async (images) => {
            let listImages = images.map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })
            console.log({ listImages });
            let resultUploadImageBefore = await uploadModule({
                moduleName: 'partnerDiary',
                files: listImages
            })
            if (resultUploadImageBefore?.isAxiosError) return
            setCurrPartnerDiary(old => {
                return {
                    ...old,
                    imageBeforeTreatment: [...old?.imageBeforeTreatment, ...resultUploadImageBefore?.data?.data]
                }
            })
        }).catch(e => { });
    }

    const pickImageAfter = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
        }).then(async (images) => {
            let listImages = images.map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })
            console.log({ listImages });
            let resultUploadImage = await uploadModule({
                moduleName: 'partnerDiary',
                files: listImages
            })
            if (resultUploadImage?.isAxiosError) return
            setCurrPartnerDiary(old => {
                return {
                    ...old,
                    imageAfterTreatment: [...old?.imageAfterTreatment, ...resultUploadImage?.data?.data]
                }
            })
        }).catch(e => { });
    }

    const pickImageAnother = async () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
        }).then(async (images) => {
            let listImages = images.map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })
            console.log({ listImages });
            let resultUploadImage = await uploadModule({
                moduleName: 'partnerDiary',
                files: listImages
            })
            if (resultUploadImage?.isAxiosError) return

            setListAnotherImage(old => {
                return [
                    ...old,
                    ...resultUploadImage?.data?.data
                ]
            })
        }).catch(e => { });
    }

    const pickImageDailyDiary = async (dailyDiary) => {
        console.log({ dailyDiary });

        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            includeExif: true,
            forceJpg: true,
            maxFiles: 6,
            mediaType: 'photo',
            compressImageQuality: 0.5,
            compressImageMaxWidth: 700,
        }).then(async (images) => {
            let listImages = images.map((i, index) => {
                return {
                    uri: i.path,
                    width: i.width,
                    height: i.height,
                    mime: i.mime,
                    type: i.mime,
                    name: `${i.modificationDate}_${index}`
                };
            })
            console.log({ listImages });
            let resultUploadImage = await uploadModule({
                moduleName: 'partnerDiary',
                files: listImages
            })
            if (resultUploadImage?.isAxiosError) return
            let tempCurrPartnerDiary = { ...currPartnerDiary };
            let findIndex = tempCurrPartnerDiary?.dailyDiaryArr?.findIndex(item => item?._id == dailyDiary?._id);
            if (findIndex !== -1) {
                tempCurrPartnerDiary.dailyDiaryArr[findIndex].images = [
                    ...tempCurrPartnerDiary.dailyDiaryArr[findIndex].images,
                    ...resultUploadImage?.data?.data
                ]
            }
            setCurrPartnerDiary(tempCurrPartnerDiary)

        }).catch(e => { });
    }

    // const _pickDiary = (diary) => {
    //     console.log({ diary });
    //     setCurrPartnerDiary(diary)
    //     setIndex(1)
    // }

    const _handleDeleteImageBefore = async (_id) => {

        if (currPartnerDiary?.imageBeforeTreatment?.length == 1) {
            return alertCustomNotAction(`Thông báo`, `Ảnh trước điều trị phải chứa ít nhất 1 tấm`)
        }

        setCurrPartnerDiary(old => {
            return {
                ...old,
                imageBeforeTreatment: currPartnerDiary?.imageBeforeTreatment?.filter(item => item?._id !== _id)
            }
        })
    }
    const _handleDeleteImageAfter = async (_id) => {

        if (currPartnerDiary?.imageAfterTreatment?.length == 1) {
            return alertCustomNotAction(`Thông báo`, `Ảnh sau điều trị phải chứa ít nhất 1 tấm`)
        }

        setCurrPartnerDiary(old => {
            return {
                ...old,
                imageAfterTreatment: currPartnerDiary?.imageAfterTreatment?.filter(item => item?._id !== _id)
            }
        })
    }
    const _handleDeleteImageAnother = async (_id) => {

        let temp = listAnotherImage?.filter(item => item?._id !== _id);

        setListAnotherImage(temp)
    }

    const _handleConfirmEditDescription = async (_idDailyDiary, newDescription) => {
        console.log({ _idDailyDiary, newDescription });

        let tempCurrPartnerDiary = { ...currPartnerDiary };

        let findIndex = tempCurrPartnerDiary?.dailyDiaryArr?.findIndex(item => item?._id == _idDailyDiary);
        if (findIndex !== -1) {
            tempCurrPartnerDiary.dailyDiaryArr[findIndex].description = newDescription
        }

        setCurrPartnerDiary(tempCurrPartnerDiary)
    }

    const _handleDeleteImageDailyDiary = async (itemParent, itemChild) => {
        console.log({ itemParent, itemChild });
        let tempCurrPartnerDiary = { ...currPartnerDiary };
        itemParent = {
            ...itemParent,
            images: itemParent?.images?.filter(item => item?._id !== itemChild?._id)
        }
        console.log({ itemParent });

        // let listIdImages = itemParent?.images?.map(item => item?._id);
        // let result = await updatePartnerDailyDiaryv2(itemParent?._id, {
        //     images: listIdImages
        // })
        // if (result?.isAxiosError) return

        let findIndex = tempCurrPartnerDiary?.dailyDiaryArr?.findIndex(item => item?._id == itemParent?._id);
        if (findIndex !== -1) {
            tempCurrPartnerDiary.dailyDiaryArr[findIndex] = itemParent
        }
        setCurrPartnerDiary(tempCurrPartnerDiary)

    }

    const _handleUpdatePost = async () => {

        dispatch({
            type: ActionType.LOADING_BEGIN,
            payload: {
                content: 'Đang xử lí...'
            }
        })

        let resultUpdatePost = await updatePostv2(currPartnerDiary?.postId, {
            "content": description,
            "images": listAnotherImage?.map(item => item?._id),
            "scope": currScope.slug
        })
        if (resultUpdatePost?.isAxiosError) return dispatch({
            type: ActionType.LOADING_DONE,
            payload: null
        })

        console.log({ currPartnerDiary });

        let tempCurrPartnerDiary = cloneDeep(currPartnerDiary)

        tempCurrPartnerDiary.dailyDiaryArr = currPartnerDiary?.dailyDiaryArr?.map(item => {
            return {
                ...item,
                images: item?.images?.map(itemMap => itemMap?._id)
            }
        })

        console.log({ tempCurrPartnerDiary });


        let resultUpdatePartnerDiary = await updatePartnerDiaryv2(currPartnerDiary?._id, {
            "imageBeforeTreatment": currPartnerDiary?.imageBeforeTreatment?.map(item => item?._id),
            "imageAfterTreatment": currPartnerDiary?.imageAfterTreatment?.map(item => item?._id),
            "dailyDiaryArr": tempCurrPartnerDiary?.dailyDiaryArr
        })
        if(resultUpdatePartnerDiary?.isAxiosError)return dispatch({
            type: ActionType.LOADING_DONE,
            payload: null
        })

        navigation.goBack()

        dispatch({
            type: ActionType.LOADING_DONE,
            payload: null
        })


        // let data = {
        //     "content": description,
        //     "images": listAnotherImage?.map(item => item?._id),
        //     "template": {
        //         "type": "PartnerDiary_TreatmentDetail",
        //         "data": {
        //             "partnerDiaryId": currPartnerDiary?.id
        //         }
        //     },
        //     "scope": currScope.slug
        // }
        // dispatch(createPost(data))
    }

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'second':
                return (
                    <ScrollView>
                        <View style={{ flexDirection: 'row', padding: _moderateScale(8 * 2), alignItems: 'center' }}>
                            <FastImage style={[styles.avatar]} uri={`${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}`} />
                            <View style={{ marginLeft: _moderateScale(8) }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14), color: GREY_FOR_TITLE }}>
                                    {infoUserRedux?.name}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowModalPickScope(true)
                                    }}
                                    style={styles.btnSecret}>
                                    {
                                        currScope?.slug == "PUBLIC" ?
                                            <>
                                                <Image style={sizeIcon.xs} source={require('../../NewIcon/earthGrey.png')} />
                                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(13), color: GREY }}>
                                                    Công khai
                                                </Text>
                                                <Image style={sizeIcon.xxs} source={require('../../NewIcon/downGrey.png')} />
                                            </>
                                            : <></>
                                    }
                                    {
                                        currScope?.slug == "PRIVATE" ?
                                            <>
                                                <Image style={sizeIcon.xs} source={require('../../NewIcon/lockGrey.png')} />
                                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(13), color: GREY }}>
                                                    Chỉ mình tôi
                                                </Text>
                                                <Image style={sizeIcon.xxs} source={require('../../NewIcon/downGrey.png')} />
                                            </>
                                            : <></>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                            <View style={{
                                minHeight: _moderateScale(8 * 8),
                                backgroundColor: BG_GREY_OPACITY_2,
                                marginTop: _moderateScale(0),
                                borderRadius: _moderateScale(8),
                                padding: _moderateScale(8),
                                paddingHorizontal: _moderateScale(8 * 1.5),
                            }}>
                                <TextInput
                                    onChangeText={(content) => {
                                        setDescription(content)
                                    }}
                                    value={description}
                                    placeholder={'Bạn đang nghĩ gì?'}
                                    multiline
                                    style={{
                                        flex: 1,
                                        fontSize: _moderateScale(14)
                                    }} />
                            </View>
                        </View>

                        <View style={{ paddingLeft: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Ảnh trước điều trị {
                                    <Text style={{ fontSize: _moderateScale(18), color: RED }}>
                                        *
                                    </Text>
                                }
                            </Text>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                {
                                    currPartnerDiary?.imageBeforeTreatment?.map((item, index) => {
                                        return (
                                            <View style={{
                                                paddingTop: _moderateScale(8),
                                                paddingRight: _moderateScale(8),
                                                marginRight: _moderateScale(8),
                                                marginTop: _moderateScale(8)
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowImageViewing(true)
                                                        setIndexCurrImageView(index)
                                                        setListImagesSeeCurr(currPartnerDiary?.imageBeforeTreatment)
                                                    }}
                                                    style={{
                                                        width: _moderateScale(8 * 11.8),
                                                        height: _moderateScale(8 * 11.8),
                                                    }} key={index}>
                                                    <Image source={{
                                                        uri: `${URL_ORIGINAL}${item?.link}`
                                                    }}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: _moderateScale(8)
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    hitSlop={styleElement.hitslopSm}
                                                    onPress={() => _handleDeleteImageBefore(item._id)}
                                                    style={{
                                                        position: 'absolute',
                                                        right: _moderateScale(0),
                                                        top: _moderateScale(0),
                                                        width: _moderateScale(15),
                                                        height: _moderateScale(15),
                                                        backgroundColor: RED,
                                                        borderRadius: _moderateScale(8),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center'
                                                    }}>
                                                    <View style={{ width: _moderateScale(8), height: _moderateScale(2), backgroundColor: WHITE }} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }

                                <View style={{
                                    paddingTop: _moderateScale(8),
                                    paddingRight: _moderateScale(8),
                                    marginRight: _moderateScale(8),
                                    marginTop: _moderateScale(8)
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            pickImageBefore()
                                        }}
                                        style={[styleElement.centerChild, {
                                            width: _moderateScale(8 * 11.8),
                                            height: _moderateScale(8 * 11.8),
                                            borderWidth: 1,
                                            borderRadius: _moderateScale(8),
                                            borderColor: GREY,
                                            borderStyle: 'dashed'
                                        }]} key={index}>
                                        <Image style={[sizeIcon.lxlg, { opacity: 0.5 }]} source={require('../../Icon/plus_black.png')} />
                                    </TouchableOpacity>

                                </View>

                            </ScrollView>
                        </View>

                        <View style={{ paddingLeft: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Ảnh sau điều trị {
                                    <Text style={{ fontSize: _moderateScale(18), color: RED }}>
                                        *
                                    </Text>
                                }
                            </Text>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                {
                                    currPartnerDiary?.imageAfterTreatment?.map((item, index) => {
                                        return (
                                            <View style={{
                                                paddingTop: _moderateScale(8),
                                                paddingRight: _moderateScale(8),
                                                marginRight: _moderateScale(8),
                                                marginTop: _moderateScale(8)
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowImageViewing(true)
                                                        setIndexCurrImageView(index)
                                                        setListImagesSeeCurr(currPartnerDiary?.imageAfterTreatment)
                                                    }}
                                                    style={{
                                                        width: _moderateScale(8 * 11.8),
                                                        height: _moderateScale(8 * 11.8),
                                                    }} key={index}>
                                                    <Image source={{
                                                        uri: `${URL_ORIGINAL}${item?.link}`
                                                    }}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: _moderateScale(8)
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    hitSlop={styleElement.hitslopSm}
                                                    onPress={() => _handleDeleteImageAfter(item._id)}
                                                    style={{
                                                        position: 'absolute',
                                                        right: _moderateScale(0),
                                                        top: _moderateScale(0),
                                                        width: _moderateScale(15),
                                                        height: _moderateScale(15),
                                                        backgroundColor: RED,
                                                        borderRadius: _moderateScale(8),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center'
                                                    }}>
                                                    <View style={{ width: _moderateScale(8), height: _moderateScale(2), backgroundColor: WHITE }} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }

                                <View style={{
                                    paddingTop: _moderateScale(8),
                                    paddingRight: _moderateScale(8),
                                    marginRight: _moderateScale(8),
                                    marginTop: _moderateScale(8)
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            pickImageAfter()
                                        }}
                                        style={[styleElement.centerChild, {
                                            width: _moderateScale(8 * 11.8),
                                            height: _moderateScale(8 * 11.8),
                                            borderWidth: 1,
                                            borderRadius: _moderateScale(8),
                                            borderColor: GREY,
                                            borderStyle: 'dashed'
                                        }]} key={index}>
                                        <Image style={[sizeIcon.lxlg, { opacity: 0.5 }]} source={require('../../Icon/plus_black.png')} />
                                    </TouchableOpacity>

                                </View>

                            </ScrollView>
                        </View>

                        <View style={{ paddingLeft: _moderateScale(8 * 2), marginTop: _moderateScale(8 * 2) }}>
                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                                Ảnh Khác
                            </Text>

                            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                {
                                    listAnotherImage?.map((item, index) => {
                                        return (
                                            <View style={{
                                                paddingTop: _moderateScale(8),
                                                paddingRight: _moderateScale(8),
                                                marginRight: _moderateScale(8),
                                                marginTop: _moderateScale(8)
                                            }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setShowImageViewing(true)
                                                        setIndexCurrImageView(index)
                                                        setListImagesSeeCurr(listAnotherImage)
                                                    }}
                                                    style={{
                                                        width: _moderateScale(8 * 11.8),
                                                        height: _moderateScale(8 * 11.8),
                                                    }} key={index}>
                                                    <Image source={{
                                                        uri: `${URL_ORIGINAL}${item?.link}`
                                                    }}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            borderRadius: _moderateScale(8)
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    hitSlop={styleElement.hitslopSm}
                                                    onPress={() => _handleDeleteImageAnother(item._id)}
                                                    style={{
                                                        position: 'absolute',
                                                        right: _moderateScale(0),
                                                        top: _moderateScale(0),
                                                        width: _moderateScale(15),
                                                        height: _moderateScale(15),
                                                        backgroundColor: RED,
                                                        borderRadius: _moderateScale(8),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignContent: 'center'
                                                    }}>
                                                    <View style={{ width: _moderateScale(8), height: _moderateScale(2), backgroundColor: WHITE }} />
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }

                                <View style={{
                                    paddingTop: _moderateScale(8),
                                    paddingRight: _moderateScale(8),
                                    marginRight: _moderateScale(8),
                                    marginTop: _moderateScale(8)
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            pickImageAnother()
                                        }}
                                        style={[styleElement.centerChild, {
                                            width: _moderateScale(8 * 11.8),
                                            height: _moderateScale(8 * 11.8),
                                            borderWidth: 1,
                                            borderRadius: _moderateScale(8),
                                            borderColor: GREY,
                                            borderStyle: 'dashed'
                                        }]} key={index}>
                                        <Image style={[sizeIcon.lxlg, { opacity: 0.5 }]} source={require('../../Icon/plus_black.png')} />
                                    </TouchableOpacity>

                                </View>

                            </ScrollView>
                        </View>
                        <View style={{ height: _moderateScale(8 * 1), backgroundColor: 'rgba(196, 196, 196,.6)', marginTop: _moderateScale(8 * 3) }} />

                        <View style={{ paddingHorizontal: _moderateScale(8 * 1), marginTop: _moderateScale(8 * 2) }}>
                            <View style={{ paddingLeft: _moderateScale(8), marginBottom: _moderateScale(8 * 2) }}>
                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(16), color: BASE_COLOR }}>
                                    Nhật kí {currPartnerDiary?.serviceName}
                                </Text>
                            </View>

                            {
                                currPartnerDiary?.dailyDiaryArr?.length > 0 && currPartnerDiary?.dailyDiaryArr?.map((item, index) => {
                                    return (
                                        <View key={item?._id} style={{ flexDirection: 'row' }}>

                                            <View style={{ width: _moderateScale(2), backgroundColor: BG_GREY_OPACITY_5, alignItems: 'center', marginLeft: _moderateScale(8 * 2) }} >
                                                <View style={{ width: _moderateScale(8), height: _moderateScale(8), backgroundColor: BG_GREY_OPACITY_7, borderRadius: _moderateScale(4), position: 'absolute', top: _moderateScale(6) }} />
                                            </View>

                                            <View style={{ flex: 1, marginLeft: 10, paddingLeft: _moderateScale(8 * 1) }}>
                                                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(14) }}>
                                                    {moment(item?.date).format('DD/MM/YYYY')}
                                                </Text>
                                                {
                                                    item?.description?.length > 0 ?
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setShowModalEditDesDailyDiary({
                                                                    show: true,
                                                                    data: item
                                                                })
                                                            }}
                                                            style={{ backgroundColor: BG_GREY_OPACITY_2, padding: _moderateScale(8), borderRadius: _moderateScale(8), marginTop: _moderateScale(4) }}>
                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), fontStyle: 'italic', color: BLACK_OPACITY_8 }}>
                                                                {item?.description}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setShowModalEditDesDailyDiary({
                                                                    show: true,
                                                                    data: item
                                                                })
                                                            }}
                                                            style={{ backgroundColor: BG_GREY_OPACITY_2, padding: _moderateScale(8), borderRadius: _moderateScale(8), marginTop: _moderateScale(4) }}>
                                                            <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), fontStyle: 'italic', color: BLACK_OPACITY_8 }}>
                                                                Chạm để thêm nội dung
                                                            </Text>
                                                        </TouchableOpacity>
                                                }
                                                {
                                                    true ?
                                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: _moderateScale(4) }}>
                                                            {
                                                                item?.images?.map((itemMap, index) => {
                                                                    return (
                                                                        <View style={{
                                                                            paddingTop: _moderateScale(8),
                                                                            paddingRight: _moderateScale(8),
                                                                            marginRight: _moderateScale(8),
                                                                            marginTop: _moderateScale(8)
                                                                        }}>
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    setShowImageViewing(true)
                                                                                    setIndexCurrImageView(index)
                                                                                    setListImagesSeeCurr(item?.images)
                                                                                }}
                                                                                style={{
                                                                                    width: _moderateScale(8 * 11),
                                                                                    height: _moderateScale(8 * 11),
                                                                                }} key={index}>
                                                                                <Image source={{
                                                                                    uri: `${URL_ORIGINAL}${itemMap?.link}`
                                                                                }}
                                                                                    style={{
                                                                                        width: '100%',
                                                                                        height: '100%',
                                                                                        borderRadius: _moderateScale(8)
                                                                                    }}
                                                                                />
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                hitSlop={styleElement.hitslopSm}
                                                                                onPress={() => _handleDeleteImageDailyDiary(item, itemMap)}
                                                                                style={{
                                                                                    position: 'absolute', right: _moderateScale(0), top: _moderateScale(0), width: _moderateScale(15), height: _moderateScale(15), backgroundColor: RED, borderRadius: _moderateScale(8), justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                                                                                }}>
                                                                                <View style={{ width: _moderateScale(8), height: _moderateScale(2), backgroundColor: WHITE }} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    )
                                                                })

                                                            }
                                                            <View style={{
                                                                paddingTop: _moderateScale(8),
                                                                paddingRight: _moderateScale(8),
                                                                marginRight: _moderateScale(8),
                                                                marginTop: _moderateScale(8)
                                                            }}>
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        pickImageDailyDiary(item)
                                                                    }}
                                                                    style={[styleElement.centerChild, {
                                                                        width: _moderateScale(8 * 11),
                                                                        height: _moderateScale(8 * 11),
                                                                        borderWidth: 1,
                                                                        borderRadius: _moderateScale(8),
                                                                        borderColor: BG_GREY_OPACITY_7,
                                                                        borderStyle: 'dashed'
                                                                    }]} key={index}>
                                                                    <Image style={[sizeIcon.lxlg, { opacity: 0.5 }]} source={require('../../Icon/plus_black.png')} />
                                                                </TouchableOpacity>

                                                            </View>

                                                        </View>
                                                        : <></>
                                                }



                                                <View style={{ height: _moderateScale(8 * 4) }} />

                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </View>

                        <View style={{ height: 50 }} />
                    </ScrollView>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>

            <ModalEditDescriptionDailyDiary
                confirmEditDescription={_handleConfirmEditDescription}
                hide={() => {
                    setShowModalEditDesDailyDiary({
                        show: false,
                        data: {}
                    })
                }}
                data={showModalEditDesDailyDiary?.data}
                show={showModalEditDesDailyDiary?.show} />

            <ModalPickSingleNotSearch
                hide={() => {
                    setShowModalPickScope(false)
                }}
                onSelect={(item) => {
                    setCurrScope(item)
                }}
                data={[
                    {
                        name: 'Công khai',
                        slug: 'PUBLIC'
                    },
                    {
                        name: 'Chỉ mình tôi',
                        slug: 'PRIVATE'
                    },
                ]} show={showModalPickScope} />

            {/* <StatusBarCustom /> */}
            <ImageView
                images={listImagesSeeCurr?.map(item => {
                    return {
                        uri: `${URL_ORIGINAL}${item?.link}`,
                    }
                })}
                onRequestClose={() => {
                    setShowImageViewing(false)
                }}
                imageIndex={indexCurrImageView}
                visible={showImageViewing}
            />

            <View style={styles.header}>
                <View style={{ width: _moderateScale(8 * 10) }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        hitSlop={styleElement.hitslopSm}>
                        <Image style={sizeIcon.lg} source={require('../../Icon/cancel.png')} />
                    </TouchableOpacity>
                </View>
                <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(16) }}>
                    Chỉnh sửa
                    </Text>
                <View style={{ width: _moderateScale(8 * 10), alignItems: 'flex-end' }}>
                    {
                        index == '0' ?
                            <TouchableOpacity
                                onPress={_handleUpdatePost}
                                style={[styles.btnConfirm, { backgroundColor: BLUE_FB, width: _moderateScale(8 * 9) }]}>
                                <Text style={{
                                    ...stylesFont.fontNolanBold,
                                    fontSize: _moderateScale(14),
                                    opacity: 1,
                                    color: WHITE
                                }}>
                                    Cập nhật
                        </Text>
                            </TouchableOpacity>
                            : <></>
                    }

                </View>
            </View>



            <TabView
                renderTabBar={() => { }}
                swipeEnabled={false}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

        </View>
    );
};

const styles = StyleSheet.create({
    btnSecret: {
        width: _moderateScale(8 * 16),
        height: _moderateScale(8 * 3),
        borderWidth: 1,
        borderColor: GREY,
        marginTop: _moderateScale(4),
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: _moderateScale(4),
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8)
    },
    avatar: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        borderRadius: _moderateScale(8 * 3)
    },
    btnConfirm: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 3.5),
        backgroundColor: BG_GREY_OPACITY_5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    header: {
        height: _moderateScale(8 * 6),
        borderBottomWidth: 2,
        borderColor: BG_GREY_OPACITY_5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    ///------start feed-----///
    itemFeed: {
        backgroundColor: WHITE,
        marginTop: _moderateScale(8),
        borderRadius: _moderateScale(8),
        paddingHorizontal: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8)

    },
    headOfFeed: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2)
    },
    leftOfHead: {
        flex: 1,
        flexDirection: 'row',
    },
    titOfFeed: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4)
    },
    titFeed: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    timeFeed: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(10)
    },
    moreFeed: {
        marginTop: _moderateScale(8)
    },
    contentFeed: {
        flex: 1
    },
    textFeed: {
        fontSize: _moderateScale(13),
        marginBottom: _moderateScale(8 * 2)
    },
    listImgFeed: {
        flexDirection: 'row'
    },
    itemImgFeed: {
        marginRight: _moderateScale(8),
        padding: _moderateScale(8),
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        borderRadius: _moderateScale(8),
        position: 'relative'
    },
    imgFeed: {
        width: _widthScale(8 * 8),
        height: _heightScale(8 * 8)
    },
    itemImgMore: {
        backgroundColor: MAIN_OPACITY_8,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: _moderateScale(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textMoreImg: {
        fontSize: _moderateScale(28),
        color: WHITE,
        ...stylesFont.fontNolan500
    },
    shareFeed: {
        flex: 1,
        marginTop: _moderateScale(8 * 3)
    },
    headShare: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titShare: {
        marginLeft: _moderateScale(4),
        color: BLUE_TITLE,
        ...stylesFont.fontNolan500
    },
    contentShare: {
        flexDirection: 'row',
        marginTop: _moderateScale(8)
    },
    imgShare: {
        width: _widthScale(8 * 6),
        height: _heightScale(8 * 6),
        marginRight: _moderateScale(8)
    },
    briefContentShare: {
        flex: 1,
    },
    titContentShare: {
        fontSize: _moderateScale(16),
        color: SECOND_COLOR,
        marginBottom: _moderateScale(4)
    },
    descriptionShare: {
        fontSize: _moderateScale(11),
        color: GREY_FOR_TITLE,
        fontStyle: 'italic'
    },
    actionFeed: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginTop: _moderateScale(8 * 2),
        paddingVertical: _moderateScale(8 * 1.5),
        borderColor: GREY
    },
    itemActionFeed: {
        flexDirection: 'row',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titAction: {
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(4)
    },

    ///-----end feed-----///

    ///-----start comment -----//
    listComment: {
        flex: 1,
        marginTop: _moderateScale(8 * 2)
    },
    itemComment: {
        flexDirection: 'row',
        marginBottom: _moderateScale(8 * 2),
    },
    childComment: {
        paddingLeft: _moderateScale(8 * 6)
    },
    leftItemComment: {
        flexDirection: 'row',
        flex: 1
    },
    descriptionOfComment: {
        paddingLeft: _moderateScale(6),
        paddingTop: _moderateScale(4),
        flex: 1
    },
    titComment: {
        color: BLUE_TITLE,
        fontSize: _moderateScale(14),
        ...stylesFont.fontNolanBold
    },
    contentComment: {
        color: GREY_FOR_TITLE,
        fontSize: _moderateScale(12),
    },
    ///-----end comment-----//
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 11
}


export default UpdatePost;
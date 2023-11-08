import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector, useDispatch } from "react-redux";
import { navigation } from '../../../rootNavigation';
import SocketInstance from '../../../SocketInstance';
import FastImage from '../../Components/Image/FastImage';
import { BASE_COLOR, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BG_GREY_OPACITY_7, BG_GREY_OPACITY_9, BLACK_OPACITY_8, GREY, GREY_FOR_TITLE, SECOND_COLOR, WHITE, BLACK, BLUE_FB } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon, sizeLogo } from '../../Constant/Icon';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { styleElement } from '../../Constant/StyleElement';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';
import * as ActionType from '../../Redux/Constants/ActionType';
import Store from "../../Redux/store";
import { _logout } from '../../Services/api';
import { handleApi } from '../../Services/utils';
import { partnerLevel } from '../../Constant/PartnerLevel';
import { find } from 'lodash'
import CalendarPickSingle from '../../Components/CalendarPickSingle/CalendarPickSingle'
import moment from 'moment';
import Button from '../../Components/Button/Button';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadModule } from '../../Redux/Action/BookingAction'
import { getPartnerByCollaboratorCode, updateProfilePartner } from '../../Redux/Action/ProfileAction';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { isEmpty } from 'lodash-es';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Collapsible from 'react-native-collapsible';
import { IconTick } from '../../Components/Icon/Icon';


const EditProfile = props => {
    const dispatch = useDispatch()

    const infoUserRedux = useSelector(state => state?.infoUserReducer?.infoUser)
    const scrollA = useRef(new Animated.Value(0)).current;
    const [gender, setGender] = useState('female');

    const [isShowGallery, setShowGallery] = useState(false)
    const [infoUser, setInfoUser] = useState({})
    const [showModalCalendar, setShowModalCalendar] = useState(false)

    const [codeAffiliate, setCodeAffiliate] = useState('')
    const [currPartnerCollab, setCurrPartnerCollab] = useState({})

    const _renderLevelImage = (code) => {

        switch (code) {
            case 'SILVER':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_bac.png')} />
                break;
            case 'GOLD':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_vang.png')} />
                break;
            case 'PLATINUM':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_bk.png')} />
                break;
            case 'VIP':
                return <Image style={[sizeIcon.xlllg]}
                    source={require('../../Image/component/rank_vip.png')} />
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (codeAffiliate?.length > 0) {
            _getPartnerInviter(codeAffiliate)
        }
    }, [codeAffiliate])

    const _getPartnerInviter = async (codeAffiliate) => {
        let result = await getPartnerByCollaboratorCode({
            collaboratorCode: codeAffiliate?.trim()
        })
        if (result?.isAxiosError) return setCurrPartnerCollab({})
        setCurrPartnerCollab(result?.data?.data)
    }


    useEffect(() => {
        setInfoUser(infoUserRedux)
    }, [infoUserRedux])


    const _handleConfirmPickDate = (date) => {

        setInfoUser(old => {
            return {
                ...old,
                birthday: moment(date).format()
            }
        })
        setShowModalCalendar(false)
    }

    const _handlePickImageAvatar = () => {
        ImagePicker.openPicker({
            // width: 300,
            // height: 400,
            width: _moderateScale(130 * 10),
            height: _moderateScale(160 * 10),
            cropping: true,
            multiple: false,
            mediaType: 'photo',
            compressImageQuality: 0.5
        }).then(async (image) => {
            console.log(image);
            let newImage = {
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime,
                type: image.mime,
                name: `${image.modificationDate}_${0}`,
                isLocal: true
            }

            setInfoUser(old => {
                return {
                    ...old,
                    fileAvatar: newImage
                }
            })

            if (!isEmpty(newImage)) {
                let listImages = [newImage]
                let resultUploadImage = await uploadModule({
                    moduleName: 'partner',
                    files: listImages
                })
                if (resultUploadImage.isAxiosError) return

                let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);

                dispatch(updateProfilePartner({ fileAvatar: listIdImageHasUpload[0] }))
            }

            // dispatch(employeeUpdateAvatar(newImage))
        });
    }

    const _handleChangeInput = (code, val) => {
        setInfoUser(old => {
            return {
                ...old,
                [code]: val
            }
        })
    }

    const _handleChangeInputIdCard = (code, val) => {
        setInfoUser(old => {
            return {
                ...old,
                idCard: {
                    ...old.idCard,
                    [code]: val
                }
            }
        })
    }

    const _handleChangeInputEmail = (val) => {
        setInfoUser(old => {
            return {
                ...old,
                email: [
                    val,
                    ...old.email.filter((item, ind) => ind > 0)
                ]
            }
        })
    }

    const _handleChangeInputAddress = (val) => {
        setInfoUser(old => {
            return {
                ...old,
                address: [
                    {
                        fullAddress: val
                    },
                    ...old.address.filter((item, ind) => ind > 0)
                ]
            }
        })
    }

    const _updateInfo = async () => {

        var data = {
            "name": infoUser?.name,
            "email": infoUser?.email,
            "gender": infoUser?.gender,
            "address": infoUser?.address,
            "idCard": infoUser?.idCard,
            // "birthday": infoUser?.birthday,
            "profession": infoUser?.profession,
            "nationality": infoUser?.nationality,
            "ethnicity": infoUser?.ethnicity,
            // "inviterCode": codeAffiliate?.trim()
        }

        if (codeAffiliate?.trim()?.length > 0) {
            data.inviterCode = codeAffiliate?.trim()
        }

        // if(infoUser?.fileAvatar?.isLocal === true)
        // {
        //     let listImages = [infoUser?.fileAvatar]
        //     let resultUploadImage = await uploadModule({
        //         moduleName: 'partner',
        //         files: listImages
        //     })
        //     if (resultUploadImage.isAxiosError) return

        //     let listIdImageHasUpload = resultUploadImage?.data?.data.map(item => item._id);
        //     data.fileAvatar = listIdImageHasUpload[0]
        // }


        dispatch(updateProfilePartner(data))

    }


    return (
        <View style={styles.container}>
            {/* <StatusBarCustom /> */}
            <CalendarPickSingle
                isMin={true}
                confirm={_handleConfirmPickDate}
                setShowModalCalendar={(flag) => {
                    setShowModalCalendar(flag)
                }} show={showModalCalendar} />

            <Animated.ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollA } } }],
                    { useNativeDriver: true },
                )}
                scrollEventThrottle={16}>
                <View style={[styles.bannerContainer]}>
                    <Animated.Image
                        resizeMode={'contain'}
                        style={[styles.banner(scrollA),]}
                        source={require('../../NewImage/banner2Color.png')}
                    />
                    <View style={{
                        position: 'absolute',
                        top: _moderateScale(520),
                        width: "100%"
                    }}>
                        <View style={[styleElement.rowAliCenter,
                        {
                            justifyContent: 'space-between',
                            paddingHorizontal: _moderateScale(8 * 2),
                            marginTop: _moderateScale(8 * 2),
                        }]}>

                            <TouchableOpacity
                                hitSlop={styleElement.hitslopSm}
                                onPress={() => navigation.goBack()}>
                                <Image style={[sizeIcon.llg]} source={require('../../Icon/back_left_white.png')} />
                            </TouchableOpacity>

                            <Image
                                style={[sizeLogo.xl]}
                                source={require('../../NewImage/logoCenter.png')}
                            />
                            <View style={{ opacity: 0 }}>
                                <TouchableOpacity
                                    disabled
                                    onPress={() => navigation.goBack()}>
                                    <Image style={[sizeIcon.llg]} source={require('../../Icon/back_left_white.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.coverTop]}>

                            <View style={styles.bannerProfile}>
                                <View style={{ position: 'relative' }}>
                                    <TouchableOpacity onPress={() => {
                                        setShowGallery(true)
                                    }}>
                                        {infoUser?.fileAvatar?.isLocal === true ?
                                            <>
                                                <FastImage
                                                    style={[styles.bannerProfile__avatar]}
                                                    uri={infoUser?.fileAvatar?.uri ? `${infoUser?.fileAvatar?.uri}` : URL_AVATAR_DEFAULT}
                                                /></>
                                            :
                                            <FastImage
                                                style={[styles.bannerProfile__avatar]}
                                                uri={infoUserRedux?.fileAvatar?.link ? `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}` : URL_AVATAR_DEFAULT}
                                            />}

                                    </TouchableOpacity>

                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        backgroundColor: WHITE,
                                        borderWidth: 1,
                                        borderColor: SECOND_COLOR,
                                        width: _moderateScale(24),
                                        height: _moderateScale(24),
                                        borderRadius: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        zIndex: 100
                                    }}>
                                        <TouchableOpacity
                                            hitSlop={styleElement.hitslopSm}
                                            onPress={() => _handlePickImageAvatar()}>
                                            <Image style={sizeIcon.xxs} source={require('../../Icon/camera_blue.png')} />

                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View style={styles.bannerProfile__nameAndJob}>
                                    <Text style={[stylesFont.fontNolanBold, styles.bannerProfile__nameAndJob__name]}>
                                        {
                                            `${infoUserRedux?.name} `
                                        }
                                    </Text>
                                    <Text style={[stylesFont.fontNolan500, styles.bannerProfile__nameAndJob__job, { opacity: 0.9 }]}>
                                        {
                                            `${infoUserRedux?.fullPhone[0]}`
                                        }
                                    </Text>
                                    <View style={[styles.ranking]}>

                                        {_renderLevelImage(infoUserRedux?.levelCode)}

                                        <Text style={{
                                            ...stylesFont.fontNolanBold,
                                            marginLeft: _moderateScale(8),
                                            fontSize: _moderateScale(20),
                                            color: WHITE
                                        }}>{find(partnerLevel, { code: infoUserRedux?.levelCode })?.name}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>

                {!infoUserRedux?.fileAvatar?.link ?

                    <ImageView
                        images={[{ uri: URL_AVATAR_DEFAULT }]}
                        onRequestClose={() => {
                            setShowGallery(false)
                        }}
                        imageIndex={0}
                        visible={isShowGallery} />
                    :
                    <ImageView
                        images={[`${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}`].map(item => {
                            return {
                                uri: item,
                            }
                        })}
                        onRequestClose={() => {
                            setShowGallery(false)
                        }}
                        imageIndex={0}
                        visible={isShowGallery} />
                }



                <View style={{
                    backgroundColor: WHITE,
                    flex: 1,
                    paddingBottom: _moderateScale(16),
                    marginTop: _moderateScale(12)
                }}>
                    <View style={styles.wave} />
                    <View style={styles.absoluteTitle}>
                        <Image style={[sizeIcon.lg, { marginRight: _moderateScale(16) }]} source={require('../../NewIcon/user.png')} />
                        <Text style={[stylesFont.fontNolanBold,
                        { color: BASE_COLOR }]}>CHỈNH SỬA THÔNG TIN</Text>
                    </View>
                    <KeyboardAwareScrollView>

                        <View style={[styles.main]}>

                            <View style={[styles.containTitle]}>
                                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Mã giới thiệu
                                </Text>
                            </View>
                            <View style={[styles.rowContent]}>
                                <TextInput
                                    value={codeAffiliate}
                                    onChangeText={(content) => {
                                        setCodeAffiliate(content.toUpperCase())
                                    }}
                                    placeholder={`Nhập mã giới thiệu`}
                                    style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]}
                                />
                            </View>

                            <Collapsible collapsed={currPartnerCollab?._id ? false : true}>
                                <View style={{ marginLeft: _moderateScale(8 * 2), padding: _moderateScale(8 * 2), paddingBottom: 0, ...styleElement.rowAliCenter }}>
                                    <Text style={{ marginRight: _moderateScale(8) }}>
                                        Tìm thấy người giới thiệu: <Text style={{ fontWeight: 'bold' }}>{currPartnerCollab?.name}</Text>
                                    </Text>
                                    <IconTick style={sizeIcon.sm} />
                                </View>
                            </Collapsible>

                            <View style={[styles.containTitle]}>
                                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Họ tên
                                </Text>
                            </View>
                            <View style={[styles.rowContent]}>
                                <TextInput
                                    value={infoUser?.name}
                                    onChangeText={(value) => {
                                        _handleChangeInput('name', value)
                                    }}
                                    placeholder={`Nguyen Van Khanh`} style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]} />
                            </View>

                            <View style={[styles.containTitle]}>
                                <Text type="number" style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Điện thoại:
                                </Text>
                            </View>
                            <View style={[styles.rowContent]}>
                                <TextInput value={`${infoUserRedux?.fullPhone[0]}`} style={[styles.inputElement, styles.inputDisableElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]}
                                    editable={false} selectTextOnFocus={false} />
                            </View>

                            <View style={[styles.containTitle]}>
                                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Email
                                </Text>
                            </View>
                            <View style={[styles.rowContent]}>
                                <TextInput
                                    value={infoUser?.email?.length > 0 ? infoUser?.email[0] : ''}
                                    onChangeText={(value) => {
                                        _handleChangeInputEmail(value)
                                    }}
                                    placeholderTextColor={BG_GREY_OPACITY_9}
                                    placeholder={`******@gmail.com`} style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]} />
                            </View>

                            <View style={[styles.containTitle]}>
                                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Địa chỉ:
                                </Text>
                            </View>
                            <View style={[styles.rowContent]}>
                                <TextInput
                                    value={infoUser?.address?.length > 0 ? infoUser?.address[0]?.fullAddress : ''}
                                    onChangeText={(value) => {
                                        _handleChangeInputAddress(value)
                                    }}
                                    placeholder={`434, Đường Cao thắng, Phường 12, Quận 10, Hồ Chí Minh`} style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]} />
                            </View>

                            <View style={[styles.containTitle]}>
                                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Sinh nhật:
                                </Text>
                            </View>
                            <View style={[styles.rowContent]}>
                                <TouchableOpacity onPress={() => {
                                    setShowModalCalendar(true)
                                }}>
                                    <Text style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14), color: GREY }]}>
                                        {
                                            infoUser?.birthday ?
                                                moment(infoUser?.birthday).format('DD/MM/YYYY')
                                                :
                                                `Chọn ngày`
                                        }
                                    </Text>
                                </TouchableOpacity>
                                {/* <TextInput placeholder={`01/01/1990`} style={[styles.inputElement]}/> */}
                            </View>
                            <View style={[styles.containTitle]}>
                                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Giới tính:
                                </Text>
                            </View>
                            <View style={[styles.rowContent, styles.rowGender]}>
                                <TouchableOpacity onPress={() => _handleChangeInput('gender', 'male')}>
                                    <View style={[styles.btnGender, infoUser?.gender === 'male' ? styles.activeGender : '']}>
                                        <Text style={[infoUser?.gender === 'male' ? styles.activeTxtGender : '']}>Nam</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => _handleChangeInput('gender', 'female')}>
                                    <View style={[styles.btnGender, infoUser?.gender === 'female' ? styles.activeGender : '']}>
                                        <Text style={[infoUser?.gender === 'female' ? styles.activeTxtGender : '']}>Nữ</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.containTitle]}>
                                <Text style={[stylesFont.fontNolanBold, styles.titleMain]}>
                                    Thông tin bổ sung:
                                </Text>
                            </View>
                            <View style={[styles.rowContent, styles.rowSecond]}>
                                <Text style={[stylesFont.fontNolan, styles.titleSecond]}>
                                    Căn cước / CMND:
                                </Text>
                                <TextInput
                                    value={infoUser?.idCard?.idNumber}
                                    onChangeText={(value) => {
                                        _handleChangeInputIdCard('idNumber', value)
                                    }}
                                    placeholderTextColor={BG_GREY_OPACITY_9}
                                    placeholder={`32198372918`} style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]} />
                            </View>

                            <View style={[styles.rowContent, styles.rowSecond]}>
                                <Text style={[stylesFont.fontNolan, styles.titleSecond]}>
                                    Nghề nghiệp:
                                </Text>
                                <TextInput
                                    placeholderTextColor={BG_GREY_OPACITY_9}
                                    value={infoUser?.profession}
                                    onChangeText={(value) => {
                                        _handleChangeInput('profession', value)
                                    }}
                                    placeholder={`Bác sĩ`} style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]} />
                            </View>
                            <View style={[styles.rowContent, styles.rowSecond]}>
                                <Text style={[stylesFont.fontNolan, styles.titleSecond]}>
                                    Quốc tịch:
                                </Text>
                                <TextInput
                                    placeholderTextColor={BG_GREY_OPACITY_9}
                                    value={infoUser?.nationality}
                                    onChangeText={(value) => {
                                        _handleChangeInput('nationality', value)
                                    }}
                                    placeholder={`Việt nam`} style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]} />
                            </View>

                            <View style={[styles.rowContent, styles.rowSecond]}>
                                <Text style={[stylesFont.fontNolan, styles.titleSecond]}>
                                    Dân tộc:
                                </Text>
                                <TextInput
                                    placeholderTextColor={BG_GREY_OPACITY_9}
                                    value={infoUser?.ethnicity}
                                    onChangeText={(value) => {
                                        _handleChangeInput('ethnicity', value)
                                    }}
                                    placeholder={`Không`} style={[styles.inputElement, { ...stylesFont.fontNolan500, color: BLUE_FB }]} />
                            </View>
                        </View>



                        <View style={{ height: 100 }} />

                    </KeyboardAwareScrollView>
                </View>
            </Animated.ScrollView>

            {/* <View style={{ width: _moderateScale(240), alignSelf: 'center', marginBottom: getBottomSpace() + _moderateScale(8), marginTop: _moderateScale(8) }}>
                <Button.ButtonPrimary pressAction={() => _updateInfo()}
                    text={`Cập nhật`} height={36} />
            </View> */}

            <TouchableOpacity
                onPress={() => {
                    _updateInfo()
                }}
                style={[{
                    height: _moderateScale(8 * 5),
                    backgroundColor: WHITE,
                    marginHorizontal: _moderateScale(8 * 3),
                    borderRadius: _moderateScale(8),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: BASE_COLOR,
                    marginVertical: _moderateScale(8),
                    marginBottom: getBottomSpace() + _moderateScale(8)
                }]}>
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.6, 1]}
                    colors={[
                        BASE_COLOR,
                        '#8c104e',
                        '#db0505',
                    ]}
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: _moderateScale(8),
                    }} />

                <Text style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(16), color: WHITE }]}>
                    Cập nhật
                </Text>
            </TouchableOpacity>

        </View>

    );
};

const styles = StyleSheet.create({

    btnLogOut: {
        marginRight: _widthScale(8 * 4),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(4)
    },
    bannerProfile__nameAndJob__job: {
        fontSize: _moderateScale(16),
        color: WHITE
    },
    bannerProfile__nameAndJob__name: {
        fontSize: _moderateScale(20),
        color: WHITE
    },
    bannerProfile__nameAndJob: {
        marginLeft: _widthScale(8 * 2),
        marginBottom: _heightScale(8 * 6),
        flex: 1,
    },
    bannerProfile__avatar: {
        width: _moderateScale(90),
        height: _moderateScale(90),
        borderRadius: _moderateScale(120),
        borderWidth: _moderateScale(2),
        borderColor: WHITE,
    },
    bannerProfile: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        maxWidth: _moderateScale(336),
        alignSelf: 'center',
        height: _moderateScale(8 * 12 + 24),
        backgroundColor: BG_GREY_OPACITY_2,
        borderRadius: _moderateScale(16),
        padding: _moderateScale(16),
    },
    coverTop: {
        height: '100%',
        justifyContent: 'flex-start',
        paddingTop: _moderateScale(8 * 2),
    },
    container: {
        flex: 1,
        backgroundColor: WHITE
    },
    ranking: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: _moderateScale(10)
    },
    bannerContainer: {
        marginTop: -_moderateScale(500),
        paddingTop: _moderateScale(500),
        alignItems: 'center',
        overflow: 'hidden',
    },
    banner: scrollA => ({
        height: _moderateScale(300),
        // width: 100%, 
        transform: [
            {
                translateY: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    outputRange: [-_moderateScale(300) / 2, 0, _moderateScale(300) * 0.75, _moderateScale(300) * 0.75],
                }),
            },
            {
                scale: scrollA.interpolate({
                    inputRange: [-_moderateScale(300), 0, _moderateScale(300), _moderateScale(300) + 1],
                    // outputRange: [2, 1, 0.5, 0.5],
                    outputRange: [2, 1, 1, 1],
                }),
            },
        ],
    }),
    wave: {
        width: "100%",
        height: _moderateScale(8 * 4),
        backgroundColor: WHITE,
        borderTopStartRadius: _moderateScale(8 * 3),
        borderTopEndRadius: _moderateScale(8 * 3),
        position: 'absolute',
        top: -_moderateScale(8 * 4 - 1)
    },
    containTitle: {
        paddingHorizontal: _moderateScale(8 * 2),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: _moderateScale(8 * 3)
    },
    titleMain: {
        fontSize: _moderateScale(16),
        color: GREY_FOR_TITLE,
        marginLeft: _moderateScale(8 * 2)
    },
    absoluteTitle: {
        position: 'absolute',
        top: _moderateScale(-8 * 6),
        backgroundColor: WHITE,
        alignSelf: 'center',
        minWidth: _moderateScale(320),
        height: _moderateScale(8 * 4.5),
        borderWidth: 1,
        borderColor: WHITE,
        borderRadius: _moderateScale(32),
        shadowColor: GREY,
        alignItems: 'center',
        paddingHorizontal: _moderateScale(16),
        flexDirection: 'row',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    rowContent: {
        marginHorizontal: _moderateScale(8 * 4),
        marginTop: _moderateScale(8 * 2),
    },
    inputElement: {
        borderWidth: 0.5,
        borderColor: GREY,
        // height:_moderateScale(32),
        borderRadius: _moderateScale(16),
        paddingHorizontal: _moderateScale(16),
        color: GREY,
        paddingVertical: _moderateScale(8),
        color: BLACK
    },
    inputDisableElement: {
        backgroundColor: BG_GREY_OPACITY_2
    },
    rowGender: {
        flexDirection: 'row',
        paddingBottom: _moderateScale(8),
    },
    btnGender: {
        borderWidth: 0.5,
        borderRadius: _moderateScale(4),
        borderColor: GREY,
        padding: _moderateScale(8),
        minWidth: _moderateScale(80),
        marginRight: _moderateScale(8),
        alignItems: 'center',
    },
    activeGender: {
        backgroundColor: SECOND_COLOR,
        borderColor: SECOND_COLOR
    },
    activeTxtGender: {
        color: WHITE
    },
    rowSecond: {
        marginTop: 0
    },
    titleSecond: {
        marginTop: _moderateScale(8 * 2),
        marginBottom: _moderateScale(4),
        color: GREY_FOR_TITLE
    }
})


const gradient = {
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    color: [
        'rgba(104, 47, 144,1)',
        'rgba(104, 47, 144,.9)',
        'rgba(104, 47, 144,.7)',
        'rgba(104, 47, 144,.4)'
    ]
}


export default EditProfile;
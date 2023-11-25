import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { _heightScale, _moderateScale, _width, _widthScale } from '../../Constant/Scale'
import LinearGradient from 'react-native-linear-gradient'
import LeftEye from './Components/LeftEye'
import RightEye from './Components/RightEye'
import { BLACK, GREY_FOR_TITLE, WHITE } from '../../Constant/Color'
import RecomendService from './Components/RecomendService'
import RecomendDoctor from './Components/RecomendDoctor'
import RecomendBrach from './Components/RecomendBrach'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { isEmpty } from 'lodash'
import ImageEditor from "@react-native-community/image-editor";
import { Platform } from 'react-native'
import { useDispatch } from 'react-redux'
import { getBranchsByResEye, getDoctorsByResEye, getServicesByResEye } from '@Redux/resultcanningeyes/actions'
import Header from '@Components/NewHeader/Header'
import Screen from '@Components/Screen'
import Column from '@Components/Column'

const ResultAIScanEyes = (props) => {

    const dispatch = useDispatch()

    const { scanningResult, imageScan } = props?.route?.params
    const [croppedLeftEyeImage, setCroppedLeftEyeImage] = useState({
        uri: null,
        width: null,
        height: null,
        ratio: null,
        boxEyelid: null,
        boxFatBag: null,
    })
    const [croppedRightEyeImage, setCroppedRightEyeImage] = useState({
        uri: null,
        width: null,
        height: null,
        ratio: null,
        boxEyelid: null,
        boxFatBag: null,
    })

    useEffect(() => {
        if (!isEmpty(scanningResult) && !isEmpty(imageScan)) {
            dispatch(getServicesByResEye.request({
                condition: {
                    "codeGroup": { "equal": "MAT" }
                }
            }))
            dispatch(getDoctorsByResEye.request({}))
            dispatch(getBranchsByResEye.request({}))
            cropLeftEyeImage()
            cropRightEyeImage()
        }
    }, [scanningResult, imageScan])


    const cropLeftEyeImage = async () => {
        const { left: { coordinate_fat_bag_box, coordinate_eyelid_boxs, eye_area_top_left_crop, eye_area_bottom_right_crop } } = scanningResult
        try {
            const imagePath = Platform?.OS == 'ios' ? imageScan : `file://${imageScan}` // Thay đổi thành đường dẫn thực tế của bạn
            const cropData = {
                offset: { x: eye_area_top_left_crop[1], y: eye_area_top_left_crop[0] }, // Thay Xmin, Ymin bằng toạ độ thực tế của bạn
                size: { width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1], height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0] }, // Thay Xmax, Ymax bằng toạ độ thực tế của bạn
            };
            const newImagePath = await ImageEditor.cropImage(imagePath, cropData);
            setCroppedLeftEyeImage({
                uri: newImagePath,
                width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1],
                height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0],
                ratio: (eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1]) / (eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0]),
                boxEyelid: coordinate_eyelid_boxs?.length > 0 ? {
                    point1: {
                        x: coordinate_eyelid_boxs[0][0],
                        y: coordinate_eyelid_boxs[0][1]
                    },
                    point2: {
                        x: coordinate_eyelid_boxs[0][2],
                        y: coordinate_eyelid_boxs[0][1]
                    },
                    point3: {
                        x: coordinate_eyelid_boxs[0][2],
                        y: coordinate_eyelid_boxs[0][3]
                    },
                } : null,
                boxFatBag: coordinate_fat_bag_box?.length > 0 ? {
                    point1: {
                        x: coordinate_fat_bag_box[0],
                        y: coordinate_fat_bag_box[1]
                    },
                    point2: {
                        x: coordinate_fat_bag_box[2],
                        y: coordinate_fat_bag_box[1]
                    },
                    point3: {
                        x: coordinate_fat_bag_box[2],
                        y: coordinate_fat_bag_box[3]
                    },
                } : null
            });
        } catch (error) {
            console.error(error);
        }
    };
    const cropRightEyeImage = async () => {
        const { right: { coordinate_fat_bag_box, coordinate_eyelid_boxs, eye_area_top_left_crop, eye_area_bottom_right_crop } } = scanningResult
        try {
            const imagePath = Platform?.OS == 'ios' ? imageScan : `file://${imageScan}` // Thay đổi thành đường dẫn thực tế của bạn
            const cropData = {
                offset: { x: eye_area_top_left_crop[1], y: eye_area_top_left_crop[0] }, // Thay Xmin, Ymin bằng toạ độ thực tế của bạn
                size: { width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1], height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0] }, // Thay Xmax, Ymax bằng toạ độ thực tế của bạn
            };
            const newImagePath = await ImageEditor.cropImage(imagePath, cropData);
            setCroppedRightEyeImage({
                uri: newImagePath,
                width: eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1],
                height: eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0],
                ratio: (eye_area_bottom_right_crop[1] - eye_area_top_left_crop[1]) / (eye_area_bottom_right_crop[0] - eye_area_top_left_crop[0]),
                boxEyelid: coordinate_eyelid_boxs?.length > 0 ? {
                    point1: {
                        x: coordinate_eyelid_boxs[0][0],
                        y: coordinate_eyelid_boxs[0][1]
                    },
                    point2: {
                        x: coordinate_eyelid_boxs[0][2],
                        y: coordinate_eyelid_boxs[0][1]
                    },
                    point3: {
                        x: coordinate_eyelid_boxs[0][2],
                        y: coordinate_eyelid_boxs[0][3]
                    },
                } : null,
                boxFatBag: coordinate_fat_bag_box?.length > 0 ? {
                    point1: {
                        x: coordinate_fat_bag_box[0],
                        y: coordinate_fat_bag_box[1]
                    },
                    point2: {
                        x: coordinate_fat_bag_box[2],
                        y: coordinate_fat_bag_box[1]
                    },
                    point3: {
                        x: coordinate_fat_bag_box[2],
                        y: coordinate_fat_bag_box[3]
                    },
                } : null
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Screen style={styles.container}>
            <Header
                titleColor={BLACK}
                barStyle={'dark-content'}
                bg={WHITE}
                title={"Kết quả phân tích"} />
            <ScrollView>
                <Column gap={8 * 2} style={styles.overView}>
                    <LinearGradient
                        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        colors={['#B9DDF5', '#74BAEB', "#74BAEB"]}
                    />
                    <View style={styles.overView__box}>
                        <LeftEye scanningResult={scanningResult} croppedLeftEyeImage={croppedLeftEyeImage} />
                    </View>
                    <View style={[styles.overView__box]}>
                        <RightEye scanningResult={scanningResult} croppedRightEyeImage={croppedRightEyeImage} />
                    </View>
                </Column>
                <Column gap={8}>
                    <RecomendService />
                    <RecomendDoctor />
                    <RecomendBrach />
                </Column>

                <View style={{ height: 500 }} />
            </ScrollView>
        </Screen>
    )
}

export default ResultAIScanEyes

const styles = StyleSheet.create({
    dot: {
        width: _moderateScale(8),
        height: _moderateScale(8),
        borderRadius: _moderateScale(4),
        backgroundColor: '#28A745',
        marginRight: _moderateScale(4)
    },
    overView__box__leftEye: {
        width: _moderateScale(8 * 14),
        height: _moderateScale(8 * 14),
        borderRadius: _moderateScale(8 * 2)
    },
    overView__box: {
        width: _widthScale(350),
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: _moderateScale(8 * 2),
        paddingBottom: _moderateScale(8 * 2)
    },
    overView: {
        width: _width,
        paddingTop: _moderateScale(8 * 4),
        paddingBottom: _moderateScale(8 * 2)
    },
    container: {
        flex: 1,
        backgroundColor: '#F4F9FD'
    }
})

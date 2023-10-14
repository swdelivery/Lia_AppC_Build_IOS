import { isEmpty } from 'lodash';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import FastImage from '../../Components/Image/FastImage';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from '../../Constant/Url';


const ModalShowListUserHasSeenMessage = props => {


    return (
        <Modal style={{
            margin: 0,
            alignItems: "center",
            justifyContent: 'flex-end'
        }}
            animationIn='fadeInUp'
            animationOut='fadeOutDown'
            animationInTiming={150}
            animationOutTiming={500}
            isVisible={props.isShowModalListUserHasSeenMessage}
            useNativeDriver={true}
            coverScreen={Platform.OS == "ios" ? false : true}
            onBackButtonPress={() => {
                props.closeModalListUserHasSeenMessage()
            }}
            onBackdropPress={() => {
                props.closeModalListUserHasSeenMessage()
            }}>
            <View style={styles.modalFilter}>
                <Text style={[stylesFont.fontNolan500, { color: Color.GREY_FOR_TITLE, fontSize: _moderateScale(16), alignSelf: 'center' }]}>
                    Danh sách đã xem
                </Text>
                {/* {
                    console.log(props)
                } */}
                {
                    !isEmpty(props?.data) ?
                        <>
                            {
                                props.data.map((itemViewer, indexViewer) => {
                                    console.log({ itemViewer });

                                    return (
                                        <View
                                            style={{ marginTop: _moderateScale(8), flexDirection: 'row', alignItems: 'center' }}
                                            key={indexViewer}>
                                            <FastImage
                                                style={[{
                                                    width: _moderateScale(8 * 5),
                                                    height: _moderateScale(8 * 5),
                                                    borderRadius: _moderateScale(8 * 5 / 2)
                                                }]}
                                                uri={
                                                    itemViewer?.profile?.fileAvatar?.link ?
                                                        `${URL_ORIGINAL}${itemViewer?.profile?.fileAvatar?.link}`
                                                        :
                                                        URL_AVATAR_DEFAULT
                                                } />
                                            <Text style={[stylesFont.fontNolan500, { color: Color.GREY_FOR_TITLE, marginLeft: _moderateScale(8) }]}>
                                                {`${itemViewer.profile.firstName} ${itemViewer.profile.lastName}`}
                                            </Text>
                                        </View>
                                    )
                                })
                            }
                        </>
                        :
                        <>
                        </>
                }
            </View>


        </Modal>
    );
};

const styles = StyleSheet.create({
    modalFilter: {
        width: "100%",
        // paddingVertical: _heightScale(30),
        paddingTop: _heightScale(20),
        paddingBottom: _heightScale(50),
        backgroundColor: Color.WHITE,
        paddingHorizontal: _widthScale(23),
        borderTopStartRadius: _widthScale(10),
        borderTopEndRadius: _widthScale(10)
    },
})

export default ModalShowListUserHasSeenMessage;
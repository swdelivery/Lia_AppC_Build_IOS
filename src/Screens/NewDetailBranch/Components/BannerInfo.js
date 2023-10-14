import { Image, StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import { sizeIcon } from '../../../Constant/Icon'
import IconLink from '../../../SGV/link.svg'
import { styleText } from '../../../Constant/StyleText'
import { styleElement } from '../../../Constant/StyleElement'
import CountStar2 from '../../../Components/NewCountStar/CountStar'
import Certificate from '../../../Components/Certificate/Certificate'

const BannerInfo = memo(() => {
    return (
        <View style={styles.bannerInfo}>
            <View style={styles.bannerInfo__box_avatar_branch}>
                <Image
                    style={styles.bannerInfo__avatarBranch}
                    source={{
                        uri: `https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiZjgxYWIyZTctMGZlZi00YmU2LTZhNmItODI5MWI4YWExZTAwIn0/wp-content/uploads/2023/06/photo.png`
                    }} />
            </View>

            <Text style={styles.nameBranch}>LiA Beauty - Trung Tâm Thẩm Mĩ Hàng đầu Việt Nam</Text>

            <View style={{
                flexDirection: 'row',
                marginTop: _moderateScale(8)
            }}>
                <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
                    <Certificate larger bg={"black"} name={"Phòng khám"} />
                </View>
                <View style={{ width: 8 }} />
                <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
                    <Certificate larger name={"Giấy phép"} />
                </View>
                <View style={{ width: 8 }} />
                <View style={{ borderWidth: 1, borderColor: 'white', borderRadius: 4 }}>
                    <Certificate larger bg={"blue"} name={"Lorem ipsum"} />
                </View>

            </View>
            <View style={{ height: 8 }} />

            <CountStar2 lightContent larger />
            <View style={{ height: 8 }} />


            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.opentime__text}>
                    Mở cửa
                </Text>
                <View style={{ width: 8 }} />
                <Text style={[styles.opentime__text, { fontWeight: 'bold' }]}>
                    8:00 - 18:00
                </Text>
            </View>
            <View style={{ height: 4 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image style={sizeIcon.lg} source={require('../../../Image/locationRed.png')} />
                <View style={{ width: 8 }} />
                <Text style={[styles.opentime__text, { fontWeight: 'bold' }]}>
                    434 Cao thắng phường 12 quận 10, TPHCM
                </Text>
            </View>
            <View style={{ height: 8 }} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconLink
                    width={_moderateScale(8 * 3)}
                    height={_moderateScale(8 * 3)}
                />
                <View style={{ width: 8 }} />
                <Text style={[styles.opentime__text, { fontWeight: '500', textDecorationLine: 'underline' }]}>
                    https://liabeauty.vn/phau-thuat/sua-mui/
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconLink
                    width={_moderateScale(8 * 3)}
                    height={_moderateScale(8 * 3)}
                />
                <View style={{ width: 8 }} />
                <Text style={[styles.opentime__text, { fontWeight: '500', textDecorationLine: 'underline' }]}>
                    https://liabeauty.vn/phau-thuat/nhan-mi-mat/
                </Text>
            </View>
            <View style={{ height: _moderateScale(8*2) }} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.opentime__text, { fontWeight: 'bold' }]}>
                    Đảm bảo:
                </Text>
                <View style={{ width: _moderateScale(8*2) }} />
                <View style={[styleElement.rowAliCenter]}>
                    <Image style={sizeIcon.md} source={require('../../../Image/ticked.png')}/>
                    <Text style={styleText.textWhiteSmall500}>An toàn</Text>
                </View>
                <View style={{ width: _moderateScale(8) }} />

                <View style={[styleElement.rowAliCenter]}>
                    <Image style={sizeIcon.md} source={require('../../../Image/ticked.png')}/>
                    <Text style={styleText.textWhiteSmall500}>Chuyên môn</Text>
                </View>
                <View style={{ width: _moderateScale(8) }} />

                <View style={[styleElement.rowAliCenter]}>
                    <Image style={sizeIcon.md} source={require('../../../Image/ticked.png')}/>
                    <Text style={styleText.textWhiteSmall500}>Kinh nghiệm</Text>
                </View>
            </View>

        </View>
    )
})

export default BannerInfo

const styles = StyleSheet.create({
    opentime__text: {
        fontSize: _moderateScale(12),
        color: 'white'
    },
    bannerInfo__box_avatar_branch: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: _moderateScale(8 * 8 / 2),
        borderBottomRightRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        right: _moderateScale(8 * 2),
        top: -_moderateScale(8 * 3)

    },
    bannerInfo__avatarBranch: {
        width: _moderateScale(8 * 6),
        height: _moderateScale(8 * 6),
        resizeMode: 'contain',
        backgroundColor: 'white',
        borderRadius: _moderateScale(8 * 6) / 2

    },
    nameBranch: {
        fontSize: _moderateScale(16),
        color: '#F5DDB0',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        width: _widthScale(260)
    },
    bannerInfo: {
        width: _width,
        borderWidth: 1,
        padding: _moderateScale(8 * 2),
        backgroundColor: '#1F1810',
        paddingBottom:_moderateScale(8*5)
    }
})
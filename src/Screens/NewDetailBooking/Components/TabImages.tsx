import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, BLACK, BORDER_COLOR, GREY } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const TabImages = () => {


    return (
        <View style={styles.container}>
            <Column gap={8*2}>
                <View style={styles.title}>
                    <Text weight='bold' color={BASE_COLOR} >Cắt Mí T-2023</Text>
                </View>

                <Row gap={8 * 2} paddingHorizontal={8 * 2}>
                    <View style={[styleElement.flex, styleElement.centerChild]}>
                        <Image
                            style={styles.avatarPartner}
                            source={{ uri: `https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg` }}
                        />
                        <Text fontStyle='italic' marginTop={8}>
                            Ảnh trước điều trị
                        </Text>
                    </View>

                    <View style={[styleElement.flex, styleElement.centerChild]}>
                        <Image
                            style={styles.avatarPartner}
                            source={{ uri: `https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg` }}
                        />
                        <Text fontStyle='italic' marginTop={8}>
                            Ảnh sau điều trị
                        </Text>
                    </View>
                </Row>
            </Column>

            <Column gap={8*2}>
                <View style={styles.title}>
                    <Text weight='bold' color={BASE_COLOR} >Cắt Mí T-2023</Text>
                </View>

                <Row gap={8 * 2} paddingHorizontal={8 * 2}>
                    <View style={[styleElement.flex, styleElement.centerChild]}>
                        <Image
                            style={styles.avatarPartner}
                            source={{ uri: `https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg` }}
                        />
                        <Text fontStyle='italic' marginTop={8}>
                            Ảnh trước điều trị
                        </Text>
                    </View>

                    <View style={[styleElement.flex, styleElement.centerChild]}>
                        <Image
                            style={styles.avatarPartner}
                            source={{ uri: `https://studiovietnam.com/wp-content/uploads/2021/07/chup-anh-chan-dung-troi-nang-6.jpg` }}
                        />
                        <Text fontStyle='italic' marginTop={8}>
                            Ảnh sau điều trị
                        </Text>
                    </View>
                </Row>
            </Column>


            <View style={{ height: 200 }} />
        </View>
    )
}

export default TabImages


const styles = StyleSheet.create({
    avatarPartner: {
        width: '100%',
        height: _moderateScale(8 * 25),
        borderRadius: 8
    },
    timeStatus: {
        color: BLACK,
        fontStyle: 'italic'
    },
    dotNumber: {
        width: _moderateScale(8 * 3),
        height: _moderateScale(8 * 3),
        borderRadius: _moderateScale(8 * 3 / 2),
        backgroundColor: GREY,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainBill: {
        padding: _moderateScale(8 * 2),
    },
    bill: {
        justifyContent: 'space-between'
    },
    itemService: {
        padding: _moderateScale(8 * 2),
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR
    },
    avatarService: {
        width: _moderateScale(8 * 8),
        height: _moderateScale(8 * 8),
        borderRadius: 8
    },
    title: {
        padding: _moderateScale(8 * 2),
        paddingBottom: 0,
    },
    container: {
    }
})
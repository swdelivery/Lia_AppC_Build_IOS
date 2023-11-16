import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BG_GREY_OPACITY_5, BLACK, BORDER_COLOR, GREY, RED, WHITE } from '@Constant/Color'
import { _moderateScale } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { formatMonney } from '@Constant/Utils'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import ItemService from './ItemService'

const TabPayment = () => {

    const Card = ({ title, price, bgColor }) => {
        return (
            <View style={[styleElement.flex, styles.box, { backgroundColor: bgColor }]}>
                <View gap={8} style={styleElement.centerChild}>
                    <Text weight='bold' color={WHITE}>
                        {title}
                    </Text>
                    <Text weight='bold' color={WHITE}>
                        {price}
                    </Text>
                </View>
            </View>
        )
    }

    const _renderPaymentFor = (key) => {
        switch (key) {
            case "DEPOSIT":
                return (
                    <Text  >Cọc</Text>
                )
            case "ORDER":
                return (
                    <Text >Thanh toán</Text>
                )

            default:
                break;
        }
    }

    return (
        <View style={styles.container}>

            <View style={{ paddingTop: _moderateScale(8 * 2) }}>
                <Column gap={8 * 2}>
                    <Row gap={8 * 2} paddingHorizontal={8 * 2}>
                        <Card title={'Tổng'} price={'41.000.000 VNĐ'} bgColor={'#56A0FF'} />
                        <Card title={'Cọc'} price={'0 VNĐ'} bgColor={'#FFBC46'} />
                    </Row>
                    <Row gap={8 * 2} paddingHorizontal={8 * 2}>
                        <Card title={'Đã trả'} price={'30.000.000 VNĐ'} bgColor={'#10780E'} />
                        <Card title={'Hoàn tiền'} price={'0 VNĐ'} bgColor={'#FF7895'} />
                    </Row>

                    <View style={{ paddingHorizontal: 8 * 2 }}>
                        <Card title={'Còn lại'} price={'11.000.000 VNĐ'} bgColor={'#A745F2'} />
                    </View>
                </Column>

            </View>

            <View style={styles.title}>
                <Text weight='bold' color={BLACK} >Danh sách dịch vụ</Text>
            </View>
            {
                [1, 2]?.map((item, index) => {
                    return (
                        <ItemService key={index} />
                    )
                })
            }

            <Row style={styles.bill}>
                <Text weight='bold'>
                    Ưu đãi:
                </Text>
                <Text color={RED} weight='bold'>
                    -1.000.000 VNĐ
                </Text>
            </Row>

            <Row style={styles.bill}>
                <Text weight='bold'>
                    Thanh toán
                </Text>
            </Row>

            {
                [1, 2, 3]?.length > 0 ?
                    <View style={{ paddingHorizontal: 8 * 2 }}>
                        <View style={styles.topRowTable}>
                            <View style={styles.topRowTable__child}>
                                <Text style={styles.titleTable}>Thời gian</Text>
                            </View>
                            <View style={styles.topRowTable__child}>
                                <Text style={styles.titleTable}>Số tiền</Text>
                            </View>
                            <View style={styles.topRowTable__child}>
                                <Text style={styles.titleTable}>Hình thức</Text>
                            </View>
                        </View>
                        {
                            [1, 2, 3]?.map((item, index) => {
                                return (
                                    <View key={index} style={styles.bodyRowTable}>
                                        <View style={styles.bodyRowTable__child}>
                                            <Text style={[styles.textTable]}>{moment().format('LT')} - {moment().format('DD/MM')}</Text>
                                        </View>
                                        <View style={styles.bodyRowTable__child}>
                                            <Text style={styles.textTable}>{formatMonney(1200000)}</Text>
                                            <Text style={styles.textTable}>VNĐ</Text>
                                            {
                                                false ?
                                                    <Text style={[styles.textTable, { color: RED }]}>(Hoàn tiền)</Text>
                                                    : <></>
                                            }
                                        </View>
                                        <View style={styles.bodyRowTable__child}>
                                            {
                                                _renderPaymentFor("ORDER")
                                            }
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    :
                    <></>
            }

            <View style={{ height: 200 }} />
        </View>
    )
}

export default TabPayment


const styles = StyleSheet.create({
    bodyRowTable__child: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        padding: _moderateScale(4),
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyRowTable: {
        flex: 1,
        flexDirection: 'row'
    },
    topRowTable__child: {
        flex: 1,
        borderWidth: 0.5,
        borderColor: BG_GREY_OPACITY_5,
        alignItems: 'center',
        padding: _moderateScale(4)
    },
    topRowTable: {
        flex: 1,
        flexDirection: 'row',
        marginTop: _moderateScale(0)
    },
    bill: {
        padding: _moderateScale(8 * 2),
        justifyContent: 'space-between'
    },
    textTable: {
        // color: GREY,
        textAlign: 'center'
    },
    titleTable: {
        // color: GREY,
    },
    box: {
        height: _moderateScale(8 * 10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
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
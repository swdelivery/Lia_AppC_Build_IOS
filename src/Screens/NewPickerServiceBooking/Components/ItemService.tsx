import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import Text from '@Components/Text'
import { _moderateScale, _width, _widthScale } from '@Constant/Scale'
import Image from '@Components/Image'
import { BASE_COLOR, BORDER_COLOR, GREY_FOR_TITLE, PRICE_ORANGE, WHITE } from '@Constant/Color'
import Column from '@Components/Column'
import CountStar2 from '@Components/NewCountStar/CountStar'
import Row from '@Components/Row'
import Icon from '@Components/Icon'
import { formatMonney } from '@Constant/Utils'
import { useDispatch } from 'react-redux'
import { openModalAddServiceToBooking } from '@Redux/booking/actions'

const ITEM_WIDTH = _width / 2 - _widthScale(8 * 2)

const ItemService = (props) => {
    const dispatch = useDispatch()
    const { data } = props

    const _handleOpenModalAddService = useCallback(() => {
        dispatch(openModalAddServiceToBooking({
            flag: true,
            data: data
        }))
    }, [data])

    return (
        <View style={styles.container}>
            <View style={styles.item}>

                <Image style={styles.avatar} avatar={data?.representationFileArr[0]} />

                <View style={styles.item__body}>
                    <View style={{ padding: 8 }}>
                        <Column gap={0}>
                            <Text numberOfLines={1} weight='bold' color={GREY_FOR_TITLE}>
                                {data.name}
                            </Text>

                            <CountStar2 size={12} count={data?.reviewCount} rating={5} />

                            <Row style={{}}>
                                <Text style={{ flex: 1 }} color={PRICE_ORANGE} weight='bold' size={14} >
                                    {formatMonney(data?.price)} VNĐ
                                </Text>

                                <Row>
                                    <Icon name="account-multiple" size={14} color="grey" />
                                    <Text size={10} left={4}>
                                        ({data?.countPartner})
                                    </Text>
                                </Row>
                            </Row>
                        </Column>

                        <TouchableOpacity
                            onPress={_handleOpenModalAddService}
                            style={styles.item__body__btnAdd}>
                            <Text color={WHITE} weight='bold'>
                                Thêm
                            </Text>
                        </TouchableOpacity>



                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemService

const styles = StyleSheet.create({
    item__body__btnAdd: {
        marginHorizontal: _moderateScale(0),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        borderRadius: 4,
        height: _moderateScale(8 * 3),
        backgroundColor: BASE_COLOR
    },
    item__body: {
        width: ITEM_WIDTH,
        // height: ITEM_WIDTH / 2,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: BORDER_COLOR,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    avatar: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH * 9 / 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    item: {
        width: ITEM_WIDTH,
    },
    container: {
        width: _width / 2,
        alignItems: 'center',
        marginBottom: _widthScale(8 * 2),
    }
})
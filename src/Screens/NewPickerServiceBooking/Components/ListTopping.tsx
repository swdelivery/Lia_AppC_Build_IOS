import CircleTick from '@Components/CircleTick/CircleTick'
import { IconBackWhite } from '@Components/Icon/Icon'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, BORDER_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _moderateScale } from '@Constant/Scale'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Collapsible from 'react-native-collapsible'

const ListTopping = (props) => {

    const { data } = props

    return (
        <View>
            {
                data?.options?.map((item, index) => {
                    return (
                        <ItemTopping data={item} />
                    )
                })
            }
        </View>
    )
}

const ItemTopping = (props) => {

    const { data } = props
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <View style={{}}>
            <TouchableOpacity
                onPress={() => setIsCollapsed(old => !old)}
                activeOpacity={.8}
                style={styles.mainTab}>
                <Row style={{ justifyContent: 'space-between' }}>
                    <Text weight='bold' color={WHITE}>
                        {data?.groupName}
                    </Text>

                    {
                        isCollapsed ?
                            <View style={{
                                transform: [
                                    { rotate: '180deg' }
                                ]
                            }}>
                                <IconBackWhite style={sizeIcon.lg} />
                            </View>
                            :
                            <View style={{
                                transform: [
                                    { rotate: '270deg' }
                                ]
                            }}>
                                <IconBackWhite style={sizeIcon.lg} />
                            </View>
                    }

                </Row>

            </TouchableOpacity>
            <Collapsible collapsed={isCollapsed}>
                {
                    data?.data?.map((item, index) => {
                        return (
                            <View style={styles.eachTopping}>
                                <Row gap={8 * 2}>
                                    <View style={{ flex: 1 }}>
                                        <Text weight='bold' color={BASE_COLOR}>
                                            {item?.name}
                                        </Text>
                                        <RenderHTML data={item?.content} />
                                    </View>
                                    <View>
                                        <CircleTick isTicked={false} />
                                    </View>
                                </Row>
                            </View>
                        )
                    })
                }
            </Collapsible>
        </View>
    )
}

export default ListTopping

const styles = StyleSheet.create({
    eachTopping: {
        borderBottomWidth: 1,
        borderColor: BORDER_COLOR,
        padding: _moderateScale(8 * 2)
    },
    mainTab: {
        height: _moderateScale(8 * 4),
        backgroundColor: BASE_COLOR,
        justifyContent: 'center',
        paddingHorizontal: _moderateScale(8 * 2)
    }
})

import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import { BORDER_COLOR, GREY, RED, WHITE } from '@Constant/Color'
import Text from '@Components/Text'
import Row from '@Components/Row'
import { IconArrowDown, IconBackGrey, IconLineArrowDown } from '@Components/Icon/Icon'
import { sizeIcon } from '@Constant/Icon'

const InputPicker = (props) => {

    const { title, require } = props

    const _handlePress = () => {
        props?.onPress()
    }

    return (
        <TouchableOpacity
            onPress={_handlePress}
            activeOpacity={.8}
            style={styles.container}>
            <Row style={{ paddingHorizontal: 8 * 3 }}>
                <View style={{ flex: 1, marginRight: 8 * 2 }}>
                    <Text numberOfLines={1} weight='bold'>{title} {require && <Text color={RED}>*</Text>} </Text>
                </View>

                <IconLineArrowDown style={sizeIcon.md} />
            </Row>
        </TouchableOpacity>
    )
}

export default InputPicker

const styles = StyleSheet.create({
    topTitle: {
        top: -10,
        alignSelf: 'flex-start',
        left: 8 * 2,
        backgroundColor: WHITE,
        paddingHorizontal: 8,
        position: 'absolute'
    },
    container: {
        marginHorizontal: _moderateScale(8 * 2),
        borderWidth: 1,
        height: _moderateScale(8 * 6),
        borderColor: BORDER_COLOR,
        borderRadius: 8,
        justifyContent: 'center'
    }
})
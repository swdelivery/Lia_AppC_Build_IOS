import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import Text from '@Components/Text'
import { BG_GREY_OPACITY_2, BORDER_COLOR } from '@Constant/Color'

const Notes = () => {
    return (
        <View style={styles.container}>
            <Text size={14} weight='bold'>Ghi chú </Text>
            <View style={{
                minHeight: _moderateScale(8 * 10),
                // backgroundColor: BG_GREY_OPACITY_2,
                borderWidth:1,
                borderColor:BORDER_COLOR,
                marginTop: _moderateScale(8 ),
                borderRadius: _moderateScale(8),
                padding: _moderateScale(8),
                paddingHorizontal: _moderateScale(8 * 1.5),
            }}>
                <TextInput
                    onChangeText={(content) => {
                    }}
                    value={``}
                    placeholder={'vd: Tôi muốn xử lí da dư'}
                    multiline
                    style={{
                        flex: 1,
                        fontSize: _moderateScale(14)
                    }} />
            </View>
        </View>
    )
}

export default Notes

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: _moderateScale(8 * 2)
    }
})
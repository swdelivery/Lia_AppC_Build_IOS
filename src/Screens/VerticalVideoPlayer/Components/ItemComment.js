import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { _moderateScale } from '@Constant/Scale'
import { sizeText } from '@Constant/Text'
import { GREY, GREY_FOR_TITLE } from '@Constant/Color'

const ItemComment = () => {
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{
                    width: _moderateScale(8 * 5),
                    height: _moderateScale(8 * 5),
                }}>
                    <Image
                        style={{
                            width: _moderateScale(8 * 5),
                            height: _moderateScale(8 * 5),
                            borderRadius: _moderateScale(8 * 5) / 2
                        }}
                        source={{ uri: `https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-6/372761206_3003041226494415_947301934724816680_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9JQ2nxq0W44AX-Gqamn&_nc_ht=scontent.fhan3-4.fna&oh=00_AfBpUvKscsVmZgd4gUTqrHI5JB-Pt2Dvgi1yxa9WfvLiwg&oe=654A6AD2` }} />
                </View>
                <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                    <View>
                        <Text style={[sizeText.small_bold, { color: GREY_FOR_TITLE }]}>
                            Nguyen Van B
                        </Text>
                        <Text style={[sizeText.small_500, { color: GREY_FOR_TITLE }]}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemComment

const styles = StyleSheet.create({
    container: {
        padding: _moderateScale(8 * 2),
    }
})
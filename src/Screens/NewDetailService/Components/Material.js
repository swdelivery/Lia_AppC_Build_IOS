import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { _heightScale, _moderateScale, _widthScale } from '../../../Constant/Scale'

const Material = () => {
    return (
        <View style={styles.container}>
            <View >
                <Text style={{
                    fontSize: _moderateScale(14),
                    fontWeight: 'bold'
                }}>
                    Vật liệu
                </Text>
            </View>

            <View style={styles.box}>
                <View style={styles.box__header}>
                    <Text style={{
                        color: '#4DA887',
                        fontWeight: '500'
                    }}>
                        Chỉ phẩu thuật
                    </Text>

                    <Text style={{
                        color: '#4DA887',
                        fontWeight: '500'
                    }}>
                        3 Loại
                    </Text>
                </View>
                <View style={{ height: _moderateScale(8) }} />

                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: _moderateScale(8)
                }}>
                    <View style={{}}>
                        <Text style={styles.box__textLeft}>Chỉ Polypropylene</Text>
                        <Text style={styles.box__textLeft}>Chỉ lụa Silk</Text>
                        <Text style={styles.box__textLeft}>Chỉ Ethibond</Text>

                    </View>
                    <View style={{ width: _moderateScale(8) }} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.box__textRight}>1.5 mm</Text>
                        <Text style={styles.box__textRight}>3.5 mm</Text>
                        <Text style={styles.box__textRight}>3.25 mm, Lorem ipsum asmet</Text>
                    </View>
                </View>

            </View>

        </View>
    )
}

export default Material

const styles = StyleSheet.create({
    box__textRight: {
        fontSize: _moderateScale(14),
        fontWeight: '500'
    },
    box__textLeft: {
        fontSize: _moderateScale(14),
        color: 'grey',
        fontWeight: '500'
    },
    box__header: {
        width: '100%',
        height: _moderateScale(8 * 4),
        backgroundColor: '#F7F8FA',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _moderateScale(8),
        justifyContent: 'space-between'
    },
    box: {
        width: '100%',
        // height: _moderateScale(100),
        paddingBottom: _moderateScale(8),
        borderWidth: .5,
        marginTop: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        overflow: 'hidden',
        borderColor: 'grey'
    },
    container: {
        width: _widthScale(360),
        minHeight: _heightScale(100),
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: _moderateScale(8),
        borderRadius: _moderateScale(8),
        paddingVertical: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2)
    }
})
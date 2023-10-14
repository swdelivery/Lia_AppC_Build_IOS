import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import CountStar2 from '../../../Components/NewCountStar/CountStar'

const OverViewBranch = memo(() => {
  return (
    <View style={styles.container}>

            <Text style={{
                fontSize:_moderateScale(14),
                fontWeight:'bold',
                marginBottom:_moderateScale(8*1)
            }}>
                Địa điểm công tác
            </Text>
            <View style={{ height: 8 }} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start'
            }}>
                <Image
                    style={styles.avatarBranch}
                    source={{
                        uri: `https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiZjgxYWIyZTctMGZlZi00YmU2LTZhNmItODI5MWI4YWExZTAwIn0/wp-content/uploads/2023/06/photo.png`
                    }} />
                <View style={{ flex: 1, marginLeft: _moderateScale(8) }}>
                    <Text style={styles.name}>
                        LiA Beauty 434 Cao Thắng
                    </Text>
                    <CountStar2 />
                    <View style={{ flexDirection: 'row', marginTop: _moderateScale(4) }}>
                        <TouchableOpacity style={{
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            backgroundColor: '#151617',
                            borderRadius: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            overflow: 'hidden'
                        }}>
                            <Image style={{
                                width: 8 * 1.5,
                                height: 8 * 1.5,
                                resizeMode: 'contain',
                                marginRight: 4
                            }} source={require('../../../Image/kimcuong.png')} />
                            <Text style={{
                                color: '#F8E6D0',
                                fontWeight: 'bold',
                                fontSize: 10
                            }}>
                                Phòng khám
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            backgroundColor: '#414378',
                            borderRadius: 4,
                            flexDirection: 'row',
                            alignItems: 'center',
                            overflow: 'hidden',
                            marginLeft: _moderateScale(8)
                        }}>
                            <Image style={{
                                width: 8 * 1.5,
                                height: 8 * 1.5,
                                resizeMode: 'contain',
                                marginRight: 4
                            }} source={require('../../../Image/kimcuong.png')} />
                            <Text style={{
                                color: '#F8E6D0',
                                fontWeight: 'bold',
                                fontSize: 10
                            }}>
                                Giấy phép
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: "#4BA888",
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 8 * 2,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'white',
                            fontWeight: 'bold'
                        }}
                    >
                        {`Chi tiết >`}
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
  )
})

export default OverViewBranch

const styles = StyleSheet.create({
    iconChat:{
        width:_moderateScale(8*2),
        height:_moderateScale(8*2)
    },
    avatarDoctor:{
        width:_moderateScale(8*5),
        height:_moderateScale(8*5),
        borderRadius:_moderateScale(8*5/2)
    },
    doctorCard:{
        minWidth:_widthScale(200),
        borderRadius:_moderateScale(8),
        marginRight:_moderateScale(8),
        backgroundColor:"#F7F8FA",
        flexDirection:'row',
        paddingVertical:_moderateScale(8),
        paddingHorizontal:_moderateScale(8)
    },  
    name: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold'
    },
    avatarBranch: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2),
        resizeMode: 'contain',
    },
    container: {
        width: _width,
        paddingVertical: _moderateScale(8 * 2),
        paddingHorizontal: _moderateScale(8 * 2),
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: _moderateScale(8*2),
    }
})
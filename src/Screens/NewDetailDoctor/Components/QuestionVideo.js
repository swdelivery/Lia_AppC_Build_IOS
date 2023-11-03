import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { _heightScale, _moderateScale, _width, _widthScale } from '../../../Constant/Scale'
import CountStar from '../../../Components/CountStar'
import { navigation } from 'rootNavigation'
import ScreenKey from '@Navigation/ScreenKey'

const QuestionVideo = memo((props) => {

    const { infoDoctor } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.feedBackText}>
                Hỏi đáp cùng Bác sĩ
            </Text>

            <View style={{ height: _moderateScale(8 * 1) }} />
            <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: _width,
                paddingHorizontal: _moderateScale(8 * 2)
            }}>
                {
                    infoDoctor?.questionVideoDoctorArr?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate(ScreenKey.VERTICAL_VIDEO_PLAYER, { data: infoDoctor?.questionVideoDoctorArr })
                                }}
                                key={index} style={[{
                                    width: '50%',
                                    height: _heightScale(8 * 36),
                                    marginBottom: _moderateScale(8)
                                }, index % 2 == 0 ? { alignItems: 'flex-start' } : { alignItems: 'flex-end' }]}>
                                <View style={{
                                    width: "97%",
                                    height: '100%',
                                }}>
                                    <Image
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: _moderateScale(8)
                                        }}
                                        source={require('../../../Image/hoidapbs.jpeg')} />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        </View>
    )
})

export default QuestionVideo

const styles = StyleSheet.create({
    box__diary__name: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft: _moderateScale(8),
        marginBottom: _moderateScale(8),
    },
    box__diary__nameService: {
        fontSize: _moderateScale(12),
        fontWeight: 'bold',
    },
    verticalLine: {
        width: _moderateScale(2),
        height: _moderateScale(8 * 3),
        backgroundColor: 'red',
        marginRight: _moderateScale(4)
    },
    name: {
        fontSize: _moderateScale(14),
        fontWeight: '500'
    },
    start: {
        width: 8 * 1.75,
        height: 8 * 1.75,
        marginLeft: 1,
        resizeMode: 'contain'
    },
    avatar: {
        width: _moderateScale(8 * 5),
        height: _moderateScale(8 * 5),
        borderRadius: _moderateScale(8 * 5 / 2)
    },
    feedBackText: {
        fontSize: _moderateScale(14),
        fontWeight: 'bold',
        marginLeft: _moderateScale(8 * 2)
    },
    container: {
        width: _width,
        minHeight: 200,
        borderRadius: _moderateScale(8),
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: _moderateScale(8),
        paddingTop: _moderateScale(8 * 2)
    }
})
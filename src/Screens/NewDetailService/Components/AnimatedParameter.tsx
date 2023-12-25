import { IconDArrowDownBase } from '@Components/Icon/Icon';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';
import RenderHTML from 'react-native-render-html';
import { BASE_COLOR, GREY } from '../../../Constant/Color';
import { _heightScale, _moderateScale } from '../../../Constant/Scale';



const AnimatedParameter = (props) => {
    const [collapsedTab1, setCollapsedTab1] = useState(true)

    const _renderParameterDescription = (htmlContent) => {
        if (htmlContent?.length > 0) {
            return (
                <RenderHTML
                    source={{ html: htmlContent }}
                    enableExperimentalBRCollapsing={true}
                    enableExperimentalMarginCollapsing={true}
                />
            )
        } else {
            return (<></>)
        }
    }

    return (
        <>
            <View>
                <Collapsible duration={0} collapsedHeight={_heightScale(170)} collapsed={collapsedTab1}>
                    <View>
                        {
                            _renderParameterDescription(props?.htmlData)
                        }
                    </View>
                </Collapsible>
                <View style={{ height: _moderateScale(16) }} />
                {
                    collapsedTab1 && <LinearGradient
                        colors={[
                            'rgba(256, 256, 256,0.0)',
                            'rgba(256, 256, 256,0.5)',
                            'rgba(256, 256, 256,1)',
                        ]}
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                        }} />
                }
                {
                    collapsedTab1 ?
                        <TouchableOpacity
                            onPress={() => {
                                setCollapsedTab1(!collapsedTab1)
                            }}
                            style={{
                                zIndex: 10,
                                bottom: _heightScale(0),
                                position: 'absolute',
                                alignSelf: 'center',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: BASE_COLOR, marginRight: _moderateScale(4) }}>Xem thêm</Text>
                            <IconDArrowDownBase width={8 * 2} height={8 * 2} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                setCollapsedTab1(!collapsedTab1)
                            }}
                            style={{
                                zIndex: 10,
                                bottom: _heightScale(0),
                                position: 'absolute',
                                alignSelf: 'center',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: GREY, marginRight: _moderateScale(4) }}>Thu gọn</Text>
                            <Image style={{
                                width: 8,
                                height: 8
                            }} source={require('../../../NewIcon/doubleUpGrey.png')} />
                        </TouchableOpacity>
                }
            </View>
        </>
    );
}


export default AnimatedParameter;

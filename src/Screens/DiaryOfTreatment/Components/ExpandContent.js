import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View , Image} from 'react-native';
import { styleElement } from '../../../Constant/StyleElement';
import { _heightScale, _moderateScale, _width, _widthScale } from '../../../Constant/Scale';
import { stylesFont } from '../../../Constant/Font';
import { sizeIcon } from '../../../Constant/Icon';
import RenderHtml from 'react-native-render-html';
import Collapsible from 'react-native-collapsible';
import LinearGradient from 'react-native-linear-gradient';
import { GREY } from '../../../Constant/Color';



const ExpandContent = memo((props) => {

    const [collapsed, setCollapsed] = useState(true)

    
    const _renderParameterDescription = (htmlContent) => {

       
        if (htmlContent?.length > 0) {
            return (
                <RenderHtml
                    contentWidth={_width - _widthScale(8 * 6)}
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
            <View
                style={[styleElement.rowAliBottom, { paddingHorizontal: _moderateScale(8 * 2) }]}>
                <View style={{
                    width: _moderateScale(4),
                    height: _moderateScale(8 * 2.5),
                    backgroundColor: '#FA4664',
                    marginRight: _moderateScale(8)
                }} />
                <Text style={{ ...stylesFont.fontNolanBold, fontSize: _moderateScale(15), color: '#FA4664' }}>
                    {props?.data?.title}
                </Text>
            </View>
            <View style={{ paddingHorizontal: _moderateScale(8 * 1) }}>
                <Collapsible duration={300} collapsedHeight={_heightScale(50)} collapsed={collapsed}>
                    <View style={{ paddingHorizontal: _moderateScale(8) }}>
                        {
                            _renderParameterDescription(props?.data?.content)
                        }
                    </View>
                </Collapsible>
                <View style={{ height: _moderateScale(16) }} />
                {
                    collapsed && <LinearGradient
                        colors={[
                            'rgba(256, 256, 256,0.0)',
                            'rgba(256, 256, 256,0.5)',
                            // 'rgba(256, 256, 256,0.9)',
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
                    collapsed ?
                        <TouchableOpacity
                            onPress={() => {
                                setCollapsed(!collapsed)
                            }}
                            style={{
                                zIndex: 10,
                                bottom: _heightScale(0),
                                position: 'absolute',
                                alignSelf: 'center',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: "#FA4664", marginRight: _moderateScale(4),fontSize:_moderateScale(14) }}>Xem thêm</Text>
                            <Image style={sizeIcon.xxxs} source={require('../../../NewIcon/doubleDownPink.png')} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => {
                                setCollapsed(!collapsed)
                            }}
                            style={{
                                zIndex: 10,
                                bottom: _heightScale(0),
                                position: 'absolute',
                                alignSelf: 'center',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <Text style={{ color: GREY, marginRight: _moderateScale(4),fontSize:_moderateScale(14) }}>Thu gọn</Text>
                            <Image style={sizeIcon.xxxs} source={require('../../../NewIcon/doubleUpGrey.png')} />
                        </TouchableOpacity>
                }


            </View>
        </>
    );
});



export default ExpandContent;
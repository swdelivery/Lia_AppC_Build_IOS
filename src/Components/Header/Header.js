import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { _heightScale, _widthScale, _moderateScale } from '../../Constant/Scale';
import * as Color from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';
import { navigation } from '../../../rootNavigation';
import { styleElement } from '../../Constant/StyleElement';



const Header = props => {

    // console.log({props});

    return (

        <View style={[styles.header,  props?.styleCus , props?.transparentBottom ? null : shadow]}>
            <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                style={styles.btnGoBack}
                onPress={() => {
                    if (props?.keyGoBack) {
                        navigation.navigate(props?.keyGoBack)
                    } else {
                        navigation.goBack()
                    }
                }}>
               {props?.backStyle==='white'?
                <Image
                style={[sizeIcon.lg]}
                source={require('../../Icon/backWhite.png')} />
                :<Image
                style={[sizeIcon.lg]}
                source={require('../../Icon/backBlack.png')} />
                }
                
            </TouchableOpacity>
            <Text style={[stylesFont.fontNolan500, styles.titleHeader, props?.styleTit]}>
                {
                    props?.title ?
                        props?.title
                        :
                        ``
                }
            </Text>
            <View style={{ opacity: 0 }}>
                <TouchableOpacity
                    style={[styles.btnGoBack]}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Image
                        style={[sizeIcon.lg]}
                        source={require('../../Icon/backBlack.png')} />
                </TouchableOpacity>
            </View>
            {
                props.hasFilter ?
                    <View style={{ flex: 1, alignItems: 'flex-end', right: _widthScale(20) }}>
                        <TouchableOpacity onPress={props.pressIconFilter} style={{ alignItems: 'center' }}>
                            <Text style={[stylesFont.fontNolan500, { fontSize: _widthScale(10), color: Color.BASE_COLOR }]}>
                                Bộ lọc
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    props.hasAdd ?
                    <View style={{ flex: 1, alignItems: 'flex-end', right: _widthScale(20) }}>
                        <TouchableOpacity onPress={props.handleAdd} style={{ alignItems: 'center' }}>
                            <Text>awd</Text>
                        </TouchableOpacity>
                    </View>:
                    <>
                    </>
            }

        </View>

    );
};

const styles = StyleSheet.create({
    btnGoBack: {
        marginHorizontal: _moderateScale(8 * 2),
    },
    header: {
        width: "100%",
        height: _heightScale(48),
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        // position: 'absolute',
        zIndex: 1,
        // top: _heightScale(32),
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    iconGoBack: {
        padding: _widthScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHeader: {
        fontSize: _widthScale(15),
        ...stylesFont.fontNolan500
    }
})


const shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3
}

// const shadow = {
//     shadowColor: "#000",
//     shadowOffset: {
//         width: 0,
//         height: 0,
//     },
//     shadowOpacity: 0.36,
//     shadowRadius: 1.68,

//     elevation: 11
// }

export default Header;
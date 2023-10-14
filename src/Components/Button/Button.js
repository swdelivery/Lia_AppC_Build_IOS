import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { _heightScale, _moderateScale, _widthScale } from '../../Constant/Scale';
import * as Color from '../../Constant/Color'
import { stylesFont } from '../../Constant/Font';



const ButtonPrimary = props => {
    return (
        <TouchableOpacity
            disabled={props?.disabled}
            onPress={
                props.pressAction ?
                    () => props.pressAction()
                    :
                    null
            }>
            <View style={[styles.button, { height: props.height ? props.height : _moderateScale(48) }, props?.disabled && { opacity: 0.5 }]}>
                <Text style={[stylesFont.fontNolanBold,
                { color: '#fff', fontSize: _moderateScale(18) }]}>{props.text ? props.text : ''}</Text>
            </View>
        </TouchableOpacity>

    );
};


const ButtonOutline = props => {
    return (
        <TouchableOpacity
            onPress={
                props.pressAction ?
                    () => props.pressAction()
                    :
                    null
            }>
            <View style={[styles.buttonOutline, { height: props.height ? props.height : _moderateScale(48) }]}>

                <Text style={[stylesFont.fontNolanBold,
                { color: Color.BASE_COLOR, fontSize: _moderateScale(18) }]}>{props.text ? props.text : ''}</Text>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
        backgroundColor: Color.BASE_COLOR,
        borderRadius: _moderateScale(40),
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: Color.BASE_COLOR
    },
    buttonOutline: {
        width: "100%",
        backgroundColor: Color.WHITE,
        borderRadius: _moderateScale(40),
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: Color.BASE_COLOR
    }
})

module.exports = { ButtonPrimary, ButtonOutline }
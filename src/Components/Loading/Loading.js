import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    BackHandler,
    Image,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import { stylesFont } from '../../Constant/Font';
import * as Color from '../../Constant/Color'

import {
    SkypeIndicator,
} from 'react-native-indicators';
import { _widthScale, _width, _height, _moderateScale } from '../../Constant/Scale';
import store from '../../Redux/Store';


class Loading extends Component {
    constructor(props) {
        super(props)
        this.handleBackButtonPress = this.handleBackButtonPress.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
    }

    handleBackButtonPress() {
        // navigation.goBack(null);
        return true;
    }

    _handleCloseBanner = () => {
        store.dispatch({
            type: "LOADING_DONE",
            payload: null
        })
    }

    render() {
        const { stateRedux: { loading } } = this.props


        return (
            <>
                {/* <Spinner
                    visible={loading.isLoading}
                    textContent={loading.content}
                    color={'#fff'}
                    overlayColor={loading.transparent ? 'transparent' : "rgba(9, 8, 8, 0.6)"}
                    textStyle={{
                        color: Color.WHITE,
                        fontSize:_widthScale(16)
                    }}
                    customIndicator={<SkypeIndicator color='white' />}
                /> */}
                <View style={{
                    width: _width,
                    height: _height,
                    backgroundColor: 'rgba(9, 8, 8, 0.6)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                    {
                        loading?.error ?
                            <View style={styles.bannerError}>
                                <Image
                                    style={{
                                        width: _moderateScale(8 * 12),
                                        height: _moderateScale(8 * 12),
                                        resizeMode: 'contain',
                                        alignSelf: 'center'
                                    }}
                                    source={require('../../Icon/error.png')} />
                                <Text style={[stylesFont.fontNolan500, styles.title]}>
                                    {loading?.error?.title}
                                </Text>
                                <Text style={[stylesFont.fontNolan500, styles.body]}>
                                    {loading?.error?.body}
                                </Text>

                                <TouchableOpacity
                                    onPress={this._handleCloseBanner}
                                    style={styles.btnCloseBanner}>
                                    <Text style={[stylesFont.fontNolan500, styles.btnCloseBanner__btn]}>
                                        Đóng
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <>
                                <View style={{height:_moderateScale(8*7)}}>
                                    <SkypeIndicator color='white' />
                                </View>
                                <Text style={[stylesFont.fontNolanBold,{
                                    color: Color.WHITE,
                                    fontSize:_widthScale(16)
                                }]}>
                                    {loading?.content}
                                </Text>
                            </>
                    }


                </View>
            </>
        );
    }
}
const mapStateToProps = state => ({
    stateRedux: state.userReducer
});

const styles = StyleSheet.create({
    body: {
        color: Color.GREY_FOR_TITLE,
        fontSize: _moderateScale(16), marginTop: _moderateScale(8 * 2),
        textAlign: 'center'
    },
    title: {
        fontSize: _moderateScale(16),
        color: Color.RED,
        alignSelf: 'center'
    },
    btnCloseBanner__btn: {
        fontSize: _moderateScale(16),
        color: Color.BLACK
    },
    btnCloseBanner: {
        padding: _moderateScale(8),
        alignSelf: 'flex-end',
        marginTop: _moderateScale(8 * 2)
    },
    bannerError: {
        backgroundColor: Color.WHITE,
        width: _width / 1.5,
        padding: _moderateScale(8 * 2),
        borderRadius: _moderateScale(8),
        paddingBottom: _moderateScale(8)
    }
})

export default connect(mapStateToProps, null)(Loading);
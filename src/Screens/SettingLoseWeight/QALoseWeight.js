import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWindowDimensions, View, Text, ScrollView } from 'react-native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import { stylesFont } from '../../Constant/Font';
import Header from '../../Components/HeaderLoseWeight';
import ItemQA from './Components/ItemQA';
import { _moderateScale } from '../../Constant/Scale';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { WHITE } from '../../Constant/Color';


const source = {
    html: `
    <div >
        <p style="padding:0px; margin:0px"; color:'red' >
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. <br> Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. 
        </p>
        <img
        style="width: 100%; height: 100px;"
        src="http://placeimg.com/1200/800/animals"
        />
    </div>
  `
};

const renderersProps = {
    img: {
        enableExperimentalPercentWidth: true
    }
};

// const systemFonts = [...defaultSystemFonts, 'SVN-PF Din Text Pro','NolanNext']

const QALoseWeight = memo((props) => {
    const { width } = useWindowDimensions();

    const [listQA, setListQA] = useState([])

    useEffect(() => {
        setListQA([1, 2, 3, 4, 5, 6, 7])
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor:WHITE }}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <Header title={"Hỏi đáp"} />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ marginTop: _moderateScale(8 * 1) }}>
                    {
                        listQA?.map((item, index) => {
                            return (
                                <ItemQA />
                            )
                        })
                    }
                </ScrollView>

            </View>
            {/* <View style={{ paddingHorizontal: 24 }}>
                <RenderHtml
                    // systemFonts={systemFonts}
                    contentWidth={width - 48}
                    source={source}
                    enableExperimentalMarginCollapsing={false}
                    renderersProps={renderersProps}
                />
            </View> */}
        </View>
    );
});



export default QALoseWeight;
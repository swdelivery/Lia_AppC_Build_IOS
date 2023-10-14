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
import { getQuestion } from '../../Redux/Action/Service';


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


const QA = memo((props) => {
    const { width } = useWindowDimensions();

    const [listQA, setListQA] = useState([])

    useEffect(() => {
        if(props?.route?.params?.codeService){
            _getQuestion()
        }
    }, [])

    const _getQuestion = async () =>{
        const result = await getQuestion({
            "condition": {
                'type':{
                    'equal': 'service'
                },
                "entityCodeArr": {
                    "equal": props?.route?.params?.codeService
                }
            },
            "sort": {
                "created": -1
            },
            "limit": 20,
            "page": 1
        })
        if (result?.isAxiosError) return
        setListQA(result)
    }

    return (
        <View style={{ flex: 1, backgroundColor:WHITE }}>
            <StatusBarCustom barStyle={'dark-content'} bgColor={WHITE} />
            <Header title={"Hỏi đáp"} />
            <View style={{ flex: 1 }}>
                <ScrollView style={{ marginTop: _moderateScale(8 * 1) }}>
                    {
                        listQA?.map((item, index) => {
                            return (
                                <ItemQA data={item} key={index} index={index+1}/>
                            )
                        })
                    }
                    <View style={{height:50}}/>
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



export default QA;
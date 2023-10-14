import React, { memo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { navigation } from '../../../rootNavigation';
import { _moderateScale } from '../../Constant/Scale';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';

import InfoRoom from './InfoRoom';
import TreatmentHistory from './TreatmentHistory';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { styleElement } from '../../Constant/StyleElement';



const index = memo((props) => {

    const [routes] = useState([
        { key: 'first', title: 'Lịch sử điều trị' },
        // { key: 'second', title: 'Thông tin phòng chat' },
    ]);
    const [index, setIndex] = useState(0);

    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                {...props}
                indicatorStyle={{ backgroundColor: Color.BASE_COLOR }}
                style={{
                    backgroundColor: Color.WHITE,
                }}
                inactiveColor="grey"
                activeColor={Color.BASE_COLOR}
                labelStyle={[stylesFont.fontDinTextPro, {
                    fontSize: _moderateScale(16),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {    
            case 'first':
                return <TreatmentHistory />;
            case 'second':
                return <InfoRoom />;
         
            default:
                return null;
        }
    };

    return (
        <View style={[styles.container]}>
            {/* <Header /> */} 
            {/* <TouchableOpacity */}
            <StatusBarCustom bgColor={Color.WHITE} barStyle={'dark-content'}/>

            <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
            onPress={()=>{
                navigation.goBack()
            }}
            style={{
                position:'absolute',
                bottom:_moderateScale(8*2)+getBottomSpace(),
                left:_moderateScale(8*2),
                zIndex:10,
                width:_moderateScale(8*6),
                height:_moderateScale(8*6),
                borderRadius:_moderateScale(8*6/2),
                backgroundColor:Color.BLUE_FB,
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Image
                style={[sizeIcon.llllg]}
                source={require('../../Icon/back_white.png')}/>
            </TouchableOpacity>

            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />

        </View>
    );
});


const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: Color.WHITE
    }
})


export default index;
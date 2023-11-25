import React, { memo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { navigation } from '../../../rootNavigation';
import { _heightScale, _moderateScale } from '../../Constant/Scale';
import * as Color from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { sizeIcon } from '../../Constant/Icon';

import InfoRoom from './InfoRoom';
import TreatmentHistory from './TreatmentHistory';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import StatusBarCustom from '../../Components/StatusBar/StatusBarCustom';
import { styleElement } from '../../Constant/StyleElement';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconBackGrey, IconBackWhite } from '@Components/Icon/Icon';



const index = memo((props) => {

    const [routes] = useState([
        { key: 'first', title: 'Lịch sử điều trị' },
        // { key: 'second', title: 'Thông tin phòng chat' },
    ]);
    const [index, setIndex] = useState(0);
    const { top, bottom } = useSafeAreaInsets()

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
            <View style={{ height: top }} />

            <TouchableOpacity
                hitSlop={styleElement.hitslopSm}
                onPress={() => {
                    navigation.goBack()
                }}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: top + _heightScale(8 + 4),
                    left: 8 * 3
                }}>
                <IconBackGrey style={sizeIcon.lg} />
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

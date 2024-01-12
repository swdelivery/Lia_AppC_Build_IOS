import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';


import { BASE_COLOR, BG_BEAUTY, WHITE } from '../../Constant/Color';
import { stylesFont } from '../../Constant/Font';
import { _moderateScale } from '../../Constant/Scale';

import { TabBar, TabView } from 'react-native-tab-view';

import LiAHeader from '@Components/Header/LiAHeader';
import Screen from '@Components/Screen';
import { FocusAwareStatusBar } from '@Components/StatusBar';
import ListDeposit from '../../Screens/ListDeposit/index';
import ListDepositRequest from '../../Screens/ListDepositRequest';
import ListPayment from '../../Screens/ListPayment/index';


const index = memo((props) => {


    const [routes] = useState([
        { key: 'first', title: 'Cọc' },
        { key: 'second', title: 'Y/C Nạp rút' },
        { key: 'third', title: 'Thanh toán' },
    ]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (props?.route?.params?.numIndex) {
            setTimeout(() => {
                setIndex(props?.route?.params?.numIndex)
            }, 100);
        }
    }, [props?.route?.params?.numIndex])


    const renderTabBar = (props) => {
        return (
            <TabBar
                tabStyle={{ flexDirection: 'row', alignItems: 'center' }}
                {...props}
                indicatorStyle={{ backgroundColor: BASE_COLOR }}
                style={{
                    backgroundColor: WHITE,
                }}
                inactiveColor="grey"
                activeColor={BASE_COLOR}
                labelStyle={[stylesFont.fontNolan500, {
                    fontSize: _moderateScale(14),
                }]}
                getLabelText={({ route }) => route.title}
            />
        )
    }
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ListDeposit />;
            case 'second':
                return <ListDepositRequest />;
            case 'third':
                return <ListPayment />;

            default:
                return null;
        }
    };


    return (
        <Screen style={styles.container}>
            <FocusAwareStatusBar barStyle='light-content' />
            <LiAHeader safeTop title='Thanh toán / Cọc' />
            <TabView
                renderTabBar={renderTabBar}
                swipeEnabled={true}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazy
            />
        </Screen>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_BEAUTY
    }
})


export default index;

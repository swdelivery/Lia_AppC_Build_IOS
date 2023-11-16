import Header from "@Components/NewHeader/Header";
import Screen from "@Components/Screen";
import { FONT_WEIGHTS } from "@Components/Text";
import { _width } from "@Constant/Scale";
import ScrollableTabView from "@itenl/react-native-scrollable-tabview";
import React, { useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { isAndroid } from "src/utils/platform";
import HorizontalImage from "./Components/HorizontalImage";
import TabImages from "./Components/TabImages";
import TabInfo from "./Components/TabInfo";
import TabPayment from "./Components/TabPayment";

const NewDetailBooking = (props) => {

    const [infoMaterial, setInfoMaterial] = useState(null);
    const scrollableTabViewRef = useRef();
    const [rootTime, setRootTime] = useState(Date.now());


    const Banner = () => {
        return (
            <HorizontalImage />
        );
    };

    const STACKS = [
        {
            screen: TabInfo,
            tabLabel: "Dịch vụ",
        },
        {
            screen: TabImages,
            tabLabel: "Hình ảnh",
        },
        {
            screen: TabPayment,
            tabLabel: "Thanh toán",
        },
    ];

    return (
        <Screen safeBottom={isAndroid}>
            <StatusBar barStyle={"light-content"} />
            <Header title={"Chi tiết dịch vụ"} />

            <ScrollableTabView
                title={<View />}
                titleArgs={{
                    interpolateHeight: {
                        inputRange: [0, 0],
                        outputRange: [0, 0],
                        extrapolate: "clamp",
                    },
                }}
                mappingProps={{
                    rootTime: rootTime,
                }}
                stacks={STACKS}
                ref={(it) => (scrollableTabViewRef.current = it)}
                header={<Banner />}
                tabsStyle={styles.tabsStyle}
                tabStyle={styles.tabStyle}
                tabsEnableAnimated={true}
                tabInnerStyle={styles.tabInnerStyle}
                tabActiveOpacity={1}
                tabUnderlineStyle={styles.tabUnderlineStyle}
                textStyle={styles.textStyle}
                textActiveStyle={styles.textActiveStyle}
                firstIndex={0}
                toTabsOnTab={true}
                oneTabHidden={true}
                enableCachePage={true}
            />
        </Screen>
    );
};

export default NewDetailBooking;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    tabsStyle: {
        height: 8 * 5,
        backgroundColor: "white",
        borderBottomColor: "grey",
        // borderBottomWidth: 1,
    },
    tabStyle: {
        backgroundColor: "white",
        width: _width / 4.25,
    },
    textStyle: {
        color: "black",
        fontWeight: "500",
        fontSize: 14,
        fontFamily: FONT_WEIGHTS["bold"],
    },
    tabUnderlineStyle: {
        backgroundColor: "#4BA888",
        top: 8 * 4,
        height: 3,
    },
    searchContainer: {
        position: "absolute",
        zIndex: 1,
        alignItems: "center",
        width: _width,
    },
    tabInnerStyle: { width: "100%" },
    textActiveStyle: {
        color: "#4BA888",
        fontWeight: "bold",
    },

});

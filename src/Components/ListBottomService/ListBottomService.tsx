import { StyleSheet, View, Image } from "react-native";
import React, { memo, useCallback } from "react";
import { _width } from "../../Constant/Scale";
import Text from "@Components/Text";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { RED } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import Row from "@Components/Row";
import { styleElement } from "@Constant/StyleElement";
import Icon from "@Components/Icon";
import { URL_ORIGINAL } from "@Constant/Url";
import { TouchableOpacity } from "react-native";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { selectService } from "@Redux/service/actions";
import { useDispatch } from "react-redux";

const ListBottomService = (props) => {
    const dispatch = useDispatch();

    const _handleGoDetailService = useCallback((data) => () => {
        dispatch(selectService(data));
        navigation.replace(ScreenKey.DETAIL_SERVICE, { idService: data?._id })
    }, [])


    return (
        <View style={styles.container}>
            {props?.data?.map((item, index) => {
                return (
                    <TouchableOpacity
                        onPress={_handleGoDetailService(item)}
                        style={styles.card}>
                        <View style={styles.itemContent}>
                            <View>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`,
                                    }}
                                />
                            </View>
                            <View style={styles.itemInfo}>
                                <Text numberOfLines={1} size={12} weight="bold">
                                    {item?.name}
                                </Text>
                                <CountStar2 count={item?.reviewCount} rating={5} size={10} />
                                <Row>
                                    <Text
                                        weight="bold"
                                        size={12}
                                        color={RED}
                                        style={styleElement.flex}
                                    >
                                        {formatMonney(item?.price, true)}
                                    </Text>

                                    <Row>
                                        <Icon name="account-multiple" size={14} color="grey" />
                                        <Text size={10} left={4}>
                                            ({item?.countPartner})
                                        </Text>
                                    </Row>
                                </Row>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default ListBottomService


const styles = StyleSheet.create({
    start: {
        width: 8 * 1.25,
        height: 8 * 1.25,
        marginLeft: 1,
        resizeMode: "contain",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    card: {
        width: _width / 2,
        height: 190,
        alignItems: "center",
    },
    itemContent: {
        width: "90%",
        height: "95%",
        backgroundColor: "white",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    image: {
        width: "100%",
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    itemInfo: {
        padding: 4,
    },
});

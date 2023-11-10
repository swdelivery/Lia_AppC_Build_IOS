import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback } from "react";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import Text from "@Components/Text";
import Column from "@Components/Column";
import Row from "@Components/Row";
import { useSelector } from "react-redux";
import { getServiceDetailsState } from "@Redux/service/selectors";
import { stylesFont } from "@Constant/Font";
import { IconEyeBase } from "@Components/Icon/Icon";
import { sizeIcon } from "@Constant/Icon";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";

const Material = () => {

  const { data: dataService } = useSelector(getServiceDetailsState);

  const _handleGoDetailMaterial = useCallback((data) => () => {
    navigation.navigate(ScreenKey.DETAIL_MATERIAL, { _id: data?._id })
  }, [])

  return (
    <View style={styles.container}>
      <View style={{marginBottom:8}}>
        <Text weight="bold">Vật liệu</Text>
      </View>

      <Column  gap={8}>
        <View style={styles.box__header}>
          <Text color={"#4DA887"} weight="bold">
            Thông tin vật liệu
          </Text>

          <Text color={"#4DA887"} weight="bold">
            {dataService?.materialArr?.length} Loại
          </Text>
        </View>

        <Column gap={8} left={8} right={8}>
          {
            dataService?.materialArr?.map((item, index) => {
              return (
                <TouchableOpacity onPress={_handleGoDetailMaterial(item)}>
                  <Row gap={16}>
                    <View style={{ flex: 1 }}>
                      <Text numberOfLines={1} style={[styles.box__textLeft, stylesFont.fontNolanBold]}>{item?.name}</Text>
                    </View>

                    <IconEyeBase style={sizeIcon.md} />
                  </Row>
                </TouchableOpacity>
              )
            })
          }
        </Column>
      </Column>
    </View>
  );
};

export default Material;

const styles = StyleSheet.create({
  box__textRight: {
    flex: 1,
    textAlign: "right",
  },
  box__textLeft: {
    fontSize: _moderateScale(14),
    color: "grey",
    fontWeight: "bold",

  },
  box__header: {
    width: "100%",
    height: _moderateScale(8 * 4),
    backgroundColor: "#F7F8FA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8),
    justifyContent: "space-between",
  },
  box: {
    width: "100%",
    // height: _moderateScale(100),
    paddingBottom: _moderateScale(8),
    borderWidth: 0.5,
    marginTop: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
    borderColor: "grey",
  },
  container: {
    width: _widthScale(360),
    minHeight: _heightScale(100),
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: _moderateScale(8),
    borderRadius: _moderateScale(8),
    paddingVertical: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
  },
});

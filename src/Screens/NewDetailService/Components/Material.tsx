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
import { IconEyeBase } from "@Components/Icon/Icon";
import { sizeIcon } from "@Constant/Icon";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { Service } from "@typings/serviceGroup";
import { GREY } from "@Constant/Color";

type Props = {
  service: Service;
};

const Material = ({ service }: Props) => {
  const _handleGoDetailMaterial = useCallback(
    (data) => () => {
      navigation.navigate(ScreenKey.DETAIL_MATERIAL, { _id: data?._id });
    },
    []
  );

  return (
    <View style={styles.container}>
      <Text weight="bold" bottom={8}>
        Vật liệu
      </Text>
      <Column gap={8}>
        <View style={styles.box__header}>
          <Text color={"#4DA887"} weight="bold">
            Thông tin vật liệu
          </Text>

          <Text color={"#4DA887"} weight="bold">
            {service?.materialArr?.length} Loại
          </Text>
        </View>

        <Column
          paddingHorizontal={_moderateScale(8)}
          gap={8}
          left={0}
          right={8}
        >
          {service?.materialArr?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={_handleGoDetailMaterial(item)}
              >
                <Row gap={16} justifyContent="space-between">
                  <Text weight="bold" numberOfLines={1} color={GREY}>
                    {item?.name}
                  </Text>

                  <IconEyeBase style={sizeIcon.md} />
                </Row>
              </TouchableOpacity>
            );
          })}
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

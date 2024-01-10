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
import ScreenKey from "@Navigation/ScreenKey";
import { Service } from "@typings/serviceGroup";
import { BASE_COLOR, GREY } from "@Constant/Color";
import SVGEyeBase from "src/SGV/eyeBase.svg";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = {
  service: Service;
};

const Products = ({ service }: Props) => {
  const { navigation } = useNavigate();

  const _handleGoDetailMaterial = useCallback(
    (data) => () => {
      navigation.navigate(ScreenKey.DETAIL_SERVICE_PRODUCT, { item: data });
    },
    []
  );

  console.log({ service });

  return (
    <View style={styles.container}>
      <Text weight="bold" bottom={8}>
        Sản phẩm
      </Text>
      <Column gap={8}>
        <View style={styles.box__header}>
          <Text color={BASE_COLOR} weight="bold">
            Thông tin sản phẩm
          </Text>

          <Text color={BASE_COLOR} weight="bold">
            {service?.productArr?.length} Loại
          </Text>
        </View>

        <Column
          paddingHorizontal={_moderateScale(8)}
          gap={8}
          left={0}
          right={8}
        >
          {service?.productArr?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item._id}
                onPress={_handleGoDetailMaterial(item)}
              >
                <Row gap={16} justifyContent="space-between">
                  <Text weight="bold" numberOfLines={2} color={GREY} flex={1}>
                    {item?.name}
                  </Text>

                  <SVGEyeBase color={BASE_COLOR} />
                </Row>
              </TouchableOpacity>
            );
          })}
        </Column>
      </Column>
    </View>
  );
};

export default Products;

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

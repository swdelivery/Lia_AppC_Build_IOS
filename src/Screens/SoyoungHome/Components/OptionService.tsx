import React, { useCallback, useEffect, useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { useDispatch, useSelector } from "react-redux";
import ScreenKey from "../../../Navigation/ScreenKey";
import { getServiceGroup } from "@Redux/home/actions";
import { getServiceGroupState } from "@Redux/home/selectors";
import Image from "@Components/Image";
import Text from "@Components/Text";
import { useNavigate } from "src/Hooks/useNavigation";
import LinearGradient from "react-native-linear-gradient";
import { WHITE } from "@Constant/Color";
import { ScrollView } from "react-native-gesture-handler";
import Column from "@Components/Column";
import { isEmpty } from "lodash";

const WIDTH_ITEM = (_width - _widthScale(16) * 2) / 5;

const OptionService = () => {
  const { data, isLoading } = useSelector(getServiceGroupState);
  const dispatch = useDispatch();
  const { navigate } = useNavigate();

  useEffect(() => {
    _getData();
  }, []);

  const _getData = useCallback(() => {
    const condition = {
      condition: {
        parentCode: {
          equal: null,
        },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 100,
      page: 1,
    };

    dispatch(getServiceGroup.request(condition));
  }, []);

  const displayItems = useMemo(() => {
    if (isEmpty(data)) {
      return [];
    }
    const totalItems = data.length;
    // Determine the number of rows and columns based on the total number of items
    let numRows, numCols;
    if (totalItems <= 10) {
      numRows = totalItems <= 5 ? 1 : 2;
      numCols = 5;
    } else {
      numRows = 2;
      numCols = Math.ceil(totalItems / 2);
    }

    // Populate the grid with items
    let grid = [];
    let currentItemIndex = 0;

    for (let col = 0; col < numCols; col++) {
      grid[col] = [];

      for (let row = 0; row < numRows; row++) {
        if (currentItemIndex < totalItems) {
          grid[col][row] = data[currentItemIndex];
          currentItemIndex++;
        } else {
          // If there are no more items, fill with a placeholder or leave it empty
          grid[col][row] = null;
        }
      }
    }
    return grid;
  }, [isLoading, data]);

  return (
    <View style={styles.container}>
      <LinearGradient
        style={[StyleSheet.absoluteFill, { borderRadius: 8 }]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        colors={["#f01311", "#861000"]}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={data.length > 10}
      >
        {displayItems.map((items, index) => {
          return (
            <Column key={index}>
              {items.map((item, idx) => {
                return (
                  <TouchableOpacity
                    key={item?._id}
                    onPress={navigate(ScreenKey.NEW_CATEGORY, {
                      parentCodeParam: item,
                    })}
                    style={styles.itemContainer}
                  >
                    <Image
                      style={styles.item__option}
                      avatar={item?.fileAvatar}
                      placeholderColors={["white", "white"]}
                    />
                    <Text color={WHITE} weight="bold" size={12}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </Column>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingVertical: 8,
    width: _width - _widthScale(16) * 2,
  },
  item__option: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },
  itemContainer: {
    alignItems: "center",
    width: WIDTH_ITEM,
    marginTop: 4,
    // backgroundColor: "white",
  },
});

export default OptionService;

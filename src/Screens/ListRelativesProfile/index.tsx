import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import LiAHeader from "@Components/Header/LiAHeader";
import { IconPlusBase, IconTrashRed } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Screen from "@Components/Screen";
import Text from "@Components/Text";
import { BASE_COLOR, WHITE } from "@Constant/Color";
import { styleElement } from "@Constant/StyleElement";
import ScreenKey from "@Navigation/ScreenKey";
import {
  deletePartnerRelative,
  getListPartnerRelative,
} from "@Redux/relatives/actions";
import { getPartnerRelativeListState } from "@Redux/relatives/selectors";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import useConfirmation from "src/Hooks/useConfirmation";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";

const ListRelativesProfile = () => {
  const { navigate } = useNavigate();
  const dispatch = useDispatch();
  const infoUser = useSelector((state) => state?.infoUserReducer?.infoUser);
  const { showConfirmation } = useConfirmation();

  const { data: dataListRelatives } = useSelector(getPartnerRelativeListState);

  useFocused(() => {
    getData();
  });

  const getData = () => {
    dispatch(
      getListPartnerRelative.request({
        condition: {
          partnerId: {
            equal: infoUser?._id,
          },
        },
      })
    );
  };

  const _handleDelete = (data) => {
    showConfirmation(
      "Bạn có chắn chắn muốn xoá hồ sơ người thân?",
      `Hồ sơ người thân của bạn sẽ bị xoá vĩnh viễn. Thông tin người thân sẽ không thể khôi phục lại.`,
      () => {
        dispatch(
          deletePartnerRelative.request({
            _id: data?._id,
          })
        );
      }
    );
  };

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(ScreenKey.RELATIVES_INFO, {
            infoRelative: item,
          })();
        }}
        style={[styles.containerBtn, shadow]}
      >
        <Row gap={8 * 2} padding={8 * 2}>
          <Avatar
            size={8 * 8}
            avatar={item?.avatar?._id ? item?.avatar : null}
            circle
          />
          <Column gap={8} flex={1}>
            <Text numberOfLines={1} weight="bold">
              {item?.fullName}
            </Text>
            <Text>{item?.relation}</Text>
          </Column>
          <TouchableOpacity
            onPress={() => _handleDelete(item)}
            hitSlop={styleElement.hitslopSm}
          >
            <IconTrashRed width={8 * 2.5} height={8 * 2.5} />
          </TouchableOpacity>
        </Row>
      </TouchableOpacity>
    );
  };

  const _renderBtnAdd = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigate(ScreenKey.RELATIVES_INFO)();
        }}
        style={[styles.containerBtn, shadow]}
      >
        <Row gap={8 * 2} padding={8 * 2}>
          <IconPlusBase color={BASE_COLOR} />
          <Text>Thêm hồ sơ người thân</Text>
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <Screen safeBottom>
      <LiAHeader safeTop title={"Hồ sơ người thân"} />
      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        keyExtractor={({ item, index }) => item?._id}
        data={dataListRelatives}
        renderItem={_renderItem}
        ListHeaderComponent={_renderBtnAdd}
      />
    </Screen>
  );
};

export default ListRelativesProfile

const styles = StyleSheet.create({
  containerBtn: {
    borderRadius: 4,
    backgroundColor: WHITE,
  },
  containerFlatlist: {
    flexGrow: 1,
    gap: 8 * 2,
    paddingHorizontal: 8 * 2,
    marginTop: 8 * 2,
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1,

  elevation: 2,
};

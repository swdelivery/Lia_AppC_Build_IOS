import React, { memo, useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet
} from "react-native";
import {
  BG_GREY_OPACITY_5,
  BORDER_COLOR,
  GREY,
  NEW_BASE_COLOR,
  WHITE
} from "../../Constant/Color";
// import ItemDiary from './Components/ItemDiary';
import Button from "@Components/Button/Button";
import Column from "@Components/Column";
import LiAHeader from "@Components/Header/LiAHeader";
import { IconEmptyData } from "@Components/Icon/Icon";
import EmptyResultData from "@Components/LoadingIndicator/EmptyResultData";
import Row from "@Components/Row";
import Screen from "@Components/Screen";
import { FocusAwareStatusBar, StatusBar } from "@Components/StatusBar";
import Text from "@Components/Text";
import moment from "moment";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import { getPartnerDiaryv2 } from "../../Redux/Action/Diary";
import ItemDiary from "../MyPersonalPage/Components/ItemDiary";
import RecommendDiary from "./RecommendDiary";

const ListDiaryOfPartner = memo((props) => {
  const { navigate } = useNavigate()
  const [listPartnerDiary, setListPartnerDiary] = useState([]);

  useEffect(() => {
    _getPartnerDiary();
  }, []);

  const _getPartnerDiary = async () => {
    let result = await getPartnerDiaryv2({});
    if (result?.isAxiosError) return;
    setListPartnerDiary(result?.data?.data);
  };

  const _handleCreateBooking = useCallback(() => {
    navigate(ScreenKey.CREATE_BOOKING)()
  }, [])

  const _renderItem = useCallback(({ item }) => {
    return (
      <Row width={"100%"}>
        <Column
          marginLeft={8 * 2}
          height={8 * 40}
          backgroundColor={BG_GREY_OPACITY_5}
          width={1}>
          <Column
            position="absolute"
            top={8}
            left={-4}
            width={8}
            height={8}
            borderRadius={4}
            backgroundColor={NEW_BASE_COLOR} >
          </Column>
          <Column
            left={8 * 2}
            width={8 * 20}
            position="absolute" >
            <Text
              color={NEW_BASE_COLOR}
              weight="bold">
              {moment(item?.created).format('DD/MM/YYYY')}
            </Text>
          </Column>
        </Column>
        <Column flex={1}>
          <ItemDiary data={item} />
        </Column>
      </Row>
    )
  }, [])
  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <Screen style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LiAHeader safeTop title="Nhật ký của bạn" />
      <FlatList
        ListEmptyComponent={
          <Column flex={1}>
            <EmptyResultData>
              <Column gap={8} alignItems='center'>
                <IconEmptyData width={8 * 8} height={8 * 8} />
                <Text>
                  Làm đẹp cùng LiA
                </Text>
                <Button.Gradient
                  onPress={_handleCreateBooking}
                  height={8 * 4}
                  borderRadius={8 * 4}
                  width={8 * 20}
                  horizontal
                  colors={['#2A78BD', '#21587E']}
                  title='Đặt hẹn ngay' />
              </Column>
            </EmptyResultData>
          </Column>
        }
        ListHeaderComponent={
          <Column marginBottom={8 * 2}>
            <RecommendDiary />
            <Column marginVertical={8 * 2} height={4} width={"100%"} backgroundColor={BORDER_COLOR} />
            <Column marginHorizontal={8 * 2}>
              <Text
                weight="bold"
                color={NEW_BASE_COLOR}>
                Nhật ký của tôi
              </Text>
            </Column>
          </Column>
        }
        renderItem={_renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        data={listPartnerDiary}
        keyExtractor={_awesomeChildListKeyExtractor}
      />
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default ListDiaryOfPartner;

import _isEmpty from "lodash/isEmpty";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  BASE_COLOR,
  WHITE,
  BLACK,
  BASE_COLOR_LIGHT,
} from "../../Constant/Color";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../Constant/Scale";
import ModalPickSingleNotSearch from "../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch";
import { getPartnerDiaryByIdv2 } from "../../Redux/Action/Diary";
import ScreenKey from "../../Navigation/ScreenKey";
import ActionButton from "@Components/ActionButton/ActionButton";
import Screen from "@Components/Screen";
import LiAHeader from "@Components/Header/LiAHeader";
import { StatusBar } from "@Components/StatusBar";
import Row from "@Components/Row";
import Column from "@Components/Column";
import Text from "@Components/Text";
import HorizontalImages from "./components/HorizontalImages";
import { Diary } from "@typings/diary";
import DiaryTimeline from "./components/DiaryTimeline";
import { useNavigate, useNavigationParams } from "src/Hooks/useNavigation";

const DiaryDetails = (props) => {
  const { navigation } = useNavigate();
  const { diaryId } = useNavigationParams();
  const [currPartnerDiary, setCurrPartnerDiary] = useState<Diary>(null);

  const [routes] = useState([
    { key: "first", title: "Thông tin" },
    { key: "second", title: "Hình ảnh" },
  ]);

  const [showModalPickScope, setShowModalPickScope] = useState(false);
  const [currScope, setCurrScope] = useState({
    name: "Công khai",
    slug: "PUBLIC",
  });

  useEffect(() => {
    _getPartnerDiaryById();
  }, []);

  const _getPartnerDiaryById = useCallback(async () => {
    let result = await getPartnerDiaryByIdv2(diaryId);
    if (result?.isAxiosError) return;
    setCurrPartnerDiary(result?.data?.data);
  }, [diaryId]);

  const _handleCreatePost = () => {
    // let data = {
    //   content: description,
    //   images: listAnotherImage?.map((item) => item?._id),
    //   template: {
    //     type: "PartnerDiary_TreatmentDetail",
    //     data: {
    //       partnerDiaryId: currPartnerDiary?.id,
    //     },
    //   },
    //   scope: currScope.slug,
    // };
    // dispatch(createPost(data));
  };

  return (
    <Screen style={styles.container} safeBottom>
      <LiAHeader
        safeTop
        title="Nhật ký"
        bg={WHITE}
        titleColor={BASE_COLOR}
        bottomBorderColor={BASE_COLOR}
        barStyle="dark-content"
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Row paddingHorizontal={20} gap={8}>
          <Column width={2} height={20} backgroundColor={BASE_COLOR} />
          <Text weight="bold" color={BLACK}>
            {currPartnerDiary?.serviceName}
          </Text>
        </Row>
        <HorizontalImages
          title="Hình ảnh trước điều trị"
          images={currPartnerDiary?.imageBeforeTreatment ?? []}
        />
        <HorizontalImages
          title="Hình ảnh sau điều trị"
          images={currPartnerDiary?.imageAfterTreatment ?? []}
        />
        <Column height={10} backgroundColor={"#F1FCF9"} marginTop={15} />
        <Text
          left={20}
          top={15}
          bottom={15}
          right={20}
          weight="bold"
          color={BASE_COLOR_LIGHT}
        >
          Nhật kí chăm sóc - {currPartnerDiary?.serviceName}
        </Text>
        <DiaryTimeline
          diary={currPartnerDiary}
          dailyDiaryArr={currPartnerDiary?.dailyDiaryArr || []}
          onDiaryUpdate={_getPartnerDiaryById}
        />
      </ScrollView>

      <ActionButton
        title="Chia sẻ nhật ký lên hoạt động"
        onPress={() => {
          navigation.navigate(ScreenKey.CREATE_NEW_FEED, {
            currPartnerDiary: currPartnerDiary,
          });
        }}
      />

      <ModalPickSingleNotSearch
        hide={() => {
          setShowModalPickScope(false);
        }}
        onSelect={(item) => {
          setCurrScope(item);
        }}
        data={[
          {
            name: "Công khai",
            slug: "PUBLIC",
          },
          {
            name: "Chỉ mình tôi",
            slug: "PRIVATE",
          },
        ]}
        show={showModalPickScope}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default DiaryDetails;

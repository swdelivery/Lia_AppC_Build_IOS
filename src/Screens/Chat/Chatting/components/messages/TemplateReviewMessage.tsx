import Column from "@Components/Column";
import Text from "@Components/Text";
import {
  BASE_COLOR,
  BLUE_FB,
  GREEN_SUCCESS,
  SENDER_COLOR_TEXT,
  WHITE,
} from "@Constant/Color";
import { sizeIcon } from "@Constant/Icon";
import { _moderateScale } from "@Constant/Scale";
import ScreenKey from "@Navigation/ScreenKey";
import { openTreatmentDetails } from "@Redux/chat/actions";
import { Message } from "@typings/chat";
import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";

type Props = { item: Message };

export default function TemplateReviewMessage({ item }: Props) {
  const { navigation } = useNavigate();
  const dispatch = useDispatch();

  const isRated = useMemo(() => {
    return item.template?.data?.interacted;
  }, [item]);

  const handlePress = useCallback(() => {
    navigation.navigate(ScreenKey.MODAL_SERVICE_REVIEW, {
      flag: "fromMessage",
      data: item,
    });
  }, []);

  const handleTreatmentDetails = useCallback(() => {
    if (!item.template?.data?.treatmentDetailId) return;
    dispatch(
      openTreatmentDetails.request(item.template?.data?.treatmentDetailId)
    );
  }, []);

  return (
    <Column paddingHorizontal={10} paddingVertical={5} gap={4}>
      <Text weight="bold" size={12} color={SENDER_COLOR_TEXT}>
        {item?.content}
      </Text>
      {!!item?.template?.data?.serviceName && (
        <Text size={12} fontStyle="italic">
          {`[${item?.template?.data?.serviceName}]`}
        </Text>
      )}
      {item.template.type === "SERVICE_REVIEW" && (
        <TouchableOpacity
          onPress={handlePress}
          style={[styles.btnSeeInfo, isRated ? styles.ratedStyle : undefined]}
        >
          <Text weight="bold" size={12} color={WHITE}>
            {!!isRated ? "Xem đánh giá" : "Đánh giá"}
          </Text>
        </TouchableOpacity>
      )}
      {item.template.type === "TREATMENT_DETAIL" && (
        <TouchableOpacity
          onPress={handleTreatmentDetails}
          style={[styles.btnSeeInfo, styles.treatment]}
        >
          <Text weight="bold" size={12} color={WHITE}>
            Đi đến hậu phẫu
          </Text>
          <Image
            style={sizeIcon.xxxs}
            source={require("src/NewIcon/arrowRightWhite.png")}
          />
        </TouchableOpacity>
      )}
    </Column>
  );
}

const styles = StyleSheet.create({
  btnSeeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: _moderateScale(4),
    paddingHorizontal: 12,
    marginTop: 4,
    borderRadius: _moderateScale(8),
    backgroundColor: BASE_COLOR,
    alignSelf: "flex-start",
  },
  ratedStyle: {
    backgroundColor: GREEN_SUCCESS,
  },
  treatment: {
    backgroundColor: BASE_COLOR,
  },
});

import Avatar from "@Components/Avatar";
import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BLACK_OPACITY_4, NEW_BASE_COLOR } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { getDetailCampainState } from "@Redux/charity/selectors";
import React, { useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigate } from "src/Hooks/useNavigation";

const ITEMS_COUNT = Math.floor((_width - 32) / 40) - 1;

export default function DonationInfo() {
  const { navigate } = useNavigate()
  const { data: {
    fundCurrent,
    fundTarget,
  } } = useSelector(getDetailCampainState)

  const percent = useMemo(() => {
    return parseFloat((fundCurrent / fundTarget * 100).toFixed(2))
  }, [fundTarget, fundCurrent])

  return (
    <Column paddingHorizontal={16}>
      <HorizontalProgress percent={percent} />
      <Row marginTop={4}>
        <Text>Đã đạt được </Text>
        <Text weight="bold" color={NEW_BASE_COLOR} flex={1}>
          {formatMonney(fundCurrent, true)}
        </Text>
        <Text weight="bold">{percent}%</Text>
      </Row>
      <Row gap={8} justifyContent="space-between" marginTop={20}>
        {Array.from(Array(ITEMS_COUNT).keys()).map((_, index) => {
          return <Avatar size={32} key={index} />;
        })}
        <Column borderRadius={16} width={32} aspectRatio={1}>
          <Avatar size={32} />
          <Column
            width={32}
            aspectRatio={1}
            borderRadius={16}
            backgroundColor={BLACK_OPACITY_4}
            position="absolute"
            alignItems="center"
            justifyContent="center"
          >
            <Icon name="dots-horizontal" color="white" size={18} />
          </Column>
        </Column>
      </Row>
      <Text size={12} weight="bold" top={8}>
        Nguyễn Đình Mạnh, NGUYEN HUONG GIANG{" "}
        <Text size={12}>và 2.421 người khác đã ủng hộ</Text>
      </Text>
      <TouchableOpacity onPress={navigate(ScreenKey.CHARITY_ACCOUNT_STATEMENT)}>
        <Row alignSelf="flex-end" marginTop={12}>
          <Text size={12} color={NEW_BASE_COLOR}>
            Xem sao kê tài khoản
          </Text>
          <Icon name="arrow-right-thin" color={NEW_BASE_COLOR} size={18} />
        </Row>
      </TouchableOpacity>
    </Column>
  );
}

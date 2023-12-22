import Avatar from "@Components/Avatar";
import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Icon from "@Components/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { NEW_BASE_COLOR } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { getListPartnerDonateToVolunteer } from "@Redux/charity/actions";
import { getDetailCampainState, getListPartnerDonateToVolunteerState } from "@Redux/charity/selectors";
import React, { useCallback, useMemo } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";

const ITEMS_COUNT = Math.floor((_width - 32) / 40) - 1;

export default function DonationInfo() {
  const dispatch = useDispatch()
  const { navigate } = useNavigate()
  const { data: {
    fundCurrent,
    fundTarget,
    _id: volunteerId
  } } = useSelector(getDetailCampainState)

  const {
    data: listPartnerDonateToVolunteer,
    meta
  } = useSelector(getListPartnerDonateToVolunteerState)

  const percent = useMemo(() => {
    return parseFloat((fundCurrent / fundTarget * 100).toFixed(2))
  }, [fundTarget, fundCurrent])

  useFocused(() => {
    dispatch(getListPartnerDonateToVolunteer.request({
      condition: {
        "volunteerId": { "equal": volunteerId }, "status": { "equal": "ACCEPT" }
      },
      limit: 10
    }))
  })

  const _renderMountDonate = useCallback(() => {
    if (listPartnerDonateToVolunteer?.length > 2) {
      return (
        <Text size={12} weight="bold" top={8}>
          {
            listPartnerDonateToVolunteer?.slice(0, 2)?.map((item, index) => {
              return `${item?.partnerInfo?.name}, `
            })
          }
          <Text size={12}>và {meta?.totalDocuments - 2} người khác đã ủng hộ</Text>
        </Text>
      )
    } else {
      return (
        <Text size={12} weight="bold" top={8}>
          {
            listPartnerDonateToVolunteer?.map((item, index) => {
              return `${item?.partnerInfo?.name}, `
            })
          }
          <Text size={12}>đã ủng hộ</Text>
        </Text>
      )

    }
  }, [listPartnerDonateToVolunteer])

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
      <Row gap={8} marginTop={20}>
        {listPartnerDonateToVolunteer.map((item, index) => {
          return <Avatar circle avatar={item?.partnerInfo?.fileAvatar} size={32} key={index} />;
        })}
        {/* <Column borderRadius={16} width={32} aspectRatio={1}>
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
        </Column> */}
      </Row>

      {
        listPartnerDonateToVolunteer?.length > 0 && _renderMountDonate()
      }
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

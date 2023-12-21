import Avatar from "@Components/Avatar";
import Column from "@Components/Column";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BLACK_OPACITY_7,
  NEW_BASE_COLOR
} from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { getListCompanionRequestAccept } from "@Redux/charity/actions";
import { getDetailCampainState, getListCompanionRequestAcceptState } from "@Redux/charity/selectors";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";


export default function CoFounders() {
  const dispatch = useDispatch()
  const { navigate } = useNavigate()
  const { data: { _id: idCampain } } = useSelector(getDetailCampainState)
  const { data: dataCompanionAccept } = useSelector(getListCompanionRequestAcceptState)

  useFocused(() => {
    dispatch(getListCompanionRequestAccept.request({
      condition: {
        "status": { "equal": "ACCEPT" }, "volunteerId": { "equal": idCampain }
      }
    }))
  })

  return (
    <Column marginTop={20}>
      <Row paddingHorizontal={16}>
        <Text weight="bold">Đồng hành gây quỹ </Text>
        <Text color={NEW_BASE_COLOR} flex={1}>
          ({dataCompanionAccept?.length})
        </Text>
        <TouchableOpacity onPress={navigate(ScreenKey.CHARITY_LIST_COMPANION)}>
          <Text color={NEW_BASE_COLOR}>Xem tất cả</Text>
        </TouchableOpacity>
      </Row>
      {
        dataCompanionAccept?.map((item, index) => {
          return (
            <CoFounderItem key={item?._id} data={item} />
          )
        })
      }
    </Column>
  );
}

function CoFounderItem({ data }) {
  const { navigate } = useNavigate()

  return (
    <TouchableOpacity onPress={navigate(ScreenKey.CHARITY_INFO_CO_FOUNDER, { data })}>
      <Row paddingHorizontal={16} gap={8} marginTop={20}>
        <Avatar size={32} />
        <Column>
          <Text weight="bold">{data?.partner?.name}</Text>
          <Text size={12} color={BLACK_OPACITY_7} fontStyle="italic">
            Đã kêu gọi {formatMonney(data?.targetDeposit, true)}
          </Text>
        </Column>
      </Row>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //
});

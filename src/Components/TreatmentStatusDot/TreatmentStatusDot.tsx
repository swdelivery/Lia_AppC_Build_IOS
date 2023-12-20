import { StyleSheet, View } from 'react-native'
import React from 'react'
import Row from '@Components/Row';
import Text from '@Components/Text';
import { BLUE_FB, GREEN_SUCCESS, RED, SECOND_COLOR } from '@Constant/Color';


type Props = {
  statusCode: string;
};

const TreatmentStatusDot = ({ statusCode = "" }: Props) => {

  switch (statusCode) {
    case "WAIT":
      return (
        <Row gap={8}>
          <View style={[styles.dot, { backgroundColor: "#969696" }]} />
          <Text color={"#969696"}>
            Đang chờ
          </Text>
        </Row>
      )
    case "IN_PROGRESS":
      return (
        <Row gap={8}>
          <View style={[styles.dot, { backgroundColor: BLUE_FB }]} />
          <Text color={BLUE_FB}>
            Đang điều trị
          </Text>
        </Row>
      )

    case "COMPLETE":
      return (
        <Row gap={8}>
          <View style={[styles.dot, { backgroundColor: GREEN_SUCCESS }]} />
          <Text color={GREEN_SUCCESS}>
            Hoàn thành
          </Text>
        </Row>
      )

    case "CANCEL":
      return (
        <Row gap={8}>
          <View style={[styles.dot, { backgroundColor: RED }]} />
          <Text color={RED}>
            Đã huỷ
          </Text>
        </Row>
      )
    case "NOT_COMPLETE":
      return (
        <Row gap={8}>
          <View style={[styles.dot, { backgroundColor: SECOND_COLOR }]} />
          <Text color={SECOND_COLOR}>
            Chưa hoàn thành
          </Text>
        </Row>
      )

    default:
      break;
  }
}

export default TreatmentStatusDot

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red'
  }
})

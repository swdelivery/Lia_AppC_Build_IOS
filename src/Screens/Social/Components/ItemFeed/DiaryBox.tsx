import Column from '@Components/Column'
import { IconRightWhite } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import ScreenKey from '@Navigation/ScreenKey'
import { selectPost } from '@Redux/newfeeds/actions'
import { Post } from "@typings/newfeeds"
import moment from 'moment'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  data: Post
};

const DiaryBox = ({ data }: Props) => {
  const { navigate } = useNavigate()
  const dispatch = useDispatch()

  const { serviceName, branchName, dateTime } = data?.template?.data

  const _handleGoToDetail = () => {
    dispatch(selectPost(data))
    navigate(ScreenKey.DETAIL_POST)()
  }

  return (
    <TouchableOpacity
      onPress={_handleGoToDetail}>
      <LinearGradient
        style={[StyleSheet.absoluteFill]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["#007B5E", "#4AB19A"]}
      />
      <Row
        padding={8 * 2}
        paddingVertical={8}>
        <Column gap={4} flex={1}>
          <Text weight='bold' color={WHITE}>{serviceName}</Text>
          <Text color={WHITE}>Thời gian: {moment(dateTime).format('DD-MM-YYYY')}</Text>
          <Text color={WHITE}>Điều trị tại {`${branchName}`}</Text>
        </Column>
        <IconRightWhite style={sizeIcon.llg} />
      </Row>
    </TouchableOpacity>
  )
}

export default DiaryBox

const styles = StyleSheet.create({})

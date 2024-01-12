import Avatar from '@Components/Avatar'
import Column from '@Components/Column'
import Icon from '@Components/Icon'
import { IconEarth } from '@Components/Icon/Icon'
import Image from '@Components/Image'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BASE_COLOR, BORDER_COLOR, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import ScreenKey from '@Navigation/ScreenKey'
import { selectPost } from '@Redux/newfeeds/actions'
import { Post } from '@typings/newfeeds'
import { first } from 'lodash'
import moment from 'moment'
import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'src/Hooks/useNavigation'

const WIDTH_CARD = 8 * 20

type Props = {
  data: Post;
}

const SmallDiary = ({ data }: Props) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigate()
  const {
    template: {
      data: {
        imageBeforeTreatment,
        imageAfterTreatment,
        serviceName,
        dateTime,
        branchName
      }
    },
    partner: {
      name,
      fileAvatar
    },
    created,
    content,
    images,
  } = data

  const _handleGotoDetail = useCallback(() => {
    dispatch(selectPost(data))
    navigate(ScreenKey.DETAIL_POST)()
  }, [data])

  return (
    <Column
      onPress={_handleGotoDetail}
      width={WIDTH_CARD}>
      <Column
        borderRadius={8}
        borderColor={BORDER_COLOR}
        borderWidth={1}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        gap={8} padding={8}>
        <Row gap={8}>
          <Avatar circle size={8 * 3} avatar={fileAvatar} />
          <Column flex={1}>
            <Text numberOfLines={1} flex={1} weight='bold' size={10}>
              {name}
            </Text>
            <Row gap={4}>
              <IconEarth width={8} height={8} />
              <Text size={8}>
                {moment(created).fromNow()}
              </Text>
            </Row>
          </Column>
        </Row>
        <Text numberOfLines={2} size={10}>
          {content}
        </Text>
        <Row justifyContent='space-between'>
          <Image style={styles.image} avatar={first(imageBeforeTreatment)} />
          <Image style={styles.image} avatar={first(imageAfterTreatment)} />
        </Row>
        <Row height={8 * 3} overflow='hidden' gap={8}>
          {
            images?.map((item, index) => {
              return (
                <Image style={styles.smallImage} avatar={item} />
              )
            })
          }
        </Row>
      </Column>
      <Column
        borderBottomLeftRadius={8}
        borderBottomRightRadius={8}
        overflow='hidden'
        padding={8}
        paddingRight={0}>
        <LinearGradient
          style={[StyleSheet.absoluteFill, { borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[BASE_COLOR, NEW_BASE_COLOR]}
        />
        <Row flex={1}>
          <Column flex={1}>
            <Text
              numberOfLines={1}
              color={WHITE}
              weight='bold'
              size={8}>
              {serviceName}
            </Text>
            <Text
              numberOfLines={2}
              color={WHITE}
              size={8}>
              Thời gian: {moment(dateTime).format("DD-MM-YYYY")}
            </Text>
            <Text
              numberOfLines={1}
              color={WHITE}
              size={8}>
              Điều trị tại {`${branchName}`}
            </Text>
          </Column>
          <Icon color={WHITE} size={20} name='chevron-right' />
        </Row>
      </Column>

    </Column>
  )
}

export default SmallDiary

const styles = StyleSheet.create({
  smallImage: {
    width: 8 * 3,
    height: 8 * 3,
    borderRadius: 4
  },
  image: {
    width: WIDTH_CARD / 2 - 8 * 1.5,
    height: (WIDTH_CARD / 2 - 8 * 1.5) + 8 * 2,
    borderRadius: 4
  }
})

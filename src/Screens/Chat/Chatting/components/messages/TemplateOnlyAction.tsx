import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { Message } from '@typings/chat';
import { _moderateScale, _widthScale } from '@Constant/Scale';
import { BASE_COLOR, BG_GREY_OPACITY_5, BLUE_FB, BORDER_COLOR, GREEN_SUCCESS, GREY_FOR_TITLE, PRICE_ORANGE, WHITE } from '@Constant/Color';
import Text from '@Components/Text';
import Column from '@Components/Column';
import Image from '@Components/Image';
import { formatMonney } from '@Constant/Utils';
import moment from 'moment';
import { useNavigate } from 'src/Hooks/useNavigation';
import ScreenKey from '@Navigation/ScreenKey';
import { styleElement } from '@Constant/StyleElement';
import Row from '@Components/Row';
import { sizeIcon } from '@Constant/Icon';
import { IconArrowRightLarge, IconDoubleRightArrow, IconRightArrow, IconRightWhite } from '@Components/Icon/Icon';

type Props = { item: Message };

const TemplateOnlyAction = ({ item }: Props) => {
  const { navigate } = useNavigate()
  console.log({ item });

  const { template, content } = item

  const _renderActionName = (template) => {
    switch (template?.type) {
      case "BOOKING":
        return `Đặt lịch ngay`
      case "COLLABORATOR":
        return `Khám phá ngay`
      case "SPIN_WHEEL":
        return `Khám phá ngay`
      default:
        break;
    }
  }
  const _renderColor = (template) => {
    switch (template?.type) {
      case "BOOKING":
        return BLUE_FB
      case "COLLABORATOR":
        return BASE_COLOR
      case "SPIN_WHEEL":
        return GREEN_SUCCESS
      default:
        break;
    }
  }

  const _handleNavigateByType = useCallback(() => {
    switch (item?.template?.type) {
      case "BOOKING":
        return navigate(ScreenKey.CREATE_BOOKING, {})()
      case "COLLABORATOR":
        return navigate(ScreenKey.NEW_AFFILIATE, {})()
      case "SPIN_WHEEL":
        return navigate(ScreenKey.LIA_VOUCHER, {})()

      default:
        break;
    }
  }, [])

  return (
    <View>
      <TouchableOpacity
        onPress={_handleNavigateByType}
        style={styles.main}>
        <Column gap={8}>
          <Column gap={4}>
            <Text color={GREY_FOR_TITLE} weight='bold'>
              {content}
            </Text>
          </Column>

          <Row>
            <TouchableOpacity
              onPress={_handleNavigateByType}
              style={[styles.btnSeeInfo, { backgroundColor: _renderColor(template) }]}>
              <Row gap={4}>
                <Text color={WHITE} weight='bold'>
                  {_renderActionName(template)}
                </Text>
                <IconDoubleRightArrow style={sizeIcon.md} />
              </Row>
            </TouchableOpacity>
          </Row>
        </Column>
      </TouchableOpacity>
    </View >
  )
}

export default TemplateOnlyAction

const styles = StyleSheet.create({
  btnSeeInfo: {
    paddingVertical: _moderateScale(2),
    paddingHorizontal: _moderateScale(8 * 2),
    paddingRight: 8,
    borderRadius: _moderateScale(8),
    backgroundColor: BASE_COLOR,
    alignSelf: 'flex-start',
  },
  main: {
    width: _moderateScale(8 * 24),
    borderRadius: _moderateScale(8),
    overflow: 'hidden',
    backgroundColor: WHITE,
    margin: 8 * 2,
    marginBottom: 8
  }
})

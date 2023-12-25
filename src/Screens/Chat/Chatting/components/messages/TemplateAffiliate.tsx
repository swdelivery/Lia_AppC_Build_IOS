import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Message } from '@typings/chat';
import { _moderateScale, _widthScale } from '@Constant/Scale';
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from "@Constant/Color";
import Text from '@Components/Text';
import Column from "@Components/Column";
import { useNavigate } from 'src/Hooks/useNavigation';
import ScreenKey from "@Navigation/ScreenKey";
import Row from '@Components/Row';
import { sizeIcon } from '@Constant/Icon';
import { IconDoubleRightArrow } from "@Components/Icon/Icon";

type Props = { item: Message };

const TemplateAffiliate = ({ item }: Props) => {
  const { navigate } = useNavigate();

  const { template, content } = item


  return (
    <View>
      <TouchableOpacity
        onPress={navigate(ScreenKey.NEW_AFFILIATE, {})}
        style={styles.main}>
        <Column gap={8}>
          <Column gap={4}>
            <Text color={GREY_FOR_TITLE} weight='bold'>
              {content}
            </Text>
          </Column>

          <Row>
            <TouchableOpacity
              onPress={navigate(ScreenKey.NEW_AFFILIATE, {})}
              style={[styles.btnSeeInfo]}>
              <Row gap={4}>
                <Text color={WHITE} weight='bold'>
                  Khám phá ngay
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

export default TemplateAffiliate

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

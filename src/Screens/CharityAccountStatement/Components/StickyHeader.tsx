import Column from '@Components/Column'
import Icon from "@Components/Icon"
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR, GREEN_SUCCESS, GREY, RED, WHITE } from '@Constant/Color'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import React, { useCallback, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigate } from 'src/Hooks/useNavigation'


type Props = {
  currIndexTab: number;
  setCurrIndexTab: (value) => void;
  showFilterIcon?: boolean;
};

const StickyHeader = ({ currIndexTab, setCurrIndexTab, showFilterIcon = false }: Props) => {
  const { navigate } = useNavigate()

  const isActiveIn = useMemo(() => {
    return currIndexTab == 0
  }, [currIndexTab])

  const isActiveOut = useMemo(() => {
    return currIndexTab == 1
  }, [currIndexTab])

  const _handleSetCurrIndexTab = useCallback((value) => () => {
    setCurrIndexTab(value)
  }, [currIndexTab])

  return (
    <Row
      backgroundColor={WHITE}
      width={_width}
      height={8 * 5}>
      <TouchableOpacity
        onPress={_handleSetCurrIndexTab(0)}
        style={[styles.btn, styleElement.centerChild, isActiveIn && { borderBottomColor: GREEN_SUCCESS }]}>
        <Text
          color={isActiveIn ? GREEN_SUCCESS : GREY}
          weight='bold'>
          Thu
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={_handleSetCurrIndexTab(1)}
        style={[styles.btn, styleElement.centerChild, isActiveOut && { borderBottomColor: RED }]}>
        <Text
          color={isActiveOut ? RED : GREY}
          weight='bold'>
          Chi
        </Text>
        {
          showFilterIcon ?
            <Column
              right={8 * 2}
              position='absolute'>
              <TouchableOpacity
                onPress={navigate(ScreenKey.CHARITY_ACCOUNT_MODAL_FILTER)}
                hitSlop={styleElement.hitslopSm}>
                <Icon name="filter-variant" size={24} />
              </TouchableOpacity>
            </Column>
            : <></>
        }


      </TouchableOpacity>
    </Row>
  )
}

export default StickyHeader

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: BORDER_COLOR,
    height: 8 * 5
  }
})

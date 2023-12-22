import Column from '@Components/Column'
import Icon from "@Components/Icon"
import { IconTrashRed } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BG_BEAUTY, GREY, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import { selectCampain } from '@Redux/charity/actions'
import { getListCampainState } from '@Redux/charity/selectors'
import AsyncStorage from '@react-native-community/async-storage'
import { isEmpty } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'

type Props = {
  onChoice: (value) => void
}

const ListSuggestKey = ({ onChoice }: Props) => {
  const dispatch = useDispatch()
  const { navigate } = useNavigate()
  const [listKeyRecent, setListKeyRecent] = useState([]);
  const { data: dataListCampain } = useSelector(getListCampainState)

  const [campainHot, setCampainHot] = useState(null)
  const [campainFavourite, setCampainFavourite] = useState(null)

  useFocused(() => {
    _getListHistorySearchKey()
  })

  useEffect(() => {
    if (!isEmpty(dataListCampain)) {
      let arrTemp = [...dataListCampain];
      let findIndexCampainHot = arrTemp?.findIndex(item => item?.isHot);
      if (findIndexCampainHot !== -1) {
        setCampainHot(arrTemp[findIndexCampainHot])
        arrTemp.splice(findIndexCampainHot, 1)
      }
      let findIndexCampainFavourite = arrTemp?.findIndex(item => item?.favourite);
      if (findIndexCampainFavourite !== -1) {
        setCampainFavourite(arrTemp[findIndexCampainFavourite])
      }
    }
  }, [dataListCampain])

  const _getListHistorySearchKey = async () => {
    let result = await AsyncStorage.getItem("ListHistorySearchKeyCampain");
    setListKeyRecent(JSON.parse(result));
  };

  const _handleClear = useCallback(async () => {
    await AsyncStorage.removeItem("ListHistorySearchKeyCampain");
    setListKeyRecent([])
  }, [])

  const _handleChoice = useCallback((data) => () => {
    onChoice(data)
  }, [])

  const _handleGoToDetailCampain = useCallback((data) => () => {
    dispatch(selectCampain(data))
    navigate(ScreenKey.CHARITY_FUND_DETAILS, { campain: data })()
  }, [campainHot, campainFavourite])

  return (
    <Column>

      <Column
        gap={8}
        paddingHorizontal={8 * 4}
        padding={8 * 2}>

        <TouchableOpacity
          onPress={_handleGoToDetailCampain(campainHot)}>
          <Row alignItems='flex-start' gap={8}>
            <Column style={styles.tag}>
              <Text
                weight='bold'
                color={WHITE}
                size={12}>
                HOT
              </Text>
            </Column>
            <Text style={styleElement.flex}>{campainHot?.name}</Text>
          </Row>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={_handleGoToDetailCampain(campainFavourite)}>
          <Row alignItems='flex-start' gap={8}>
            <Column style={styles.tag}>
              <Row>
                <Icon name={'heart'} color={WHITE} size={10} />
                <Icon name={'heart'} color={WHITE} size={10} />
                <Icon name={'heart'} color={WHITE} size={10} />
              </Row>
            </Column>
            <Text style={styleElement.flex}>{campainFavourite?.name}</Text>
          </Row>
        </TouchableOpacity>
      </Column>
      <Column gap={8}>
        <Row
          justifyContent='space-between'
          paddingHorizontal={8 * 2}>
          <Text>
            Lịch sử tìm kiếm
          </Text>
          <TouchableOpacity
            onPress={_handleClear}
            hitSlop={styleElement.hitslopSm}>
            <IconTrashRed />
          </TouchableOpacity>
        </Row>
        <Row
          gap={8}
          paddingHorizontal={8 * 2}
          flexWrap='wrap'>
          {
            listKeyRecent?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={_handleChoice(item)}
                  key={index} style={styles.btnKeyHistory}>
                  <Text
                    size={12}
                    color={GREY}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </Row>
      </Column>

    </Column>
  )
}

export default ListSuggestKey

const styles = StyleSheet.create({
  btnKeyHistory: {
    paddingHorizontal: 8 * 2,
    paddingVertical: 4,
    backgroundColor: BG_BEAUTY,
    borderRadius: 8
  },
  tag: {
    width: 8 * 6,
    backgroundColor: NEW_BASE_COLOR,
    height: 8 * 2.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  }
})

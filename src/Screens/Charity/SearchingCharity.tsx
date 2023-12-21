import { IconBackBlue, IconFindAroundCirle, IconLogoCharity, IconProfileAroundCirle } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { BORDER_COLOR, NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import ScreenKey from '@Navigation/ScreenKey'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useFocused, useNavigate } from 'src/Hooks/useNavigation'
import HeaderSearch from './SearchingCharityComponents/HeaderSearch'
import ListSuggestKey from './SearchingCharityComponents/ListSuggestKey'
import HorizontalLine from '@Components/Line/HorizontalLine'
import ListCharityPopular from './SearchingCharityComponents/ListCharityPopular'
import Column from '@Components/Column'
import { useDispatch, useSelector } from 'react-redux'
import { getListCampainState } from '@Redux/charity/selectors'
import { searchCampain } from '@Redux/charity/actions'

const SearchingCharity = () => {
  const dispatch = useDispatch()
  const [valueSearch, setValueSearch] = useState('')

  useEffect(() => {
    dispatch(searchCampain.request({
      search: valueSearch
    }))
  }, [valueSearch])

  return (
    <Screen
      safeBottom
      safeTop>
      <FocusAwareStatusBar barStyle='dark-content' />
      <HeaderSearch
        value={valueSearch}
        onChangeText={setValueSearch} />
      <ScrollView contentContainerStyle={{ gap: 8 * 2 }}>
        <ListSuggestKey onChoice={setValueSearch} />
        <ListCharityPopular />
      </ScrollView>
    </Screen>
  )
}

export default SearchingCharity

const styles = StyleSheet.create({
  horizontalLine: {
    backgroundColor: NEW_BASE_COLOR,
    height: 4,
    marginVertical: 8
  }
})

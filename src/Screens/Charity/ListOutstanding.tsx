import Column from '@Components/Column'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { escapeRegExp, isEmpty } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import slugify from 'slugify'
import EachItem from './ListOutstandingComponents/EachItem'
import HeaderSearch from './ListOutstandingComponents/HeaderSearch'

const ListOutstanding = () => {
  const [listData, setListData] = useState(Array.from(new Array(50), (x, i) => {
    return {
      _id: `_id${i}`,
      name: `Hội chữ thập đỏ Việt Nam-${i}`
    }
  }))
  const [listDataFilter, setListDataFilter] = useState([])
  const [valueSearch, setValueSearch] = useState('')

  useEffect(() => {
    filterByNames(listData, valueSearch)
  }, [valueSearch])

  const filterByNames = (data, inputValue) => {
    const re = new RegExp(escapeRegExp(inputValue), "i");
    const results = data.filter((item) => {
      if (item?.name) {
        if (re.test(slugify(item?.name, ' '))) {
          return true;
        }
        else {
          return false;
        }
      }
    });
    if (!isEmpty(results)) {
      setListDataFilter(results)
    }
  };

  const _renderItem = useCallback(({ item }) => {
    return (
      <EachItem data={item} />
    )
  }, [listData])
  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <Screen
      safeBottom
      safeTop>
      <FocusAwareStatusBar barStyle='dark-content' />
      <HeaderSearch
        value={valueSearch}
        setValue={setValueSearch}
      />
      <Column
        margin={8 * 2}
        alignSelf='center'>
        <Text
          color={NEW_BASE_COLOR}
          weight='bold'>
          Cá nhân nổi bật
        </Text>
      </Column>

      <FlatList
        contentContainerStyle={styles.containerStyleFlatlist}
        numColumns={3}
        renderItem={_renderItem}
        keyExtractor={_awesomeChildListKeyExtractor}
        data={!isEmpty(listDataFilter) ? listDataFilter : listData}
      />

    </Screen>
  )
}

export default ListOutstanding

const styles = StyleSheet.create({
  containerStyleFlatlist: { paddingHorizontal: 8 * 4 }
})

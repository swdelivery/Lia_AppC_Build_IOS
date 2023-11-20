import { FlatList, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Screen from '@Components/Screen'
import Header from './Components/Header'
import { WHITE } from '@Constant/Color'
import Text from '@Components/Text'
import Row from '@Components/Row'
import { IconChat } from '@Components/Icon/Icon'
import { _moderateScale } from '@Constant/Scale'
import ItemLastedMessage from './Components/ItemLastedMessage'
import ActionSheetBottom from '@Components/ModalBottom/ActionSheetBottom'
import ActionSheetIcon from '@Components/ModalBottom/ActionSheetIcon'

const NewListLastedMessage = () => {

  const [dataLastedMessage, setDataLastedMessage] = useState([1, 2, 3, 4, 5])


  const _renderItem = ({ item, index }) => {
    return (
      <ItemLastedMessage />
    )
  }

  const HeaderFlatlist = () => {
    return (
      <Row
        gap={_moderateScale(8)}
        marginTop={_moderateScale(8 * 2)}>
        <IconChat
          width={8 * 2.5}
          height={8 * 2.5} />
        <Text weight='bold'>
          Cuộc trò chuyện
        </Text>
      </Row>
    )
  }

  return (
    <Screen style={styles.container}>
      <Header />
      <View style={styles.body}>
        <FlatList
          ListHeaderComponent={<HeaderFlatlist />}
          contentContainerStyle={styles.contentContainerStyle}
          style={styles.flatlistStyle}
          data={dataLastedMessage}
          renderItem={_renderItem}
          keyExtractor={(item, index) => item?._id} />
      </View>
    </Screen>
  )
}

export default NewListLastedMessage

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: _moderateScale(8 * 2)
  },
  flatlistStyle: {
    paddingHorizontal: _moderateScale(8 * 2)
  },
  body: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: WHITE
  }
})

import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '@Components/Text'
import Row from '@Components/Row'
import Column from '@Components/Column'
import { GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'

const ReasonInfo = () => {
  return (
    <Row
      alignItems='flex-start'
      borderRadius={8 * 2}
      borderWidth={1}
      borderColor={NEW_BASE_COLOR}
      marginHorizontal={8 * 2}>
      <Column
        left={-1}
        paddingTop={8}
        height={"100%"}
        paddingBottom={8 * 3}
        style={styleElement.shadow}
        borderRadius={8 * 2}
        backgroundColor={'#0D5070'}
        flex={1}>

        <Column
          gap={4}
          paddingRight={8}
          marginHorizontal={8 * 2}>
          <Text
            color={WHITE}
            weight='bold'>
            Tình trạng:
          </Text>
          <Row gap={8}>
            <Column style={styles.dot} />
            <Text color={WHITE}>
              Một mí
            </Text>
          </Row>
          <Row gap={8}>
            <Column style={styles.dot} />
            <Text color={WHITE}>
              Da dư
            </Text>
          </Row>
          <Row gap={8}>
            <Column style={styles.dot} />
            <Text color={WHITE}>
              Mỡ thừa
            </Text>
          </Row>
        </Column>


      </Column>
      <Column
        marginBottom={8}
        paddingTop={8}
        flex={1}>
        <Column gap={4} marginHorizontal={8 * 2}>
          <Text
            color={GREY_FOR_TITLE}
            weight='bold'>Nguyên nhân</Text>
          <Text>
            Do lão hoá cùng che độ sinh hoạt chưa hợp ly
          </Text>
        </Column>

      </Column>
    </Row>
  )
}

export default ReasonInfo

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: WHITE
  }
})

import Column from '@Components/Column'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { getDetailExaminationResultState } from '@Redux/examinationResults/selectors'
import React from 'react'
import { useSelector } from 'react-redux'

const ReasonInfo = () => {
  const { data: {
    currentStatus,
    reason,
  } } = useSelector(getDetailExaminationResultState);

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
          <Text color={WHITE}>
            {currentStatus}
          </Text>
        </Column>
      </Column>
      <Column
        marginBottom={8}
        paddingTop={8}
        flex={1}>
        <Column gap={4} marginHorizontal={8 * 2}>
          <Text
            color={GREY_FOR_TITLE}
            weight='bold'>Nguyên nhân:</Text>
          <Text>
            {reason}
          </Text>
        </Column>
      </Column>
    </Row>
  )
}
export default ReasonInfo


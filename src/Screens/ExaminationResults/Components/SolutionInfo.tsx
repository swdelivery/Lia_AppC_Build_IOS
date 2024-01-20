import Icon from '@Components/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { NEW_BASE_COLOR } from '@Constant/Color'
import { styleElement } from '@Constant/StyleElement'
import { getDetailExaminationResultState } from '@Redux/examinationResults/selectors'
import React from 'react'
import { useSelector } from 'react-redux'

const SolutionInfo = () => {
  const { data: {
    solution
  } } = useSelector(getDetailExaminationResultState);

  return (
    <Row
      gap={4}
      alignItems='flex-start'
      marginHorizontal={8 * 2}>
      <Row gap={4}>
        <Icon size={8 * 2} color={NEW_BASE_COLOR} name='star' />
        <Text weight='bold'>Giải pháp: </Text>
      </Row>
      <Text style={styleElement.flex}>
        {solution}
      </Text>
    </Row>
  )
}

export default SolutionInfo

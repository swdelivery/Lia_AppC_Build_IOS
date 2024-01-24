import Column from '@Components/Column'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import Text from '@Components/Text'
import { _width } from '@Constant/Scale'
import { getDetailCampainState } from '@Redux/charity/selectors'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'


const Story = () => {
  const { data: { story } } = useSelector(getDetailCampainState)

  if (!story) return null
  return (
    <Column margin={8 * 2}>
      <Text weight='bold'>Câu chuyện</Text>
      <Column>
        {
          story && <RenderHTML
            contentWidth={_width - 8 * 4}
            data={story} />
        }
      </Column>
    </Column>
  )
}

export default Story

const styles = StyleSheet.create({})

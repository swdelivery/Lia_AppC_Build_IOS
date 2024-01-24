import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import Text from '@Components/Text'
import Column from '@Components/Column'
import Row from '@Components/Row'
import { BORDER_COLOR, GREY, NEW_BASE_COLOR, RED, WHITE } from '@Constant/Color'
import Icon from '@Components/Icon'
import { styleElement } from '@Constant/StyleElement'
import moment from 'moment'
import Spacer from '@Components/Spacer'
import { useNavigate } from 'src/Hooks/useNavigation'
import ScreenKey from '@Navigation/ScreenKey'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailCampainState, getVolunteerActionsState } from '@Redux/charity/selectors'
import { getVolunteerActions } from '@Redux/charity/actions'
import { RenderItemProps } from '@typings/common'
import { VolunteerActions } from '@typings/charity'

type EachItemProps = {
  data: VolunteerActions; // Replace YourItemType with the actual type of your data
  index: number;
};


const Timeline = () => {
  const { navigate } = useNavigate()
  const { data: { _id } } = useSelector(getDetailCampainState)
  const { data: volunteerActions } = useSelector(getVolunteerActionsState)
  const dispatch = useDispatch()

  useEffect(() => {
    if (_id) {
      dispatch(getVolunteerActions.request({
        volunteerId: _id
      }))
    }
  }, [_id])

  const EachItem: React.FC<EachItemProps> = useCallback(({ data, index }) => {

    const _handleGoToDetail = useCallback(() => {
      navigate(ScreenKey.DETAIL_CHARITY_JOURNEY)()
    }, [data])

    return (
      <Column >
        <Row gap={8} alignItems='flex-start'>
          <Column
            alignItems='center'
            height={'100%'}
            width={8 * 3}>
            <Column
              style={styleElement.centerChild}
              borderRadius={8 * 1.5}
              backgroundColor={NEW_BASE_COLOR}
              height={8 * 3}
              width={8 * 3}>
              <Text
                color={WHITE}
                weight='bold'>
                {index + 1}
              </Text>
            </Column>
            <Column
              flex={1}
              width={2}
              backgroundColor={NEW_BASE_COLOR} />
          </Column>

          <TouchableOpacity
            disabled
            onPress={_handleGoToDetail}
            style={styleElement.flex} activeOpacity={.7} >
            <Column
              borderColor={BORDER_COLOR}
              borderBottomWidth={1} paddingBottom={8 * 2} gap={8}>
              <Text weight='bold'>
                {data?.name}
              </Text>
              <Row>
                <Row gap={4} flex={1}>
                  <Icon size={8 * 2.5} color={GREY} name='calendar' />
                  <Text size={12} color={GREY} fontStyle='italic'>
                    {moment(data?.created).format('DD/MM/YYYY')}
                  </Text>
                </Row>
                <Row gap={4} flex={1}>
                  <Icon size={8 * 2.5} color={GREY} name='account-group-outline' />
                  <Text size={12} color={GREY} fontStyle='italic'>
                    {data?.members} thành viên
                  </Text>
                </Row>
              </Row>
              <Row alignItems='flex-start' gap={4}>
                <Icon size={8 * 2.5} color={GREY} name={'map-marker-outline'} />
                <Text size={12} style={styleElement.flex}>
                  {data?.address?.fullAddress}
                </Text>
              </Row>
            </Column>
          </TouchableOpacity>
        </Row>
      </Column>
    )
  }, [])

  return (
    <Column
      marginTop={8 * 2}
      marginHorizontal={8 * 2}>
      <Row gap={8}>
        <Text weight='bold'>Hành trình thiện nguyện</Text>
        <Text weight='bold' color={NEW_BASE_COLOR}>
          (3)
        </Text>
      </Row>
      <Spacer top={8 * 2} />
      <Column gap={8}>
        {
          volunteerActions?.map((item, index) => {
            return (
              <EachItem data={item} key={index} index={index} />
            )
          })
        }
      </Column>
    </Column>
  )
}

export default Timeline

const styles = StyleSheet.create({})

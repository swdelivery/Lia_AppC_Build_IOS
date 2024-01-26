import Column from '@Components/Column';
import RenderHTML from '@Components/RenderHTML/RenderHTML';
import Screen from '@Components/Screen';
import { StatusBar } from '@Components/StatusBar';
import { _width } from '@Constant/Scale';
import ScreenKey from '@Navigation/ScreenKey';
import { getDetailVolunteerAction } from '@Redux/charity/actions';
import { getDetailVolunteerActionState } from '@Redux/charity/selectors';
import HorizonListImage from "@Screens/NewDetailService/Components/HorizonListImage";
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigationParams } from "src/Hooks/useNavigation";
import Header from './Components/Header';
import Info from './Components/Info';


type ScreenK = typeof ScreenKey.DETAIL_CHARITY_JOURNEY;

const DetailCharityJourney = () => {
  const { _id } = useNavigationParams<ScreenK>();
  const dispatch = useDispatch()
  const { data } = useSelector(getDetailVolunteerActionState)

  useEffect(() => {
    if (_id) {
      dispatch(getDetailVolunteerAction.request(_id))
    }
  }, [_id])

  return (
    <Screen safeBottom>
      <StatusBar barStyle='light-content' />
      <Header title='Chi tiết điểm đến' />
      <ScrollView>
        <HorizonListImage images={[data?.avatar]} />
        <Info />
        {
          data?.locationInfo && <Column marginHorizontal={8 * 2}>
            <RenderHTML contentWidth={_width - 8 * 4} data={data?.locationInfo} />
          </Column>
        }
      </ScrollView>
    </Screen>
  )
}

export default DetailCharityJourney

const styles = StyleSheet.create({})

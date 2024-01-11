import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import { styleElement } from '@Constant/StyleElement'
import ListDiary from '@Screens/ResultAIScanEyes/Components/ListDiary'
import RecomendBrach from '@Screens/ResultAIScanEyes/Components/RecomendBrach'
import RecomendDoctor from '@Screens/ResultAIScanEyes/Components/RecomendDoctor'
import RecomendService from '@Screens/ResultAIScanEyes/Components/RecomendService'
import React from 'react'
import ContentLoader, { Rect } from "react-content-loader/native"
import { View } from 'react-native'
import CircleChart from './CircleChart'
import ListImages from './ListImages'
import ListSkin from './ListSkin'
import TypeSkin from './TypeSkin'

const Body = () => {
  return (
    <View style={styleElement.flex}>

      <AfterTimeoutFragment placeholder={<Placeholder />} timeout={1000}>
        <ListImages />
        <TypeSkin />
        <CircleChart />
        <ListSkin />
        <ListDiary />
        <RecomendService />
        <RecomendDoctor />
        <RecomendBrach />
      </AfterTimeoutFragment>
    </View>

  )
}

export default Body


const Placeholder = () => {
  return (
    <View>
      <ContentLoader>
        <Rect x="0" y="0" rx="4" ry="4" width="100%" height="200" />
        <Rect x="10" y="210" rx="4" ry="4" width="95%" height="40" />
        <Rect x="10" y="260" rx="4" ry="4" width="95%" height="40" />
        <Rect x="10" y="310" rx="4" ry="4" width="100" height="20" />
        <Rect x="10" y="340" rx="4" ry="4" width="200" height="20" />
        <Rect x="10" y="370" rx="4" ry="4" width="60%" height="40" />
        <Rect x="65%" y="370" rx="4" ry="4" width="30%" height="40" />
      </ContentLoader>
    </View>
  )
}

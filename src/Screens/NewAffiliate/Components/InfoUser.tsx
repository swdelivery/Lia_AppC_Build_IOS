import { Image, StyleSheet, View } from 'react-native'
import React, { useMemo } from 'react'
import Column from '@Components/Column'
import Avatar from '@Components/Avatar'
import { _heightScale } from '@Constant/Scale'
import { BLACK, WHITE } from '@Constant/Color'
import Text from '@Components/Text'
import { useSelector } from 'react-redux'
import { getInfoUserReducer } from '@Redux/Selectors'
import { getCurrPartnerLevelState } from '@Redux/affiliate/selectors'
import { styleElement } from '@Constant/StyleElement'

const InfoUser = () => {
  const { infoUser } = useSelector(getInfoUserReducer);
  const { data: currPartnerLevel } = useSelector(getCurrPartnerLevelState)

  const generateColor = useMemo(() => {
    switch (currPartnerLevel?.code) {
      case "BRONZE":
        return '#B3653A'
      case "SILVER":
        return '#4B7697'
      case "GOLD":
        return '#DBAA46'
      case "PLATINUM":
        return '#4AB4C9'
      default:
        return WHITE
    }
  }, [currPartnerLevel])

  const generateLevel = useMemo(() => {

    switch (currPartnerLevel?.code) {
      case "BRONZE":
        return (
          <Image
            resizeMode="contain"
            style={styles.levelCode}
            source={require("../../../NewImage/Affiliate/bronzeLevel.png")}
          />
        );
      case "SILVER":
        return (
          <Image
            resizeMode="contain"
            style={styles.levelCode}
            source={require("../../../NewImage/Affiliate/silverLevel.png")}
          />
        );
      case "GOLD":
        return (
          <Image
            resizeMode="contain"
            style={styles.levelCode}
            source={require("../../../NewImage/Affiliate/goldLevel.png")}
          />
        );
      case "PLATINUM":
        return (
          <Image
            resizeMode="contain"
            style={styles.levelCode}
            source={require("../../../NewImage/Affiliate/platinumLevel.png")}
          />
        );
      default:
        return null
    }
  }, [currPartnerLevel])

  return (
    <Column
      gap={8}
      alignItems='center'
      alignSelf='center'>
      <Column
        style={styleElement.centerChild}
        backgroundColor={generateColor}
        height={_heightScale(8 * 6.5)}
        borderRadius={_heightScale(8 * 6.5) / 2}
        width={_heightScale(8 * 6.5)}>
        <Avatar
          circle
          size={_heightScale(8 * 6)}
          avatar={infoUser.fileAvatar} />
      </Column>
      <Column
        alignItems='center'>
        <Text
          size={_heightScale(12)}
          color={WHITE}
          weight='bold'>
          {infoUser?.name}
        </Text>
        {generateLevel}
        {/* <Text
          size={_heightScale(12)}
          color={generateColor}
          weight='bold'>
          {currPartnerLevel?.name}
        </Text> */}
      </Column>
    </Column>
  )
}

export default InfoUser

const styles = StyleSheet.create({
  levelCode: {
    width: _heightScale(8 * 10),
    height: 8 * 3
  }
})

import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { BASE_COLOR, WHITE } from '../../Constant/Color'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { _moderateScale } from '../../Constant/Scale'
import { IconBXH, IconBackGrey, IconBackWhite, IconWallet } from '../../Components/Icon/Icon'
import { stylesFont } from '../../Constant/Font'

import ScreenKey from '../../Navigation/ScreenKey'
import { navigation } from '../../../rootNavigation'
import { sizeIcon } from '../../Constant/Icon'

const LiAHeader = memo((props) => {
    return (
      <>
        <StatusBar translucent barStyle={props?.barStyle || "light-content"} />
        <View
          style={[styles.header, props?.bg && { backgroundColor: props?.bg }]}
        >
          <View
            style={{
              height: getStatusBarHeight(),
            }}
          />
          <View style={styles.header__box}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {props?.barStyle == "light-content" ? (
                  <IconBackWhite style={sizeIcon.llg} />
                ) : (
                  <IconBackGrey style={sizeIcon.llg} />
                )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 4, alignItems: "center" }}>
              <Text
                style={[
                  stylesFont.fontNolanBold,
                  { color: WHITE, fontSize: _moderateScale(16) },
                  props?.titleColor && { color: props?.titleColor },
                ]}
              >
                {props?.title}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            ></View>
          </View>
        </View>
      </>
    );
})

export default LiAHeader

const styles = StyleSheet.create({
    header__box: {
        height: _moderateScale(8 * 6),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: _moderateScale(8 * 2)
    },
    header: {
        backgroundColor: BASE_COLOR,
        // borderBottomWidth:.5,
        // borderBottomColor:'rgba(0,0,0,.3)'
    }
})
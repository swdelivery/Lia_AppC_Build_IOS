import Text from '@Components/Text';
import { BASE_COLOR, BG_GREY_OPACITY_5 } from '@Constant/Color';
import { stylesFont } from '@Constant/Font';
import { _moderateScale } from '@Constant/Scale';
import { URL_ORIGINAL } from '@Constant/Url';
import { PartnerDiary } from '@typings/newfeeds';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';


type Props = {
  data: PartnerDiary
};

const ListDiaries = ({ data }: Props) => {
  const { dailyDiaryArr } = data
  return (
    <View>
      {
        dailyDiaryArr?.length > 0 && dailyDiaryArr?.map((item, index) => {
          return (
            <View key={item?._id} style={styles.container}>
              <View style={styles.line} >
                <View style={styles.line__dot} />
              </View>
              <View style={styles.main}>
                <Text weight='bold'>
                  {moment(item?.date).format('DD/MM/YYYY')}
                </Text>
                {
                  item?.description?.length > 0 ?
                    <Text marginTop={8}>
                      {item?.description}
                    </Text>
                    : <></>
                }
                {
                  item?.images?.length > 0 ?
                    <View style={styles.containerImages}>
                      {
                        item?.images?.map((itemMap, index) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                              }}
                              key={itemMap?._id} style={styles.imageBox}>
                              <Image
                                style={styles.image}
                                source={{ uri: `${URL_ORIGINAL}${itemMap?.link}` }}
                              />
                            </TouchableOpacity>
                          )
                        })
                      }
                    </View>
                    : <></>
                }
                <View style={styles.blankView} />

              </View>
            </View>
          )
        })
      }
    </View>
  )
}

export default ListDiaries

const styles = StyleSheet.create({
  blankView: {
    height: _moderateScale(8 * 4)
  },
  image: {
    width: _moderateScale(8 * 16),
    height: _moderateScale(8 * 16),
    borderRadius: _moderateScale(8)
  },
  imageBox: {
    marginTop: _moderateScale(8),
    marginRight: _moderateScale(8)
  },
  containerImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: _moderateScale(8)
  },
  time: {
    ...stylesFont.fontNolanBold,
    fontSize: _moderateScale(14)
  },
  main: {
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: _moderateScale(8 * 1)
  },
  line__dot: {
    width: _moderateScale(8),
    height: _moderateScale(8),
    backgroundColor: BASE_COLOR,
    borderRadius: _moderateScale(4),
    position: 'absolute',
    top: _moderateScale(6)
  },
  line: {
    width: _moderateScale(2),
    backgroundColor: BG_GREY_OPACITY_5,
    alignItems: 'center',
    marginLeft: _moderateScale(8 * 2)
  },
  container: {
    flexDirection: 'row'
  }
})

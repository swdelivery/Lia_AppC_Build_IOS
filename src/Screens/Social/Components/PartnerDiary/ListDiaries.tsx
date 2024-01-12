import Text from '@Components/Text';
import { BASE_COLOR, BG_GREY_OPACITY_5, NEW_BASE_COLOR } from '@Constant/Color';
import { stylesFont } from '@Constant/Font';
import { _moderateScale } from '@Constant/Scale';
import { URL_ORIGINAL } from '@Constant/Url';
import { PartnerDiary } from '@typings/newfeeds';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import EnhancedImageViewing from 'react-native-image-viewing/dist/ImageViewing';
import useVisible from 'src/Hooks/useVisible';
import { getImageAvataUrl } from 'src/utils/avatar';


type Props = {
  data: PartnerDiary
};

const ListDiaries = ({ data }: Props) => {
  const { dailyDiaryArr } = data

  const _canculateDiffDays = useCallback((dailyDiary) => {
    const daysDifference = moment(dailyDiary?.date).diff(data?.treatmentDate, 'days');
    if (daysDifference == 0) {
      return `Ngày đầu tiên  `
    }
    return `Sau ${daysDifference} ngày  `;
  }, [data])

  const ListImage = useCallback((images) => {
    const imageViewer = useVisible<number>();
    const listImageToViewing = useMemo(() => {
      return images?.data?.map(item => {
        return {
          uri: getImageAvataUrl(item)
        }
      })
    }, [])
    const _handlePressImage = useCallback((idx: number) => () => {
      imageViewer.show(idx)
    }, [])

    return (
      <View style={styles.containerImages}>
        {
          images?.data?.map((itemMap, index) => {
            return (
              <TouchableOpacity
                onPress={_handlePressImage(index)}
                key={itemMap?._id} style={styles.imageBox}>
                <Image
                  style={styles.image}
                  source={{ uri: `${URL_ORIGINAL}${itemMap?.link}` }}
                />
              </TouchableOpacity>
            )
          })
        }
        <EnhancedImageViewing
          images={listImageToViewing}
          imageIndex={imageViewer.selectedItem.current}
          onRequestClose={imageViewer.hide}
          visible={imageViewer.visible}
        />
      </View>
    )
  }, [dailyDiaryArr])

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
                  {_canculateDiffDays(item)}
                  <Text color={NEW_BASE_COLOR}>
                    ({moment(item?.date).format('DD/MM/YYYY')})
                  </Text>
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
                    <ListImage data={item?.images} />
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

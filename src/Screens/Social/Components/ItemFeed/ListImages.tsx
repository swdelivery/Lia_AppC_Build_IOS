import Column from '@Components/Column'
import Image from '@Components/Image'
import Row from '@Components/Row'
import { WHITE } from '@Constant/Color'
import { stylesFont } from '@Constant/Font'
import { Post } from "@typings/newfeeds"
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  data: Post
};

const ListImages = ({ data }: Props) => {
  const { imageBeforeTreatment, imageAfterTreatment } = data?.template?.data
  const { images } = data

  return (
    <Column gap={8 * 2}>
      <Row
        marginHorizontal={8 * 2}
        gap={8 * 2}>
        <TouchableOpacity style={styles.containerImage}>
          <Image
            style={styles.image}
            avatar={imageBeforeTreatment[0]} />
          <View style={styles.containerText}>
            <Text style={styles.containerText__text}>
              Trước điều trị
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containerImage}>
          <Image
            style={styles.image}
            avatar={imageAfterTreatment[0]} />
          <View style={styles.containerText}>
            <Text style={styles.containerText__text}>
              Sau điều trị
            </Text>
          </View>
        </TouchableOpacity>
      </Row>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 * 2, gap: 8 }}
        horizontal>
        {
          images?.map((item, index) => {
            return (
              <TouchableOpacity>
                <Image
                  style={styles.otherImage}
                  avatar={item} />
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </Column>
  )
}

export default ListImages


const styles = StyleSheet.create({
  otherImage: {
    width: 8 * 8,
    height: 8 * 8,
    borderRadius: 8
  },
  containerText__text: {
    color: WHITE,
    ...stylesFont.fontNolan500,
    fontSize: 14
  },
  containerText: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.5)',
    padding: 8,
    borderTopEndRadius: 8,
    paddingVertical: 4,
    fontSize: 14
  },
  containerImage: {
    flex: 1,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    flex: 1
  },
})


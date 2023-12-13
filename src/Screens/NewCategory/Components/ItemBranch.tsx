import Avatar from '@Components/Avatar';
import { Certificates } from '@Components/Certificate/Certificate';
import Column from '@Components/Column';
import HorizontalServices from '@Components/HorizontalServices';
import Icon from "@Components/Icon";
import CountStar2 from '@Components/NewCountStar/CountStar';
import Row from '@Components/Row';
import Text from '@Components/Text';
import { BORDER_COLOR, RED } from '@Constant/Color';
import { _width } from '@Constant/Scale';
import { styleElement } from '@Constant/StyleElement';
import { Branch } from '@typings/branch';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const WIDTH_CARD_BRANCH = ((_width - 80)) - 8 * 2

type Props = {
  data: Branch
};

const ItemBranch = ({ data }: Props) => {

  const {
    avatar,
    name,
    averageRating,
    reviewCount,
    countPartner,
    address,
    branchFileArr,
    branchServices


  } = data

  return (
    <Column
      style={[styles.card]}>
      <Row paddingBottom={12} alignItems="flex-start" gap={8}>
        <Avatar size={48} avatar={avatar} circle />
        <View style={styleElement.flex}>
          <Row justifyContent="space-between" gap={4}>
            <Text numberOfLines={2} weight="bold" flex={1}>
              {name}
            </Text>
            <TouchableOpacity style={styles.adviseBtn}>
              <Text size={12} color="white" weight="bold">
                Tư vấn
              </Text>
            </TouchableOpacity>
          </Row>
          <CountStar2
            rating={averageRating}
            count={reviewCount}
            countPartner={countPartner}
            size={12} />
          <Row gap={4} marginTop={2}>
            <Icon name="map-marker" color={RED} size={14} />
            <Text size={12} color="grey" right={8} style={styleElement.flex}>
              {address}
            </Text>
          </Row>

          <Certificates data={branchFileArr} />
        </View>
      </Row>
      {branchServices.length > 0 && (
        <HorizontalServices items={branchServices} />
      )}
    </Column>
  )
}

export default ItemBranch


const styles = StyleSheet.create({
  avatar: {
    width: 8 * 6,
    height: 8 * 6,
    borderRadius: (8 * 6) / 2,
    borderWidth: 0.5,
  },
  adviseBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4BA888",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8 * 2,
  },
  locationIcon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
  },
  serviceContainer: {
    width: 100,
    // height: 180,
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 8 * 1,
  },
  serviceImage: {
    width: 100,
    height: 75,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  serviceContent: {
    padding: 4,
  },
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  start2: {
    width: 8 * 1,
    height: 8 * 1,
    marginLeft: 1,
    resizeMode: "contain",
  },
  card: {
    width: WIDTH_CARD_BRANCH,
    paddingVertical: 8,
    marginLeft: 8,
    paddingHorizontal: 8,
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER_COLOR
  },
  container: {
    // flex: 1,
    // paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  // placeholderItem: {
  //   height: PLACEHOLDER_HEIGHT,
  //   borderWidth: 0,
  //   backgroundColor: "white",
  //   marginHorizontal: 16,
  //   padding: 8,
  //   borderRadius: 8,
  //   marginTop: 8,
  // },
})

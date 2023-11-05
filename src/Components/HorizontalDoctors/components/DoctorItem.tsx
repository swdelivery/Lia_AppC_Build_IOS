import FastImage from "@Components/FastImage";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import ScreenKey from "@Navigation/ScreenKey";
import { Doctor } from "@typings/doctor";
import React, { useMemo } from "react";
import { StyleSheet, Pressable } from "react-native";
import { useNavigate } from "src/Hooks/useNavigation";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  item: Doctor;
};

export default function DoctorItem({ item }: Props) {
  const { navigate } = useNavigate();

  const doctorImage = useMemo(() => {
    return getImageAvataUrl(item.avatar);
  }, [item]);

  return (
    <Pressable
      key={item?._id}
      onPress={navigate(ScreenKey.DETAIL_DOCTOR, { idDoctor: item._id })}
      style={styles.doctorItem}
    >
      <FastImage style={styles.image} uri={doctorImage} />
      <Text weight="bold" size={12} top={4}>
        {item.name}
      </Text>
      <CountStar2
        size={10}
        rating={item.averageRating}
        count={item.reviewCount}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  doctorItem: {
    width: 100,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
});

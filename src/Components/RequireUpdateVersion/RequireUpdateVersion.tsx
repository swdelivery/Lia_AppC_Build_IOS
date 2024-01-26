import Column from '@Components/Column';
import Fade from "@Components/Fade";
import Text from '@Components/Text';
import { BLACK_OPACITY_8, WHITE } from '@Constant/Color';
import { styleElement } from '@Constant/StyleElement';
import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import useVisible from 'src/Hooks/useVisible';

type Props = {
  visible: boolean;
};

export default function Intro({ visible }: Props) {
  return (
    <Fade visible={visible} duration={300} style={styles.container}>
      <Column
        style={styleElement.centerChild}
        flex={1}>
        <Column
          style={styleElement.centerChild}
          width={300}
          borderRadius={8}
          paddingTop={8 * 4}
          paddingBottom={8 * 2}
          backgroundColor={WHITE}>
          <Column
            gap={8 * 2}
            paddingHorizontal={8 * 2}
            alignItems='center'>
            <Image
              style={[styles.logoSize]}
              source={require('../../NewImage/log_with_bg.png')} />
            <Text size={16} weight='bold'>
              Thông báo
            </Text>
            <Text style={{ textAlign: 'center' }}>
              Phiên bản ứng dụng hiện tại không hỗ trợ một số tính năng, vui lòng cập nhật phiên bản mới nhất của ứng dụng.
            </Text>
            <TouchableOpacity hitSlop={styleElement.hitslopSm}>
              <Column
                borderRadius={4}
                backgroundColor={"#C8C8C8"}
                paddingVertical={4}
                paddingHorizontal={8 * 4}>
                <Text
                  color={BLACK_OPACITY_8}
                  weight='bold'>
                  Đồng ý
                </Text>
              </Column>
            </TouchableOpacity>
          </Column>
        </Column>
      </Column>
    </Fade>
  )
}


export function useVersionCheck() {
  const visible = useVisible(false);

  useEffect(() => {

  }, []);

  return visible;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,.3)",
    zIndex: 100,
  },
  logoSize: {
    width: 60,
    height: 60,
    borderRadius: 8 * 2
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 8 * 2,
    backgroundColor: WHITE
  }
});

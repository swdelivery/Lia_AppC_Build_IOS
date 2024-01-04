import Column from "@Components/Column";
import ModalBottom from "@Components/ModalBottom/ModalBottom";
import RenderHTML from "@Components/RenderHTML/RenderHTML";
import Text from "@Components/Text";
import { WHITE } from "@Constant/Color";
import { _heightScale, _widthScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { getCurrActiveWheelSpinState } from "@Redux/wheelSpin/selectors";
import React from "react";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

type Props = {
  visibleModalInfo: any;
};

const ModalInfo = ({ visibleModalInfo }: Props) => {
  const { data: currActiveWheel } = useSelector(getCurrActiveWheelSpinState);

  return (
    <ModalBottom
      borderWidth={2}
      borderBottomWidth={0}
      borderColor={"#D20002"}
      borderTopLeftRadius={8 * 2}
      borderTopRightRadius={8 * 2}
      onClose={visibleModalInfo.hide}
      heightModal={_heightScale(600)}
      visible={visibleModalInfo.visible}
    >
      <Column
        backgroundColor={"#D20002"}
        width={8 * 20}
        height={8 * 4}
        borderRadius={8 * 2}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}
        style={styleElement.centerChild}
        position="absolute"
        alignSelf="center"
        top={-8 * 4}
      >
        <Text color={WHITE} weight="bold">
          GIỚI THIỆU
        </Text>
      </Column>
      <Column
        marginTop={8}
        flex={1}
        alignSelf="center"
        width={_widthScale(340)}
      >
        <ScrollView>
          {currActiveWheel?.description && (
            <RenderHTML data={currActiveWheel?.description} />
          )}
        </ScrollView>
      </Column>
    </ModalBottom>
  );
};

export default ModalInfo;

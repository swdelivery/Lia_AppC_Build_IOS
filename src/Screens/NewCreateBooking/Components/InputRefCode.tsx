import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { _moderateScale } from "@Constant/Scale";
import { BORDER_COLOR, GREEN_SUCCESS, GREY, RED, WHITE } from "@Constant/Color";
import Text from "@Components/Text";
import { getPartnerByCollaboratorCode } from "@Redux/Action/ProfileAction";
import Collapsible from "react-native-collapsible";
import { IconTick } from "@Components/Icon/Icon";
import { sizeIcon } from "@Constant/Icon";
import Row from "@Components/Row";
import TextInput from "@Components/TextInput";

const InputRefCode = () => {
  const [valueRefCode, setValueRefCode] = useState("");
  const [currPartnerCollab, setCurrPartnerCollab] = useState({});

  useEffect(() => {
    if (valueRefCode?.length > 0) {
      _getPartnerInviter(valueRefCode);
    }
  }, [valueRefCode]);

  const _getPartnerInviter = async (valueRefCode) => {
    let result = await getPartnerByCollaboratorCode({
      collaboratorCode: valueRefCode?.trim(),
    });
    if (result?.isAxiosError) return setCurrPartnerCollab({});
    setCurrPartnerCollab(result?.data?.data);
  };

  return (
    <View
      style={{
        marginHorizontal: _moderateScale(8 * 2),
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 8,
      }}
    >
      <View style={styles.container}>
        <View style={styles.topTitle}>
          <Text weight="bold">Mã giới thiệu</Text>
        </View>
        <View style={{ paddingHorizontal: 8 * 3 }}>
          <TextInput
            style={[
              { flex: 1 },
              currPartnerCollab?._id
                ? { color: GREEN_SUCCESS }
                : { color: RED },
            ]}
            value={valueRefCode}
            onChangeText={setValueRefCode}
            placeholder="VD: VJSIFOJWS67"
          />
        </View>
      </View>
      <Collapsible collapsed={currPartnerCollab?._id ? false : true}>
        <Row gap={8} paddingHorizontal={8 * 3} paddingBottom={8 * 2}>
          <Text>
            Tìm thấy người giới thiệu:{" "}
            <Text weight="bold">{currPartnerCollab?.name}</Text>
          </Text>
          <IconTick style={sizeIcon.sm} />
        </Row>
      </Collapsible>
    </View>
  );
};

export default InputRefCode;

const styles = StyleSheet.create({
  topTitle: {
    top: -10,
    alignSelf: "flex-start",
    left: 8 * 2,
    backgroundColor: WHITE,
    paddingHorizontal: 8,
    position: "absolute",
  },
  container: {
    minHeight: _moderateScale(8 * 6),
    justifyContent: "center",
  },
});

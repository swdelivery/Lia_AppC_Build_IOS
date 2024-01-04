import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { ImageBackground } from "react-native";
import { _width } from "@Constant/Scale";
import Text from "@Components/Text";
import { BLACK, WHITE } from "@Constant/Color";
import Row from "@Components/Row";
import Column from "@Components/Column";
import { BackIcon } from "@Components/Icon/Icon";
import { PartnerLevel } from "@typings/affiliate";
import { getImageAvataUrl } from "src/utils/avatar";
import { formatMonney } from "@Constant/Utils";
import { useSelector } from "react-redux";
import {
  getCurrPartnerLevelState,
  getListPartnerLevelState,
} from "@Redux/affiliate/selectors";
import { getInfoUserReducer } from "@Redux/Selectors";
import { TouchableOpacity } from "react-native";

const WIDTH_CARD = _width - 8 * 4;
const WIDTH_PROCESS_BAR = _width - 8 * 4 - 8 * 4;

type Props = {
  data: PartnerLevel;
  setShowModalInfoRanked: (state) => void;
  showPolicy: () => void;
};

const CardLevel = ({ data, setShowModalInfoRanked, showPolicy }: Props) => {
  const { data: listPartnerLevel } = useSelector(getListPartnerLevelState);
  const { data: currPartnerLevel } = useSelector(getCurrPartnerLevelState);
  const {
    infoUser: { liaPoint },
  } = useSelector(getInfoUserReducer);
  const { levelImg, startPoint, endPoint, code } = data;

  const statusProcess = useMemo(() => {
    let findIndexCurrPartnerLevel = listPartnerLevel.findIndex(
      (item) => item?.code == currPartnerLevel?.code
    );
    let findIndexThisCard = listPartnerLevel.findIndex(
      (item) => item?.code == data?.code
    );
    if (findIndexCurrPartnerLevel == findIndexThisCard) {
      return "isInProccessing";
    } else if (findIndexCurrPartnerLevel > findIndexThisCard) {
      return "isPassed";
    } else if (findIndexCurrPartnerLevel < findIndexThisCard) {
      return "isWaiting";
    }
  }, [listPartnerLevel, currPartnerLevel, data]);

  const percentProccessBar = useMemo(() => {
    return (liaPoint - startPoint) / (endPoint - startPoint);
  }, [liaPoint, startPoint, endPoint]);

  const generateColor = useMemo(() => {
    switch (code) {
      case "BRONZE":
        return "#B3653A";
      case "SILVER":
        return "#4B7697";
      case "GOLD":
        return "#DBAA46";
      case "PLATINUM":
        return "#4AB4C9";
      default:
        return BLACK;
    }
  }, [code]);

  const isHighestLevel = useMemo(() => {
    let findIndexCurrPartnerLevel = listPartnerLevel?.findIndex(
      (item) => item?.code == data.code
    );
    if (
      findIndexCurrPartnerLevel !== -1 &&
      findIndexCurrPartnerLevel == listPartnerLevel?.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }, [listPartnerLevel, data]);

  return (
    <ImageBackground
      style={styles.card}
      source={{ uri: getImageAvataUrl(levelImg) }}
    >
      <Row justifyContent="space-between" margin={8 * 2} marginRight={8}>
        <Text color={WHITE} weight="bold">
          Chào mừng quý khách đến với LiA
        </Text>
        <TouchableOpacity onPress={showPolicy}>
          <Row>
            <Text color={WHITE} weight="bold">
              Chính sách
            </Text>
            <Column
              style={{
                transform: [
                  {
                    rotate: "180deg",
                  },
                ],
              }}
            >
              <BackIcon height={8 * 2} width={8 * 2} color={WHITE} />
            </Column>
          </Row>
        </TouchableOpacity>
      </Row>
      <Column flex={1} />
      <Text color={WHITE}>{/* {statusProcess} */}</Text>

      <Column margin={8 * 2}>
        {currPartnerLevel?.code == "PLATINUM" &&
        currPartnerLevel?.code == data?.code ? (
          <></>
        ) : (
          <Column
            borderRadius={8 * 8}
            backgroundColor={"rgba(255,255,255,.5)"}
            height={4}
            width={WIDTH_PROCESS_BAR}
          >
            {statusProcess == "isInProccessing" ? (
              <Column
                borderRadius={8 * 8}
                backgroundColor={generateColor}
                width={percentProccessBar * WIDTH_PROCESS_BAR}
                height={4}
              >
                <Column
                  top={-2}
                  position="absolute"
                  right={-4}
                  backgroundColor={WHITE}
                  borderRadius={4}
                  height={4 * 2}
                  width={4 * 2}
                />
              </Column>
            ) : (
              <>
                {statusProcess == "isPassed" ? (
                  <Column
                    borderRadius={8 * 8}
                    backgroundColor={generateColor}
                    width={WIDTH_PROCESS_BAR}
                    height={4}
                  ></Column>
                ) : (
                  <Column
                    borderRadius={8 * 8}
                    backgroundColor={WHITE}
                    width={0}
                    height={4}
                  ></Column>
                )}
              </>
            )}
          </Column>
        )}

        {currPartnerLevel?.code == "PLATINUM" &&
        currPartnerLevel?.code == data?.code ? (
          <Column alignItems="center" marginTop={8}>
            <Text color={WHITE} weight="bold">
              Bạn đã đạt thứ hạng cao nhất
            </Text>
            <Text color={WHITE} weight="bold">
              Số điểm hiện tại: {formatMonney(liaPoint)}
            </Text>
          </Column>
        ) : (
          <>
            {isHighestLevel ? (
              <Row justifyContent="center" marginTop={8}>
                <Text color={WHITE} weight="bold">
                  Từ {formatMonney(startPoint)}
                </Text>
              </Row>
            ) : (
              <Row justifyContent="space-between" marginTop={8}>
                <Text color={WHITE} weight="bold">
                  {formatMonney(startPoint)}
                </Text>
                {statusProcess == "isInProccessing" ? (
                  <Row gap={4}>
                    <Text color={WHITE} weight="bold">
                      {formatMonney(liaPoint)}
                    </Text>
                    <Text weight="bold" color={WHITE}>
                      /
                    </Text>
                    <Text color={WHITE} weight="bold">
                      {formatMonney(endPoint)}
                    </Text>
                  </Row>
                ) : (
                  <Text color={WHITE} weight="bold">
                    {formatMonney(endPoint)}
                  </Text>
                )}
              </Row>
            )}
          </>
        )}
      </Column>
    </ImageBackground>
  );
};

export default CardLevel;

const styles = StyleSheet.create({
  card: {
    width: WIDTH_CARD,
    height: (WIDTH_CARD * 796) / 1484,
  },
});

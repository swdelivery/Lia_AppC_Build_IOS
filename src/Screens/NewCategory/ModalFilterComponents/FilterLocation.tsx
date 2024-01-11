import Column from "@Components/Column";
import { IconArrowDown } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { BORDER_COLOR, NEW_BASE_COLOR } from "@Constant/Color";
import { sizeIcon } from "@Constant/Icon";
import { isEmpty } from "lodash";
import React from "react";
import { TouchableOpacity } from "react-native";
import useHapticCallback from "src/Hooks/useHapticCallback";

type Props = {
  visibleModalBottomLocation: any;
  provinceChoiced: any;
};

const FilterLocation = ({
  visibleModalBottomLocation,
  provinceChoiced,
}: Props) => {
  const _handleShow = useHapticCallback(() => {
    visibleModalBottomLocation.show();
  }, []);

  return (
    <Row gap={8 * 2} padding={8 * 2}>
      <Text weight="bold">Vị trí</Text>
      <TouchableOpacity onPress={_handleShow}>
        <Column
          paddingVertical={4}
          borderWidth={1}
          borderColor={BORDER_COLOR}
          borderRadius={8}
          paddingHorizontal={8 * 2}
        >
          <Row gap={8}>
            {!isEmpty(provinceChoiced) ? (
              <Text weight="bold" color={NEW_BASE_COLOR} size={12}>
                {provinceChoiced?.cityName}
              </Text>
            ) : (
              <Text size={12}>Nhấn để chọn vị trí</Text>
            )}
            <IconArrowDown style={sizeIcon.sm} />
          </Row>
        </Column>
      </TouchableOpacity>
    </Row>
  );
};

export default FilterLocation;

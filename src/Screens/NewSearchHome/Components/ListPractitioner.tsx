import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { stylesFont } from '../../../Constant/Font';
import { _moderateScale, _widthScale, _heightScale, _width } from '../../../Constant/Scale';
import { WHITE, BASE_COLOR, SECOND_COLOR, THIRD_COLOR, GREY, BTN_PRICE, BG_GREY_OPACITY_2, BG_GREY_OPACITY_5, BLACK_OPACITY_8, PRICE_ORANGE } from '../../../Constant/Color';
import { styleElement } from '../../../Constant/StyleElement';
import { sizeIcon } from '../../../Constant/Icon';
import { navigation } from '../../../../rootNavigation';
import ScreenKey from '../../../Navigation/ScreenKey'
import { formatMonney } from '../../../Constant/Utils';
import { URL_ORIGINAL } from '../../../Constant/Url';
import CountStar from '../../../Components/CountStar/index';
import FastImage from '../../../Components/Image/FastImage';
import { RenderItemProps } from '@typings/common';
import PractitionerItem from "../../SoYoungPractitioner/components/PractitionerItem";

const ListPractitioner = memo((props) => {

    function renderItem({ item }: RenderItemProps<any>) {
        return <PractitionerItem item={item} />;
    }

    return (
        <FlatList
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            data={props?.data?.data}
            renderItem={renderItem}
        />
    );
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingHorizontal: 8 * 1,
        paddingBottom: 30,
    },
})



export default ListPractitioner;

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
import Spacer from '@Components/Spacer';
import useItemExtractor from 'src/Hooks/useItemExtractor';
import { Service } from '@typings/serviceGroup';
import ServiceItem from '@Screens/SoYoungService/components/ServiceItem';
import { RenderItemProps } from '@typings/common';
import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment';
import PlaceholderSkeletons from '@Components/PlaceholderSkeletons';
import { isTablet } from 'src/utils/platform';

const ListService = (props) => {


    function renderItem({ item, index }: RenderItemProps<Service>) {
        const numColumns = isTablet ? 3 : 2;
        return (
            <ServiceItem
                item={item}
                numColumns={numColumns}
                isFirstInRow={index % numColumns === 0}
            />
        );
    }
    const { keyExtractor } = useItemExtractor<Service>((item) => item._id);

    return (
        <FlatList
            style={styles.list}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            numColumns={2}
            data={props?.data?.data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            removeClippedSubviews
        />
    );
}

const styles = StyleSheet.create({
    list: {
    },
    container: {
        paddingTop: 8,
        paddingBottom: 60,
        marginHorizontal: _moderateScale(10),
        gap: 8,
    },
})


export default ListService;

import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment';
import Column from '@Components/Column';
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData';
import LoadingIndicator from '@Components/LoadingIndicator/LoadingIndicator';
import { getDataForModalFilterService, getListServiceFilter, selectServiceBranchGroup, selectServiceChildCodeGroup, selectServiceLocation, selectServiceRangePrice, selectServiceUtilities } from '@Redux/category/actions';
import { getDataFilterServiceState, getResultListServiceState } from '@Redux/category/selectors';
import { isEmpty } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ItemService from './ItemService';

const ResultService = () => {
  const dispatch = useDispatch()
  const {
    dataServiceParentCodeGroup,
    dataServiceCoupon,
    dataServiceAverageRating,
    dataServiceMostPopular,
    dataServiceSortPrice,

    dataServiceChildCodeGroup,
    dataServiceLocation,
    dataServiceBranchGroup,
    dataServiceRangePrice,
    dataServiceUtilities,
    dataServiceSearching
  } = useSelector(getDataFilterServiceState)
  const { data: dataResultListService, isLoading } = useSelector(getResultListServiceState)

  useEffect(() => {
    if (!isEmpty(dataServiceParentCodeGroup)) {
      requestAnimationFrame(() => {
        let dataFetch = {
          condition: {},
          sort: {}
        };
        if (!isEmpty(dataServiceChildCodeGroup)) {
          dataFetch['condition']["codeGroup"] = {
            in: dataServiceChildCodeGroup.map(item => item?.code)
          };
        } else {
          dataFetch['condition']["codeGroup"] = {
            in: [dataServiceParentCodeGroup?.code]
          };
        }
        if (dataServiceCoupon) {
          dataFetch['condition']["preferential"] = { "notEqual": [] }
        }
        if (dataServiceAverageRating) {
          dataFetch['sort']["averageRating"] = -1
        }
        if (dataServiceMostPopular) {
          dataFetch['sort']["reviewCount"] = -1
          dataFetch['sort']["countPartner"] = -1
        }
        if (dataServiceSortPrice) {
          dataFetch['sort']["price"] = dataServiceSortPrice
        }
        if (!isEmpty(dataServiceLocation)) {
          dataFetch['condition']["cityCode"] = { "equal": dataServiceLocation?.codeCity[0] }
        }
        if (!isEmpty(dataServiceBranchGroup)) {
          dataFetch['condition']["type"] = {
            "in": dataServiceBranchGroup
          }
        }
        if (dataServiceRangePrice) {
          dataFetch['condition']["price"] = {
            "from": 0, "to": dataServiceRangePrice
          }
        }
        if (!isEmpty(dataServiceUtilities)) {
          dataFetch['condition']["utilities"] = {
            "in": dataServiceUtilities
          }
        }
        if (dataServiceSearching?.trim()?.length > 0) {
          dataFetch['search'] = dataServiceSearching
        }

        dispatch(getListServiceFilter.request(dataFetch))
      });
    }
  }, [
    dataServiceCoupon,
    dataServiceAverageRating,
    dataServiceMostPopular,
    dataServiceSortPrice,
    dataServiceSearching
  ])

  useEffect(() => {
    if (dataServiceParentCodeGroup) {
      requestAnimationFrame(() => {
        let dataFetch = {
          condition: {},
          sort: {}
        };
        dataFetch['condition']["codeGroup"] = {
          in: [dataServiceParentCodeGroup?.code]
        };
        if (dataServiceCoupon) {
          dataFetch['condition']["preferential"] = { "notEqual": [] }
        }
        if (dataServiceAverageRating) {
          dataFetch['sort']["averageRating"] = -1
        }
        if (dataServiceMostPopular) {
          dataFetch['sort']["reviewCount"] = -1
          dataFetch['sort']["countPartner"] = -1
        }
        if (dataServiceSortPrice) {
          dataFetch['sort']["price"] = dataServiceSortPrice
        }
        if (dataServiceSearching?.trim()?.length > 0) {
          dataFetch['search'] = dataServiceSearching
        }

        dispatch(getListServiceFilter.request(dataFetch))
        dispatch(getDataForModalFilterService.request(dataServiceParentCodeGroup))
        dispatch(selectServiceChildCodeGroup([]))
        dispatch(selectServiceLocation(null))
        dispatch(selectServiceBranchGroup([]))
        dispatch(selectServiceRangePrice(null))
        dispatch(selectServiceUtilities([]))
      });
    }
  }, [dataServiceParentCodeGroup])

  const _renderItemService = ({ item, index }) => {
    return (
      <ItemService data={item} />
    )
  }

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <AfterTimeoutFragment timeout={200}>
      <Column
        flex={1}
        alignItems='center'>
        {
          isLoading ?
            <LoadingIndicator />
            :
            <FlatList
              ListEmptyComponent={<EmptyResultData title='Không tìm thấy dữ liệu' />}
              contentContainerStyle={{ justifyContent: 'space-between', paddingVertical: 8 }}
              renderItem={_renderItemService}
              keyExtractor={_awesomeChildListKeyExtractor}
              numColumns={2}
              data={dataResultListService} />
        }

      </Column>
    </AfterTimeoutFragment>
  )
}

export default ResultService

const styles = StyleSheet.create({})

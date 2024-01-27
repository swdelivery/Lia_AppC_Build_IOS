import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import LiAHeader from '@Components/Header/LiAHeader'
import { useNavigate, useNavigationParams } from 'src/Hooks/useNavigation'
import { getNewsById } from '@Redux/Action/News'
import { NEW_BASE_COLOR } from '@Constant/Color'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import { AfterTimeoutFragment } from '@Components/AfterTimeoutFragment'
import Placeholder from '@Screens/NewDetailBranch/Components/Placeholder'
import ActionButton from '@Components/ActionButton/ActionButton'
import ScreenKey from '@Navigation/ScreenKey'
import useRequireLoginCallback from 'src/Hooks/useRequireLoginAction'

const DetailNews = () => {
    const { navigate } = useNavigate()
    const { idNews } = useNavigationParams();
    console.log({ idNews });

    const [news, setNews] = useState(null)

    useEffect(() => {
        if (idNews) {
            requestAnimationFrame(() => {
                _getNews(idNews)
            })
        }
    }, [idNews])

    const _getNews = async (idNews) => {
        let result = await getNewsById(idNews);
        if (result?.isAxiosError) return
        setNews(result);
    }

    const _handleBooking = useRequireLoginCallback(() => {
        navigate(ScreenKey.CREATE_BOOKING)()
    }, [])
    const _handleWheelSpin = useRequireLoginCallback(() => {
        navigate(ScreenKey.WHEEL_SPIN)()
    }, [])

    const _handleRedirect = useCallback(() => {
        const { data } = news?.onClickAction
        switch (data) {
            case "FLASH_SALE":
                return navigate(ScreenKey.FLASHSALE_SCREEN)()
            case "BOOKING":
                return _handleBooking()
            case "LUCKY_WHEEL":
                return _handleWheelSpin()
            default:
                break;
        }
    }, [news?.onClickAction])

    const generateTitle = useMemo(() => {
        console.log({ news });
        if (!news?.onClickAction?.data) return ''
        switch (news?.onClickAction?.data) {
            case "FLASH_SALE":
                return `Săn ngay ưu đãi`
            case "BOOKING":
                return `Làm đẹp ngay`
            case "LUCKY_WHEEL":
                return `Tham gia ngay`
            default:
                break;
        }
    }, [news])

    return (
        <Screen safeBottom>
            <FocusAwareStatusBar barStyle='light-content' />
            <LiAHeader bg={NEW_BASE_COLOR} title={news?.title} safeTop />
            <AfterTimeoutFragment placeholder={<Placeholder />}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 8 * 2 }}>
                    {news?.content && <RenderHTML data={news?.content} />}
                </ScrollView>
                {
                    news?.onClickAction?.data ?
                        <ActionButton
                            onPress={_handleRedirect}
                            title={generateTitle} />
                        : <></>
                }

            </AfterTimeoutFragment>
        </Screen>
    )
}

export default DetailNews

const styles = StyleSheet.create({})

import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
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

    const _handleBooking = useCallback(() => {
        navigate(ScreenKey.CREATE_BOOKING)()
    }, [])

    return (
        <Screen safeBottom>
            <FocusAwareStatusBar barStyle='light-content' />
            <LiAHeader bg={NEW_BASE_COLOR} title={news?.title} safeTop />
            <AfterTimeoutFragment placeholder={<Placeholder />}>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 8 * 2 }}>
                    {news?.content && <RenderHTML data={news?.content} />}
                </ScrollView>
                <ActionButton
                    onPress={_handleBooking}
                    title='Đặt hẹn ngay' />
            </AfterTimeoutFragment>
        </Screen>
    )
}

export default DetailNews

const styles = StyleSheet.create({})

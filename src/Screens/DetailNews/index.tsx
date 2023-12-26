import { ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '@Components/Text'
import Screen from '@Components/Screen'
import { FocusAwareStatusBar } from '@Components/StatusBar'
import LiAHeader from '@Components/Header/LiAHeader'
import { useNavigationParams } from 'src/Hooks/useNavigation'
import { getNewsById } from '@Redux/Action/News'
import { NEW_BASE_COLOR } from '@Constant/Color'
import RenderHTML from '@Components/RenderHTML/RenderHTML'

const DetailNews = () => {
    const { idNews } = useNavigationParams();
    console.log({ idNews });

    const [news, setNews] = useState(null)

    useEffect(() => {
        if (idNews) {
            _getNews(idNews)
        }
    }, [idNews])

    const _getNews = async (idNews) => {
        let result = await getNewsById(idNews);
        if (result?.isAxiosError) return
        setNews(result);
    }

    return (
        <Screen safeBottom>
            <FocusAwareStatusBar barStyle='light-content' />
            <LiAHeader bg={NEW_BASE_COLOR} title={news?.title} safeTop />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 8 * 2 }}>
                <RenderHTML data={news?.content} />
            </ScrollView>
        </Screen>
    )
}

export default DetailNews

const styles = StyleSheet.create({})

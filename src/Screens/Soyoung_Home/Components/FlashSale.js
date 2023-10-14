import Lottie from 'lottie-react-native';
import React, { memo } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { _widthScale } from '../../../Constant/Scale';


const FlashSale = memo(() => {


    const _renderItem=()=>{
        return(
            <View style={{
                marginRight:8,
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Image 
                style={{
                    width:80,
                    height:80,
                    borderRadius:8
                }}
                source={{uri:`https://img2.soyoung.com/product/20220314/9/75964f6913b08b834829758a6d88d9d8_400_300.png?imageView2/0/format/webp`}}
                />
                <Text style={{
                    color:'red',
                    fontSize:12,
                    fontWeight:'500',
                    marginTop:4
                }}>
                    1.900.000
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.fls__title}>
                <Lottie
                    speed={1}
                    autoPlay={true}
                    loop={true}
                    style={{ width: 50, height: 50 }}
                    // ref={animationLoadRef}
                    source={require('../../../Json/flashsale.json')}
                />
                <Text style={{
                    fontSize: 15,
                    color: 'red',
                    fontWeight: 'bold'
                }}>
                    Flash Sale
                </Text>

                <View style={{ height: 4 }} />
                {/* <View style={styles.btnFls}>


                </View> */}
                <View style={{
                    flexDirection:'row'
                }}>
                    <View style={{
                        backgroundColor:'black',
                        paddingHorizontal:2,
                        paddingVertical:2,
                        borderRadius:4
                    }}>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:12}}>
                            00
                        </Text>
                    </View>
                    <View style={{width:2}}/>
                    <View>
                        <Text>
                            :
                        </Text>
                    </View>
                    <View style={{width:2}}/>
                    <View style={{
                        backgroundColor:'black',
                        paddingHorizontal:2,
                        paddingVertical:2,
                        borderRadius:4
                    }}>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:12}}>
                            30
                        </Text>
                    </View>
                    <View style={{width:2}}/>
                    <View>
                        <Text>
                            :
                        </Text>
                    </View>
                    <View style={{width:2}}/>
                    <View style={{
                        backgroundColor:'black',
                        paddingHorizontal:2,
                        paddingVertical:2,
                        borderRadius:4
                    }}>
                        <Text style={{color:'white',fontWeight:'bold',fontSize:12}}>
                            59
                        </Text>
                    </View>
                </View>
            </View>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={_renderItem}
                data={[1, 2, 3, 4, 5,6,7,8,9,10,11]}
                keyExtractor={({ item, index }) => index}
            />

        </View>
    )
})

export default FlashSale

const styles = StyleSheet.create({
    btnFls: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8 * 1,
        backgroundColor: '#EB4D49'
    },
    fls__title: {
        width: 100,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        width: _widthScale(350),
        height: _widthScale(110),
        alignSelf: 'center',
        borderRadius: 8,
        backgroundColor: 'rgba(255,255,255,1)',
        flexDirection: 'row',
    }
})
import React, { memo } from 'react';
import FastImage from 'react-native-fast-image';
import { BG_GREY_OPACITY_5 } from '../../Constant/Color';


const FastImageComponent = props => {
    // const [overLay, setOverLay] = useState(true)

    // _onEnd = () => {
    //     console.log(`_____AAAAAAA____()}: ${new Date()}`)

    //     setOverLay(false)
    // }

    // _onStart = () => {
    //     FastImage.preload([{ uri: 'https://cdn-images-1.medium.com/max/1600/1*-CY5bU4OqiJRox7G00sftw.gif' }])
    // }

    return (
        <>
            <FastImage
                style={[...props.style,{backgroundColor:BG_GREY_OPACITY_5}]}
                source={{
                    uri: props?.uri,
                    priority: FastImage.priority.high,
                }}
                resizeMode={props?.resizeMode ? props?.resizeMode : 'cover'}
                onLoadEnd={props.onLoadEnd ? props.onLoadEnd : null}
            // resizeMode={FastImage.resizeMode} 
            />
            {/* {
                overLay ?
                    <View style={[...props.style, { position: 'absolute', zIndex: 1, backgroundColor: 'grey' }]} >
                        
                    </View>

                    :
                    <>
                    </>
            } */}
        </>
    );
};

{/* <SkeletonPlaceholder >
                            <SkeletonPlaceholder.Item height={props.style[0].height} borderRadius={props.style[0].borderRadius} width={props.width ? props.width : props.style[0].width} />
                        </SkeletonPlaceholder> */}
export default memo(FastImageComponent);
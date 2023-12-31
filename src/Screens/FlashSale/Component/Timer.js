import _ from 'lodash';
import React, {
    useState,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
import { BG_BEAUTY_OPACITY_1, BG_GREY_OPACITY_5, GREY_FOR_TITLE, RED, THIRD_COLOR, WHITE } from '../../../Constant/Color';
import { _moderateScale } from '../../../Constant/Scale';
  
  const Timer = forwardRef((props, ref) => {
    // For Total seconds
    const [timeStamp, setTimeStamp] = useState(
      props.timestamp ? props.timestamp : 0,
    );
    // Delay Required
    const [delay, setDelay] = useState(props.delay ? props.delay : 1000);
  
    // Flag for informing parent component when timer is over
    const [sendOnce, setSendOnce] = useState(true);
  
    // Flag for final display time format
    const [finalDisplayTime, setFinalDisplayTime] = useState('');
  
    useInterval(() => {
      if (timeStamp > 0) {
        setTimeStamp(timeStamp - 1);
      } else if (sendOnce) {
        if (props.timerCallback) {
          props.timerCallback(true);
        } else {
          console.log('Please pass a callback function...');
        }
        setSendOnce(false);
      }
      setFinalDisplayTime(secondsToDhms(timeStamp));
    }, delay);
  
    function secondsToDhms(seconds) {
      seconds = Number(seconds);
      var d = Math.floor(seconds / (3600 * 24));
      var h = Math.floor((seconds % (3600 * 24)) / 3600);
      var m = Math.floor((seconds % 3600) / 60);
      var s = Math.floor(seconds % 60);
  
    //   var dDisplay = d > 0 ? d + 'd ' : '';
    //   var hDisplay = h > 0 ? h + 'h ' : '';
    //   var mDisplay = m > 0 ? m + 'm ' : '';
    //   var sDisplay = s > 0 ? s + 's ' : '';
    //   return dDisplay + hDisplay + mDisplay + sDisplay;
        return {d,h,m,s}
    }
  
    const refTimer = useRef();
    useImperativeHandle(ref, () => ({
      resetTimer: () => {
        // Clearing days, hours, minutes and seconds
        // Clearing Timestamp
        setTimeStamp(props.timestamp);
        setSendOnce(true);
      },
    }));
    

    return (
      <View ref={refTimer} style={{flexDirection:'row'}}>
        {props?.opacity === true ?
        <>
        <View style={styles.itemTime1}>
          <Text style={styles.textTime1}>{finalDisplayTime.h}</Text>
          </View>
          <Text style={{color:WHITE, fontSize:_moderateScale(10), alignSelf: 'center', marginRight: _moderateScale(2)}}>giờ</Text>
          <View style={styles.itemTime1}>
          <Text style={styles.textTime1}>{finalDisplayTime.m}</Text>
          </View>
          <Text style={{color:WHITE, fontSize:_moderateScale(10), alignSelf: 'center', marginRight: _moderateScale(2)}}>phút</Text>

          <View style={styles.itemTime1}>
          <Text style={styles.textTime1}>{finalDisplayTime.s}</Text>
          </View>
       </>
        :
       <>
        <View style={styles.itemTime}>
          <Text style={styles.textTime}>{finalDisplayTime.h}</Text>
          </View>
          <Text style={{color:WHITE, fontSize:_moderateScale(10), alignSelf: 'center', marginRight: _moderateScale(2)}}>giờ</Text>
          <View style={styles.itemTime}>
          <Text  style={styles.textTime}>{finalDisplayTime.m}</Text>
          </View>
          <Text style={{color:WHITE, fontSize:_moderateScale(10), alignSelf: 'center', marginRight: _moderateScale(2)}}>phút</Text>

          <View style={styles.itemTime}>
          <Text  style={styles.textTime}>{finalDisplayTime.s}</Text>
          </View>
       </>
        }
         
      
      </View>
    );
  });
  
  function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => {
          clearInterval(id);
        };
      }
    }, [delay]);
  }

  const styles = StyleSheet.create({
    itemTime:{
            borderRadius: _moderateScale(4),
            width: _moderateScale(20), 
            backgroundColor: '#fff',
            padding: _moderateScale(2),
            margin: _moderateScale(3),
            height: _moderateScale(20), 
            justifyContent:'center', 
            alignItems:'center'
          },
      itemTime1:{
            borderRadius: _moderateScale(4),
            width: _moderateScale(20), 
            backgroundColor: BG_BEAUTY_OPACITY_1,
            padding: _moderateScale(2),
            margin: _moderateScale(3),
            height: _moderateScale(20), 
            justifyContent:'center', 
            alignItems:'center'
        },
        textTime:{
          color: GREY_FOR_TITLE,
          fontSize: _moderateScale(14)
        },
        textTime1:{
          color: WHITE,
          fontSize: _moderateScale(14),
        }
  })
  
  export default Timer;
import ReactNativeHapticFeedback, {
  HapticOptions,
} from 'react-native-haptic-feedback';

const trigger = (options?: HapticOptions) => {
  ReactNativeHapticFeedback.trigger('impactLight', {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
    ...options,
  });
};

export default {
  trigger,
};

declare module "react-native-config" {
  export interface NativeConfig {
    ENV?: string;
    URL_FOR_PARTNER?: string;
    URL_ORIGINAL?: string;
    BUNDLE_ID?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

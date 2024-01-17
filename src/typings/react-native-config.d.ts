declare module "react-native-config" {
  export interface NativeConfig {
    URL_FOR_PARTNER?: string;
    URL_ORIGINAL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

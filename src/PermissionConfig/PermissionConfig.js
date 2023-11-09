import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'
import { Platform } from 'react-native'

const PLATFORM_MICROPHONE_PERMISSIONS = {
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO
}

const PLATFORM_GALLERY_PERMISSIONS = {
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
}

const PLATFORM_CAMERA_PERMISSIONS = {
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
}

const REQUEST_PERMISSION_TYPE = {
    microphone: PLATFORM_MICROPHONE_PERMISSIONS,
    gallery:PLATFORM_GALLERY_PERMISSIONS,
    camera:PLATFORM_CAMERA_PERMISSIONS
}

const PERMISSION_TYPE = {
    microphone: 'microphone',
    gallery:'gallery',
    camera:'camera'
}

class AppPermission {

    checkPermission = async (type): Promise<boolean> => {
        console.log("AppPermission checkPermission type: ", type);
        const permissions = REQUEST_PERMISSION_TYPE[type][Platform.OS]
        console.log("AppPermission checkPermission permissions: ", permissions);

        if (!permissions) {
            return true
        }
        try {
            const result = await check(permissions)
            console.log("AppPermission checkPermission result: ", result);
            return result
            if (result === RESULTS.GRANTED) return true
            // return this.requestPermission(permissions) //request permission
        } catch (error) {
            console.log("AppPermission checkPermission error: ", error);
            return false
        }
    }

    requestPermission = async (permissions): Promise<boolean> => {
        console.log("AppPermission requestPermission permissions: ", permissions);
        try {
            const result = await request(permissions)
            console.log("AppPermission requestPermission result: ", result);
            return result 
        } catch (error) {
            console.log("AppPermission requestPermission error: ", error);
            return false
        }
    }
}

const Permission = new  AppPermission()
export {Permission, PERMISSION_TYPE,REQUEST_PERMISSION_TYPE,PLATFORM_CAMERA_PERMISSIONS,PLATFORM_MICROPHONE_PERMISSIONS}
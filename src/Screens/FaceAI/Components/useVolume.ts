import { useEffect, useState } from "react";
import { VolumeManager } from "react-native-volume-manager";

export default function useVolume() {
  const [volume, setVolume] = useState(-1);

  useEffect(() => {
    VolumeManager.getVolume().then((result) => {
      setVolume(result.volume);
    });
    // Listen to volume changes
    const volumeListener = VolumeManager.addVolumeListener((result) => {
      setVolume(result.volume);
      // On Android, additional volume types are available:
      // music, system, ring, alarm, notification
    });
    return () => {
      volumeListener.remove();
    };
  }, []);

  return volume;
}

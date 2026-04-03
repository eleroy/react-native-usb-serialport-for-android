import { TurboModuleRegistry, NativeModules } from 'react-native';
// Prefer the TurboModule implementation, but fall back to the legacy
// NativeModules entry if TurboModuleRegistry doesn't return a module.
const TurboModule = TurboModuleRegistry.get('UsbSerialportForAndroid');
const UsbSerialportForAndroid = TurboModule ?? NativeModules.UsbSerialportForAndroid;
export default UsbSerialportForAndroid;
//# sourceMappingURL=NativeUsbSerialPort.js.map
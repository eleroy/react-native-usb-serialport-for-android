import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import UsbSerialportForAndroid from './NativeUsbSerialPort.js';
import UsbSerial from './UsbSerial.js';
export { UsbSerial };
const { CODE_DEVICE_NOT_FOND, CODE_DRIVER_NOT_FOND, CODE_NOT_ENOUGH_PORTS, CODE_PERMISSION_DENIED, CODE_OPEN_FAILED, CODE_DEVICE_NOT_OPEN, CODE_SEND_FAILED, CODE_READ_FAILED, CODE_DEVICE_NOT_OPEN_OR_CLOSED, } = NativeModules.UsbSerialportForAndroid.getConstants();
export const Codes = {
    DEVICE_NOT_FOND: CODE_DEVICE_NOT_FOND,
    DRIVER_NOT_FOND: CODE_DRIVER_NOT_FOND,
    NOT_ENOUGH_PORTS: CODE_NOT_ENOUGH_PORTS,
    PERMISSION_DENIED: CODE_PERMISSION_DENIED,
    OPEN_FAILED: CODE_OPEN_FAILED,
    DEVICE_NOT_OPEN: CODE_DEVICE_NOT_OPEN,
    SEND_FAILED: CODE_SEND_FAILED,
    READ_FAILED: CODE_READ_FAILED,
    DEVICE_NOT_OPEN_OR_CLOSED: CODE_DEVICE_NOT_OPEN_OR_CLOSED,
};
const eventEmitter = new NativeEventEmitter(NativeModules.UsbSerialportForAndroid);
export var Parity;
(function (Parity) {
    Parity[Parity["None"] = 0] = "None";
    Parity[Parity["Odd"] = 1] = "Odd";
    Parity[Parity["Even"] = 2] = "Even";
    Parity[Parity["Mark"] = 3] = "Mark";
    Parity[Parity["Space"] = 4] = "Space";
})(Parity || (Parity = {}));
export var Driver;
(function (Driver) {
    Driver[Driver["Auto"] = 0] = "Auto";
    Driver[Driver["CDC"] = 1] = "CDC";
    Driver[Driver["FTDI"] = 2] = "FTDI";
})(Driver || (Driver = {}));
const defaultManager = {
    list() {
        return UsbSerialportForAndroid.list();
    },
    async tryRequestPermission(deviceId) {
        const result = await UsbSerialportForAndroid.tryRequestPermission(deviceId);
        return result === 1;
    },
    hasPermission(deviceId) {
        return UsbSerialportForAndroid.hasPermission(deviceId);
    },
    async open(deviceId, options) {
        await UsbSerialportForAndroid.open(deviceId, options.baudRate, options.dataBits, options.stopBits, options.parity, options.dtr, options.rts, options.driver);
        return new UsbSerial(deviceId, eventEmitter);
    },
};
export const UsbSerialManager = Platform.OS === 'android'
    ? defaultManager
    : new Proxy({}, {
        get() {
            return () => {
                throw new Error(`Not support ${Platform.OS}`);
            };
        },
    });
//# sourceMappingURL=index.js.map
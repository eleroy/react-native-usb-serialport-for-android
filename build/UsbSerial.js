import UsbSerialportForAndroid from './NativeUsbSerialPort.js';
const DataReceivedEvent = 'usbSerialPortDataReceived';
export default class UsbSerial {
    deviceId;
    NativeEventEmitter;
    listeners;
    constructor(deviceId, NativeEventEmitter) {
        this.deviceId = deviceId;
        this.NativeEventEmitter = NativeEventEmitter;
        this.listeners = [];
    }
    /**
     * Send data with hex string.
     *
     * May return error with these codes:
     * * DEVICE_NOT_OPEN
     * * SEND_FAILED
     *
     * See {@link Codes}
     * @param hexStr
     * @returns
     */
    send(hexStr) {
        return UsbSerialportForAndroid.send(this.deviceId, hexStr);
    }
    read() {
        return UsbSerialportForAndroid.read(this.deviceId);
    }
    isOpen() {
        return UsbSerialportForAndroid.isOpen(this.deviceId);
    }
    onReceived(listener) {
        const listenerProxy = (event) => {
            if (!event.data) {
                return;
            }
            listener(event);
        };
        let subscription = this.NativeEventEmitter.addListener(DataReceivedEvent, listenerProxy);
        this.listeners.push(subscription);
        return subscription;
    }
    /**
     *
     * May return error with these codes:
     * * DEVICE_NOT_OPEN_OR_CLOSED
     *
     * See {@link Codes}
     * @returns
     */
    close() {
        for (const listener of this.listeners) {
            listener.remove();
        }
        return UsbSerialportForAndroid.close(this.deviceId);
    }
}
//# sourceMappingURL=UsbSerial.js.map
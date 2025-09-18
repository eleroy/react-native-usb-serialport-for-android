import type { NativeEventEmitter, EventSubscription } from 'react-native';
import UsbSerialportForAndroid from './NativeUsbSerialPort';

const DataReceivedEvent = 'usbSerialPortDataReceived';

export interface EventData {
  deviceId: number;
  data: string;
  [key: string]: any;
}

export type Listener = (data: EventData) => void;

export default class UsbSerial {
  deviceId: number;
  private NativeEventEmitter: NativeEventEmitter<EventData>;
  private listeners: EventSubscription[];

  constructor(deviceId: number, NativeEventEmitter: NativeEventEmitter) {
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
  send(hexStr: string): Promise<null> {
    return UsbSerialportForAndroid.send(this.deviceId, hexStr);
  }

  read(): Promise<String> {
    return UsbSerialportForAndroid.read(this.deviceId);
  }

  isOpen(): boolean {
    return UsbSerialportForAndroid.isOpen(this.deviceId);
  }

  onReceived(listener: Listener) {
    const listenerProxy = (event: EventData) => {
      if (!event.data) {
        return;
      }

      listener(event);
    };
    let subscription = this.NativeEventEmitter.addListener(
      DataReceivedEvent,
      listenerProxy
    );
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
  close(): Promise<any> {
    for (const listener of this.listeners) {
      listener.remove();
    }
    return UsbSerialportForAndroid.close(this.deviceId);
  }
}

import type { NativeEventEmitter } from 'react-native';
export interface EventData {
    deviceId: number;
    data: string;
    [key: string]: any;
}
export type Listener = (data: EventData) => void;
export default class UsbSerial {
    deviceId: number;
    private NativeEventEmitter;
    private listeners;
    constructor(deviceId: number, NativeEventEmitter: NativeEventEmitter);
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
    send(hexStr: string): Promise<null>;
    read(): Promise<String>;
    isOpen(): boolean;
    onReceived(listener: Listener): import("react-native").EmitterSubscription;
    /**
     *
     * May return error with these codes:
     * * DEVICE_NOT_OPEN_OR_CLOSED
     *
     * See {@link Codes}
     * @returns
     */
    close(): Promise<any>;
}
//# sourceMappingURL=UsbSerial.d.ts.map
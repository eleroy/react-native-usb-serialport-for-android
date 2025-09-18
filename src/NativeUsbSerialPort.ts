import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Device {
  readonly deviceId: number;
  readonly vendorId: number;
  readonly productId: number;
}

export interface Spec extends TurboModule {
  isOpen(deviceId: number): boolean;
  list(): Promise<Device[]>;
  // return 1 if already has permission, 0 will request permission
  tryRequestPermission(deviceId: number): Promise<number>;
  hasPermission(deviceId: number): Promise<boolean>;
  open(
    deviceId: number,
    baudRate: number,
    dataBits: number,
    stopBits: number,
    parity: number,
    dts: boolean,
    rts: boolean,
    selectedDriver: number
  ): Promise<number>;
  send(deviceId: number, hexStr: string): Promise<null>;
  read(deviceId: number): Promise<String>;
  close(deviceId: number): Promise<null>;
  addListener(eventName:string):Promise<null>;
  removeListeners(count:number):Promise<null>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'UsbSerialportForAndroid'
);

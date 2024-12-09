package com.bastengao.usbserialport;

import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.hoho.android.usbserial.driver.UsbSerialPort;
import com.hoho.android.usbserial.util.SerialInputOutputManager;

import java.io.IOException;
import java.util.Arrays;

public class UsbSerialPortWrapper implements SerialInputOutputManager.Listener {
    private static final int WRITE_WAIT_MILLIS = 2000;
    private static final int READ_WAIT_MILLIS = 500;
    private static final String DataReceivedEvent = "usbSerialPortDataReceived";

    private int deviceId;
    private UsbSerialPort port;
    private EventSender sender;
    private SerialInputOutputManager ioManager;

    UsbSerialPortWrapper(int deviceId, UsbSerialPort port, EventSender sender) {
        this.deviceId = deviceId;
        this.port = port;
        this.sender = sender;
        //this.ioManager = null;
        this.ioManager = new SerialInputOutputManager(port, this);
        this.ioManager.setReadBufferSize(65536*2);
        ioManager.start();
    }

    public boolean isOpen(){
        return this.port.isOpen();
    }

    public void send(byte[] data) throws IOException {
        this.port.write(data, WRITE_WAIT_MILLIS);
    }

    public byte[] read() throws IOException {
        byte[] buffer = new byte[65536];
        int len = this.port.read(buffer, READ_WAIT_MILLIS);
        return Arrays.copyOf(buffer, len);
    }

    public void onNewData(byte[] data) {
        WritableMap event = Arguments.createMap();
        String hex = new String(data);
        event.putInt("deviceId", this.deviceId);
        event.putString("data", hex);
        //Log.d("usbserialport", hex);
        sender.sendEvent(DataReceivedEvent, event);
    }

    public void onRunError(Exception e) {
        // TODO: implement
    }

    public void close() {
        if (! this.isOpen()) {
            return;
        }

        if(ioManager != null) {
            ioManager.setListener(null);
            ioManager.stop();
        }

        try {
            port.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

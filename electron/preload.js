//Requerimientos
const { contextBridge, ipcRenderer } = require("electron");
const {platform, cpus, totalmem} = require("os")

//callback para transferencia de datos entre archivos index.js --> menu.js
const API = {
    onCount: (callback) => ipcRenderer.on("dataSerial",(event, args) => {
        callback(args);
    })
}

contextBridge.exposeInMainWorld("api", API);
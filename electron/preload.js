//Requerimientos
const { contextBridge, ipcRenderer } = require("electron");
const {platform, cpus, totalmem} = require("os")

//callback para transferencia de datos entre archivos index.js --> menu.js
const API = {
    onCount: (callback) => ipcRenderer.on("velocidad",(event, args) => {
        callback(args);
    })
}

contextBridge.exposeInMainWorld("api", API);
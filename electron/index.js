'use strict'

//Requerimientos
const { app, BrowserWindow, ipcMain } = require('electron');
const { join } = require("path");
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

//Objeto puerto serial
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });  // COM3

//Lectura de datos por puerto serial 
let serialData
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (vel) => {
    serialData = vel
    console.log(serialData)
})

//Inicializacion de la aplicacion
app.whenReady().then(main);

//Funcion principal
function main(){

    //Ventana nueva 
    //inicializacion de objeto con su propiedades
    const window = new BrowserWindow({
        width: 800, height: 700,
        show: false,
        webPreferences: {
            preload: join(__dirname, "./preload.js"),
        }
    })

    //Cargar archivo principal de interfaz
    window.loadFile(join(__dirname, "../src/render/index.html"))
    window.on("ready-to-show", window.show);

    //Funcion para enviar datos de la lectura por el puerto serial
    setInterval(() => {
        window.webContents.send("dataSerial", serialData)
    }, 100);

}

//Funcion con evento antes de cerrar la aplicacion
app.on('before-quit', () => {
    console.log('.....................................')
})

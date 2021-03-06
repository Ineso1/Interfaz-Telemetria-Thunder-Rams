const velocimetro = document.getElementById("velocimetro");
const barra = document.getElementById("barra");
const velocimetroCircular = document.getElementById("circuloExterno")
const containerX = document.getElementById("containerX")
const containerY = document.getElementById("containerY")
const containerZ = document.getElementById("containerZ")




let vel = 0;
let temperaturaMaxima = 100;
let tamanoBarra = 300;
let coeficienteTempertaura = temperaturaMaxima/tamanoBarra;
let map;
let localizacionPunto = { lat: 20.733248248178917, lng: -103.45446640854378 }; //Punto de prueba
let inicializacion = false;
//Funcion de inicializacion de mapa de google maps
function initMap(localizacion) {
        
    map = new google.maps.Map(document.getElementById("map"), {
    center: localizacion,
    zoom: 15,});

    let marker = new google.maps.Marker({
        position: localizacion,
        map: map,
        icon: "../assets/img/logo_icon_circular_marker_mini.png",
    });
}


//Funcopn para obtencion de datos desde el index.js
//array con [velocidad, angulo inclinacion en X, angulo de inclinacion en Y, temperatura, longittud, latitud]
window.api.onCount((data) => {
    let arr = data.split(',');
    vel = arr[0];
    temp = arr[2];
    velocimetro.innerHTML = `${vel} km/h`;

    if (temp/coeficienteTempertaura < tamanoBarra){
        barra.style.height = `${temp/coeficienteTempertaura}px`;
    } else {
        barra.style.height = `${tamanoBarra}px`;
    }
    
    velocimetroCircular.style = `--velocity: ${vel}`;
    anguloX = 0;
    anguloY = arr[1];
    anguloZ = arr[2];

    containerX.style = 'transform: rotateX(' + anguloX + 'deg);)';
    containerY.style = 'transform: rotateY(' + anguloY + 'deg);)';
    containerZ.style = 'transform: rotateZ(' + anguloZ + 'deg);)';

    window.initMap = initMap(localizacionPunto);
})
const velocimetro = document.getElementById("velocimetro");
const barra = document.getElementById("barra");
const velocimetroCircular = document.getElementById("circuloExterno")


let vel = 0;
let temperaturaMaxima = 100;
let tamanoBarra = 300;
let coeficienteTempertaura = temperaturaMaxima/tamanoBarra;

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
    
    velocimetroCircular.style = `--velocity: ${vel}`


})


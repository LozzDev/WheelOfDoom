const alivehumansCasual = [
    {
        id: 1,
        name: "Jesús Manuel",
        alive: true,
        //hay que ponerle un color
    },
    {
        id: 2,
        name: "Israel",
        alive: true,
    },
    {
        id: 3,
        name: "Javier",
        alive: true,
    },
    {
        id: 4,
        name: "Nicolás",
        alive: true,
    },
    {
        id: 5,
        name: "Felipe",
        alive: true,
    },
    {
        id: 6,
        name: "Nando",
        alive: true,
    },
    {
        id: 7,
        name: "Alejandro",
        alive: true,
    },
    {
        id: 8,
        name: "Pablo",
        alive: true,
    },
    {
        id: 9,
        name: "Mario",
        alive: true,
    },
    {
        id: 10,
        name: "Rubén",
        alive: true,
    },
    {
        id: 11,
        name: "Pablo N",
        alive: true,
    },
    {
        id: 12,
        name: "Mauricio",
        alive: true,
    },
    {
        id: 13,
        name: "Adrián",
        alive: true,
    },
    {
        id: 14,
        name: "Jairo",
        alive: true,
    },
    {
        id: 15,
        name: "Judith",
        alive: true,
    },
    {
        id: 16,
        name: "Samuel",
        alive: true,
    }
];

console.log(alivehumansCasual)

// Guardar lista de humanos (Casual)
localStorage.setItem("humansAlive", JSON.stringify(alivehumansCasual));

// Recibir lista de humanos (Custom)
let humanListCustom = JSON.parse(localStorage.getItem("inputValues"));

//funciones para hallar las coordenadas x e y de los humanos
    

    
    function humanUbicationX(human){
        const humanElement=document.getElementById(human.id);
        const coords=humanElement.getBoundingClientRect();
        const coordsX=((coords.left) / window.innerWidth) * window.innerWidth; //con esta formula hayamos la posicion X adaptada a cualquier resolucion
        return coordsX; //cuando se cambien a astronautas se debe modificar ese 35
    }
    function humanUbicationY(human){
        const humanElement=document.getElementById(human.id);
        const coords=humanElement.getBoundingClientRect();
        const coordsY=((coords.top) / window.innerHeight) * window.innerHeight; //con esta formula hayamos la posicion Y adaptada a cualquier resolucion
        return coordsY; //cuando se cambien a astronautas se debe modificar ese 35
    }
    

// Inicializamos las coordenadas después de la creación de los humanos
//con este foreach nos ahorramos codigo y asignamos coordenadas a todos los objetos

function humanCoordsCalculator(){
    alivehumansCasual.forEach(human => {
        human.coordsX = humanUbicationX(human);
        human.coordsY = humanUbicationY(human);
        console.log(`Coordenada Y de ${human.id}: ${human.coordsY}`);
        console.log(human)
    })
}

humanCoordsCalculator();

window.addEventListener("resize", humanCoordsCalculator); //cada vez que se cambia el tamaño de la pagina se ajusta la posi de cada humano




//siguiente paso: ejecutar una animacion (splittear mi animacion en 4 partes)
//cada vez que se pulse el boton se mate a 4 humanos
//disparar a 4 humanos randoms cada vez que se pulse haciendo un rand basado en el id de cada uno, se puede hacer con un for
//necesitamos una funcion que trackee en tiempo real la posicion del ojo
//es un for que cada vez que se ejecute, se mueva posi random, dispare al objetivo previamente seleccionado, que el objetivo desaparezca y cambie el estado de alive a false.

//funcion para trackear en tiempo real la posicion del ojo en todo momento

    let coordsXeye=0;
    let coordsYeye=0;
    const doomEye = document.getElementById("eye");

function trackingEyePosition(){
    
    const coordsEye= doomEye.getBoundingClientRect();

    coordsXeye=coordsEye.left; //creo que esto te coge la esquina superior izquierda pero se arregla
    coordsYeye=coordsEye.top;

    //console.log(`Posición X: ${coordsXeye}, Posición Y: ${coordsYeye}`);
    
    requestAnimationFrame(trackingEyePosition);
}
trackingEyePosition(); // esto debe estar para que se active la funcion y saber donde esta el ojo

//fpuncion para que el ojo siga al raton en escriotrio
let mouseX=0;
let mouseY=0;
function eyeFollowMouse(event){
    mouseX=event.clientX;
    mouseY=event.clientY;
    doomEye.style.transform = `translate(${mouseX - 50}px, ${mouseY - 80}px)`;
}

document.addEventListener("mousemove", eyeFollowMouse);
//funcion para que el ojo siga el movimiento del movil

function eyeFollowGyroscope(event) {
    // Los ángulos de inclinación del dispositivo
    const tiltX = event.beta; // Inclinación hacia adelante o atrás (-180 a 180)
    const tiltY = event.gamma; // Inclinación hacia izquierda o derecha (-90 a 90)

    // Ajustar los valores para mover el ojo (puedes calibrarlos según tu diseño)
    const offsetX = tiltY * 1.5; // Factor multiplicador para ajustar sensibilidad
    const offsetY = tiltX * 1.5;

    // Aplicar transformaciones al ojo
    doomEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

window.addEventListener("deviceorientation", eyeFollowGyroscope);

//funcion para elegir al humano ejecutado

function killAliveHumans(aliveHumansArray){
    
        let randomHuman=Math.floor(Math.random() * aliveHumansArray.length);
        
        while(aliveHumansArray[randomHuman].alive == false){ //se hace un while por si el numero aleatorio coincide con un muerto y hasta que no de un numero de un vivo no para
            randomHuman=Math.floor(Math.random() * aliveHumansArray.length);
        }

        aliveHumansArray[randomHuman].alive = false;
        
    return (aliveHumansArray[randomHuman]);
}//funciona, esta testeado


//funcion que se activa cuando se aprieta el boton
//cosas que debe hacer --> crear array vivos, elegir 5 humanos a morir, ejecutar animacion de matar

 const executeHumansArray=[];

let indexLimitClicker=0;
let canClick=true;

function executerCasual(){
//TO-DO
//cuando se presiona el click se consigue el array de los vivos
if (!canClick) return; // Si no se puede hacer clic, salimos de la función

    canClick = false; // Bloqueamos nuevos clics

    setTimeout(() => {
        canClick = true; // Permitimos clics después de 1 segundo
    }, 900);
if (indexLimitClicker >= 15) {
    // Eliminar el evento después de 15 clics
    document.removeEventListener("click", executerCasual);
    
    return; // Salimos de la función
}


    const executedHuman = killAliveHumans(alivehumansCasual); //esto es un objeto human
    executeHumansArray.push(executedHuman);

    //aqui se tiene que hacer para que salga el nombre
    //se introduce el elemento y sus estilos
    
        const textElement = document.createElement("div");
        textElement.textContent = `${executeHumansArray[indexLimitClicker].name} ha sido eliminado`;
        textElement.style.position = "absolute";
        textElement.style.bottom = "20px";
        textElement.style.left = "50%";
        textElement.style.transform = "translateX(-50%)";
        textElement.style.color = "white";
        textElement.style.fontSize = "30px";
        textElement.style.fontWeight = "bold";
        textElement.style.opacity = "1";
        textElement.style.transition = "all 3s ease-out";
  
    // Añadir el texto al cuerpo del documento
    document.body.appendChild(textElement);
  
    // Ejecutar la animación después de un pequeño retardo para que de tiempo a que muera el humano
    setTimeout(() => {
      textElement.style.transform = "translateX(-50%) translateY(-100px)";
      textElement.style.opacity = "0";
    }, 100); 
  
    // Eliminar el elemento del DOM después de la animación
    setTimeout(() => {
      textElement.remove();
    }, 3100); // Eliminar después de 3.1 segundos para que de tiempo a la animacion
  


    //----------------------------------------------

    //informacion del humano muerto
    let human=document.getElementById(executedHuman.id);
    let humanCoordsX=executedHuman.coordsX;
    let humanCoordsY=executedHuman.coordsY;

    //una vez tenemos toda la info del primer humano tenemos que lanzar el cohete a su ubi desde el ojo

    const laser=document.getElementById("laser"); //quiero obtener el laser, y hacer animacion desde la ubi del ojo al tio
    laser.style.display = "block"; //ocultar el rayo una vez se lance
    //aqui creamos la animacion

    const shootAnimation = `
        @keyframes shootAnimation{
            0%{
                transform: translate(${((coordsXeye)/ window.innerWidth) * window.innerWidth}px, ${((coordsYeye)/ window.innerHeight) * window.innerHeight}px);
            }
            100%{
                transform: translate(${((humanCoordsX)/ window.innerWidth) * window.innerWidth}px, ${((humanCoordsY)/ window.innerHeight) * window.innerHeight}px) rotate(800deg);
            }
        }
        
    `
    // Insertar la animación en el documento
    const style = document.createElement("style");
    style.textContent = shootAnimation;
    document.head.appendChild(style);
    //ejecutamos la animacion
    laser.style.animation = "shootAnimation 0.9s ";
    const doomEyeImage=document.getElementById("eye-image");

    setTimeout(() => {
        laser.style.display = "none"; //ocultar el rayo una vez se lance
        
        doomEyeImage.setAttribute=("src", "./images/eye-attack.gif"); //TO-DO NO FUNCIONA
        human.style.opacity=0;
        
    }, 900);
    setTimeout(() => {
            
        human.setAttribute("src", "./images/blood_effect.gif");
        laser.setAttribute("src", "./images/yellowBallExplosion.gif");
    }, 500);
    
    laser.setAttribute("src", "./images/yellowBall.gif");//con estos timeouts timeamos las muertes de los atronautas y generamos su animacion de muerte
    indexLimitClicker++;
    
     
    if(indexLimitClicker==15){
        setTimeout(() => {
            
            window.location.href = "end.html";
        }, 3000 );
        
    }
    
}

document.addEventListener("click", executerCasual);





//efecto onda expansiva cuando dispara
const container = document.querySelector('.drop_effect');

const createRipple = (e) => {
    let ripple = document.createElement('span');
    let x = e.clientX;
    let y = e.clientY;

    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    container.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 5000)

    console.log(x, y);
}

container.addEventListener('click', createRipple);
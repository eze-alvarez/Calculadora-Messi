const textoArriba = document.querySelector(".espacio-arriba");
const textoAbajo = document.querySelector(".espacio-abajo");
const botones = document.querySelectorAll(".botones")
const clear = document.querySelector(".reset")
const on = document.querySelector(".on")
const off = document.querySelector(".off")
const flecha = document.querySelector(".flecha")
const botonesOpMatemat = document.querySelectorAll(".operador")
const igual = document.querySelector(".igual")


class Calculadora{
    constructor(textoArriba, textoAbajo){
        this.encendido = false
        this.textoArriba = textoArriba;
        this.textoAbajo= textoAbajo;
        this.operador = undefined;
        this.valorArriba = "";
        this.valorAbajo= "" ;
        this.resultado= "";
    }
    
    agregarNumero(numero) {
        if(this.textoAbajo.textContent.length == 11){
            alert("ingresaste la maxima cantidad de numeros")
            return
        }
   
        if(this.encendido == false) return

        if(numero == 0){
            if(this.valorAbajo == "0") return
            this.valorAbajo = this.valorAbajo + numero
        } 
        
        if(numero == "."){
            if(this.valorAbajo.includes('.'))return
            if(this.valorAbajo == "" || this.valorAbajo == "0"){
                console.log('adentro')
                this.valorAbajo = "0"
            }
            this.valorAbajo = this.valorAbajo + numero
        }

        if(numero != 0 && numero != (".")){
            console.log(`ANTES de agregar
            valorArriba: ${this.valorArriba}
            valorAbajo:${this.valorAbajo}
            textoArriba: ${this.textoArriba.textContent}
            textoAbajo: ${this.textoAbajo.textContent}`);
            if(this.valorAbajo == "0"){
                this.valorAbajo = ""
            }
            
            this.valorAbajo = this.valorAbajo + numero
            
        }
        
    }

    borrarUltimoNum(){
        if(this.valorAbajo.length<2){
            this.valorAbajo = "0"
        }else{
            let newValorAbajo = this.valorAbajo.slice(0,-1)
            this.valorAbajo = newValorAbajo;
        }
    }

    calcular(){
    
        if(!this.valorAbajo){
            alert("Ingrese un número");
            return
        }

        let resultado;
        switch (this.operador) {
            case "suma":
                resultado = parseFloat(this.valorArriba) + parseFloat(this.valorAbajo)
                break;
            case "resta":
                resultado = parseFloat(this.valorArriba) - parseFloat(this.valorAbajo)
                break;
            case "division":
                    resultado = parseFloat(this.valorArriba) / parseFloat(this.valorAbajo)
                    break;
            case "multiplicacion":
                resultado = parseFloat(this.valorArriba) * parseFloat(this.valorAbajo)
                break;
            default:
                break;
        }
        this.resultado = resultado.toString()
        
        if(this.resultado.length>11 && this.resultado.includes(".")){
            let numeroFlot = parseFloat(this.resultado);
            resultado = numeroFlot.toExponential(6);
        }
        if(this.resultado.length>11){
            let numeroFlot = parseFloat(this.resultado);
            resultado = numeroFlot.toExponential(6);
        }
        this.valorAbajo = resultado
        this.valorArriba = ""
        this.textoArriba.textContent = ""
        this.operador = undefined
        
    }

    limpiarPantalla(){
        this.textoArriba.textContent = "";
        this.textoAbajo.textContent = "";
        this.valorAbajo = "";
        this.valorArriba = ""
        this.operador = undefined
        this.resultado = ""
    }

    mostrarPantalla(signo){

        if(this.operador != undefined && signo){
            console.log("muestro pantalla con signo")
            this.textoArriba.textContent = `${this.valorAbajo} ${signo}`
            this.valorArriba = this.valorAbajo
            this.textoAbajo.textContent = "0"
            this.valorAbajo = "" 
        }
        else{
        this.textoAbajo.textContent = this.valorAbajo
        }
    }

    operacion(botonValor){
        this.operador = botonValor  
    }
    
}

const calculadora = new Calculadora(textoArriba,textoAbajo)


on.addEventListener('click', start)
function start(){
    on.removeEventListener('click',start)
    saludar()
    setTimeout(()=>activarBotones(),3000)
}
function saludar(){
    let mensaje = "BIENVENIDO"
    let arrayMensaje = mensaje.split('')
    
    let welcome = setInterval(()=>{
        calculadora.textoAbajo.innerHTML += arrayMensaje.shift()
        if(arrayMensaje.length==0){
            clearInterval(welcome)
            setTimeout(() => {
                calculadora.textoAbajo.innerHTML=0
            }, 1300);
        }
    },150)
    calculadora.encendido = true
}
function activarBotones(){
    botones.forEach(boton=>boton.addEventListener('click', addNumbers))
    botonesOpMatemat.forEach(boton=>boton.addEventListener('click',startOpMat))
    clear.addEventListener('click', startClear)
    flecha.addEventListener('click', startFlecha)
    igual.addEventListener('click', startIgual)
    off.addEventListener('click', turnOff)
    
}
function addNumbers(){
    calculadora.agregarNumero(this.textContent)
    calculadora.mostrarPantalla();
    this.removeEventListener("click",addNumbers)
    // -----vuelvo a activar el listener ,evito solapamiento de valorAbajo    
    setTimeout(()=>this.addEventListener('click',addNumbers),200)
}

// --------off --------
off.addEventListener('click', turnOff)
function turnOff(){
    off.removeEventListener("click",turnOff)
    botones.forEach(boton=>boton.removeEventListener('click', addNumbers))
    botonesOpMatemat.forEach(boton=>boton.removeEventListener('click',startOpMat))
    clear.removeEventListener('click', startClear)
    flecha.removeEventListener('click', startFlecha)
    igual.removeEventListener('click', startIgual)

    setTimeout(()=>despedirse(),500)
    setTimeout(()=>on.addEventListener('click', start),2000)
    
}
function despedirse (){
    if(calculadora.encendido == false) return
    calculadora.limpiarPantalla()
    let mensaje = "bye"
    let arrayMensaje = mensaje.split('')
    
    let bye = setInterval(()=>{
        calculadora.textoAbajo.innerHTML += arrayMensaje.shift()
        if(arrayMensaje.length==0){
            clearInterval(bye)
            setTimeout(() => {
                calculadora.textoAbajo.innerHTML = ""
            }, 1300);
        }
    },150)

    calculadora.encendido = false
}

// -------- funciones a botones ----------


function startClear(){
    if(calculadora.encendido == false) return
    calculadora.limpiarPantalla()
    calculadora.textoAbajo.textContent = 0
}


function startFlecha(){
    if(calculadora.encendido == false) return
    calculadora.borrarUltimoNum()
    calculadora.mostrarPantalla()
}


function startOpMat(){
    console.log(this.value, this.textContent)
    if(calculadora.encendido == false) return
    if(calculadora.textoAbajo.textContent.includes("e") && calculadora.resultado){
        alert("realizar nuevo ingreso de numeros y operación")
        calculadora.limpiarPantalla()
        calculadora.textoAbajo.textContent=0;
        return
    }
    // -----despues de hacer igual ----
    if(calculadora.resultado && calculadora.valorAbajo == ""){
        // ---- para evitar apretar 2 veces mismo operador---
        if(calculadora.textoAbajo.textContent == "0"){
            alert('ingresar numero')
            return
        }
        calculadora.valorAbajo = calculadora.resultado
        calculadora.operacion(this.value);
        calculadora.mostrarPantalla(this.textContent);
        return
    }
    // ---cuando se inicia o limpia ---
    if(calculadora.valorAbajo == "" || calculadora.valorAbajo == "0"){
        alert('ingresar numero') 
        return
    }
    // ------sin usar boton igual ---
    if(calculadora.textoArriba.textContent){
        if(calculadora.textoArriba.textContent.includes("e") && calculadora.resultado){
            alert("realizar nuevo ingreso de numeros y operación")
            calculadora.limpiarPantalla()
            calculadora.textoAbajo.textContent=0;
            return
        }
        
        calculadora.valorArriba = calculadora.textoArriba.textContent.slice(0,-1);
        
        calculadora.calcular()
    }
   
    calculadora.operacion(this.value);
    
    calculadora.mostrarPantalla(this.textContent);
}


function startIgual(){
    if(calculadora.encendido == false) return
    if(calculadora.operador == undefined){
        alert("no se ingreso ninguna operación matemática")
        return
    }
    if(this.valorAbajo == ""){
        alert('Ingrese un número')
        return
    }
    calculadora.calcular();
    calculadora.mostrarPantalla()
    calculadora.valorAbajo = ""
}
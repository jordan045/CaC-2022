console.log("Iniciando");

const formulario = document.getElementById('formulario')
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    apellido: false,
    mail: false,
    telefono: false,
}

const validarFormulario = (e) => {
    switch (e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "apellido":
            validarCampo(expresiones.nombre, e.target, 'apellido');
        break;
        case "mail":
            validarCampo(expresiones.correo, e.target, 'mail');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        console.log('test pasado');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
        campos[campo] = true;                
    } else{
        console.log('test invalido');
        document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
        campos[campo] = false;
    }
}


inputs.forEach( (input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);    
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(campos.nombre);
    console.log(campos.apellido);
    console.log(campos.mail);
    console.log(campos.telefono);

    if(campos.nombre && campos.apellido && campos.mail && campos.telefono){
        console.log('submit');
        formulario.reset();

        document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo')
        setTimeout(() => {
            document.getElementById('formulario_mensaje-exito').remove('formulario_mensaje-exito-activo')
        }, 5000);

        document.querySelectorAll('.formulario_grupo-correcto').forEach( (icono) => {
            icono.classList.remove('formulario_grupo-correcto')
        })
    }
    else{
        document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo')
    }
})
function contarApariciones(str, letra) {
    var palabras = str.split(' ');
    return filtrar(contiene(letra))(palabras).length;
    // de forma pura:
    // componer(fn1, fn2...fnN, valor);
}


function componer(fn1, fn2, valor) {
    return fn1(fn2(valor));
}

function aplicarFiltros(filtro1, filtro2){
  // devolver una función que aplique filtro1
  // y filtro2

  return function(elem){
    // aplico filtro1 
    // aplico filtro2
  };
}

function esPar(numero){ 
  // devuelve true si es par o false si es impar
}

[1,2,3].filter(aplicarFiltros(esPrimo, esPar));

function separar(separador) {
  return function(str){
    return str.split(separador);
  };
}

function contiene(letra) {
    return function(palabra) {
        return palabra.indexOf(letra) !== -1;
    };
}

// aplicarFiltros(esCapicua, contiene(letra))

function filtrar(fn) {
    return function(array) {
        return array.filter(fn);
    };
}

function filtrar(fn, array) {
    return array.filter(fn);
}

function componer(fn1, fn2, valor) {
    return fn1(fn2(valor));
}
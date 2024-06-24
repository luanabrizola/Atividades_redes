var form = document.getElementById("form");
var mascara = form.elements['masc'];
var subrede = form.elements['subrede'];
var endereco = form.elements['endereco'];
var btnLimpar = document.getElementById("limpar")
var bntCalcular  = document.getElementById("calcula")
var btnVoltar = document.querySelector("#voltar")
var tabela = document.querySelector("#tabela")
var tituloSubrede = document.querySelector("#tituloSubrede")
var tituloPrimeiroEnd = document.querySelector("#tituloPrimeiroEnd")
var tituloUltimoEnd = document.querySelector("#tituloUltimoEnd")
var tituloMascara = document.querySelector("#tituloMascara")

btnLimpar.addEventListener("click", handleBtnLimpar)
btnVoltar.addEventListener("click", handleBtnVoltar)
bntCalcular.addEventListener("click", calcular)



function handleBtnLimpar(){
    if(subrede.value !== '' || endereco.value !== ''){
        subrede.value = ''
        endereco.value = ''
    }

    if(mascara.value !== '1'){
        mascara.value = "1"
    }

}

function handleBtnVoltar(){
    container.style.display = "block"
    resultado.style.display = "none";
}

function calcular(){
    calculaEndereco()
    calculaMascara()
    calculaQntdeEstacao()
}

function calculaEndereco(){

}

function calculaMascara(){

}

function calculaQntdeEstacao(){
    
}







// function permitirNumerosEPonto(input) {
//     input.value = input.value.replace(/[^\d.]/g, '');
//     input.value = input.value.replace(/(\.\.+)/g, '.');
// }

// function verificaEndereco() {
//     const regex = /(\d{1,3})(\d{1,3})(\d{1,3})(\d{1,3})/;
//     let enderecoNaoFormatado = endereco.value.replace(/\D/g, '');
//     let enderecoFormatado = enderecoNaoFormatado.replace(regex, '$1.$2.$3.$4');
//     endereco.value = enderecoFormatado
// }

// function verificaEndereco(){
//     for ( var i = 0; i > 1; i++){
//         console.log(i)
//     }

// }


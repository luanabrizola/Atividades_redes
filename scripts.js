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
// bntCalcular.addEventListener("click", calcular)



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

// function calcular(){
//     calculaEndereco()
//     calculaMascara()
//     calculaQntdeEstacao()
// }

function calculaEndereco(){
    var exemploEndereco = "192.168.1.0"
    function primeiroEnd(exemEnd){
        var ultimoPonto = exemploEndereco.lastIndexOf('.')
        var ultimoNum = exemploEndereco.substring(ultimoPonto + 1)
        ultimoNum = parseInt(ultimoNum)
        var primeiroEndereco = ultimoNum + 1
        console.log(primeiroEndereco)
        for (var i = 1; i < 9; i++){
            if (i === 1){
                ultimoNum = parseInt(ultimoNum)
                var primeiroEndereco = ultimoNum + 1
                console.log(primeiroEndereco)
            }
            else{
                ultimoNum = parseInt(ultimoNum)
                var primeiroEndereco = ultimoNum + 32
                ultimoNum = primeiroEndereco
                console.log(primeiroEndereco)
            }
        }
    }
    primeiroEnd()
}
calculaEndereco()

function calculaMascara(){
    var expoente = 32 - 24
    var operacao = 2 ** expoente
    var baseLog = operacao/expoente
    var log = Math.log2(baseLog)
    var final = 32 - log
    // console.log(final)
}

function calculaQntdeEstacao(){
    var subrede = 8
    var divisor = 32 - 24
    var qtdeEstaçao = (2 ** subrede)/divisor
    console.log(qtdeEstaçao)

}
calculaQntdeEstacao()

calculaMascara()





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


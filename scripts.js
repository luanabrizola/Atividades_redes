var form = document.getElementById("form");
var mascara = form.elements['masc'];
var subrede = form.elements['subrede'];
var endereco = form.elements['endereco'];
var btnLimpar = document.getElementById("limpar")
var bntCalcular = document.getElementById("calcular")
var btnVoltar = document.querySelector("#voltar")
var tabela = document.querySelector("#tabela")
var tituloSubrede = document.querySelector("#tituloSubrede")
var tituloPrimeiroEnd = document.querySelector("#tituloPrimeiroEnd")
var tituloUltimoEnd = document.querySelector("#tituloUltimoEnd")
var tituloMascara = document.querySelector("#tituloMascara")
var container = document.querySelector("#container")
var resultado = document.querySelector("#resultado")
var loader = document.querySelector("#loader")

btnLimpar.addEventListener("click", handleBtnLimpar)
btnVoltar.addEventListener("click", handleBtnVoltar)
bntCalcular.addEventListener("click", handleBtnCalcular)

function handleBtnLimpar() {
    if (subrede.value !== '' || endereco.value !== '' || mascara.value !== '') {
        subrede.value = ''
        endereco.value = ''
        mascara.value = ""
    }
}

function handleBtnVoltar() {
    container.style.display = "block"
    resultado.style.display = "none"
}

function handleBtnCalcular(){
    if (endereco.value === '' || mascara.value === '' || subrede.value === '') {
        container.style.display = "block"
        resultado.style.display = "none"
        loader.style.display = "none"
        alert("Preencha todos os campos para calcular!")
        return;
    } else{
        loader.style.display = "block"
        resultado.style.display = "none"

        setTimeout(function() {
            loader.style.display = "none"
            container.style.display = "none"
            resultado.style.display = "block"
        }, 1000);

        var listaEnderecos = calculaEndereco()
        var mascaraCalculada = calculaMascara()
        var quantidadeEstacoes = calculaQntdeEstacao()

        if (Array.isArray(listaEnderecos) && listaEnderecos.length > 0) {
            atualizaTabela(listaEnderecos, mascaraCalculada, quantidadeEstacoes)
        } else {
            console.error('A lista de endereços está vazia ou não é válida.')
        }
    }
}

function calculaEndereco() {

    function primeiroEnd() {
        var end = endereco.value

        var ultimoPonto = end.lastIndexOf('.')
        var ultimoNum = end.substring(ultimoPonto + 1)
        ultimoNum = parseInt(ultimoNum)
        ultimoNum + 1

        const lista = []
        for (var i = 1; i < 9; i++) {
            if (i === 1) {
                end = `${end.slice(0, ultimoPonto)}.${ultimoNum + 1}`
                ultimoNum += 1
            } else {
                end = `${end.slice(0, ultimoPonto)}.${ultimoNum + 32}`
                ultimoNum += 32;
            }
            lista.push(end);
        }
        console.log(lista);
        return lista;
    }

    const lista = primeiroEnd()

    if (Array.isArray(lista) && lista.length > 0) {
        return lista
    } else {
        console.error('A lista de endereços está vazia ou não é válida.')
        return []
    }

//Luana (pra eu mexer depois)
    // function UltimoEndereco(lista) {
    //     const listaUltimosEnderecos = []
    //     for (const endereco of lista) {
    //         const ultimoPonto = endereco.lastIndexOf('.')
    //         const ultimoNum = parseInt(endereco.substring(ultimoPonto + 1))
    //         const ultimoEndereco = ultimoNum - 3
    //         listaUltimosEnderecos.push(`${endereco.slice(0, ultimoPonto)}.${ultimoEndereco}`)
    //     }
    //     return listaUltimosEnderecos
    // }

    // const lista = primeiroEnd()
    // if (Array.isArray(lista)) {
    //     const ultimosEnderecos = UltimoEndereco(lista)
    //     console.log( ultimosEnderecos)
    // }
    // primeiroEnd()
    // UltimoEndereco()
}

function calculaMascara() {
    var expoente = 32 - 24
    var operacao = 2 ** expoente
    var baseLog = operacao / expoente
    var log = Math.log2(baseLog)
    var final = 32 - log
}

function calculaQntdeEstacao() {
    var subrede = 8
    var divisor = 32 - 24
    var qtdeEstaçao = (2 ** subrede) / divisor

}

function atualizaTabela(listaEnderecos, mascaraCalculada, quantidadeEstacoes) {
    tabela.innerHTML = ''

    var trCabecalho = document.createElement('tr')
    var thSubrede = document.createElement('th')
    var thPrimeiroEndereco = document.createElement('th')
    var thUltimoEndereco = document.createElement('th')
    var thMascara = document.createElement('th')

    thSubrede.textContent = 'Subrede'
    thPrimeiroEndereco.textContent = 'Primeiro Endereço'
    thUltimoEndereco.textContent = 'Último Endereço'
    thMascara.textContent = 'Máscara'

    trCabecalho.appendChild(thSubrede)
    trCabecalho.appendChild(thPrimeiroEndereco)
    trCabecalho.appendChild(thUltimoEndereco)
    trCabecalho.appendChild(thMascara)

    tabela.appendChild(trCabecalho)

    listaEnderecos.forEach(function(enderecoIP, index) {
        var tr = document.createElement('tr')
        var tdSubrede = document.createElement('td')
        var tdPrimeiroEndereco = document.createElement('td')
        var tdUltimoEndereco = document.createElement('td')
        var tdMascara = document.createElement('td')

        tdSubrede.textContent = (index + 1).toString()
        tdPrimeiroEndereco.textContent = enderecoIP
        tdUltimoEndereco.textContent = mascaraCalculada
        tdMascara.textContent = quantidadeEstacoes

        tr.appendChild(tdSubrede)
        tr.appendChild(tdPrimeiroEndereco)
        tr.appendChild(tdUltimoEndereco)
        tr.appendChild(tdMascara)

        tabela.appendChild(tr)
    })

    tituloSubrede.textContent = 'Subrede'
    tituloPrimeiroEnd.textContent = 'Primeiro Endereço'
    tituloUltimoEnd.textContent = 'Último Endereço'
    tituloMascara.textContent = 'Máscara'
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


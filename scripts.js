var form = document.getElementById("form")
var mascara = form.elements['masc']
var subrede = form.elements['subrede']
var endereco = form.elements['endereco']
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

        var mascaraCalculada = calculaMascara()
        var quantidadeEstacoes = calculaQntdeEstacao()
        var qtdeEnderecos = enderecos(calculaQntdeEstacao())
        var listaEnderecos = primeiroEnd(calculaQntdeEstacao())
        var listaUltimos = ultimoEnd(enderecos(calculaQntdeEstacao()), parseInt(subrede.value))

        if (Array.isArray(listaEnderecos) && listaEnderecos.length > 0 && Array.isArray(listaUltimos) && listaUltimos.length > 0) {
            atualizaTabela(listaEnderecos, listaUltimos, mascaraCalculada, quantidadeEstacoes, qtdeEnderecos)
        } else {
            console.error('A lista de endereços está vazia ou não é válida.')
        }
    }
}

function calculaMascara() {
    var mascInput = mascara.value

    var expoente = 32 - mascInput
    var operacao = 2 ** expoente
    var baseLog = operacao / expoente
    var log = Math.log2(baseLog)
    var final = 32 - log
    console.log(final)

    return final
}

function calculaQntdeEstacao() {
    var subrede = 8
    var divisor = 32 - mascara.value
    var qtdeEstacao = (2 ** subrede) / divisor
    console.log(qtdeEstacao)
    return qtdeEstacao
}


function primeiroEnd(qtdeEstacao) {
    var end = endereco.value

    var ultimoPonto = end.lastIndexOf('.');
    var ultimoNum = parseInt(end.substring(ultimoPonto + 1))
    var qtdeSubredes = parseInt(subrede.value)

    const lista = []
    for (var i = 0; i < qtdeSubredes; i++) {
        if (i === 0) {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum + 1}`)
            ultimoNum += 1
        } else {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum + qtdeEstacao}`)
            ultimoNum += qtdeEstacao
        }
    }
    console.log(lista)
    return lista
}

function enderecos(qtdeEstacao){
    var end = endereco.value

    var ultimoPonto = end.lastIndexOf('.');
    var ultimoNum = parseInt(end.substring(ultimoPonto + 1))
    var qtdeSubredes = parseInt(subrede.value)

    const lista = []
    for (var i = 0; i < qtdeSubredes; i++) {
        if (i === 0) {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum}`)
        } else {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum + qtdeEstacao}`)
            ultimoNum += qtdeEstacao
        }
    }
    console.log(lista)

    var end2 = endereco.value

    var ultimoPonto2 = end2.lastIndexOf('.');
    var ultimoNum2 = parseInt(end2.substring(ultimoPonto2 + 1))
    var qtdeSubredes2 = parseInt(subrede.value)

    const lista2 = []
    for (var i = 0; i < qtdeSubredes2; i++) {
        lista2.push(`${end2.slice(0, ultimoPonto2)}.${ultimoNum2 + qtdeEstacao - 1}`)
        ultimoNum2 += qtdeEstacao
        }
    console.log(lista2)

    return lista2
}

function ultimoEnd(lista2, qtdeSubredes) {
    const listaUltimos = []
    for (var i = 0; i < qtdeSubredes; i++) {
        var ultimoPonto = lista2[i].lastIndexOf('.')
        var ultimoNum = parseInt(lista2[i].substring(ultimoPonto + 1))

        listaUltimos.push(`${(lista2[i]).slice(0, ultimoPonto)}.${ultimoNum - 1}`)
        }

    console.log(listaUltimos)

    return listaUltimos
}


function atualizaTabela(listaEnderecos, mascaraCalculada, quantidadeEstacoes) {
    tabela.innerHTML = ''

    var trCabecalho = document.createElement('tr')
    var thSubrede = document.createElement('th')
    var thQtdeEstacao = document.createElement('th')
    var thPrimeiroEndereco = document.createElement('th')
    var thUltimoEndereco = document.createElement('th')
    var thMascara = document.createElement('th')

    thSubrede.textContent = 'Subrede'
    thQtdeEstacao.textContent = 'Qtde de Estações'
    thPrimeiroEndereco.textContent = 'Primeiro Endereço'
    thUltimoEndereco.textContent = 'Último Endereço'
    thMascara.textContent = 'Máscara'

    trCabecalho.appendChild(thSubrede)
    trCabecalho.appendChild(thQtdeEstacao)
    trCabecalho.appendChild(thPrimeiroEndereco)
    trCabecalho.appendChild(thUltimoEndereco)
    trCabecalho.appendChild(thMascara)

    tabela.appendChild(trCabecalho)

    listaEnderecos.forEach(function(enderecoIP, index) {
        var tr = document.createElement('tr')
        var tdSubrede = document.createElement('td')
        var tdQtdeEstacao = document.createElement('td')
        var tdPrimeiroEndereco = document.createElement('td')
        var tdUltimoEndereco = document.createElement('td')
        var tdMascara = document.createElement('td')

        tdSubrede.textContent = (index + 1).toString()
        tdQtdeEstacao.textContent = quantidadeEstacoes
        tdPrimeiroEndereco.textContent = enderecoIP
        tdUltimoEndereco.textContent = listaUltimos[index]
        tdMascara.textContent = mascaraCalculada

        tr.appendChild(tdSubrede)
        tr.appendChild(tdQtdeEstacao)
        tr.appendChild(tdPrimeiroEndereco)
        tr.appendChild(tdUltimoEndereco)
        tr.appendChild(tdMascara)

        tabela.appendChild(tr)
    })

    tituloSubrede.textContent = 'Subrede'
    tituloQtdeEstacao = 'Qtde de Estações'
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

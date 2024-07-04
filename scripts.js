//capturando os elementos do formulário e html
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

//reconhecendo o evento dos botões
btnLimpar.addEventListener("click", handleBtnLimpar) //limpar
btnVoltar.addEventListener("click", handleBtnVoltar) //voltar
bntCalcular.addEventListener("click", handleBtnCalcular) //calcular

mascara.addEventListener('keydown', function(teclado) { //impedir que o usuário digite
    teclado.preventDefault()
})

subrede.addEventListener('keydown', function(teclado) { //impedir que o usuário digite
    teclado.preventDefault()
})

endereco.addEventListener('input', function(e) { //limitar caracteres
    var value = e.target.value
    value = value.replace(/[^\d.]+/g, '') // Remove caracteres que não são números ou pontos
    e.target.value = value
})

/**
 * Limpa os campos do formulário.
 */
function handleBtnLimpar() {
    if (subrede.value !== '' || endereco.value !== '' || mascara.value !== '') {
        subrede.value = ''
        endereco.value = ''
        mascara.value = ""
    }
}

/**
 * Exibe o container principal e esconde os resultados.
 */
function handleBtnVoltar() {
    container.style.display = "block"
    resultado.style.display = "none"
}

/**
 * Verifica se todos os campos estão preenchidos, exibe o loader e, após 1 segundo, realiza os cálculos e mostra os resultados.
 */
function handleBtnCalcular(){
    if (endereco.value === '' || mascara.value === '' || subrede.value === '') { //verificando se esta vazio
        container.style.display = "block"
        resultado.style.display = "none"
        loader.style.display = "none"
        alert("Preencha todos os campos para calcular!") //se sim, exibe um alerta
        return;
    } else{
        loader.style.display = "block"
        resultado.style.display = "none"

        setTimeout(function() {  //atraso de 1 segundo
            loader.style.display = "none"
            container.style.display = "none"
            resultado.style.display = "block"
        }, 1000);

        var mascaraCalculada = calculaMascara(calculaQntdeEstacao())
        var quantidadeEstacoes = calculaQntdeEstacao()
        var qtdeEnderecos = enderecos(calculaQntdeEstacao())
        var listaEnderecos = primeiroEnd(calculaQntdeEstacao())
        var listaUltimos = ultimoEnd(enderecos(calculaQntdeEstacao()), parseInt(subrede.value))

        //verifica se as listas de endereços são válidas
        if (Array.isArray(listaEnderecos) && listaEnderecos.length > 0 && Array.isArray(listaUltimos) && listaUltimos.length > 0) {
            atualizaTabela(listaEnderecos, listaUltimos, mascaraCalculada, quantidadeEstacoes, qtdeEnderecos)
        } else {
            console.error('A lista de endereços está vazia ou não é válida.')
        }
    }
}

/**
 * Calcula a máscara com base na quantidade de estações.
 *
 * @param {number} qtdeEstacao - Quantidade de estações.
 * @returns {number} Valor da máscara calculada.
 */
function calculaMascara(qtdeEstacao) {
    var mascInput=mascara.value
    var log = Math.log2(qtdeEstacao) //calcula logaritmo com base 2 da quantidade de estação
    var conta = 32 - log //subtrai o log do total de bits

    console.log(conta)

    return conta
}

/**
 * Calcula a quantidade de estações.
 *
 * @returns {number} Quantidade de estações.
 */
function calculaQntdeEstacao() {
    var sub = subrede.value //obtem o valor da subrede informada pelo usuario
    var menos = 32 - mascara.value //subtrai o numero de bits com o valor da mascara
    var qtdeEstacao = (2 ** menos) / sub //obtem a quantidade de estação com 2 elevado ao numero dado na subtração anterior
    return qtdeEstacao
}

/**
 * Calcula o primeiro endereço de cada subrede.
 *
 * @param {number} qtdeEstacao - Quantidade de estações.
 * @returns {Array<string>} Lista de primeiros endereços de cada subrede.
 */
function primeiroEnd(qtdeEstacao) {
    var end = endereco.value

    var ultimoPonto = end.lastIndexOf('.'); //pega a posição do último ponto do endereço
    var ultimoNum = parseInt(end.substring(ultimoPonto + 1)) //pega o último número depois do ponto
    var qtdeSubredes = parseInt(subrede.value)

    const lista = []
    for (var i = 0; i < qtdeSubredes; i++) {
        if (i === 0) {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum + 1}`) //adiciona o primeiro endereço de subrede
            ultimoNum += 1
        } else {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum + qtdeEstacao}`) //adiciona os demais endereços
            ultimoNum += qtdeEstacao
        }
    }
    return lista
}

/**
 * Calcula os endereços de cada subrede.
 *
 * @param {number} qtdeEstacao - Quantidade de estações.
 * @returns {Array<Array<string>>} Lista de endereços de subredes.
 */
function enderecos(qtdeEstacao){
    var end = endereco.value

    var ultimoPonto = end.lastIndexOf('.');
    var ultimoNum = parseInt(end.substring(ultimoPonto + 1))
    var qtdeSubredes = parseInt(subrede.value)

    const lista = []
    for (var i = 0; i < qtdeSubredes; i++) {

        if (i === 0) {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum}`)//adiciona o primeiro endereço
        } else {
            lista.push(`${end.slice(0, ultimoPonto)}.${ultimoNum + qtdeEstacao}`)//adicona os demais endereços
            ultimoNum += qtdeEstacao //incrementa o último número pela quantidade de estações
        }
    }
    console.log(lista)

    var end2 = endereco.value

    var ultimoPonto2 = end2.lastIndexOf('.');
    var ultimoNum2 = parseInt(end2.substring(ultimoPonto2 + 1))
    var qtdeSubredes2 = parseInt(subrede.value)

    const lista2 = []
    for (var i = 0; i < qtdeSubredes2; i++) {
        lista2.push(`${end2.slice(0, ultimoPonto2)}.${ultimoNum2 + qtdeEstacao - 1}`) //adicona o ultimo endereço de cada subrede
        ultimoNum2 += qtdeEstacao //incrementa o último número pela quantidade de estações
        }

    return [lista, lista2] //retorna as duas listas criadas
}

/**
 * Calcula o último endereço de cada subrede.
 *
 * @param {Array<string>} lista2 - Lista de endereços de subrede.
 * @param {number} qtdeSubredes - Quantidade de subredes.
 * @returns {Array<string>} Lista de últimos endereços de cada subrede.
 */
function ultimoEnd(lista2, qtdeSubredes) {
    const listaUltimos = []
    for (var i = 0; i < qtdeSubredes; i++) {
        var ultimoPonto = lista2[1][i].lastIndexOf('.')
        var ultimoNum = parseInt(lista2[1][i].substring(ultimoPonto + 1)) //pega o ultimo número do endereço

        listaUltimos.push(`${(lista2[1][i]).slice(0, ultimoPonto)}.${ultimoNum - 1}`) //adicona o ultimo endereço da subrede a lista
        }

    return listaUltimos
}

/**
 * Atualiza a interface com os resultados dos cálculos.
 *
 * @param {Array<string>} listaEnderecos - Lista de primeiros endereços de cada subrede.
 * @param {Array<string>} listaUltimos - Lista de últimos endereços de cada subrede.
 * @param {number} mascaraCalculada - Máscara calculada.
 * @param {number} quantidadeEstacoes - Quantidade de estações.
 * @param {Array<Array<string>>} qtdeEnderecos - Lista de endereços de subredes.
 */
function atualizaTabela(listaEnderecos, listaUltimos, mascaraCalculada, quantidadeEstacoes, qtdeEnderecos) {
    tabela.innerHTML = '' //limpa a tabela

    //criando elementos de uma tabela
    var trCabecalho = document.createElement('tr')
    var thSubrede = document.createElement('th')
    var thQtdeEstacao = document.createElement('th')
    var thTodoEndereco = document.createElement('th')
    var thPrimeiroEndereco = document.createElement('th')
    var thUltimoEndereco = document.createElement('th')
    var thMascara = document.createElement('th')

    //definindo nome das colunas
    thSubrede.textContent = 'Subrede'
    thQtdeEstacao.textContent = 'Qtde de Estações'
    thTodoEndereco.textContent = 'Endereços'
    thPrimeiroEndereco.textContent = 'Primeiro Endereço'
    thUltimoEndereco.textContent = 'Broadcast'
    thMascara.textContent = 'Máscara'

    //adicionando colunas ao cabeçalho
    trCabecalho.appendChild(thSubrede)
    trCabecalho.appendChild(thQtdeEstacao)
    trCabecalho.appendChild(thTodoEndereco)
    trCabecalho.appendChild(thPrimeiroEndereco)
    trCabecalho.appendChild(thUltimoEndereco)
    trCabecalho.appendChild(thMascara)

    //adicionando o cabeçalho a tabela
    tabela.appendChild(trCabecalho)

    //adicionando as linhas de resultados a tabela
    listaEnderecos.forEach(function(enderecoIP, index) {
        var tr = document.createElement('tr')
        var tdSubrede = document.createElement('td')
        var tdQtdeEstacao = document.createElement('td')
        var tdTodoEndereco = document.createElement('td')
        var tdPrimeiroEndereco = document.createElement('td')
        var tdUltimoEndereco = document.createElement('td')
        var tdMascara = document.createElement('td')

        tdSubrede.textContent = (index + 1).toString() //define o texto da célula de sub-rede como o índice + 1
        tdQtdeEstacao.textContent = quantidadeEstacoes //define o texto da célula de quantidade de estações
        tdTodoEndereco.textContent = `${qtdeEnderecos[0][index]} - ${qtdeEnderecos[1][index]}` //define o texto da célula de endereços
        tdPrimeiroEndereco.textContent = enderecoIP //define o texto da célula de primeiro endereço
        tdUltimoEndereco.textContent = listaUltimos[index] //define o texto da célula de broadcast
        tdMascara.textContent = `\\${mascaraCalculada}` //define o texto da célula de máscara

        //adiciona as células à linha
        tr.appendChild(tdSubrede)
        tr.appendChild(tdQtdeEstacao)
        tr.appendChild(tdTodoEndereco)
        tr.appendChild(tdPrimeiroEndereco)
        tr.appendChild(tdUltimoEndereco)
        tr.appendChild(tdMascara)

        //adiciona a linha de resultados a tabela
        tabela.appendChild(tr)
    })
}

// Cálculo da Máscara

// function subRedeCalc(tamanho) {
//     let num = '';
//     for (let i = 0; i < 32; i++) {
//         if (i % 8 === 0 && i !== 0) {
//             num += '.';
//         }
//         if (i < tamanho) {
//             num += '1';
//         } else {
//             num += '0';
//         }
//     }
//     return num;
// }

// function binarizador(num) {
//     num = num.split('.');
//     for (let i = 0; i < num.length; i++) {
//         num[i] = parseInt(num[i]);
//         num[i] = num[i].toString(2).padStart(8, '0');
//     }
//     num = num.join('.');
//     return num;
// }

// function mascara_calc(num, mascara) {
//     let numBin = binarizador(num);
//     let maskara = subRedeCalc(mascara);
//     let result = '';

//     for (let i = 0; i < numBin.length; i++) {
//         if (numBin[i] === '.') {
//             result += '.';
//         } else if (i > mascara + 1) {
//             if (parseInt(numBin[i]) && parseInt(maskara[i])) {
//                 result += '0';
//             } else {
//                 result += '1';
//             }
//         } else {
//             if (parseInt(numBin[i]) && parseInt(maskara[i])) {
//                 result += '1';
//             } else {
//                 result += '0';
//             }
//         }
//     }
//     console.log(mascara_calc("10.0.0.0", 22))
//     return result;
// }

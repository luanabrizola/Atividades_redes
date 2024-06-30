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
        loader.style.display = "block";
        resultado.style.display = "none";

        setTimeout(function() {
            loader.style.display = "none";
            container.style.display = "none"
            resultado.style.display = "block";
        }, 1000);

        var listaEnderecos = calculaEndereco()
        var mascaraCalculada = calculaMascara()
        var quantidadeEstacoes = calculaQntdeEstacao()

        atualizaTabela(listaEnderecos, mascaraCalculada, quantidadeEstacoes)
    }
}

function calculaEndereco() {
    function primeiroEnd(exemEnd) {
        var exemploEndereco = "192.168.1.0"
        var ultimoPonto = exemploEndereco.lastIndexOf('.')
        var ultimoNum = exemploEndereco.substring(ultimoPonto + 1)
        ultimoNum = parseInt(ultimoNum)
        ultimoNum + 1

        const lista = []
        for (var i = 1; i < 9; i++) {
            if (i === 1) {
                exemploEndereco = `${exemploEndereco.slice(0, ultimoPonto)}.${ultimoNum + 1}`
                ultimoNum += 1

            } else {
                exemploEndereco = `${exemploEndereco.slice(0, ultimoPonto)}.${ultimoNum + 32}`
                ultimoNum += 32
            }
            lista.push(exemploEndereco)

        }
        console.log(lista)
        return lista
    }

//Luana (pra eu mexer depois)
    function UltimoEndereco(lista) {
        const listaUltimosEnderecos = []
        for (const endereco of lista) {
            const ultimoPonto = endereco.lastIndexOf('.')
            const ultimoNum = parseInt(endereco.substring(ultimoPonto + 1))
            const ultimoEndereco = ultimoNum - 3
            listaUltimosEnderecos.push(`${endereco.slice(0, ultimoPonto)}.${ultimoEndereco}`)
        }
        return listaUltimosEnderecos
    }

    const lista = primeiroEnd()
    if (Array.isArray(lista)) {
        const ultimosEnderecos = UltimoEndereco(lista)
        console.log( ultimosEnderecos)
    }
    primeiroEnd()
    UltimoEndereco()
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
    tabela.innerHTML = '';

    for (var i = 0; i < listaEnderecos.length; i++) {
        var tr = document.createElement('tr');
        var tdSubrede = document.createElement('td');
        var tdPrimeiroEndereco = document.createElement('td');
        var tdUltimoEndereco = document.createElement('td');
        var tdMascara = document.createElement('td');

        tdSubrede.textContent = (i + 1).toString();
        tdPrimeiroEndereco.textContent = listaEnderecos[i];
        tdUltimoEndereco.textContent = `Último Endereço ${i + 1}`;
        tdMascara.textContent = mascaraCalculada;

        tr.appendChild(tdSubrede);
        tr.appendChild(tdPrimeiroEndereco);
        tr.appendChild(tdUltimoEndereco);
        tr.appendChild(tdMascara);

        tabela.appendChild(tr);
    }
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


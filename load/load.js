var calcular = document.querySelector("#calcular");
var loader = document.querySelector("#loader");
var resultado = document.querySelector("#resultado");
var container = document.querySelector(".container")

calcular.addEventListener("click", function() {
    loader.style.display = "block";
    resultado.style.display = "none";

    setTimeout(function() {
        loader.style.display = "none";
        container.style.display = "none"
        resultado.style.display = "block";
    }, 1000);
});
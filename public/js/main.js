let tempoInicial = $("#segundos").text();
let campo = $("#campo-digitacao");

$(function () {
  tamanhoFrase();
  contador();
  iniciaCronometro();
  colorArea();
  $("#restart").on("click", restart);
});

function tamanhoFrase() {
  let frase = $(".frase").text();
  let tamanho = frase.split(" ").length;
  let tamanhoFrase = $("#tamanho-frase");
  tamanhoFrase.text(tamanho);
}
function contador() {
  campo.on("input", function () {
    let contar = campo.val();
    let qltPalavras = contar.split(/\S+/).length - 1;
    $("#palavras").text(qltPalavras);
    let qtdCaracteres = contar.length;
    $("#caracteres").text(qtdCaracteres);
  });
}

function colorArea() {
  let frase = $(".frase").text();
  campo.on("input", function () {
    let digitado = campo.val();
    let comparavel = frase.substr(0, digitado.length);
    if (digitado == comparavel) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      campo.removeClass("borda-verde");
      campo.addClass("borda-vermelha");
    }
  });
}

function iniciaCronometro() {
  campo.one("focus", function () {
    let time = $("#segundos").text();
    const id = setInterval(function () {
      $("#restart").attr("disabled", true);
      time--;
      $("#segundos").text(time);
      if (time < 1) {
        placar();
        campo.attr("disabled", true);
        campo.addClass("campo-desativado");
        clearInterval(id);
        $("#restart").attr("disabled", false);
      }
    }, 1000);
  });
}

function placar() {
  let tablePlacar = $("#placar").find("tbody");
  let numPalavras = $("#palavras").text();
  let usuario = "Heitor";
  let linha = novaLinha(usuario, numPalavras);
  linha.find(".botao-remover").on("click", remover);
  tablePlacar.append(linha);
}

function novaLinha(usuario, numPalavras) {
  let linha = $("<tr>");
  let colunaUsuario = $("<td>").text(usuario);
  let colunaPalavras = $("<td>").text(numPalavras);
  let colunaRemover = $("<td>");
  let link = $("<a>").addClass("botao-remover").attr("href", "#");
  let icone = $("<i>")
    .addClass("small")
    .addClass("material-icons")
    .text("delete");
  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);
  return linha;
}

function remover(event) {
  event.preventDefault();
  $(this).parent().parent().remove();
}

function restart() {
  campo.attr("disabled", false);
  campo.val(" ");
  $("#caracteres").text("0");
  $("#palavras").text("0");
  $("#segundos").text(tempoInicial);
  iniciaCronometro();
  campo.removeClass("campo-desativado");
  campo.removeClass("borda-vermelha");
  campo.removeClass("borda-verde");
}

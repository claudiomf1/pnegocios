let dados = [
  ["Selecione"],
  ["Claudio"],
  ["Augusto"],
  ["Programadores"],
  ["Irmaos"],
  ["Vitoriosos"],
  ["Fantasticos"],
  ["Felizes"],
];
const btnInput = (e) => {
  if (e.target.matches("#searchInput")) {
    createResultInHtml(
      "searchResults",
      "rowTemplate",
      [".se-dado"],
      ResultSearch([0], dados)
    );

    if (e.target.value === "") {
      createResultInHtml("searchResults", "rowTemplate", [".se-dado"], dados);
    }
  }
};
//------------------------------------------------------------------
const clickselect = (e) => {
  if (e.target.matches("#dropdownMenuButton1")) {
    const imput = document.getElementById("searchInput");

    if (imput.value === "") {
      createResultInHtml("searchResults", "rowTemplate", [".se-dado"], dados);
    }
  }
};
const optionSelect = (e) => {
  let botaoselect = document.getElementById("dropdownMenuButton1");
  botaoselect.textContent = e.target.textContent;
  botaoselect.setAttribute("valor", e.target.innerText);
};
//---------------------------------------------------------------
document.getElementById("searchInput").addEventListener("input", btnInput);
document
  .getElementById("dropdownMenuButton1")
  .addEventListener("click", clickselect);
document
  .getElementById("searchResults")
  .addEventListener("click", optionSelect);

function createResultInHtml(
  searchResults_p,
  rowTemplate_p,
  listaColsTable,
  resultsArray
) {
  var searchResultsBox = document.getElementById(searchResults_p); // corpo da table html
  var templateBox = document.getElementById(rowTemplate_p); // modelo da linha da table
  var template = templateBox.content;
  var tr;

  searchResultsBox.innerHTML = ""; // zerando o corpo da table para cada nova letra digitada o que faz retornar nova consulta

  resultsArray.map((value) => {
    // laço nas linhas

    tr = template.cloneNode(true); // clonando o modelo da linha da table
    listaColsTable.map((col, index) => {
      //laço nas colunas
      //alert(searchResultsBox)
      tr.querySelector(col).textContent = value[index]; //atribuindo valor à coluna respectiva da linha em questao
    });
    searchResultsBox.appendChild(tr); // adicionando a linha que ja esta com todos os campos preenchidos na table
  });
}
//-------------------------------------------------------------------------------
function ResultSearch(indexsSearch, dados_p) {
  var searchInput = document
    .getElementById("searchInput")
    .value.toString()
    .toLowerCase()
    .trim(); // pegando tudo que esta digitado no imput

  var searchWords = searchInput.split(/\s+/); // cria um array das palavras digitadas no imput, sendo o separador um ou mais espaços, so nao entendi ainda o motivo disso

  var searchColumnar = [...indexsSearch]; // define em quais indices do array trazido do banco de dados sera feita a pesquisa

  // and or
  var resultsArray =
    searchInput === ""
      ? []
      : dados_p.filter(function (r) {
          // dados_p é o array com todos os dados trazidos do banco

          return searchWords.every(function (wordCd) {
            return searchColumnar.some(function (colIndexCd) {
              return (
                r[colIndexCd].toString().toLowerCase().indexOf(wordCd) !== -1
              );
            });
          });
        });

  return resultsArray;
}

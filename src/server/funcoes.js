export function getDataForSearch(table_banco, intervalo) {
  let abacategoria = TabelaBanco(table_banco);
  return abacategoria.getRange(intervalo).getValues();
}

function TabelaBanco(tabela) {
  SpreadsheetApp.getUi().alert("teste ", SpreadsheetApp.getUi().ButtonSet.OK);
  let pla_banco = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1DHcDn2eTzk6VNa3x3fhQ1X_RgTpGHfV09VWxHD2gk54/edit#gid=0"
  );

  let table = [
    ["cad.servico", { aba: pla_banco.getSheetByName("cad.servico") }],
    ["cad.cliente", { aba: pla_banco.getSheetByName("cad.cliente") }],
    ["categorias", { aba: pla_banco.getSheetByName("b_categorias") }],
    ["servicos_padrao", { aba: pla_banco.getSheetByName("servicos_padrao") }],
    ["Clientes", { aba: pla_banco.getSheetByName("Clientes") }],
    ["Estados", { aba: pla_banco.getSheetByName("Estados") }],
    ["Pedidos", { aba: pla_banco.getSheetByName("Pedidos") }],
    ["Estados/Cidades", { aba: pla_banco.getSheetByName("Estados/Cidades") }],
    [
      "cli_rel_categorias",
      { aba: pla_banco.getSheetByName("cli_rel_categorias") },
    ],
  ];

  return table.filter((el) => el[0] === tabela)[0][1].aba;
}

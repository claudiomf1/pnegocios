import { getDataForSearch } from "./funcoes";

function getDataForSearchCliente(table_banco, intervalo) {
  return getDataForSearch(table_banco, intervalo);
}
//-------------------------------------------------------------------------
function FormCliente(Cliente) {
  //var planilha = SpreadsheetApp.getActiveSpreadsheet();
  let guiaCliente = TabelaBanco("Clientes");
  let guia = TabelaBanco("Estados");

  let ultimaLinha = UltimaLinhaCom_dados_Da_Planilha(guia, "A");

  if (ultimaLinha == 0) {
    ultimaLinha = 1;
  }

  let list = guia.getRange(2, 1, ultimaLinha, 1).getValues();

  list.sort();

  ultimaLinha = UltimaLinhaCom_dados_Da_Planilha(guiaCliente, "A");

  if (ultimaLinha == 0) {
    ultimaLinha = 1;
  }

  let list2 = guiaCliente.getRange("C6:" + "C" + (ultimaLinha + 1)).getValues();

  list2.sort();

  let Form = HtmlService.createTemplateFromFile("FormCliente");
  Form.categorias = Categorias();

  Form.list = list.map(function (r) {
    return r[0];
  });
  Form.list2 = list2.map(function (r) {
    return r[0];
  });
  Form.Cliente = Cliente;

  let MostrarForm = Form.evaluate().setSandboxMode(
    HtmlService.SandboxMode.IFRAME
  );

  MostrarForm.setTitle("Cadastro de Clientes").setHeight(570).setWidth(700);

  SpreadsheetApp.getUi().showModalDialog(MostrarForm, "Cadastro de Clientes");
}

//------------------------------------------------------------------------------------
function CadastraClienteLadoCliente(Dados, id) {
  const user = LockService.getScriptLock();
  user.tryLock(10000);

  if (user.hasLock()) {
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var guia = planilha.getSheetByName("Clientes");
    let ultima_linha_com_dados = UltimaLinhaCom_dados_Da_Planilha(guia, "A");
    //var dadosPlan = guia.getRange("B6:"+"K"+ultima_linha_com_dados).getValues();

    //dadosPlan.length = 0;
    var linha = guia.getLastRow();
    var linha = linha + 1;
    var data = new Date();
    let inf_id_banco = Id(guia, "A");
    GeraId(guia, "A", id, inf_id_banco.linha_para_gravar);
    guia.getRange(linha, 2).setValue(data);
    guia.getRange(linha, 3).setValue([Dados.Cliente]);
    guia.getRange(linha, 5).setValue([Dados.Cnpj]);
    guia.getRange(linha, 6).setValue([Dados.Contato]);
    guia.getRange(linha, 7).setValue([Dados.Rua]);
    guia.getRange(linha, 8).setValue([Dados.Bairro]);
    guia.getRange(linha, 9).setValue([Dados.Cidade]);
    guia.getRange(linha, 10).setValue([Dados.Estado]);
    guia.getRange(linha, 11).setValue([Dados.Obs]);

    //dadosPlan.length = 0;
  }
}
//-------------------------------------------------------------------------------------
function SalvarCliente(Dados) {
  const user = LockService.getScriptLock();
  user.tryLock(10000);

  if (user.hasLock()) {
    //var planilha = SpreadsheetApp.getActiveSpreadsheet();
    let guia = TabelaBanco("Clientes");
    let ultima_linha_com_dados = UltimaLinhaCom_dados_Da_Planilha(guia, "A"),
      linha;
    let dadosPlan = guia
      .getRange("B6:" + "K" + ultima_linha_com_dados)
      .getValues();

    for (linha = 0; linha < dadosPlan.length; linha++) {
      if (dadosPlan[linha][1] == Dados.Cliente) {
        return "CLIENTE JÁ CADASTRADO!";
      }
    }

    dadosPlan.length = 0;
    linha = guia.getLastRow();
    linha = linha + 1;
    let data = new Date();
    let inf_id_banco = Id(guia, "A");
    GeraId(guia, "A", inf_id_banco.proximo_id, inf_id_banco.linha_para_gravar);
    guia.getRange(linha, 2).setValue(data);
    guia.getRange(linha, 3).setValue([Dados.Cliente]);
    guia.getRange(linha, 5).setValue([Dados.Cnpj]);
    guia.getRange(linha, 6).setValue([Dados.Contato]);
    guia.getRange(linha, 7).setValue([Dados.Rua]);
    guia.getRange(linha, 8).setValue([Dados.Bairro]);
    guia.getRange(linha, 9).setValue([Dados.Cidade]);
    guia.getRange(linha, 10).setValue([Dados.Estado]);
    guia.getRange(linha, 11).setValue([Dados.Obs]);

    guia.getRange("B:B").setNumberFormat("@"); //"dd/MM/yyyy"

    let guiaCidades = TabelaBanco("Estados/Cidades");
    let existeCidade;
    dadosPlan = guiaCidades
      .getRange(2, 1, guiaCidades.getLastRow(), 2)
      .getValues();

    for (linha = 0; linha < dadosPlan.length; linha++) {
      if (
        dadosPlan[linha][0] == Dados.Estado &&
        dadosPlan[linha][1] == Dados.Cidade
      ) {
        existeCidade = "SIM";
      }
    }

    if (existeCidade != "SIM") {
      linha = guiaCidades.getLastRow();
      linha = linha + 1;
      guiaCidades.getRange(linha, 1).setValue([Dados.Estado]);
      guiaCidades.getRange(linha, 2).setValue([Dados.Cidade]);
    }

    dadosPlan.length = 0;
    CadastraClienteLadoCliente(Dados, inf_id_banco.proximo_id);
    let aba = SpreadsheetApp.getActive().getActiveSheet();
    LimitadorDeLinhas(aba, "A");
    // RemoveLinhasSemUso(aba)

    return "REGISTRADO COM SUCESSO!";
  }
}
//------------------------------------------------------------------------
function PesquisarCliente(nomeCliente) {
  //var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guia = TabelaBanco("Clientes");
  let ultima_linha_com_dados = UltimaLinhaCom_dados_Da_Planilha(guia, "A");
  var dadosPlan = guia
    .getRange("B6:" + "K" + ultima_linha_com_dados)
    .getValues();

  for (var linha = 0; linha < dadosPlan.length; linha++) {
    //  SpreadsheetApp.getUi().alert("dadosPlan " +dadosPlan[0][1]  , SpreadsheetApp.getUi().ButtonSet.OK)

    if (dadosPlan[linha][1] == nomeCliente) {
      var Carregar = {};

      Carregar.Cliente = dadosPlan[linha][1];
      Carregar.Cnpj = dadosPlan[linha][3];
      Carregar.Contato = dadosPlan[linha][4];
      Carregar.Rua = dadosPlan[linha][5];
      Carregar.Bairro = dadosPlan[linha][6];
      Carregar.Cidade = dadosPlan[linha][7];
      Carregar.Estado = dadosPlan[linha][8];
      Carregar.Obs = dadosPlan[linha][9];
      dadosPlan.length = 0;

      return [
        Carregar.Cliente,
        Carregar.Cnpj,
        Carregar.Contato,
        Carregar.Rua,
        Carregar.Bairro,
        Carregar.Cidade,
        Carregar.Estado,
        Carregar.Obs,
      ];
    }
  }

  dadosPlan.length = 0;
  return "CLIENTE NÃO ENCONTRADO!";
}

//----------------------------------------------------------------------------------------------------------------
function EditarCliente(Dados) {
  const user = LockService.getScriptLock();
  user.tryLock(10000);

  if (user.hasLock()) {
    //var planilha = SpreadsheetApp.getActiveSpreadsheet();
    var guiaCliente = TabelaBanco("Clientes");
    var guiaPedido = TabelaBanco("Pedidos");
    let ultima_linha_com_dados_cliente = UltimaLinhaCom_dados_Da_Planilha(
      guiaCliente,
      "A"
    );
    var dadosClientes = guiaCliente
      .getRange("B6:" + "K" + ultima_linha_com_dados_cliente)
      .getValues();
    var dadosPedidos = guiaPedido
      .getRange(2, 11, guiaPedido.getLastRow(), 1)
      .getValues();

    var ver = dadosPedidos.filter(function (value, i, arr) {
      return Dados.nomeCliente == arr[i][0];
    });

    for (var linha = 0; linha < dadosClientes.length; linha++) {
      //  SpreadsheetApp.getUi().alert("dadosClientes[linha][0] " +dadosClientes[linha][1]  , SpreadsheetApp.getUi().ButtonSet.OK)

      if (dadosClientes[linha][1] == Dados.nomeCliente) {
        var linha = linha + 6;

        guiaCliente.getRange(linha, 5).setValue([Dados.Cnpj]);
        guiaCliente.getRange(linha, 6).setValue([Dados.Contato]);
        guiaCliente.getRange(linha, 7).setValue([Dados.Rua]);
        guiaCliente.getRange(linha, 8).setValue([Dados.Bairro]);
        guiaCliente.getRange(linha, 9).setValue([Dados.Cidade]);
        guiaCliente.getRange(linha, 10).setValue([Dados.Estado]);

        dadosClientes.length = 0;
        dadosPedidos.length = 0;

        if (ver.length > 0) {
          return "EDITADO COM SUCESSO, EXCETO NOME DO CLIENTE. JÁ TEM PEDIDO!";
        } else {
          guiaCliente.getRange(linha, 3).setValue([Dados.Cliente]);
          //  SpreadsheetApp.getUi().alert("Gravado " +guiaCliente.getRange(linha, 2).getValue() , SpreadsheetApp.getUi().ButtonSet.OK)
        }

        return "CLIENTE EDITADO COM SUCESSO!";
      }
    }

    dadosClientes.length = 0;
    return "CLIENTE NÃO ENCONTRADO!";
  }
}

function ExcluirCliente(nomeCliente) {
  const user = LockService.getScriptLock();
  user.tryLock(10000);

  if (user.hasLock()) {
    var guiaCliente = TabelaBanco("Clientes");
    var guiaPedido = TabelaBanco("Pedidos");

    let ultima_linha_com_dados_cliente = UltimaLinhaCom_dados_Da_Planilha(
      guiaCliente,
      "A"
    );
    var dadosClientes = guiaCliente
      .getRange("B6:" + "K" + ultima_linha_com_dados_cliente)
      .getValues();
    var dadosPedidos = guiaPedido
      .getRange(2, 11, guiaPedido.getLastRow(), 1)
      .getValues();

    var ver = dadosPedidos.filter(function (value, i, arr) {
      return nomeCliente == arr[i][0];
    });

    if (ver.length > 0) {
      dadosClientes.length = 0;
      dadosPedidos.length = 0;
      return "CLIENTE NÃO PODE SER EXCLUÍDO. JÁ TEM LANÇAMENTO DE PEDIDO!";
    }

    for (var linha = 0; linha < dadosClientes.length; linha++) {
      if (dadosClientes[linha][1] == nomeCliente) {
        var i = linha + 6;
        guiaCliente.deleteRow(i);

        dadosClientes.length = 0;
        dadosPedidos.length = 0;

        return "EXCLUIDO COM SUCESSO!";
      }
    }

    dadosClientes.length = 0;
    dadosPedidos.length = 0;

    return "CLIENTE NÃO ENCONTRADO!";
  }
}

//-------------------------------------------------------------------------------------------------
function VerificarCliente(nomeCliente) {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var guiaCliente = planilha.getSheetByName("Clientes");

  var dadosPlan = guiaCliente
    .getRange(2, 2, guiaCliente.getLastRow(), 1)
    .getValues();

  for (var linha = 0; linha < dadosPlan.length; linha++) {
    if (dadosPlan[linha][0] == nomeCliente) {
      dadosPlan.length = 0;
      return "CLIENTE JÁ CADASTRADO!";
    }
  }

  dadosPlan.length = 0;
  return "CLIENTE NÃO CADASTRADO!";
}

function AtualizarListaClientes() {
  let guiaCliente = TabelaBanco("Clientes");
  let ultima_linha_com_dados_cliente =
    UltimaLinhaCom_dados_Da_Planilha(guiaCliente, "A") + 1;
  let list = guiaCliente
    .getRange("B6:" + "K" + ultima_linha_com_dados_cliente)
    .getValues();

  // SpreadsheetApp.getUi().alert("list " + list.length, SpreadsheetApp.getUi().ButtonSet.OK)

  return list.sort();
}

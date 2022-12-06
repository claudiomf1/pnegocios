let CampoCliente = document.getElementById("Cliente");
let CampoCnpj = document.getElementById("Cnpj");
let CampoContato = document.getElementById("Contato");
let CampoRua = document.getElementById("Rua");
let CampoBairro = document.getElementById("Bairro");
let CampoCidade = document.getElementById("Cidade");
let CampoEstado = document.getElementById("Estado");
let CampoObs = document.getElementById("Obs");
let CampoListaCliente = document.getElementById("ListaCliente");

function CaixaAlta(e) {
  let ss = e.target.selectionStart;
  let se = e.target.selectionEnd;
  e.target.value = e.target.value.toUpperCase();
  e.target.selectionStart = ss;
  e.target.selectionEnd = se;
}

let CaixaMsg = document.getElementById("CaixaMsg");
let TituloMsg = document.getElementById("TituloMsg");
let CorpoMsg = document.getElementById("CorpoMsg");
let RodapeMsg = document.getElementById("RodapeMsg");
let BtnFechar =
  '<button class = "orange" onclick= "Fechar()" style = "cursor:pointer" ><b> <font color= "black" size = "5">Fechar</font></b></button>';

function caixaMsgbox(m) {
  CaixaMsg.style.display = "block";

  TituloMsg.innerHTML = "AVISO";
  CorpoMsg.innerHTML = m;
  RodapeMsg.innerHTML = BtnFechar;
}

function Fechar() {
  CaixaMsg.style.display = "none";
}

let Confirm = new Mensagem();

function Mensagem() {
  this.Executar = function () {
    CaixaMsg.style.display = "block";

    TituloMsg.innerHTML = "AVISO";
    CorpoMsg.innerHTML = "DESEJA REALMENTE EXCLUIRRRR?";

    let BtnSim =
      '<button class = "green" onclick = "Confirm.Sim()" style = "cursor:pointer" ><b><font color = "black" size = "5">Sim</font></b></button>';

    let BtnNao =
      '<button class = "red" onclick = "Confirm.Nao()" style = "cursor:pointer" ><b><font color = "black"  size = "5">Não</font></b></button>';

    RodapeMsg.innerHTML = BtnSim + BtnNao;
  };

  this.Nao = function () {
    Fechar();
  };

  this.Sim = function () {
    let nomeCliente = CampoListaCliente.value;

    if (nomeCliente == "" || nomeCliente == "Escolha um Cliente") {
      CorpoMsg.innerHTML = "CANCELADO. CAMPO LISTA NÃO PODE SER VAZIO!";
      RodapeMsg.innerHTML = BtnFechar;
      return;
    }

    ExcluirCliente();
  };
}

function MascaraCnpj() {
  let CNPJ = CampoCnpj.value;

  if (CNPJ.length == 2) {
    CNPJ = CNPJ + ".";
    CampoCnpj.value = CNPJ;
    return true;
  }

  if (CNPJ.length == 6) {
    CNPJ = CNPJ + ".";
    CampoCnpj.value = CNPJ;
    return true;
  }

  if (CNPJ.length == 10) {
    CNPJ = CNPJ + "/";
    CampoCnpj.value = CNPJ;
    return true;
  }

  if (CNPJ.length == 15) {
    CNPJ = CNPJ + "-";
    CampoCnpj.value = CNPJ;
    return true;
  }
}

function MascaraTelefone() {
  //let CampoTel = document.getElementById("Contato");
  let Tel = CampoContato.value;

  if (Tel.length == 1) {
    Tel = "(" + Tel;
    CampoContato.value = Tel;
    return true;
  }

  if (Tel.length == 3) {
    Tel = Tel + ")";
    CampoContato.value = Tel;
    return true;
  }

  if (Tel.length == 9) {
    Tel = Tel + "-";
    CampoContato.value = Tel;
    return true;
  }
}

function VerificarCliente() {
  let listaCliente = CampoListaCliente.value;
  // alert("teste ")
  let nomeCliente = CampoCliente.value;
  if (listaCliente.trim().length != 0) {
    return false;
  }

  google.script.run.withSuccessHandler(Retorno).VerificarCliente(nomeCliente);

  function Retorno(r) {
    if (r == "CLIENTE JÁ CADASTRADO!") {
      if (CampoCliente.value != "") {
        CampoCliente.focus();
        let m = r;
        caixaMsgbox(m);
      }

      CampoCliente.value = "";
      CampoCliente.focus();
    }
  }
}

// document.getElementById("btnSalvar").addEventListener("click", SalvarCliente);
//--------------------------------------------------------------------------------------------
function SalvarCliente() {
  let Cliente = CampoCliente.value;
  let Cnpj = CampoCnpj.value;
  let Contato = CampoContato.value;
  let Rua = CampoRua.value;
  let Bairro = CampoBairro.value;
  let Cidade = CampoCidade.value;
  let Estado = CampoEstado.value;

  Cliente = Cliente.trim();
  Cnpj = Cnpj.trim();
  Contato = Contato.trim();
  Cidade = Cidade.trim();

  if (
    Cliente == "" ||
    Cnpj == "" ||
    Contato == "" ||
    Bairro == "" ||
    Cidade == "" ||
    Estado == ""
  ) {
    let m = "PRECISA PREENCHER TODOS OS CAMPOS!";
    caixaMsgbox(m);
    return false;
  }

  let Dados = {
    Cliente: Cliente,
    Cnpj: Cnpj,
    Contato: Contato,
    Rua: Rua,
    Bairro: Bairro,
    Cidade: Cidade,
    Estado: Estado,
    Obs: CampoObs.value,
  };

  google.script.run.withSuccessHandler(Salvar).SalvarCliente(Dados);

  function Salvar(r) {
    let m = r;
    caixaMsgbox(m);

    if (r != "CLIENTE JÁ CADASTRADO!") {
      Limpar();
    }
  }
}

// document.getElementById("ListaCliente").addEventListener("input", Pesquisar);

function Pesquisar() {
  let nomeCliente = CampoListaCliente.value;

  google.script.run.withSuccessHandler(Carregar).PesquisarCliente(nomeCliente);
}

function Carregar(r) {
  if (r != "CLIENTE NÃO ENCONTRADO!") {
    CampoCliente.value = r[0];
    M.updateTextFields();
    CampoCnpj.value = r[1];
    M.updateTextFields();
    CampoContato.value = r[2];
    M.updateTextFields();
    CampoRua.value = r[3];
    M.updateTextFields();
    CampoBairro.value = r[4];
    M.updateTextFields();
    CampoCidade.value = r[5];
    M.updateTextFields();
    CampoEstado.value = r[6];
    M.updateTextFields();
    CampoObs.value = r[7];
    M.updateTextFields();
    CampoListaCliente.value = r[0];
  } else {
    let m = r;
    caixaMsgbox(m);
  }
}

// document.getElementById("btnLimpar").addEventListener("click", Limpar);

function Limpar() {
  CampoCliente.value = "";
  CampoCnpj.value = "";
  CampoContato.value = "";
  CampoRua.value = "";
  CampoBairro.value = "";
  CampoCidade.value = "";
  CampoEstado.value = "";
  CampoObs.value = "";
  CampoListaCliente.value = "";
  AtualizarClientes();
}

// document.getElementById("btnEditar").addEventListener("click", EditarCliente);

function EditarCliente() {
  let nomeCliente = CampoListaCliente.value;
  let Cliente = CampoCliente.value;
  let Cnpj = CampoCnpj.value;
  let Contato = CampoContato.value;
  let Rua = CampoRua.value;
  let Bairro = CampoBairro.value;
  let Cidade = CampoCidade.value;
  let Estado = CampoEstado.value;
  let ListaCliente = CampoListaCliente.value;

  Cliente = Cliente.trim();
  Cnpj = Cnpj.trim();
  Contato = Contato.trim();
  Cidade = Cidade.trim();

  if (nomeCliente == "" || nomeCliente == "Escolha um Cliente") {
    let m = "PRECISA SELECIONAR CLIENTE NA LISTA!";
    caixaMsgbox(m);
    return;
  }

  if (
    Cliente == "" ||
    Cnpj == "" ||
    Contato == "" ||
    Bairro == "" ||
    Cidade == "" ||
    Estado == "" ||
    ListaCliente == ""
  ) {
    let m = "PRECISA PREENCHER TODOS OS CAMPOS!";
    caixaMsgbox(m);
    return;
  }

  let Dados = {
    nomeCliente: nomeCliente,
    Cliente: Cliente,
    Cnpj: Cnpj,
    Contato: Contato,
    Rua: Rua,
    Bairro: Bairro,
    Cidade: Cidade,
    Estado: Estado,
    Obs: CampoObs.value,
  };

  google.script.run.withSuccessHandler(Retorno).EditarCliente(Dados);

  function Retorno(r) {
    let m = r;
    caixaMsgbox(m);

    if (r != "CLIENTE NÃO ENCONTRADO!") {
      Limpar();
    }
  }
}

function ExcluirCliente() {
  let nomeCliente = CampoListaCliente.value;

  google.script.run.withSuccessHandler(Excluir).ExcluirCliente(nomeCliente);

  function Excluir(r) {
    if (r == "EXCLUIDO COM SUCESSO!") {
      let m = r;
      caixaMsgbox(m);
      Limpar();
    } else {
      let m = r;
      caixaMsgbox(m);
    }
  }
}
//---------------------------------------------------
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
//------------------------------
function AtualizarClientes() {
  while (CampoListaCliente.length) {
    CampoListaCliente.remove(0);
  }

  let NovaOpcao = document.createElement("option");
  let Texto = document.createTextNode("Escolha um Cliente");
  NovaOpcao.appendChild(Texto);
  CampoListaCliente.insertBefore(NovaOpcao, CampoListaCliente.lastChild);

  CampoListaCliente.options[0].disabled = true;

  google.script.run.withSuccessHandler(Carregar).AtualizarListaClientes();

  async function Carregar(clientes) {
    clientes.forEach(function (r) {
      let NovaOpcao = document.createElement("option");
      let Texto = document.createTextNode(r[1]);
      NovaOpcao.appendChild(Texto);
      CampoListaCliente.insertBefore(NovaOpcao, CampoListaCliente.lastChild);
    });
  }
}

// document.addEventListener("DOMContentLoaded", PesquisaAbrir);

function PesquisaAbrir() {
  if (CampoListaCliente.value != "") {
    Pesquisar();
  }
}

// document.getElementById("iconeCliente").addEventListener("click", FormFiltro);

function FormFiltro() {
  let Cliente = CampoListaCliente.value;
  let Cnpj = CampoCnpj.value;
  let Contato = CampoContato.value;
  let Estado = CampoEstado.value;
  let Cidade = CampoCidade.value;

  google.script.run
    .withSuccessHandler()
    .FormFiltroClientes(Cliente, Cnpj, Contato, Estado, Cidade);
}
export let dadosct;

let tokenClient;
let gapiInited = false;
let gisInited = false;
const CLIENT_ID =
  "167620078508-hhncerbeqjk9s1eo7f5ah71fekljd1ob.apps.googleusercontent.com";
const API_KEY = "AIzaSyDs11gmvAQb2xdRL_fWVvhrTRKyz4NoZ5w";

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
async function intializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

//-------------------------------------------
const scripts = [
  "https://apis.google.com/js/api.js",
  "https://accounts.google.com/gsi/client",
];
function loadScripts(scripts) {
  let script = scripts.shift();

  let el = document.createElement("script");
  el.src = script;
  document.body.appendChild(el);
  if (scripts.length) {
    loadScripts(scripts);
  } else {
    console.log("run app");
  }
  // el.onload = function (script) {
  //   // console.log(scripts.shift() + " loaded!");

  // };
}

//loadScripts(scripts);

//-----------------------------------------------------------------------
let dadosct2;
function setDataForSearchCliente() {
  const myPromisse = new Promise((resolve, reject) => {
    let response = gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: "1DHcDn2eTzk6VNa3x3fhQ1X_RgTpGHfV09VWxHD2gk54",
      range: "Clientes!A6:C",
    });
    if (response) {
      const range = response.result;
      resolve((dadosct = [...range.values]));
      return dadosct;
    }
  });

  myPromisse.then((data) => {
    alert(data);
  });

  //alert(dadosct);
  // await gapi.google.script.run
  //   .withSuccessHandler(options)
  //   .getDataForSearch("clientes", "c6:c");

  // async function options(dados) {
  //   dadosct = [...dados];
  //   console.log(dadosct);
  // }
  // dadosct2 = [...dadosct];
}
export function retorna_dadosct() {
  return setDataForSearchCliente();
}

//-------------------------------------------------------------------------------

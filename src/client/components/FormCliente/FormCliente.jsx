// import "./EstiloFormCliente.scss";
import { retorna_dadosct } from "./FormCliente-js";
import { dadosct } from "./FormCliente-js";
// import "./FormCliente-js.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import SelectSourch from "../SelectSearch/SelectSearch";

let intialData = [
  ["Selecione"],
  ["Claudio"],
  ["Augusto"],
  ["Programadores"],
  ["Irmaos"],
  ["Vanguarda"],
  ["Farinha"],
  ["Felicidade"],
];
retorna_dadosct();
//let initialData = [...dadosct];
//const initialData = [...retorna_dadosct()];
function FormCliente() {
  //console.log(dadosct);
  return (
    <Form>
      <div id="CaixaMsg">
        <div>
          <div id="TituloMsg"></div>
          <div id="CorpoMsg"></div>
          <div id="RodapeMsg"></div>
        </div>
      </div>
      <SelectSourch titulo="Escolha um cliente" initialData={dadosct} />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Clientes</Form.Label>
        <Form.Control type="email" placeholder="Enter cliente" />
        <Form.Text className="text-muted">Digite o nome do cliente.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>CNPJ</Form.Label>
        <Form.Control type="" placeholder="Enter cnpj" />
        <Form.Text className="text-muted">Digite o cnpj.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Contato</Form.Label>
        <Form.Control type="" placeholder="Enter contato" />
        <Form.Text className="text-muted">Digite o telefone.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Rua</Form.Label>
        <Form.Control type="" placeholder="Enter rua" />
        <Form.Text className="text-muted">Digite a rua.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bairro</Form.Label>
        <Form.Control type="" placeholder="Enter bairro" />
        <Form.Text className="text-muted">Digite o bairro.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Cidade</Form.Label>
        <Form.Control type="" placeholder="Enter cidade" />
        <Form.Text className="text-muted">Digite a cidade.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Obs</Form.Label>
        <Form.Control type="" placeholder="Enter obs" />
        <Form.Text className="text-muted">Digite a OBS.</Form.Text>
      </Form.Group>

      <div className="objeto">
        <div className="Row">
          <div
            style={{
              position: "absolute",
              top: "300px",
              right: "123px",
            }}></div>
          <div className="col s12">
            <br />
            <br />
            <br />
            <br />
            <Button variant="primary">Limpar</Button>{" "}
            <Button variant="success">Salvar</Button>{" "}
          </div>
        </div>
      </div>
    </Form>
  );
}
export default FormCliente;

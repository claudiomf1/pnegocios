// import "./style.scss";
// import "./bootstrap.js";
import { Button } from "react-bootstrap";
function About() {
  return (
    <div>
      <h1>About Page</h1>
      <h2>Outro texto</h2>
      <h1 className="teste">teste classe</h1>
      <Button type="button" className="btn btn-primary">
        teste de botao2
      </Button>

      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false">
          Botão dropdown2
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">
            Alguma ação
          </a>
          <a className="dropdown-item" href="#">
            Outra ação
          </a>
          <a className="dropdown-item" href="#">
            Alguma coisa aqui
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;

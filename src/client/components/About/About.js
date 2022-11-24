// import "./style.scss";
// import "./bootstrap.js";
import { Button } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
function About() {
  return (
    <div>
      <h1>About Page</h1>
      <h2>Outro texto</h2>
      <h1 className="teste">teste classe</h1>
      <Button className="border-0 mx-2" variant={"dark"}>
        botao azul
      </Button>{" "}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default About;

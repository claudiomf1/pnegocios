import Dropdown from "react-bootstrap/Dropdown";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import { ListGroup } from "react-bootstrap";
import React, { useRef, useLayoutEffect } from "react";
import { useEffect, useState } from "react";

function SelectSourch(props) {
  // const containerRef = useRef();

  const [dados, setDados] = useState(props.initialData);

  function btnInput(e) {
    setDados(ResultSearch(e.target.value, [0], dados));
  }
  //------------------------------------------------------------------

  const clickselect = () => {
    // let input = document.getElementById("searchInput");
    // if (!input || input.value === "") {
    //   alert(input);
    //   createResultInHtml("searchResults", "rowTemplate", [".se-dado"], dados);
    //  }
  };
  function optionSelect(e) {
    let botaoselect = document.getElementById("dropdownMenuButton1");

    botaoselect.textContent = e.target.textContent;
    botaoselect.setAttribute("valor", e.target.innerText);
  }
  //---------------------------------------------------------------

  function createResultInHtml(
    searchResults_p,
    rowTemplate_p,
    listaColsTable,
    resultsArray
  ) {
    // console.log(resultsArray);
    let searchResultsBox = document.getElementById(searchResults_p); // corpo da table html

    let templateBox = document.getElementById(rowTemplate_p); // modelo da linha da table
    //console.log(templateBox);
    let template = templateBox;
    let tr;

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
  /**
   * @indexSearch [0] array com o número da coluna
   * @dados_p o array de dados  (completo)
   */
  function ResultSearch(inputText, indexsSearch, dados_p) {
    let searchInput = inputText.toLowerCase().trim(); // pegando tudo que esta digitado no input

    let searchWords = searchInput.split(/\s+/); // cria um array das palavras digitadas no input, sendo o separador um ou mais espaços, so nao entendi ainda o motivo disso

    let searchColumnar = [...indexsSearch]; // define em quais indices do array trazido do banco de dados sera feita a pesquisa

    // and or
    let resultsArray =
      searchInput === ""
        ? props.initialData
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
  return (
    <Dropdown>
      <Dropdown.Toggle
        valor="Selecione"
        variant="success"
        aria-expanded="false"
        id="dropdownMenuButton1"
        //onClick={() => clickselect()}
      >
        {props.titulo}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Pesquise"
            id="searchInput"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onInput={btnInput}
          />
        </InputGroup>
        <Dropdown.Item href="#/action-1">
          <ListGroup style={{ overflow: "auto", maxHeight: "120px" }}>
            <Form>
              <Table striped bordered hover>
                <tbody id="searchResults" onClick={optionSelect}>
                  {dados.map(([option], index) => {
                    return (
                      <tr key={index}>
                        <td className="se-dado">{option} </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Form>
          </ListGroup>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
export default SelectSourch;

function Menu() {
  var Form = HtmlService.createTemplateFromFile("index");
  // Form.categorias = Categorias();
  var MostrarForm = Form.evaluate();

  MostrarForm.setTitle(" ").setHeight(470).setWidth(450);

  SpreadsheetApp.getUi().showModalDialog(MostrarForm, "MENU");
}

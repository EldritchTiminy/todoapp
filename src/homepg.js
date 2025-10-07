
function homePage () {
  let header = "Todo-app";
  let hero = "Productivity starts here!";

  let container = document.createElement("div");
  let content = document.getElementById("content");
  let headerOne = document.createElement("h1");
  let taskForm = document.createElement("form");
  let taskText = document.createElement("input");
  let heroPar = document.createElement("p");
  headerOne.textContent = header;
  heroPar.textContent = hero;
  taskText.type = "text";
  taskForm.appendChild(taskText);
  container.appendChild(headerOne);
  console.log("Adding header...");
  container.appendChild(heroPar);
  console.log("Adding hero text...");
  content.appendChild(container);
  console.log("Adding form elements...");
  content.appendChild(taskForm);
  console.log("Wrapping up...");
};

export default homePage;
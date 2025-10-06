function menuPage () {
  let header = "Menu";
  let menuList = "Pancakes | $10";

  let container = document.createElement("div");
  let content = document.getElementById("content");
  let headerOne = document.createElement("h1");
  headerOne.textContent = header;
  let menuPar = document.createElement("p");
  menuPar.textContent = menuList;
  container.appendChild(headerOne);
  console.log("Adding menu header...");
  container.appendChild(menuPar);
  console.log("Adding menu text...");
  content.appendChild(container);
  console.log("Wrapping up...");
};

export default menuPage;
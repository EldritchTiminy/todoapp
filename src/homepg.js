
function homePage () {
  let header = "Tim's Restaurant!";
  let hero = "We have the best foods!";

  let container = document.createElement("div");
  let content = document.getElementById("content");
  let headerOne = document.createElement("h1");
  headerOne.textContent = header;
  let heroPar = document.createElement("p");
  heroPar.textContent = hero;
  container.appendChild(headerOne);
  console.log("Adding header...");
  container.appendChild(heroPar);
  console.log("Adding hero text...");
  content.appendChild(container);
  console.log("Wrapping up...");
};

export default homePage;
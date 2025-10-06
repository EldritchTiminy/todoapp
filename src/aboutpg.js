function aboutPage () {
  let header = "About";
  let abtText = "This is Tim's restaurant. Duh.";

  let container = document.createElement("div");
  let content = document.getElementById("content");
  let headerOne = document.createElement("h1");
  headerOne.textContent = header;
  let aboutPar = document.createElement("p");
  aboutPar.textContent = abtText;
  container.appendChild(headerOne);
  console.log("Adding about header...");
  container.appendChild(aboutPar);
  console.log("Adding about text...");
  content.appendChild(container);
  console.log("Wrapping up...");
};

export default aboutPage;
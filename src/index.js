import "./style.css";
import homePage from "./homepg";
import menuPage from "./menupg";
import aboutPage from "./aboutpg";

console.log("Index script running...");
homePage();

const homeBtn = document.getElementById("hbtn");
const menuBtn = document.getElementById("mbtn");
const aboutBtn = document.getElementById("abtn");

function tabSwitch () {
  let content = document.getElementById("content");
  content.innerHTML = "";
};

homeBtn.addEventListener("click", () => {
  tabSwitch();
  homePage();
});
menuBtn.addEventListener("click", () => {
  tabSwitch();
  menuPage();
});
aboutBtn.addEventListener("click", () => {
  tabSwitch();
  aboutPage();
});
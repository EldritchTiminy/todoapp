import "./style.css";
import {autoLoadList} from "./modules/storage";
import {loadFormButtons} from "./modules/formops";
import {openNav, closeNav} from "./modules/offcanvasmenu.js";
import menubtn from "./public/menubtn.svg";

autoLoadList();

loadFormButtons();

let navToggle = document.getElementById("navToggle");
navToggle.src = menubtn;
navToggle.addEventListener("click", openNav);
let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", closeNav);
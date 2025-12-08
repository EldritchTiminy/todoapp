import "./style.css";
import {autoLoadList} from "./modules/storage";
import {loadFormButtons} from "./modules/formops";
import {openNav, closeNav} from "./modules/offcanvasmenu.js";

autoLoadList();

loadFormButtons();

let navToggle = document.getElementById("navToggle");
navToggle.addEventListener("click", openNav);
let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", closeNav);
import "./style.css";
import {autoLoadList} from "./modules/storage";
import {loadFormButtons} from "./modules/formops";
import menubtn from "./public/menubtn.svg";

autoLoadList();

loadFormButtons();

let navTitleIcon = document.getElementById("menuIcon");
navTitleIcon.src = menubtn;
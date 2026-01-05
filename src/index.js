import "./style.css";
import {autoLoadList} from "./modules/storage";
import {loadFormButtons} from "./modules/formops";
import {addTaskButton, formTog} from "./modules/addtaskform";

autoLoadList();

loadFormButtons();
addTaskButton();

document.getElementById("formTog").addEventListener("click", formTog);
document.getElementById("canBtn").addEventListener("click", formTog);
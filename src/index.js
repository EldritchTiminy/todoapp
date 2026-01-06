import "./style.css";
import {autoLoadList} from "./modules/storage";
import {loadFormButtons} from "./modules/formops";
import {createAddTaskButton, createCancelBtn} from "./modules/addtaskform";

autoLoadList();

loadFormButtons();

createAddTaskButton();
createCancelBtn();
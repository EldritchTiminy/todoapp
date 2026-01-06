import "./style.css";
import {autoLoadList} from "./modules/storage";
import {loadFormButtons} from "./modules/formops";
import {createAddTaskButton, createCancelBtn} from "./modules/addtaskform";
import {completionToggleBtn} from "./modules/completionbar";

autoLoadList();

loadFormButtons();

createAddTaskButton();
createCancelBtn();
completionToggleBtn();
import "./style.css";
import {autoLoadList} from "./modules/storage";
import {loadFormButtons} from "./modules/formops";
import addTaskButton from "./modules/addtaskform";

autoLoadList();

loadFormButtons();
addTaskButton();
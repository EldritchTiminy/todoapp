import "./style.css";
import {taskLibrary} from "./tasks";
import {autoLoadList, clearList} from "./storage";
import {addTask, renderList} from "./taskrender";
import {loadFormButtons} from "./formops";

autoLoadList();

loadFormButtons();
import {renderList} from "./taskrender";
import {taskLibrary} from "./tasks";

function exampleTasks () {
  taskLibrary.addTask("Example Task: Wash the dishes");;
  taskLibrary.addTask("Example Task: Vacuum the livingroom");
  taskLibrary.addTask("Example Task: Check the mail");
  renderList(taskLibrary.tasks);
};

export {exampleTasks};
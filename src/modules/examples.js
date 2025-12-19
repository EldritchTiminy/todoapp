/*
this script creates a few example tasks in the case that a user does not have a task list currently saved in localStorage
*/

// imports
import {renderList} from "./taskrender";
import taskLibrary from "./tasks";

// scripting
export default function exampleTasks () {
  taskLibrary.addTask("Example Task: Wash the dishes");;
  taskLibrary.addTask("Example Task: Vacuum the livingroom");
  taskLibrary.addTask("Example Task: Check the mail");
  renderList(taskLibrary.tasks);
};
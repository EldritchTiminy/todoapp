let taskLibrary = {
  tasks: [],
  getOrder: function () {
    return this.tasks.length;
  },
  /*getSubOrder: function () {
    if (this.subtasks) {
      return this.subtasks.length;
    } else {
      return 0;
    };
  },*/
  updateOrder: function () {
    let leng = this.tasks.length;
    for (let i = 0; i < leng; i++) {
      this.tasks[i].index = (i);
    };
  },
  /*updateSubOrder: function () {
    let leng = this.subtasks.length;
    if (this.subtasks) {
      for (let i = 0; i < leng; i++) {
        this.subtasks[i].index = (i);
      };
    };
  },*/
  addTask: function (text) {
    let newTask = {
      text: text,
      index: this.getOrder(),
      subtasks: [],
      complete: false,
      addSubTask: function (text) {
        let newSubtask = {
          text: text,
          index: this.getSubOrder(),
          complete: false,
        };
        if (this.subtasks) {
          this.subtasks.push(newSubtask);
        } else {
          this.subtasks = [newSubtask];
        };
      },
      getSubOrder: function () {
        if (this.subtasks) {
          return this.subtasks.length;
        } else {
          return 0;
        };
      },
      updateSubOrder: function () {
        let leng = this.subtasks.length;
        if (this.subtasks) {
          for (let i = 0; i < leng; i++) {
            this.subtasks[i].index = (i);
          };
        };
      },
    };
    this.tasks.push(newTask);
  },
  /*addSubtask: function (text, index) {
    let newSubtask = {
      text: text,
      parent: index,
      index: this.getSubOrder(),
      complete: false,
    };
    if (this.subtasks) {
      this.subtasks.push(newSubtask);
    } else {
      this.subtasks = [newSubtask];
    };
  },*/
  autoSave: false,
};

export {taskLibrary};
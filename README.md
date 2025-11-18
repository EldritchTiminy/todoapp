# To Do List - Web App
A simple web app for tracking to-do list items. Users can create to-do list tasks, give tasks subtasks, and track/change task priority.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)

## Features
- Add Tasks
- Give tasks subtasks
- Delete tasks
- Rearrange tasks
- Modular Components
- Utilizes Web Storage API to automatically save your tasks

## Installation
1. Clone the repository
  ```bash
  git clone https://github.com/EldritchTiminy/todoapp.git
  cd todoapp
  ```

2. Install dependencies
  ```bash
  npm install
  ```

3. Start the developement server
  ```bash
  npm run dev
  ```

  ## Usage
  - Type the title of task into the input field and hit "enter" or click "Add Task".
  - Click "Delete" to delete a task.
  - Add subtasks to a task by clicking the "Add Subtask" button under any task.
  - Prioritize by rearranging your tasks using the "Move Up" or "Move Down" buttons.
  - Mark a task as finished by clicking "Complete"

  ## Project Structure
  ```bash
  src/
    index.js # entry point
    template.html
    style.css
    modules/
      examples.js
      formops.js
      movetask.js
      serializer.js
      storeage.js
      taskrender.js
      tasks.js
```

## Tech Stack

### Core
- **JavaScript (ES6+)**

### Supporting Tools
- **Node.js (v24)**
- **npm (v11)**
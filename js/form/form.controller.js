import * as model from '../model.js';
import * as view from './form.view.js';
import { getTestData } from './form.test-data.js';

const init = function () {
  const manager = new model.TaskManager(); // Создадим менеджера для обработки задач
  const id = manager.calcID( manager.getAll() ); // Менеджер получит все задачи и посчитает ID
  const testData = getTestData(); // Получим случайные тестовые данные

  console.log(manager.getAll());
  console.log(testData);

  
  const task = new model.Task(id, {...testData}); // Создадим задачу, передадим в класс ID и случайные данные
  manager.addNewData(task); // Добавим задачу в массив

  const render = new view.TaskRender(); // создадим рендера задачи
  render.setValue(task); // Заполним форму значениями задачи
}

// Запустим программу
init();

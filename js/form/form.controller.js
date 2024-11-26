import * as model from '../model.js';
import { getTestData } from './form.test-data.js';

const manager = new model.TaskManager();
const id = manager.calcID( manager.getAll() );
const testData = getTestData();
console.log(manager);
console.log(manager.getAll());
console.log(id);
console.log(testData);
const task = new model.Task(id, {...testData});

// Добавим задачу в массив
manager.addNewData(task);
console.log(task);
console.log(manager.getAll());
manager.getData(1);
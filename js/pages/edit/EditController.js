import { NAMES } from './../../config/config.js';
import { eventBus, editFormManager, managerTask, storage } from './../../model.js';
import { renderEditForm } from './EditFormRender.js';
import { Notes } from './../../utils/notes.js';


class Controller {
  /**
   * Создаёт экземпляр контроллера.
   * 
   * @constructor
   * @param {EventBus} eventBus - Объект для управления событиями.
   * @param {EditFormManager} editFormManager - Менеджер для работы с формой редактирования.
   * @param {Function} renderEditForm - Функция для рендеринга формы редактирования.
   * @param {ManagerTask} managerTask - Менеджер для работы с задачами.
   * @param {Storage} storage - Модуль для работы с хранением данных.
  */
  constructor(eventBus, editFormManager, renderEditForm, managerTask, storage) {
    this.eventBus = eventBus; 
    this.formEditManager = editFormManager;
    this.render = renderEditForm;   
    this.managerTask = managerTask; 
    this.storage = storage;

    this.notes = new Notes();
    this.currentTaskData = null;
  }

  // Старт контроллера
  initController() {
   this.initForm();
   this.initNotes();
   this.initListeners();
   this.loadCurrentTask();
  }



  /**
   * Инициализирует форму редактирования, передавая её элементы в менеджер формы.
   * 
   * @method initForm
  */
  initForm() {
    const formElems = this.render.getFormElems(); // получаем элем-ты формы
    this.formEditManager.setFormElems(formElems); // передадим в editForm
  }

  /**
   * Инициализирует систему заметок, добавляя контейнер для отображения уведомлений.
   * 
   * @method initNotes
  */
  initNotes(){
    let container = document.querySelector('.form__buttons')
    this.notes.setContainer(container);
  }

  /**
   * Инициализирует слушателей событий:
   * - сохранение задачи при отправке формы,
   * - загрузка задачи при получении события TASKS_LOAD.
   * 
   * @method initListeners
  */
  initListeners(){
    this.render.formElements.form.addEventListener('submit', (e)=> this.saveTask(e));
    this.eventBus.on(NAMES.TASKS_LOAD, (task) => this.fillForm(task));
  }


  /**
   * Загружает текущую задачу, используя её ID, и инициирует событие TASKS_LOAD.
   * 
   * @method loadCurrentTask
  */
  loadCurrentTask(){
    const id = this.formEditManager.getTaskId();

    if(!id) {
     console.log('Задача не найдена');
     return;
     
    };
 
    const task = this.storage.findTaskById(id);

    if(!task) {
      console.log('Задача не найдена');
      return;
    }

    this.currentTaskData = task;
    this.eventBus.emit(NAMES.TASKS_LOAD, task);
    
  }

  /**
   * Заполняет форму данными задачи.
   * 
   * @method fillForm
   * @param {Object} task - Данные задачи, которые будут отображены в форме.
  */
  fillForm(task) {
    // Смотрим, что задача прошла проверки
    const validTaskData = this.formEditManager.updateTask(this.currentTaskData, task);

    if (!validTaskData) {
      this.notes.addNote('error', 'Ошибка: не удалось сохранить изменения. Проверьте введённые данные');
      return;
    }

    // Если ок - заполним форму
    this.formEditManager.setFormTasksValues(task);
  }

  /**
   * Сохраняет задачу при отправке формы:
   * - получает данные из формы,
   * - обновляет задачу,
   * - сохраняет изменения в хранилище и отображает уведомления.
   * 
   * @method saveTask
   * @param {Event} event - Событие отправки формы.
  */
  saveTask(event) {
    event.preventDefault();

    //  Получаем данные из формы
    const formData = this.formEditManager.getFormData(this.render.formElements.form);

    if(!formData) {
      console.log('Ошибка: форма заполнена не верно');
      return;
    }

    // Обновляем задачу
    let updatedTask = this.formEditManager.updateTask(this.currentTaskData, formData);

    if(!updatedTask) {
      updatedTask = this.currentTaskData;
      this.notes.addNote('error', 'Ошибка: не удалось сохранить изменения. Проверьте введённые данные');
      return;
    }

    this.currentTaskData = updatedTask; // Обновим текущ. задачу в контроллере
    this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask); // уведом-е

    // Сохраним задачу
    const isSaved = this.managerTask.updateSingleTaskData(updatedTask);
  
    if (!isSaved) {
      this.notes.addNote('error', 'Ошибка: не удалось сохранить изменения. Повторите попытку.');
      return;
    }

    this.notes.addNote('success', 'Задача успешно сохранена');
    this.eventBus.emit(NAMES.TASKS_SAVE, updatedTask);
  }

}

const controller = new Controller(
  eventBus,
  editFormManager, 
  renderEditForm,
  managerTask,
  storage
);
controller.initController();
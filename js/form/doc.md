```js
/**
 * Класс для рендеринга формы задачи.
 * Этот класс управляет взаимодействием с формой, включая получение и установку значений, а также работу с ошибками.
 * 
 * @class
 * @see TaskManager
 */
class TaskRender {
  /**
   * Создаёт экземпляр класса TaskRender.
   * Находит форму и элементы формы на странице.
   * @constructor
   */
  constructor () {
    this.form = document.querySelector('#form'),
    this.select = this.form.querySelector('#product'),
    this.inputs = {
      full_name  : this.form.querySelector('#name'),
      phone : this.form.querySelector('#phone'),
      email : this.form.querySelector('#email'),
      product : this.form.querySelector('#product')
    }
    this.options = {
      html : this.select.querySelector('[value = "course-html"]'),
      js   : this.select.querySelector('[value = "course-js"]'),
      vue  : this.select.querySelector('[value = "course-vue"]'),
      php  : this.select.querySelector('[value = "course-php"]'),
      wp  : this.select.querySelector('[value = "course-wordpress"]'),
    }
  }
  
  /**
   * Получает значения из формы.
   * Пробегает все инпуты формы и возвращает объект с их значениями.
   * 
   * @returns {Object} Объект с данными из формы, где ключи — это имена полей формы, а значения — введённые данные.
   * @see Task
   */
  getValues() {
    let inputs = this.inputs; // Инпуты формы
    let formData = {}; // Объект для значений формы

    // Обойдём каждый инпут и получим значения. Добавим в formData
    for (const data in inputs) {
      const input = inputs[data]; 
      formData[data] = input.value;
    }

    return formData;
  }

  /**
   * Устанавливает значения в форму.
   * Заполняет поля формы значениями из переданного объекта задачи.
   * 
   * @param {Object} task Объект задачи, который содержит данные для заполнения формы.
   * @param {string} task.full_name Полное имя пользователя.
   * @param {string} task.phone Номер телефона.
   * @param {string} task.email Адрес электронной почты.
   * @param {string} task.product Выбранный продукт.
   * @see TaskRender#getValues
   */
  fillOutForm(task) {
    const inputs = this.inputs; // инпуты формы
    const options = this.options; // опции селекта

    // Установим значения в поля формы
    inputs.full_name.value = task.full_name;
    inputs.phone.value = task.phone;
    inputs.email.value = task.email;

    let selectedProduct; // Переменная для выбранного продукта

    // Обойдем селект и найдем нужный продукт. 
    for (const item in options) {
      const option = options[item];
      if (option.textContent === task.product) {
        selectedProduct = option;
      }
    }

    // Если продукт получен - установим для него атрибут selected
    if ( selectedProduct) {selectedProduct.setAttribute('selected', ''); }
    
  }

  /**
   * Метод для отображения ошибок.
   * @todo Реализовать отображение ошибок на форме.
   */
  setError() {

  }
}

/**
 * Класс для создания тестовых данных.
 * Этот класс генерирует случайные записи для тестирования с использованием заранее подготовленных данных.
 * 
 * @class
 * @see TaskManager
 */
class TestDataFactory {

  /**
   * Создаёт объект задачи на основе переданных данных.
   * 
   * @param {Object} data Данные для создания записи.
   * @param {string} data.full_name Полное имя пользователя.
   * @param {string} data.product Продукт или курс.
   * @param {string} data.email Адрес электронной почты.
   * @param {string} data.phone Номер телефона.
   * 
   * @returns {Object} Объект задачи, содержащий данные для заполнения формы.
   * @see TaskRender#setValue
   */
  static createRecord (data) {
    return {
      full_name : data.full_name,
      product : data.product,
      email : data.email,
      phone : data.phone
    };
  }

  /**
   * Возвращает случайную запись из предустановленных тестовых данных.
   * Этот метод выбирает случайный элемент из массива и создаёт объект записи с использованием метода {@link TestDataFactory#createRecord}.
   * 
   * @returns {Object} Случайно выбранный объект задачи.
   * @see TestDataFactory#createRecord
   */
  static createRandomRecord () {
    // Тестовые данные
    const testData = [
      {
        "full_name" : "Elena Aurgas",
        "phone" : "89253458675",
        "email" : "helen@google.com",
        "product" : "Курс по JavaScript"
      },
      {
        "full_name" : "Екатерина М",
        "phone" : "89253458675",
        "email" : "justkate@google.com",
        "product" : "Курс по VUE JS"
      },
      {
        "full_name" : "Sofie Braz",
        "phone" : "89245600000",
        "email" : "sofie@outlook.com",
        "product" : "Курс по WordPress",
      },
      {
        "full_name" : "Alexander B",
        "phone" : "89253458675",
        "email" : "al@mail.ru",
        "product" : "Курс по PHP",
      },
      {
        "full_name" : "Екатерина С",
        "phone" : "89253458675",
        "email" : "justkate@google.com",
        "product" : "Курс по VUE JS"
      },
      {
        "full_name" : "Анатолий",
        "phone" : "89253458675",
        "email" : "anatol@google.com",
        "product" : "Курс по VUE JS",
      },
      {
        "full_name" : "Stepanova Polina Vladimirovna",
        "phone" : "89253555555",
        "email" : "polly777@google.com",
        "product" : "Курс по PHP"
      },
      {
        "full_name" : "Stepanova Polina Vladimirovna",
        "phone" : "89253555555",
        "email" : "polly777@google.com",
        "product" : "Курс по VUE JS"
      },
      {
        "full_name" : "Ivan Ivanov Ivanovuch",
        "phone" : "89253555555",
        "email" : "vanya@google.com",
        "product" : "Курс по JavaScript",
      },
      {
        "full_name" : "Pavel Nerezov",
        "phone" : "89253555555",
        "email" : "pn@google.com",
        "product" : "Курс по VUE JS"
      }
    ];

    // Получаем случайное число
    const randomIndex = Math.floor(Math.random() * testData.length);
    
    // Вернём случайную запись
    return TestDataFactory.createRecord(testData[randomIndex]);
  }
}

/**
 * Контроллер для обработки логики формы задач.
 * Этот класс управляет взаимодействием между моделью, видом и данными, включая обработку событий и управление задачами.
 * 
 * @class
 * @see model.TaskManager
 * @see view.TaskRender
 * @see TestDataFactory
 */
class Controller {
  /**
   * Создаёт экземпляр контроллера, инициализируя необходимые компоненты.
   * Включает в себя EventBus, менеджер задач и рендер формы.
   */
  constructor () {
    this.eventBus = model.eventBus; // общий EventBus

    this.manager = new model.TaskManager(model.eventBus); // менеджер для обработки задач
    this.render = new view.TaskRender(); // рендер для отображения задачи
    this.form = this.render.form; // форма отправки задачи
  }

  /**
   * Устанавливает обработчики событий для формы.
   * Подключает обработчик на событие отправки формы.
   * 
   * @method
   */
  setEventListeners () {
    this.form.addEventListener('submit', (e) => this.setTask(e)); // запуск метода setTask при submit
  }

  /**
   * Инициализация контроллера: подключение слушателей событий и загрузка данных.
   * Генерирует случайные данные для задачи и заполняет форму.
   * 
   * @method
   */
  setInit() {
    this.setEventListeners(); // подключаем обработчики событий
    this.eventBus.emit('tasks:load'); // вызываем событие загрузки задач

    const testData = this.setRandomData(); // получаем случайные тестовые данные
    const task = new model.Task({ ...testData }); // создаём задачу с случайными данными
    
    this.render.setValue(task); // заполняем форму значениями задачи
    console.log('DATA AT THE FORM: ', task);
  }

  /**
   * Метод обработки отправки формы. Создаёт новую задачу и сохраняет её в менеджер задач.
   * 
   * @param {Event} e Событие отправки формы.
   * 
   * @method
   */
  setTask(e) {
    e.preventDefault(); // отменяем стандартное поведение формы

    const id = this.getNextTaskId();  // получаем ID для новой задачи
    const taskData = this.render.getValues(); // извлекаем данные задачи из формы
    const task = new model.Task({ ...taskData }); // создаём объект задачи

    this.manager.addNewData(id, task); // добавляем задачу в менеджер
    this.eventBus.emit('tasks:save'); // инициируем событие сохранения
  }

  /**
   * Получает случайные тестовые данные для создания задачи.
   * 
   * @returns {Object} Случайно выбранная запись с данными задачи.
   * @see TestDataFactory#createRandomRecord
   * 
   * @method
   */
  setRandomData () {
    const testData = TestDataFactory.createRandomRecord(); // получаем случайные данные
    return testData;
  }

  /**
   * Получает следующий доступный ID для новой задачи.
   * 
   * @returns {number} Следующий доступный ID.
   * @see model.TaskManager#calcID
   * 
   * @method
   */
  getNextTaskId() {
    return this.manager.calcID(this.manager.getAll()); // рассчитываем ID для новой задачи
  }

  /**
   * Метод для получения случайных данных (тестовых записей).
   * 
   * @returns {Object} Случайные данные для задачи.
   * @see TestDataFactory#createRandomRecord
   * 
   * @method
   */
  getData() {
    return TestDataFactory.createRandomRecord(); // возвращаем случайные данные для задачи
  }
}

// Инициализация программы
const controller = new Controller();
controller.setInit(); // запуск и инициализация




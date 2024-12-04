import { testData } from './../data/data.js';


/**
 * Класс для создания тестовых данных.
 * Этот класс генерирует случайные записи для тестирования с использованием заранее подготовленных данных.
 * 
 * @class
 * @see TaskManager
 */
class TestDataFactory {
  /**
   * Возвращает случайную запись из предустановленных тестовых данных.
   * Этот метод выбирает случайный элемент из массива и создаёт объект записи с использованием метода {@link TestDataFactory#createRecord}.
   * 
   * @returns {Object} Случайно выбранный объект задачи.
   * @see TestDataFactory#createRecord
   */
  static createRandomRecord () {
    
    const randomIndex = Math.floor(Math.random() * testData.length); // Получаем случ-ое число
    return testData[randomIndex]; // Вернём случ. запись
    
  }
}

export { TestDataFactory }
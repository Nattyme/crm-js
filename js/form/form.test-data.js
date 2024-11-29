import { testData } from './test-data.js';

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
    // Получаем случ-ое число
    const randomIndex = Math.floor(Math.random() * testData.length);
    
    // Вернём случ. запись
    return testData[randomIndex];
  }
}


export { TestDataFactory }
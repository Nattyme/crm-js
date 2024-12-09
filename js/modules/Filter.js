/**
 * Класс для управления фильтрацией данных.
 *
 * @class Filter
*/
class Filter {
  /**
   * Фильтрует данные по выбранной категории, возвращает все данные, если категория 'all'.
   *
   * @method filterSelect
   * @memberof Filter
   * @param {Object} startValues - Объект с параметрами для фильтрации.
   * @param {Object[]} startValues.data - Массив данных для фильтрации.
   * @param {string} startValues.key - Ключ объекта для фильтрации.
   * @param {string} startValues.category - Значение категории для фильтрации.
   * @returns {Object[]} Отфильтрованный массив данных.
  */
  filterSelect(startValues) {
    let filterData = startValues.data.filter(task => task[startValues.key] === startValues.category);
    return startValues.category === 'all' ? startValues.data : filterData;
  }

  /**
   * Фильтрует данные, исключая категорию 'all'. Если категория 'all', возвращает все данные.
   *
   * @method filterNotSelect
   * @memberof Filter
   * @param {Object} startValues - Объект с параметрами для фильтрации.
   * @param {Object[]} startValues.data - Массив данных для фильтрации.
   * @param {string} startValues.key - Ключ объекта для фильтрации.
   * @param {string} startValues.category - Значение категории для фильтрации.
   * @returns {Object[]} Отфильтрованный массив данных.
  */
  filterNotSelect (startValues) {
    let filterData = startValues.data.filter(task => {
      if (startValues.category === 'all') {
        return true; // если "all"
      }
    
      return task[startValues.key] === startValues.category;
    });

    return filterData;
  }

  /**
   * Применяет несколько фильтров к данным.
   *
   * @method doSeveralFilters
   * @memberof Filter
   * @param {Object[]} data - Массив данных для фильтрации.
   * @param {Object[]} filtersArr - Массив фильтров с параметрами.
   * @param {Function} filtersArr.method - Метод фильтрации.
   * @param {Object} filtersArr.params - Параметры для каждого фильтра.
   * @returns {Object[]} Отфильтрованные данные после применения всех фильтров.
  */
  doSeveralFilters(data, filtersArr) {
    return filtersArr.reduce( (filteredData, filter) => {
      return filter.method({ ...filter.params, data: filteredData});
    }, data);
  }
}


export { Filter };
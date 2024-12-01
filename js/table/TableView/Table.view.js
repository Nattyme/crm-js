import RowFactory from './factory/Row.js';
import TableActions from './prototype/TableActions.js';

/**
 * Класс для управления отображением таблицы задач.
*/
class TableRender {
  constructor () {
    this.tableActions = new TableActions( RowFactory );
    this.tbody = this.tableActions.setTbody();
  }
}

export { TableRender, RowFactory }
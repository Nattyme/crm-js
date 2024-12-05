class Filter {
 constructor() {
  this.selector = '';
  this.selectedIndex = '';
  this.category = [];
 }

 setCategories(categoryArray) {
  this.category = categoryArray;
 }

 getCategories(select) {
  console.log('here');
  
  for (let item of select.options) {
    if(!item) { 
      console.log('В селекторе нет опций');
      return false;
    }
    this.category.push(item.value);
  }

  return this.category;

 }

 setSelector(selector) {
  this.selector = selector;
 }

 setIndex(selected) {
  this.selectedIndex = selected;
 }


 filterProducts(tasksData, category) {
    return tasksData.filter(task => task.product === category);
 }
}


export { Filter };
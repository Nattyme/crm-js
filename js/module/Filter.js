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
  console.log(select);
  console.log(select.options);
  
 }

 setSelector(selector) {
  this.selector = selector;
 }

 setIndex(selected) {
  this.selectedIndex = selected;
 }


 filterProduct(tasksData, category) {
    return tasksData.filter(task => task.product === category);
 }
}


export { Filter };
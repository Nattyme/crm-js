class Filter {
 constructor() {
  this.selector = '';
  this.selectedIndex = '';
 }

 setSelector(selector) {
  this.selector = selector;
 }

 setIndex(selected) {
  this.selectedIndex = selected;
 }

 doFilter(){
 
 }

 filterProduct(category, tasksData) {
  tasksData.map(task => task.product === category);
 }
}


export { Filter };
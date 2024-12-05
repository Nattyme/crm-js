class Filter {
 constructor() {
  this.selector = '';
  this.selectedIndex = '';
  this.category = [];
 }

 setCategories(categoryArray) {
  this.category = categoryArray;
 }

//  getCatFromSelect(select) {
//   console.log('here');
  
//   for (let item of select.options) {
//     if(!item) { 
//       console.log('В селекторе нет опций');
//       return false;
//     }
//     this.category.push(item.value);
//   }

//   return this.category;

//  }

//  getCatFromLinks(navContainer) {
//   console.log('hereNAV');
  
//   for (let item of navContainer) {
//     let currentItem = item.querySelector('a') ? item.querySelector('a') : item;
//     console.log(tem);
//     console.log(currentItem);
    
//     if(!item) { 
//       console.log('Нет ссылки с такой опцией');
//       return false;
//     }
//     this.category.push(item.value);
//   }

//   return this.category;

//  }

 setSelector(selector) {
  this.selector = selector;
 }

 setIndex(selected) {
  this.selectedIndex = selected;
 }


 filterSelect(startValues) {
  console.log('DATA IN FILTER: ', startValues);
  
    let filterData = startValues.data.filter(task => task[startValues.key] === startValues.category);
    console.log(filterData);
    
    return startValues.category === 'all' ? startValues.data : filterData;
 }

  filterNotSelect (startValues) {
    console.log('filter start value: ', startValues);
    
    let filterData = startValues.data.filter(task => {
      if (startValues.category === 'all') {
        return true; // если "all"
      }
      console.log('filter task', task);
      console.log(typeof startValues.category);
  
      
      return task.status.key === startValues.category;
   
    });
console.log('filter back data', filterData);

    return filterData;
  }
}


export { Filter };
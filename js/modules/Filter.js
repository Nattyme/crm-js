class Filter {
  constructor() {
  this.selector = '';
  this.selectedIndex = '';
  this.category = [];
  }

  setCategories(categoryArray) {
    this.category = categoryArray;
  }

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
    let filterData = startValues.data.filter(task => {
      if (startValues.category === 'all') {
        return true; // если "all"
      }
    
      return task.status === startValues.category;
    });

    return filterData;
  }
}


export { Filter };
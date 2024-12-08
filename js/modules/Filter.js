class Filter {
  
  filterSelect(startValues) {
    let filterData = startValues.data.filter(task => task[startValues.key] === startValues.category);
    return startValues.category === 'all' ? startValues.data : filterData;
  }

  filterNotSelect (startValues) {
    let filterData = startValues.data.filter(task => {
      if (startValues.category === 'all') {
        return true; // если "all"
      }
    
      return task[startValues.key] === startValues.category;
    });

    return filterData;
  }

  doSeveralFilters(data, filtersArr) {
    return filtersArr.reduce( (filteredData, filter) => {
      return filter.method({ ...filter.params, data: filteredData});
    }, data);
  }
}


export { Filter };
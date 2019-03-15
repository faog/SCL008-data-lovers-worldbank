window.data = {
  filterData: (data, condition) =>{
    let indicators = data.filter((element) => {
      return element.indicatorCode === condition;
    })
    return indicators;
  }/*,
  sortData: (data, sortBy, sortOrder)=>{
    let sortedData = data.sort((indicatorA, indicatorB)=>{
      return indicatorA[sortBy].localeCompare(indicatorB[sortBy]);
    }) 
  }*/
}





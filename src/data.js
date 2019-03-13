/*global data*/

window.data = {
  filterData: (data, condition) =>{
    let indicators = data.filter((element) => {
      return element.indicatorCode === condition;
    })
    return indicators;
  }
}
window.data = data;

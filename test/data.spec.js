global.window = global;
global.assert = require('chai').assert;
require('../src/data');
require('./data.spec.js');


describe('data', () => {
 
  it('debería ser un objeto', () => {
    assert.equal(typeof data, 'object');
  });
  
  describe('data.filterData', () => {

    const dataFilter = 
    [
      {
        "data": {
          "1960": "",
          "1961": "",
      },
        "countryName": "Perú",
        "countryCode": "PER",
        "indicatorName": "Empleo de tiempo parcial, mujeres (% del total de mujeres empleadas)",
        "indicatorCode": "SL.TLF.PART.FE.ZS"
      }
    ];    

    it('debería ser una función', () => {
      assert.equal(typeof window.data.filterData, 'function');
    });

    /*Test 1 filtro por indicador*/
    it('debería retornar el Empleo de tiempo parcial al filtrar por código SL.TLF.PART.FE.ZS', () => {
      assert.deepEqual(window.data.filterData(dataFilter, "SL.TLF.PART.FE.ZS"),      
       [
          {
          "data": {
            "1960": "",
            "1961": "",
          },
          "countryName": "Perú",
          "countryCode": "PER",
          "indicatorName": "Empleo de tiempo parcial, mujeres (% del total de mujeres empleadas)",
          "indicatorCode": "SL.TLF.PART.FE.ZS"
          }
        ] 
      )
    })
  })
})

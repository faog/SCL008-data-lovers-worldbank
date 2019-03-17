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
  }),

  describe('data.sortData', () => {

    const dataSort = 
    [
      {
        "indicatorName": "Población de 50 a 54 años, mujeres (% de la población femenina)"
      },
      {
        "indicatorName": "Empleo de tiempo parcial, mujeres (% del total de mujeres empleadas)"
      }
    ];    

    it('debería ser una función', () => {
      assert.equal(typeof window.data.sortData, 'function');
    });

    /*Test 1 filtro por indicador*/
    it('debería retornar ordenados de la A - Z los indicatorName', () => {
      assert.deepEqual(window.data.sortData(dataSort, "indicatorName"),      
       [
        {
          "indicatorName": "Empleo de tiempo parcial, mujeres (% del total de mujeres empleadas)"
        },
        {
          "indicatorName": "Población de 50 a 54 años, mujeres (% de la población femenina)"
        }
        ] 
      )
    })
  })
})

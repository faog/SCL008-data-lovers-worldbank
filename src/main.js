/*global google, WORLDBANK, $*/
const data=WORLDBANK;

function indexView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 
    `
    <section id="welcomeimage">
    <!--Carrusel con contenido de materialize-->
        <section class="carousel carousel-slider center">
            <div id="onecarousel" class="carousel-item">
                <h2>Indicadores 01</h2>
                <p class="white-text">parrafo</p>
                <button class="btnstart">ver indicadores</button>
            </div>
            <div id="twocarousel" class="carousel-item">
                <h2>Indicadores 02</h2>
                <p class="white-text">parrafo</p>
                <button class="btnstart">ver indicadores</button>
            </div>
            <div id="threecarousel" class="carousel-item">
                <h2>Indicadores 03</h2>
                <p class="white-text">parrafo</p>
                <button class="btnstart">ver indicadores</button>
            </div>
        </section> 
    </section>       

    `
    /*JQuery carousel Materialize*/ 
    $(document).ready(function(){
        $('.carousel').carousel({            
            indicators: true            
        });
    });
    
    /*Página Búsqueda Indicadores*/  
    Array.from(document.getElementsByClassName('btnstart')).forEach(element=>{
        element.addEventListener('click',() =>{
            searchView()
        })
    })    
}

function getIndicator(indicatorCode,data){
    let indicatorData=[];

    //Genera un arreglo con los años
    let years=Object.keys(data.BRA.indicators[0].data);

    //forEach para recorrer los años de manera individual
    years.forEach((year)=>{
        //Obtener los indicadores para cada país
        let dataPeru = window.data.filterData(data.PER.indicators,indicatorCode);
        let dataBrazil= window.data.filterData(data.BRA.indicators, indicatorCode);
        let dataMexico = window.data.filterData(data.MEX.indicators,indicatorCode);
        let dataChile= window.data.filterData(data.CHL.indicators, indicatorCode);

        indicatorData.push([year, parseFloat(dataPeru[0].data[year]), parseFloat(dataBrazil[0].data[year]),
                                  parseFloat(dataMexico[0].data[year]), parseFloat(dataChile[0].data[year])]);
    })

    return indicatorData;
} 

/*Inicio implementación Google Chart*/
google.charts.load('current', {'packages':['line']});
//google.charts.setOnLoadCallback(drawChart);

function drawChart(indicatorCode,data) {

    let chartData = new google.visualization.DataTable();
    chartData.addColumn('string', 'Year');
    chartData.addColumn('number', 'Perú');
    chartData.addColumn('number', 'Brasil');
    chartData.addColumn('number', 'Mexico');
    chartData.addColumn('number', 'Chile');

    chartData.addRows(getIndicator(indicatorCode,data));

    let options = {
        title: document.getElementById("indicatorcode").selectedOptions[0].text,
        width: 750,
        height: 500,
        legend:{textStyle: {color: '#212F3C', fontSize: 18}},
        fontSize:20,
        colors: ['red','green', 'yellow', 'Blue']
    };

    let chart = new google.charts.Line(document.getElementById('searchresult'));

    chart.draw(chartData, google.charts.Line.convertOptions(options));      
} 
/*Fin implementación Google Chart*/


function searchView(){
    let options = "";
    
    data.BRA.indicators.forEach((element)=>{
        options +=`<option value="${element.indicatorCode}">${element.indicatorName}</option>`
    })

    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 

    `
    <section id="searchview" class="row"> 
        <section class="col s12 m12 l4" id="sectionfilter">
            <select id="indicatorcode" class="browser-default">
                <option value="option">Selecciona una opción</option>
                ${options}                
            </select>        
        </section>           
        
        <section id="indicatorsresult" class="col s12 m12 l8">      
            <h4 id="resulttitle">indicador</h4>         
            <figure id="searchresult" class="row">
            
            </figure>
        </section>
    </section>  
    `  
    
 
    /*III. Filtrar*/

    /*a) Filtro por indicador*/    
    document.getElementById('indicatorcode').addEventListener('change',()=>{
        let condition =document.getElementById('indicatorcode').value;
        drawChart(condition, data);
    });

    /*a) Ordenar indicadores   
    document.getElementById('indicatorcode').addEventListener('DOMContentLoaded',()=>{
        let sortOrder =document.getElementById('indicatorcode').value;
        let result = window.data.sortData(data, 'indicatorCode', sortOrder);   
        searchView(result);

    }); */ 
    
}

/*II.Manejo del DOM */

/*a)Página de inicio*/
document.getElementsByTagName('a')[0].addEventListener('click', () => {
    indexView();
})

document.addEventListener('DOMContentLoaded', () =>{ 
    indexView(); 
})



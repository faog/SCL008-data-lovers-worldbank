/*global google, WORLDBANK, $*/
const data=WORLDBANK;

function indexView(){

    /*JQuery elementos Materialize*/ 
    $(document).ready(function(){
        //Navbar
        $('.sidenav').sidenav();

        //carousel
        $('.carousel').carousel({            
            indicators: true            
        });       

    });

    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 
    `
    <section id="welcomeimage">
    <!--Carrusel con contenido de materialize-->
        <section class="carousel carousel-slider center">
            <div id="onecarousel" class="carousel-item">
                <div class="carouselcontent">
                    <h2>Índice de datos</h2>
                    <p class="white-text">Proporciona una lista de conjuntos de datos disponibles del Banco Mundial, incluyendo gráficos comparativos para cada uno de ellos.</p>
                    <button class="btnstart">Indicadores</button>
                </div>
            </div>
            <div id="twocarousel" class="carousel-item">
                <div class="carouselcontent">
                    <h2>Índice de datos</h2>
                    <p class="white-text">Herramienta de análisis y visualización que contiene información de países latinoamericanos (Brasil, Chile, México y Perú)</p>
                    <button class="btnstart">Indicadores</button>
                </div>
            </div>
            <div id="threecarousel" class="carousel-item">
                <div class="carouselcontent">
                    <h2>Índice de datos</h2>
                    <p class="white-text">Fácil acceso a información básica de 138 indicadores desde el año 1960 al 2017.</p>
                    <button class="btnstart">Indicadores</button>
                </div>
            </div>
        </section> 
    </section>       

    `
    /*MANEJO DOM PÁGINA INICIO*/
    /*Página Búsqueda Indicadores a partir del elemento button*/  
    Array.from(document.getElementsByClassName('btnstart')).forEach(element=>{
        element.addEventListener('click',() =>{
            searchView()
        })
    }) 
}

/*Pagina funcionamiento*/
function tutorialView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 

    `
    <section id="tutorialview" class="row"> 
        <h3>funcionamiento</h3>     
        <h4>Debes ingresar a la opción "Indicadores" y seguir los siguientes pasos:</h4>
    </section>
    <article id="instructionone" class="row">  
        <h4 class="col s12 m12 l6">Seleccionar el indicador de interés. Tienes 138 distintos para escoger.</h4>
        <picture class="col s12 m12 l6">
            <img src="Image/tutorial001.png" id="tutorialsearchone" alt="Página de búsqueda"/>        
        </picture>
    </article>
    <article id="instructiontwo" class="row">              
        <h4 class="col s12 m12 l6">Automáticamente, obtendras un gráfico de línea con el resultado del indicador que hayas escogido.</h4>
        <picture class="col s12 m12 l6">
            <img src="Image/tutorial002.png" id="tutorialsearchtwo" alt="resultado gráfico"/>        
        </picture>
    </article>

    <article id="instructionthree" class="row">
        <h4 class="col s12 m12 l6">Puedes escoger un país y visualizar por año los datos obtenidos.</h4>
        <picture class="col s12 m12 l6">
            <img src="Image/tutorial003.png" id="tutorialsearchthree" alt="resaltar país"/>        
        </picture>
    </article> 

    <article id="instructionfour" class="row">
        <h4>¡Y listo! Ahora puedes buscar todos los indicadores y compararlos entre ellos.</h4>    
    </article>          
    `  

}

/*Pagina Que es indicadores WB*/
function whoareView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 

    `
    <section id="whoareview" class="row"> 
    <h3>¿Qué es indicadores worldbank?</h3>        
        <article class="col s12 m12 l8"> 
            <p>Es una aplicación pensada en aquellas personas que necesitan conocer indicadores demográficos, económicos y comerciales.</p> 
        </article> 
        <picture id="datanotebook" class="col s12 m12 l4">
            <img src="Image/datapeople.jpg"  alt="notebook con gráficos"/>        
        </picture>                  
    </section>  

    <section id="whoareviewtwo" class="row"> 
        <h3>Indicadores de Latinoamerica</h3>
        <article class="col s12 m12 l6">
            <p>Podrás escoger entre 138 indicadores mostrando como resultado un gráfico de líneas; comparativo entre Brasil, Chile, 
            México y Perú; amigable para quienes visiten la aplicación web.</p>
        </article>
        <picture class="col s12 m12 l6">
            <img src="Image/linechart.jpg" id="linechart" alt="ejemplo gráfico"/>        
        </picture>       
    </section> 
    `  
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
    chartData.addColumn('string', 'Año');
    chartData.addColumn('number', 'Perú');
    chartData.addColumn('number', 'Brasil');
    chartData.addColumn('number', 'México');
    chartData.addColumn('number', 'Chile');

    chartData.addRows(getIndicator(indicatorCode,data));

    let options = {
        title: "Resultado obtenido: ",
        subtitle: document.getElementById("indicatorcode").selectedOptions[0].text,
        curveType: 'function',        
        width: '100%',
        height: 500,
        legend:{textStyle: {color: '#212F3C', fontSize: 18}},
        fontSize:20,
        colors: ['#F44336','#388E3C', '#FFEB3B', '#303F9F']
    };

    let chart = new google.charts.Line(document.getElementById('searchresult'));

    chart.draw(chartData, google.charts.Line.convertOptions(options));      
} 
/*Fin implementación Google Chart*/

/*Pagina búsqueda indicadores*/
function searchView(){
    let options = "";
    
    let orderIndicators = [];

    orderIndicators = window.data.sortData(data.BRA.indicators, "indicatorName");

    orderIndicators.forEach((element)=>{
        options +=`<option value="${element.indicatorCode}">${element.indicatorName}</option>`
    })

    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 

    `
    <section id="searchview" class="row"> 
        <h3>Indicadores</h3>
        <p>Selecciona el indicador de tu interés, para obtener un gráfico de lineas con la información de los países disponibles.</p>
        <section class="col s12 m12 l12" id="sectionfilter">
            <select id="indicatorcode" class="browser-default">
                <option value="option">Selecciona una opción</option>
                ${options}                
            </select>        
        </section>           
        
        <section id="indicatorsresult" class="col s12 m12 l12">  
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
   
}

/*II.Manejo del DOM */
/*a)Inicialización página de inicio*/
document.addEventListener('DOMContentLoaded', () =>{ 
    indexView(); 
})

/*a)Página de inicio a partir del logo*/
document.getElementsByTagName('a')[0].addEventListener('click', () => {
    indexView();
})


/*b)Página Búsqueda Indicadores a partir del elemento navbar*/
Array.from(document.getElementsByClassName('indicatorshow')).forEach(element=>{
    element.addEventListener('click',()=>{
        searchView()
    })
})

/*c)Página "funcionamiento a partir del elemento navbar*/
Array.from(document.getElementsByClassName('tutorialshow')).forEach(element =>{
    element.addEventListener('click',()=>{
        tutorialView();
    })
})

/*c)Página "Qué es indicadores WB" a partir del elemento navbar*/
Array.from(document.getElementsByClassName('whoareshow')).forEach(element =>{
    element.addEventListener('click',()=>{
        whoareView();
    })
})



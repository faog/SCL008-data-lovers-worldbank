function indexView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 
    `
    <section id="welcomeimage">
        <h2 class="center-align">titulo indicadores</h2>   
        <div class="center-align"> 
            <button id="btnstart">ver indicadores</button>
        </div>     
    </section>   

    `
    /*c) Página Busqueda Indicadores*/
    document.getElementById('btnstart').addEventListener('click', () =>{
    searchView(); 
    })

}

function searchView(){
    document.getElementById('dinamicpage').innerHTML = '';
    document.getElementById('dinamicpage').innerHTML += 
    `
    <section id="searchview" class="row"> 
        <section class="col s12 m12 l4" id="sectionfilter">
            <select id="type" class="browser-default">
                <option value="option">Selecciona una opción</option>
                <option value="SL.TLF.PART.FE.ZS">Empleo de tiempo parcial, mujeres (% del total de mujeres empleadas)</option>
                <option value="SL.TLF.INTM.ZS">Fuerza laboral con educación intermedia (% del total)</option>
                <option value="SL.TLF.INTM.MA.ZS">Fuerza laboral con educación intermedia, varones (% de la fuerza laboral masculina)</option>                            
                <option value="SL.TLF.INTM.FE.ZS">Fuerza laboral con educación intermedia, mujeres (% de la fuerza laboral femenina)</option>
                
            </select>        
        </section>           
        
        <section id="worldbankresult" class="col s12 m12 l8" >      
            <h4 id="resulttitle">indicador</h4>         
            <figure id="searchresult" class="row">
            
            </figure>
        </section>
    </section>  
    `
    pokemonAll()
    /*Materialize elemento Collapsible*/  
    $('.collapsible').collapsible();
  

    /*Materialize elemento Select*/
    $('select').formSelect();
   
  
    /*III. Filtrar*/

    /*a) Filtro por tipo de pokemon*/
    document.getElementById('type').addEventListener('change',()=>{
        let condition =document.getElementById('type').value;
        if(condition==='all'){
            pokemonAll();
        }else {
            getPokemonData((data) => {
                let result = window.data.filterData(data.pokemon, (element)=>{
                    return element.type.includes(condition);
                });
                showPokemonList(result);
            });
        }
    });
    
    
    /*IV. Ordenar*/

    /*a) Ordenar por nombre */
    document.getElementById('namesort').addEventListener('change',()=>{
        let sortOrder =document.getElementById('namesort').value;
        getPokemonData((data)=>{
            let result =window.data.sortData(data.pokemon,'name',sortOrder);
            showPokemonList(result);
        })
        
    });

    
}

/*II.Manejo del DOM */

/*a)Página de inicio*/
document.getElementsByTagName('a')[0].addEventListener('click', () => {
    indexView();
})




document.addEventListener('DOMContentLoaded', () =>{ 
    indexView(); 
})

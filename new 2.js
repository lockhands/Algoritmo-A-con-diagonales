


//ESCENARIO / TLERO
var columnas = 10;
var filas = 10;
var escenario;  //matriz del nivel

//TILES
var anchoT;
var altoT;

const muro = '#000000';
const tierra = '#777777';


//RUTA
var principio;
var fin;

var openSet = [];
var closedSet = [];

var camino = [];
var terminado = false;

var copia1=[];


//


 function heuristica(a,b){
  var x = Math.abs(a.x - b.x);
  var y = Math.abs(a.y - b.y);

  var dist = x+y;

  return dist;
}

function borraDelArray(array,elemento){
  for(i=array.length-1; i>=0; i--){
    if(array[i] == elemento){
      array.splice(i,1);
    }
  }
}


//Creamos la matriz

function creaArray2D(f,c){
  var obj = new Array(f);
  for(a=0; a<f; a++){
    obj[a] = new Array(c);
  }
  return obj;
}


//LLenamos el objeto


function Casilla(x,y,index){

  //POSICIÓN
  this.x = x;
  this.y = y;
  this.id= index;
  //TIPO (obstáculo=1, vacío=0)
  this.light = 0;


  //PESOS
  this.f = 0;  //coste total (g+h)
  this.g = 0;  //pasos dados
  this.h = 0;  //heurística (estimación de lo que queda)

  this.vecinos = [];
  this.padre = null;


  //MÉTODO QUE CALCULA SUS VECNIOS
  this.addVecinos = function(){
    if(this.x > 0)
      this.vecinos.push(escenario[this.y][this.x-1]);   //vecino izquierdo

    if(this.x < filas-1)
      this.vecinos.push(escenario[this.y][this.x+1]);   //vecino derecho

    if(this.y > 0)
      this.vecinos.push(escenario[this.y-1][this.x]);   //vecino de arriba

    if(this.y < columnas-1)
      this.vecinos.push(escenario[this.y+1][this.x]); //vecino de abajo
	
	if(this.y > 0 && this.x > 0)
		this.vecinos.push(escenario[this.y-1][this.x-1]);
	 
	if(this.y >0 && this.x < filas-1)
		this.vecinos.push(escenario[this.y-1][this.x+1]);
	
	if(this.y< columnas-1 && this.x>0)
		this.vecinos.push(escenario[this.y+1][this.x-1]);
	
	if(this.y< columnas-1 && this.x<filas-1)
		this.vecinos.push(escenario[this.y+1][this.x+1]);
 }
  


}

//Escenario sería de tipo array



 

  
  
  function algoritmo(){

  //SEGUIMOS HASTA ENCONTRAR SOLUCIÓN
  while(terminado!=true){

    //SEGUIMOS SI HAY AlGO EN OPENSET
    if(openSet.length>0){
      var ganador = 0;  //índie o posición dentro del array openset del ganador

      //evaluamos que OpenSet tiene un menor coste / esfuerzo
      for(i=0; i<openSet.length; i++){
        if(openSet[i].f < openSet[ganador].f){
          ganador = i;
        }
      }

      //Analizamos la casilla ganadora
      var actual = openSet[ganador];
		
			
		
      //SI HEMOS LLEGADO AL FINAL BUSCAMOS EL CAMINO DE VUELTA
      if(actual === fin){

        var temporal = actual;
        camino.push(temporal);

        while(temporal.padre!=null){
          temporal = temporal.padre;
          camino.push(temporal);
        }


        console.log('camino encontrado');
        terminado = true;
      }

	
	
      //SI NO HEMOS LLEGADO AL FINAL, SEGUIMOS
      else{
        borraDelArray(openSet,actual);
        closedSet.push(actual);

        var vecinos = actual.vecinos;

        //RECORRO LOS VECINOS DE MI GANADOR
        for(i=0; i<vecinos.length; i++){
          var vecino = vecinos[i];

          //SI EL VECINO NO ESTÁ EN CLOSEDSET Y NO ES UNA PARED, HACEMOS LOS CÁLCULOS
          if(!closedSet.includes(vecino) && vecino.light!=1){
            var tempG = actual.g + 1;

            //si el vecino está en OpenSet y su peso es mayor
            if(openSet.includes(vecino)){
              if(tempG < vecino.g){
                vecino.g = tempG;     //camino más corto
              }
            }
            else{
              vecino.g = tempG;
              openSet.push(vecino);
            }

            //ACTUALIZAMOS VALORES
            vecino.h = heuristica(vecino,fin);
            vecino.f = vecino.g + vecino.h;

            //GUARDAMOS EL PADRE (DE DÓNDE VENIMOS)
            vecino.padre = actual;

          }

        }


      }





    }

    else{
      console.log('No hay un camino posible');
      terminado = true;   //el algoritmo ha terminado
    }



  }

console.log(terminado)
}



 function ok(){
	escenario=creaArray2D(10,10);
	let acum=1;
	for(i=0;i<10;i++){
    for(j=0;j<10;j++){
        escenario[i][j] = new Casilla(j,i,acum)
		acum=acum+1;
		
    }
  }
  
  const limite = Math.floor(Math.random() * (10 - 6)) + 6;

  for (let i = 0; i < limite; i++) {
    const a = Math.floor(Math.random() * (100 - 1)) + 1;
	console.log(a)
		for(let j=0;j<10;j++){
	const NewRanking = escenario[j].map((user) => {
	
      if (user.id === a) {
	
        return {...user, light: 1};
      }
      return user;
		});
		
		escenario[j]=NewRanking;
		
		const copia=escenario[j].map((user)=>{
			
			return user;
		})
		copia1.push(copia);
		
	}
	
   
    
  }
  
  //AÑADIMOS LOS VECINOS
  for(i=0;i<10;i++){
    for(j=0;j<10;j++){
        escenario[i][j].addVecinos();
    }
  }

 
 
	
  
  
  let board= new Array(0)
  
  for(i=0;i<10;i++){
	  for(j=0;j<10;j++){
	  board.push(escenario[i][j])
	  }
  }
  
	
	


}

function veremos(){

	let fil=4;
	let colum=4;
	
	
	console.log("ahora");
	for(let i=0;i<8;i++){
		
		principio=escenario[4][4];
		console.log("hola");
		if(i===0)	fin=escenario[0][colum-fil];
		if(i===1)	fin=escenario[0][colum];
		if(i===2)   fin=escenario[0][fil+colum];
		if(i===3)   fin=escenario[fil][columnas-1];
		if(i===4) 	fin=escenario[filas-1][fil+colum];
		if(i===5)	fin=escenario[filas-1][colum];
		if(i===6)   fin=escenario[filas-1][colum-fil];
		if(i===7)   fin=escenario[fil][0];
		
		openSet.push(principio);
		
		algoritmo();
		
		console.log(camino)
		
	
		
		camino=[];
	openSet = [];
	closedSet = [];
	camino = [];
	terminado = false;
	escenario=copia1;
	}
	
	
	

}

ok()
veremos()
	


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
  }


}

//Escenario sería de tipo array

export default function ok(){
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
    const a = Math.floor(Math.random() * (121 - 1)) + 1;
	console.log(a)
		for(let j=0;j<10;j++){
	const NewRanking = escenario[j].map((user) => {
	
      if (user.id === a) {
		  console.log("si paso");
        return {...user, light: 1};
      }
      return user;
		});
		
		escenario[j]=NewRanking;
	}
	
   
   
  }
   console.log(escenario);
  
  let board= new Array(0)
  
  for(i=0;i<10;i++){
	  for(j=0;j<10;j++){
	  board.push(escenario[i][j])
	  }
  }
  
	return board;
}
 
 
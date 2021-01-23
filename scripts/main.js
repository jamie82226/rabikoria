
  

let zStack = 10001

let draggies = document.querySelectorAll('.draggy')
console.log(draggies)

let elementClicked


for(let counter = 0; counter < draggies.length; counter ++){
  
  let isClick = false
  
  draggies[counter].addEventListener('mousedown', function(){
    zStack ++
    draggies[counter].style.zIndex = zStack
    elementClicked = this
    isClick = true
  })

  draggies[counter].addEventListener('mouseup', function(event){

    if(elementClicked == draggies[counter]){

      let min = (window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight) * 0.05

      let x = event.pageX - draggies[counter].clientWidth / 2
      let y = event.pageY - draggies[counter].clientHeight / 2
      
      placeThing(draggies[counter],Math.round(x/min)*min,Math.round(y/min)*min,zStack)
    }
    elementClicked = undefined

    let url = this.getAttribute('data-url')
    
    if(url && isClick){
      window.location.href = url
    }
  })

  document.addEventListener('mousemove',function(event){

    if(elementClicked == draggies[counter]){
      let x = event.pageX - draggies[counter].clientWidth / 2
      let y = event.pageY - draggies[counter].clientHeight / 2
      placeThing(draggies[counter],x,y,zStack)
    }
    isClick = false

  })
  
}

function placeThing(thing,x,y,z){
  window.localStorage.setItem(thing.id, x + ',' + y + ','+z);
  thing.style.left = x + 'px'
  thing.style.top = y + 'px'

}


window.onload = function(){





  let shapes = document.querySelectorAll('.draggy')
  let draggedEl = undefined


  for(let counter = 0; counter < shapes.length; counter = counter + 1){
    let x = Math.random() * (window.innerWidth - shapes[counter].clientWidth)
    let y = Math.random() * (window.innerHeight - shapes[counter].clientHeight)
    
    let oldPos = window.localStorage.getItem(shapes[counter].id)

    console.log(oldPos)
    if(!oldPos){
      placeThing(shapes[counter],x,y,1)      
    } else {
      let pos = oldPos.split(',')
      placeThing(shapes[counter],pos[0],pos[1],pos[2])      
    }



    shapes[counter].onmousedown = function(){
      draggedEl = this
    }
  }




  document.onmousemove = function(event){
      

    draggedEl.style.top = event.clientY - draggedEl.clientHeight/2 + 'px'
    draggedEl.style.left = event.clientX - draggedEl.clientWidth/2 + 'px'

  }
  document.onmouseup = function() {
    draggedEl = undefined
  }



}


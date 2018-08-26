let appElem = ( tagName, container ) =>
        ( container ? container : document.body )
                .appendChild ( document.createElement ( tagName ) )

let navReal = document.querySelector('.navReal');
let about = document.querySelector('.about')
let recentProjects = document.querySelector('.recentProjects')
let navA = document.querySelectorAll('.navA')
let nameEnter = document.querySelector('#nameEnter')
let emailEnter = document.querySelector('#emailEnter')
let navAFoot = document.querySelectorAll('.navAFoot')
let demoImg = document.querySelector('.demoImg')
let demoP = document.querySelector('.demoP')
let demoSpan = document.querySelector('.demoSpan')

function  showMenu (event) {
	event.target.title === "Portfolio"? navReal.innerHTML = 'Портфолио':
	event.target.title === "Reviews"? navReal.innerHTML = 'Отзывы':
	event.target.title === "Contacts"? navReal.innerHTML = 'Контакты':
	event.target.title === "AboutUs"? navReal.innerHTML = 'О нас': navReal.innerHTML = 'О нас';
	
}

let sound = document.createElement('audio')
    sound.src = 'img/Address.m4a'
let address = document.querySelector('.circle') 
address.addEventListener('click', function(event) {
    sound.play()
})

function showForm (event){
	if (event.target.value === 'Заказать мероприятие') {
		let webForm = document.getElementById('webForm')
		document.body.appendChild(webForm.content.cloneNode(true))
		document.getElementById('submitForm').innerText = 'Заказать мероприятие'
		let showAll = document.getElementById('showAll')
		showAll.parentElement.removeChild(showAll)	
	} else {
		let webForm = document.getElementById('webForm')
		document.body.appendChild(webForm.content.cloneNode(true))		
		let selForm = document.getElementById('selForm')
		selForm.parentElement.removeChild(selForm)
		document.getElementById('areaForm').placeholder = 'Оставьте Ваш отзыв'
		document.getElementById('legendForm').innerText = 'Оставьте Ваш отзыв'
		document.getElementById('submitForm').innerText = 'Оставить отзыв'
	}
}

function closeForm(event) {
	let common = document.querySelector('.common')
	common.parentElement.removeChild(common)
}

function sendInfo(event) {
	let nameAdd = document.getElementById('nameAdd')
	let emeilAdd = document.getElementById('emeilAdd')
	let areaForm = document.getElementById('areaForm')
	let selForm = document.getElementById('selForm')
	if (nameAdd.value === '' || emeilAdd.value === '' ){
		alert('Проверьте ввод информации в поля "Ваше Имя" и "Ваш Email" ')
		return
	} 
	let postTime = new Date().toLocaleString ().split ( ', ' )
	let way = ''
	let bodyText = '' 
	if (event.target.innerText === "ЗАКАЗАТЬ МЕРОПРИЯТИЕ") {
		 bodyText  = selForm.value + "  "+ areaForm.value
        way = "orders"
	} else {
		way = "reviews"
		 bodyText = areaForm.value
	}
	fetch ( 'http://localhost:3000/' + way, {
        method: 'POST',
        body: JSON.stringify ({
            "date": postTime [0],
            "time": postTime [1],
            "name": nameAdd.value,
            "email": emeilAdd.value,
            "body":  bodyText
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}

function getData ( ref ) {
    return fetch ( 'http://localhost:3000/' + ref )
            .then ( response => response.json () )
}

async function showDemo(event) {
	let res = await getData ( "demo" ).then ( response => response )
	if (event.target.innerText == 'Выставки'){
	    demoImg.src = res[2]["src"]
	    demoP.innerText = res[2]["text"]
	    demoSpan.innerHTML = res[2]["additionalText"]
	} else if (event.target.innerText == 'Фестивали'){
	    demoImg.src = res[1]["src"]
	    demoP.innerHTML = res[1]["text"]
	    demoSpan.innerHTML = res[1]["additionalText"]
	} else  {
	demoImg.src = res[0]["src"]
	demoP.innerHTML = res[0]["text"]
	demoSpan.innerHTML = res[0]["additionalText"]
	} 
}	  
  

let showAll = async function(event) {
	closeForm()
	let res = await getData ( "reviews" ).then ( response => response )
	let allCont = document.getElementById('allCont')
	document.body.appendChild(allCont.content.cloneNode(true))
	let all = document.getElementById('all');
	res.forEach(x=>{
		let review = appElem('div', all)
		review.innerHTML = x['date'] +'  '+ x['time'] + '<br><br>' + x['name'] + '<br><br>' + x['body'] + '<br><br>'
		review.className = 'review'


	})
}
			
$(document).ready(function(){ 
	$('a[href^="#"]').click(function() {
	elementClick = $(this).attr("href");
	destination = ($(elementClick).offset().top)+50
		$('body, html').animate( {scrollTop:destination}, 1500) 
	return false
})
 
$(window).scroll(function(){
	if ($(this).scrollTop() > 100) {
		$('.scrollup').fadeIn();
	} else {
		$('.scrollup').fadeOut();
	}
})

$('.scrollup').click(function(){
	$("html, body").animate({ scrollTop: 0 }, 1000);
		return false;
	})
})

function addPotentialClients (event) {
	if (nameEnter.value === '' || emailEnter.value === '' ){
		alert('Проверьте ввод информации в поля "Ваше Имя" и "Ваш Email" ')
		return
	}
	let postTime = new Date().toLocaleString ().split ( ', ' )
	fetch ( 'http://localhost:3000/potentialclients', {
        method: 'POST',
        body: JSON.stringify ({
            "date": postTime [0],
            "time": postTime [1],
            "name": nameEnter.value,
            "email": emailEnter.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    nameEnter.value = '' 
    emailEnter.value = ''
} 


 




function SliderAll(resPort) {
	

	const Slide = function ( imageURL, container ) {
	    this.imageURL = imageURL
	    let elem = container.appendChild (
	      document.createElement ( 'div' )
	    )
	    elem.style = `
	        position: absolute;
	        top: 10%;
	        left: 10%;
	        bottom: 10%;
	        right: 10%;
	        transition: all 0.5s;
	        background-image: url(${imageURL});
	        background-repeat: no-repeat;
	        background-size: contain;
	        background-position: center;
	    `
	    this.init = function ( x ) {
	      elem.style.left = x + '%'
	      elem.style.width = window.innerWidth * 0.8 + 'px'
	    }
	    this.setPicture = pictureURL => {
	            elem.style.backgroundImage = `url(${pictureURL})`
	    }
	    this.mcFromTo = function ( from, to, finalOpacity ) {
	        var slideWidth = window.innerWidth * 0.8
	        elem.style.transition = 'none'
	        elem.style.left = from + '%'
	        elem.style.opacity = 1 - finalOpacity
	        elem.style.width = slideWidth + 'px'
	        setTimeout ( function () {
	          elem.style.transition = 'all 0.8s'
	          elem.style.left = to + '%'
	          elem.style.opacity = finalOpacity
	        }, 50 )
	    }
	}

	const Slider = function ( resPort ) {
	    this.pictures = []
	    this.container = this.createElem ( 'figure' )
	    this.container.style = `
	        position: fixed;
	        top: 10%;
	        left: 0%;
	        bottom: 10%;
	        right: 10%;
	        overflow: hidden;
	    `

	    this.loadData ( resPort )

	    let currentIndex = 0
	    let currentSlide = 0
	    this.getNextIndex = dir => dir === 'left' ?
	            ( currentIndex === 0 ?
	                this.pictures.length - 1 : currentIndex - 1 ) :
	            ( currentIndex === this.pictures.length - 1 ?
	                0 : currentIndex + 1 )

	    this.changePicture = direction => {
	      let to = direction === 'left' ? 100 : -100
	      let nextSlide = currentSlide === 0 ? 1 : 0
	      var nextIndex = this.getNextIndex ( direction )
	      this.slides [ nextSlide ].setPicture ( this.pictures [ nextIndex ] )
	      this.slides [ nextSlide ].init ( -to )
	      this.slides [ currentSlide ].mcFromTo ( 10, to, 0 )
	      this.slides [ nextSlide ].mcFromTo ( -to, 10, 1 )
	      setTimeout ( function () {
	          currentSlide = nextSlide
	          currentIndex = nextIndex
	      }, 1000 )
	    }


	    this.btnLeft = this.createElem ( 'div' )
	    this.btnLeft.onclick = () => this.changePicture ( "left" )
	    this.btnRight = this.createElem ( 'div' )
	    this.btnRight.onclick = () => this.changePicture ( "right" )
	    this.btnLeft.innerHTML = '<i class="fas fa-arrow-alt-circle-left"></i>'
	    this.btnRight.innerHTML = '<i class="fas fa-arrow-alt-circle-right"></i>'
	    this.btnRemove = this.createElem ( 'div' )
	    this.btnRemove.onclick = ()=> {
	    	this.container.parentElement.removeChild(this.container)
	    	this.btnLeft.parentElement.removeChild(this.btnLeft)
	    	this.btnRight.parentElement.removeChild(this.btnRight)
	    	this.btnRemove.parentElement.removeChild(this.btnRemove)
	    }
	    this.btnRemove.innerHTML = '<i class="far fa-window-close"></i>'
	    this.btnLeft.style = `
	        position: absolute;
	        border-radius: 50%;
	        top: 50%;
	        left: 5%;
	        font-size: 30px;
	    `
	    this.btnRight.style = `
	        position: absolute;
	        top: 50%;
	        right: 5%;
	        font-size: 30px;
	    `
	    this.btnRemove.style = `
	        position: absolute;
	        top: 15%;
	        right: 5%;
	        font-size: 30px;
	    `
	}
	Slider.prototype.createElem = tagName => document.body.appendChild (
	      document.createElement ( tagName )
	)

	Slider.prototype.loadData =  async function ( resPort ) {
	       let portfolio = await getData ( "events" ).then ( response => response )
	        let portfolioEvent = portfolio[0][resPort]
	        this.pictures = portfolioEvent
	        this.slides = []
	        this.slides [ 0 ] = new Slide (
	                        this.pictures [ 0 ],
	                        this.container
	        )
	        this.slides [ 0 ].mcFromTo ( 100, 10 )
	        this.slides [ 1 ] = new Slide (
	                        this.pictures [ 1 ],
	                        this.container
	        )
	        this.slides [ 1 ].init ( 100 )
	}

	var slider = new Slider ( resPort )

}

 function showEvent(event) {		
	let  attr = event.target.getAttribute('about')
	SliderAll(attr)	
}







/*




let res = document.cookie.split ( "; " )
        .map ( x => Object.assign ( {}, { [ x.split ( "=" )[0] ] : x.split ( "=" )[1] } )  )

res.forEach(x=>{ for (var z in x){
    if(z === 'name') nameEnter.value = x[z]
    if(z === 'email') emailEnter.value = x[z]
    }
})
let cookie_date = new Date();
function signUpBtn(event){
    document.cookie = `${nameEnter.name} =${nameEnter.value}; expires=' ${cookie_date.toGMTString()}`
    document.cookie = `${emailEnter.name}=${emailEnter.value}; expires = ${cookie_date.toGMTString()}`
    
}











function addReview() {

}

chatInput.onchange = function ( event ) {
        let postTime = new Date().toLocaleString ().split ( ', ' )
        fetch ( 'http://localhost:3000/lastUpdate', {
                method: 'POST',
                body: JSON.stringify ({
                        data: postTime [0],
                        time: postTime [1]
                }),
                headers: {
                        "Content-type": "application/json"
                }
        })
        fetch ( 'http://localhost:3000/posts', {
                method: 'POST',
                body: JSON.stringify ({
                        date: postTime [0],
                        time: postTime [1],
                        userId: currentUser.id,
                        body: event.target.value
                }),
                headers: {
                        "Content-type": "application/json"
                }
        })
}
let demoImg = document.querySelector('.demoImg')
let demoP = document.querySelector('demoP')
let demoSpan = document.querySelector('demoSpan')
function showEvent(event) {
	var request = new XMLHttpRequest()
	  request.onreadystatechange = function() {
	    if (this.readyState === 4) {
	      	if (this.status === 200){
	        	let res = this.responseText.parse()
	        	if (event.target.innerText == 'HR мероприятия') {
	        	demoImg.src = res[0]['src']
	        	demoP.innerText = res[0]['text']
	        	demoSpan.innerText = res[0]['additionalText']
	           	} else if (event.target.innerText == 'Фестивали'){
	           		demoImg.src = res[1]['src']
	           		demoP.innerText = res[1]['text']
	           		demoSpan.innerText = res[1]['additionalText']
	        	} else if (event.target.innerText == 'Выставки'){
	        		demoImg.src = res[2]['src']
	        		demoP.innerText = res[2]['text']
	        		demoSpan.innerText = res[2]['additionalText']
	        	}
	      	}	   
	    }
	  }
	request.open("GET", "text.json")
	request.send()
}
let arrAboutLi = document.querySelectorAll('.aboutUl>li')
arrAboutLi.forEach(x => addEventListener('click', showEvent))  
*/







/*   



*/
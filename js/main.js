upCarousel()
activatePopupImages()
activateForm()

function createContent(id, info){

	let carousel = document.getElementById(id)

    let carousel_content = document.createElement('div')
    carousel_content.setAttribute('class','carousel-content')

	for (let i = 0; i < info.length; i++){
        let mobile
        if(i == 0){mobile = "item--enabled"}
        else {mobile = "item--disabled" }
		let nodo = createItem(info[i].image, info[i].subtitle, info[i].paragraph, mobile)
		carousel_content.appendChild(nodo)
	}

    carousel.appendChild(carousel_content)
    carousel.appendChild(createControls(id))

}

function createItem(imageURL, subtitleText, paragraphText, mobile){

    let item = document.createElement('div')
	item.setAttribute('class',`carousel-item ${mobile}`)

    if(imageURL != null){
	    let image = document.createElement('img')
	    image.src = imageURL
	    image.setAttribute('class','carousel-image')
        item.appendChild(image)
    }

    if(subtitleText != null){
        let subtitle = document.createElement('h3')
	    subtitle.innerText = subtitleText
	    subtitle.setAttribute('class','carousel-subtitle')
        item.appendChild(subtitle)
    }

    if(paragraphText != null){
        let paragraph = document.createElement('p')
	    paragraph.innerHTML = paragraphText
	    paragraph.setAttribute('class','carousel-paragraph')
        item.appendChild(paragraph)
    }

	return item
}

function createControls(id){

    let carrousel_controls = document.createElement('div')
    carrousel_controls.setAttribute('class','carousel-controls')

    let previus = document.createElement('p')
    previus.setAttribute('class','control-arrow')
    previus.setAttribute('onclick',`handleControl('${id}', 'previus')`)
    previus.innerText = '<'

    let next = document.createElement('p')
    next.setAttribute('class','control-arrow')
    next.setAttribute('onclick',`handleControl('${id}', 'next')`)
    next.innerText = '>'

    carrousel_controls.appendChild(previus)
    carrousel_controls.appendChild(next)


	return carrousel_controls
}

function handleControl(id, action){

    let items = document.getElementById(id).getElementsByClassName('carousel-item')

    let size = items.length

    let index

    for (let i = 0; i<size; i++){
        if(items[i].classList[1] === "item--enabled"){
            index = i
        }
    }

    items[index].setAttribute('class','carousel-item item--disabled')

    if(action === 'next'){
        if(index <size-1){        
            items[index+1].setAttribute('class','carousel-item item--enabled')
        }else {
            items[0].setAttribute('class','carousel-item item--enabled')
        }
    } else {
        if(index >0){        
            items[index-1].setAttribute('class','carousel-item item--enabled')
        }else {
            items[size-1].setAttribute('class','carousel-item item--enabled')
        }
    }
}

function activatePopupImages(){
    const imageNodes = document.getElementsByClassName('carousel-image')

    for (let i = 0; i < imageNodes.length; i++){
        imageNodes[i].addEventListener('click', () => {
            if (screen.width >= 700){
                const image = document.getElementById('popupImageSrc')
                image.src = imageNodes[i].src
                document.getElementById('popupImageOverlay').classList.add('overlay--active')
                document.getElementById('popupImageContainer').classList.add('popup--active')
            } 
        })
    }
}

function popupClose(reload){

    if(reload){
        location.reload();
    } else {
        const popup = document.getElementsByClassName('popup');
        for (let i = 0; i < popup.length; i++){
            popup[i].classList.remove('popup--active')
        }
        const overlay = document.getElementsByClassName('overlay-popup');
        for (let i = 0; i < overlay.length; i++){
            overlay[i].classList.remove('overlay--active')
        }
    }
}

function activateForm(){

    const form = document.getElementById('form')

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendDisplay();
        let data = new FormData(form);

        fetch('../db/send.php',{
            method: 'POST',
            body: data
        })
        .then (function (res){
            if(res.ok){
                window.dataLayer.push({'event': 'formSubmit'})
                thanksDisplay()
            } else {
                errorDisplay()
                console.log(res)
            }
        })
    })

    function sendDisplay(){
        let popupFormContainer = document.getElementById('form-anchor')
        popupFormContainer.innerHTML = ""
        
        let texto = document.createElement('p')
        texto.setAttribute('class','loader-text')
        texto.innerText = 'Enviando ...'
    
        let loader1 = document.createElement('div')
        loader1.setAttribute('class','loader1')
        let loader2 = document.createElement('div')
        loader2.setAttribute('class','loader2')
        let loaderContainer = document.createElement('div')
        loaderContainer.setAttribute('class','loader-container')
        loaderContainer.appendChild(loader1)
        loaderContainer.appendChild(loader2)
    
        popupFormContainer.appendChild(texto)
        popupFormContainer.appendChild(loaderContainer)
    }

    function thanksDisplay(){
        let popupFormContainer = document.getElementById('form-anchor')
        popupFormContainer.innerHTML = ""
    
        let image = document.createElement('img')
        image.setAttribute('class','popup-close-icon')
        image.src = '../assets/images/close.png'
        
        let anchor = document.createElement('a')
        anchor.setAttribute('id','popup-close')
        anchor.setAttribute('class','popup-close-container')
        anchor.setAttribute('onClick',`popupClose(true)`)
        anchor.appendChild(image)
    
        let texto = document.createElement('p')
        texto.setAttribute('class','thanks-text')
        texto.innerText = 'Gracias por solicitar una cotización'
    
        let message = document.createElement('p')
        message.setAttribute('class','thanks-message')
        let fecha = new Date();
        if(fecha.getDay() == 6 || fecha.getDay() == 0){
            message.innerText = "En breves minutos te llegará un mail de confirmación con la solicitud de cotización. Debido a que durante el fin de semana no hacemos las cotizaciones, el próximo día hábil a primera hora nos colocaremos en contacto contigo para brindar la información que necesitas.";			
        } else {
            if(fecha.getHours()<18){
                message.innerText = "En breves minutos te llegará un mail de confirmación con la solicitud de cotización. Durante la jornada nos colocaremos en contacto contigo para brindar la información que necesitas.";
            } else {
                message.innerText = "En breves minutos te llegará un mail de confirmación con la solicitud de cotización. Debido a que por hoy nuestra jornada de cotizaciones ha terminado, el próximo día hábil a primera hora nos colocaremos en contacto contigo para brindar la información que necesitas.";			
            }
        }
    
        popupFormContainer.appendChild(anchor)
        popupFormContainer.appendChild(texto)
        popupFormContainer.appendChild(message)
    }

    function errorDisplay(){
        let popupFormContainer = document.getElementById('form-anchor')
        popupFormContainer.innerHTML = ""
    
        let image = document.createElement('img')
        image.setAttribute('class','popup-close-icon')
        image.src = '../assets/images/close.png'
            
        let anchor = document.createElement('a')
        anchor.setAttribute('id','popup-close')
        anchor.setAttribute('class','popup-close-container')
        anchor.setAttribute('onClick',`popupClose(true)`)
        anchor.appendChild(image)
        
        let texto = document.createElement('p')
        texto.setAttribute('class','error-text')
        texto.innerText = 'Error'
    
        let message = document.createElement('p')
        message.setAttribute('class','error-message')
        message.innerText = 'Ha ocurrido un error cuando se estaba solicitando una cotización, por favor vuelve a intentarlo.'
    
        popupFormContainer.appendChild(anchor)
        popupFormContainer.appendChild(texto)
        popupFormContainer.appendChild(message)
    }
}
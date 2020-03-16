// -----------------------------Header----------------------------------
let navLink = document.querySelectorAll('.navigation__link');
navLink.forEach( (link) => link.addEventListener('click', jumpPage));

function jumpPage(event){
    navLink.forEach( (link) => link.classList.remove('active'));
    event.target.classList.add('active');
}

window.addEventListener('scroll', updateLink);
function updateLink(event){
    let percent = 0.7;
    let sliderHeight = document.querySelector('.slider').getBoundingClientRect().height;
    let sliderTop = sliderHeight * percent; 

    let servicesHeight = services.getBoundingClientRect().height;
    let servicesTop = servicesHeight * percent + sliderHeight; 

    let portfolioHeight = portfolio.getBoundingClientRect().height;
    let portfolioTop = portfolioHeight * percent + sliderHeight + servicesHeight;

    let aboutHeight = about.getBoundingClientRect().height;
    let aboutTop = aboutHeight * percent + sliderHeight + servicesHeight + portfolioHeight;

    let contactHeight = contact.getBoundingClientRect().height;
    let contactTop = contactHeight * percent + sliderHeight + servicesHeight + portfolioHeight + aboutHeight;

    navLink.forEach( (link) => link.classList.remove('active'));
    switch (true) {
        case pageYOffset >= 0 && pageYOffset < sliderTop:
            document.querySelector('.link_home').classList.add('active');
            break;
        case pageYOffset >= sliderTop && pageYOffset < servicesTop:
            document.querySelector('.link_services').classList.add('active');
            break;
        case pageYOffset >= servicesTop && pageYOffset < portfolioTop:
            document.querySelector('.link_portfolio').classList.add('active');
            break;
        case pageYOffset >= portfolioTop && pageYOffset < aboutTop:
            document.querySelector('.link_about').classList.add('active');
            break;
        case pageYOffset >= aboutTop && pageYOffset < contactTop:
            document.querySelector('.link_contact').classList.add('active');
            break;
        default:
            break;
    } 
}

// ------------------------Slider. Переключение слайдов-----------------------------
document.querySelectorAll('.chev').forEach( (slide) => slide.addEventListener('click', changeSlide));
const numberSlides = document.querySelectorAll('.slide').length;
let currentOffsetLeft = 0;

function changeSlide(event){
    var slides = document.querySelectorAll('.slide');
    var slideWidth = parseInt(getComputedStyle(slides[0]).width);
    var slideArea = document.querySelector('.slide-area');
    
    var slideAreaStyles = getComputedStyle(slideArea);
    var position =  parseInt(slideAreaStyles.left);
    
    if(event.target.classList.contains('chev_right')){
        document.querySelectorAll('.chev').forEach( (slide) => slide.removeEventListener('click', changeSlide));
        
        slideArea.prepend(slides[slides.length - 1].cloneNode(true));
        slides[slides.length - 1].remove();
        document.getElementById('vert-phone').addEventListener('change', switchPhone);
        document.getElementById('horiz-phone').addEventListener('change', switchPhone);
        
        currentOffsetLeft += slideWidth;
        slideArea.style.marginLeft = -currentOffsetLeft + 'px';
        slideArea.style.transitionDuration = '0s';
        
		setTimeout(function() {
            slideArea.style.transitionDuration = '2s';
            currentOffsetLeft -= slideWidth;
            slideArea.style.marginLeft = currentOffsetLeft + 'px';
            document.querySelectorAll('.chev').forEach( (slide) => slide.addEventListener('click', changeSlide));
        }, 0);   
    }

    if(event.target.classList.contains('chev_left')){
        slideArea.style.transitionDuration = '2s';
        currentOffsetLeft += slideWidth;
        slideArea.style.marginLeft = -currentOffsetLeft + 'px';

        document.querySelectorAll('.chev').forEach( (slide) => slide.removeEventListener('click', changeSlide));
        setTimeout(function() {

            slideArea.append(slides[0].cloneNode(true));
            slides[0].remove();
            document.getElementById('vert-phone').addEventListener('change', switchPhone);
            document.getElementById('horiz-phone').addEventListener('change', switchPhone);
            currentOffsetLeft -= slideWidth;
            slideArea.style.marginLeft = currentOffsetLeft + 'px';
            slideArea.style.transitionDuration = '0s';
            document.querySelectorAll('.chev').forEach( (slide) => slide.addEventListener('click', changeSlide));
        }, 2000);    
    }   
}

// -----------------Slider. Активация экранов телефонов--------------------------
document.getElementById('vert-phone').addEventListener('change', switchPhone);
document.getElementById('horiz-phone').addEventListener('change', switchPhone);

function switchPhone(){
    var vertPhoneSwitch = document.getElementById('vert-phone');
    var horizPhoneSwitch = document.getElementById('horiz-phone');
    var slideImage = document.querySelector('.interactive');

    if(vertPhoneSwitch.checked && horizPhoneSwitch.checked){
        slideImage.setAttribute('src','assets/images/slider1.png');
    }
    else if(!vertPhoneSwitch.checked && !horizPhoneSwitch.checked){
        slideImage.setAttribute('src','assets/images/slider1_off.png');
    }
    else if(!vertPhoneSwitch.checked && horizPhoneSwitch.checked){
        slideImage.setAttribute('src','assets/images/slider1_vert_off.png');
    }
    else if(vertPhoneSwitch.checked && !horizPhoneSwitch.checked){
        slideImage.setAttribute('src','assets/images/slider1_horiz_off.png');
    }
}

// -----------------------Portfolio. Переключение табов--------------------------------
document.querySelectorAll('.portfolio__buttons>.button').forEach( button => button.addEventListener('click', switchTab));

function switchTab(event){
    document.querySelectorAll('.portfolio__buttons>.button').forEach( button => {
        button.classList.remove('active-tab');
    });
    event.target.classList.add('active-tab');
    let projectsAll = document.querySelectorAll('.image_all');
    let projectsWeb = document.querySelectorAll('.image_web');
    let projectsGraphic = document.querySelectorAll('.image_graphic');
    let projectsArtwork = document.querySelectorAll('.image_artwork');

    let projectsLayout = document.querySelectorAll('.layout-4-column')[0];
    projectsLayout.innerHTML = '';   

    if(event.target.classList.contains('button_all')){
        let insertHTML = ''
        + getOuterHTML(projectsAll) 
        + getOuterHTML(projectsWeb) 
        + getOuterHTML(projectsGraphic) 
        + getOuterHTML(projectsArtwork);
        projectsLayout.innerHTML = insertHTML;
    }
    if(event.target.classList.contains('button_web')){
        let insertHTML = ''
        + getOuterHTML(projectsWeb) 
        + getOuterHTML(projectsGraphic) 
        + getOuterHTML(projectsArtwork)
        + getOuterHTML(projectsAll);
        projectsLayout.innerHTML = insertHTML;
    }
    if(event.target.classList.contains('button_graphic')){
        let insertHTML = ''
        + getOuterHTML(projectsGraphic) 
        + getOuterHTML(projectsArtwork)
        + getOuterHTML(projectsAll) 
        + getOuterHTML(projectsWeb);
        projectsLayout.innerHTML = insertHTML;
    }
    if(event.target.classList.contains('button_artwork')){
        let insertHTML = ''
        + getOuterHTML(projectsArtwork)
        + getOuterHTML(projectsAll) 
        + getOuterHTML(projectsWeb) 
        + getOuterHTML(projectsGraphic);
        projectsLayout.innerHTML = insertHTML;
    }
    document.querySelectorAll('.portfolio__image').forEach( project => project.addEventListener('click', switchBorder));
    document.querySelectorAll('.portfolio__image').forEach( project => project.classList.remove('image_border'));
}
function getOuterHTML(elements){
    let outerHTML = '';
    for(let element of elements)
        outerHTML += element.outerHTML;
    return outerHTML;
}

// -----------------------Portfolio. Взаимодействие с картинками------------------------
document.querySelectorAll('.portfolio__image').forEach( project => project.addEventListener('click', switchBorder));

function switchBorder(event){
    if(event.target.parentElement.classList.contains('image_border'))
        event.target.parentElement.classList.remove('image_border');
    else{
        document.querySelectorAll('.portfolio__image').forEach( project => {
            project.classList.remove('image_border');
        });
        event.target.parentElement.classList.add('image_border');
    }
}

// ----------------------------Get a quote----------------------------------------
document.getElementById('submit').addEventListener('click', onSubmit);

function onSubmit(event){
    event.preventDefault();
    if(document.querySelector('.message')) return;
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var subject = document.getElementById('subject');
    var description = document.getElementById('description');
    if(name.validity.valid)
        if(document.querySelector('.errorMes'))
            document.querySelector('.errorMes').remove();
    if(email.validity.valid)
        if(document.querySelector('.errorMes2'))
            document.querySelector('.errorMes2').remove();

    if(name.validity.valid && email.validity.valid){
        

        let subjectText = subject.value ? `Тема: ${subject.value}` : 'Без темы';
        let descriptionText = description.value ? `Описание: ${description.value}` : 'Без описания';
        let showText = `Письмо отправлено<br>${subjectText}<br>${descriptionText}`;

        var cover = document.createElement('div');
        cover.classList.add('cover');
        var message = document.createElement('div');
        let p = document.createElement('p');
        p.innerHTML = showText;
        let button = document.createElement('button');
        button.textContent = 'OK';

        message.append(p);
        message.append(button);
        message.classList.add('message');
        message.style.display = 'block';

        document.body.append(cover);
        document.body.append(message);

        button.onclick = function(event){
            event.preventDefault();
            cover.remove();
            message.remove();
        }
    }
    if(!name.validity.valid){
        if(!document.querySelector('.errorMes')){

            var errorMes = document.createElement('p');
            errorMes.innerHTML = 'Поле не должно быть пустым!';
            errorMes.classList.add('errorMes');
            document.querySelector('.get-a-quote__form').append(errorMes);
        }
    }
    if(!email.validity.valid){
        if(!document.querySelector('.errorMes2')){

            var errorMes2 = document.createElement('p');
            errorMes2.innerHTML = 'Поле не должно быть пустым! Или неверный формат!';
            errorMes2.classList.add('errorMes2');
            document.querySelector('.get-a-quote__form').append(errorMes2);
        }
    }

}
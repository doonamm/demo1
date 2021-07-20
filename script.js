const btn = document.querySelector('button');
const slides = document.querySelectorAll('.container > div');
const container = document.querySelector('.container');
const linktoSlides = document.querySelectorAll('.linkto > div');

const distance_require = 120;
var isMoving = false;
var current_index = 0;
var old_mouse_pos;

container.addEventListener('mousedown', (e)=>{
    old_mouse_pos = e.clientX;
});

container.addEventListener('mouseup', (e)=>{
    mouseMoveSlide(e.clientX);
});

linktoSlides.forEach((element, index) => {
    element.style = `--index: ${index}`;
    element.addEventListener('click',  ()=>{
        if(!isMoving){
            isMoving = true;
            setTimeout(()=>isMoving = false, 500);

            removeSelect();
            if(current_index < index){
                slideLeft(slides[current_index]);
                slideRight(slides[index]);
            }
            else if(current_index > index){
                slideRight(slides[current_index], true);
                slideLeft(slides[index], true);
            }
            current_index = index;
            updateSelect();
        }
    });
});

function mouseMoveSlide(new_mouse_pos){
    const distance = new_mouse_pos - old_mouse_pos;
    if(distance >= distance_require){
        moveToRight();
    } else if (distance <= -distance_require){
        moveToLeft();
    }
    updateSelect();
}

function moveToLeft(){
    if(!isMoving){
        isMoving = true;
        setTimeout(()=>isMoving = false, 500);

        removeSelect();
        if(current_index !== slides.length - 1){
            slideLeft(slides[current_index]);
            slideRight(slides[current_index + 1]);
            current_index++;
        } else {
            slideLeft(slides[current_index]);
            slideRight(slides[0]);
            current_index = 0;
        }
    }
}

function moveToRight(){
    if(!isMoving){
        isMoving = true;
        setTimeout(()=>isMoving = false, 500);

        removeSelect();
        if(current_index !== 0){
            slideRight(slides[current_index], true);
            slideLeft(slides[current_index - 1], true);
            current_index--;
        } else {
            slideLeft(slides[slides.length - 1], true);
            slideRight(slides[0], true);
            current_index = slides.length - 1;
        }
    }
}

function slideLeft(element, reverse = false){
    element.classList.remove('slide-left');
    element.classList.remove('slide-right');

    void element.offsetWidth;

    element.style.animationDirection = 'normal';
    element.classList.add('slide-left');
    element.style.animationDuration = '.6s';
    if(reverse === true){
        element.style.animationDirection = 'reverse';
    }
}

function slideRight(element, reverse = false){
    element.classList.remove('slide-right');
    element.classList.remove('slide-left');

    void element.offsetWidth;

    element.style.animationDirection = 'normal';
    element.classList.add('slide-right');
    element.style.animationDuration = '.6s';
    if(reverse === true){
        element.style.animationDirection = 'reverse';
    }
}

function updateSelect(){
    linktoSlides[current_index].classList.add('select');
}

function removeSelect(){
    linktoSlides[current_index].classList.remove('select');
}
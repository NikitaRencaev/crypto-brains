document.addEventListener('DOMContentLoaded', () => {
    // Анимация кнопки в <section class="hero">
    const btnHeroGuide = document.querySelector('.hero-left__btn-guide');
    btnHeroGuide.addEventListener('mouseenter', () => {
        btnHeroGuide.style.setProperty('--position-bg', '80%');
    });
    btnHeroGuide.addEventListener('mouseleave', () => {
        btnHeroGuide.style.setProperty('--position-bg', '-80%');
    });
    // 

    // Смена текста для мобил в simple-step, comments, app
    const simpleStepInfo = document.getElementById('simpleStepInfo');
    const commentsText = document.getElementById('commentsText');
    const appText = document.getElementById('appInfo');
    
    function textChange() {
        const widthWindow = window.screen.width;

        if (widthWindow <= 800) {
            simpleStepInfo.textContent = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.';
            commentsText.textContent = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.';
            appText.textContent = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.';
        } else {
            simpleStepInfo.textContent = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
            commentsText.textContent = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
            appText.textContent = 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
        }
    }
    
    window.addEventListener('resize', textChange);

    textChange()
    // 

    // Мобильный слайдер в <section class="about">
    const slider = document.getElementById('cardsSlider');
    const slides = slider.querySelectorAll('.about-bottom__card');
    const slideWidth = slides[0].clientWidth;
    const gap = 30;
    const step = slideWidth + gap;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;

    function setPosition(translate) {
        slider.style.transform = `translateX(${translate}px)`;
    }

    function pointerDown(e) {
        isDragging = true;
        startX = e.pageX || e.touches?.[0]?.pageX;
        slider.style.transition = 'none';
    }

    function pointerMove(e) {
        if (!isDragging) return;

        const currentX = e.pageX || e.touches?.[0]?.pageX;
        const diff = currentX - startX;

        currentTranslate = prevTranslate + diff;
        setPosition(currentTranslate);
    }

    function changeCounter() {
        const counterLines = document.querySelectorAll('.about-bottom-cards-counter__line');

        counterLines.forEach((line, index) => {
            if (index === currentIndex) {
                counterLines.forEach(item => item.classList.remove('active'));
                line.classList.add('active');
            }
        })
    }

    function pointerUp() {
        isDragging = false;
        slider.style.transition = 'transform 0.3s ease-out';

        const movedBy = currentTranslate / -step;
        const threshold = 0.5;

        if (Math.abs(movedBy - currentIndex) > threshold) {
            currentIndex = Math.round(movedBy);
        } else {
            currentIndex = Math.floor(movedBy);
        }

        currentIndex = Math.max(0, Math.min(currentIndex, slides.length - 1));

        currentTranslate = currentIndex * -step;
        prevTranslate = currentTranslate;
        setPosition(currentTranslate);
        changeCounter();
    }

    if (window.screen.width <= 800) {
        slider.addEventListener('pointerdown',  pointerDown);
        slider.addEventListener('pointermove', pointerMove);
        slider.addEventListener('pointerup', pointerUp);
        slider.addEventListener('pointerleave', pointerUp);
        slider.addEventListener('pointercancel', pointerUp);

        slider.addEventListener('dragstart', e => e.preventDefault());
        slider.addEventListener('touchmove', e => { if (isDragging) e.preventDefault(); });
    }
    // 

    // Мобильный слайдер в <section class="comments">
    const commentsSlider = document.getElementById('commentsSlider')
    const commentsSlides = commentsSlider.querySelectorAll('.comments-slider__item');
    const commentsSlideWidth = commentsSlides[0].clientWidth;
    const commentsGap = 30;
    const commentsStep = commentsSlideWidth + commentsGap;

    let commentsIsDragging = false;
    let commentsStartX = 0;
    let commentsCurrentTranslate = 0;
    let commentsPrevTranslate = 0;
    let commentsCurrentIndex = 0;

    function setPositionComments(translate) {
        commentsSlider.style.transform = `translateX(${translate}px)`;
    }

    function pointerDownComments(e) {
        commentsIsDragging = true;
        commentsStartX = e.pageX || e.touches?.[0]?.pageX;
        commentsSlider.style.transition = 'none';
    }

    function pointerMoveComments(e) {
        if (!commentsIsDragging) return;

        const currentX = e.pageX || e.touches?.[0]?.pageX;
        const diff = currentX - commentsStartX;

        commentsCurrentTranslate = commentsPrevTranslate + diff;
        setPositionComments(commentsCurrentTranslate);
    }

    function changeCounterComments() {
        const counterLines = document.querySelectorAll('.comments-slider-counter__line');

        counterLines.forEach((line, index) => {
            if (index === commentsCurrentIndex) {
                counterLines.forEach(item => item.classList.remove('active'));
                line.classList.add('active');
            }
        })
    }

    function pointerUpComments() {
        commentsIsDragging = false;
        commentsSlider.style.transition = 'transform 0.3s ease-out';

        const movedBy = commentsCurrentTranslate / -commentsStep;
        const threshold = 0.5;

        if (Math.abs(movedBy - commentsCurrentIndex) > threshold) {
            commentsCurrentIndex = Math.round(movedBy);
        } else {
            commentsCurrentIndex = Math.floor(movedBy);
        }

        commentsCurrentIndex = Math.max(0, Math.min(commentsCurrentIndex, commentsSlides.length - 1));

        commentsCurrentTranslate = commentsCurrentIndex * -commentsStep;
        commentsPrevTranslate = commentsCurrentTranslate;
        setPositionComments(commentsCurrentTranslate);
        changeCounterComments();
    }

    if (window.screen.width <= 800) {
        commentsSlider.addEventListener('pointerdown',  pointerDownComments);
        commentsSlider.addEventListener('pointermove', pointerMoveComments);
        commentsSlider.addEventListener('pointerup', pointerUpComments);
        commentsSlider.addEventListener('pointerleave', pointerUpComments);
        commentsSlider.addEventListener('pointercancel', pointerUpComments);

        commentsSlider.addEventListener('dragstart', e => e.preventDefault());
        commentsSlider.addEventListener('touchmove', e => { if (commentsIsDragging) e.preventDefault(); });
    }
    // 

    // Раскрытие доп информации в <section class="questions">
    const questionsItems = document.querySelectorAll('.questions-bottom__item');
    questionsItems.forEach(item => {
        const btn = item.querySelector('.questions-bottom-item__button');
        const btnImg = btn.querySelector('img');
        const content = item.querySelector('.questions-bottom-item__content');
        btn.addEventListener('click', () => {
            content.classList.toggle('active');
            if (content.classList.contains('active')) {
                btnImg.style.transform = 'rotate(45deg)';
            } else {
                btnImg.style.transform = 'rotate(0deg)';
            }
        });
    });

    // 
});
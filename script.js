let currentIndex = 0;
const screens = document.querySelectorAll('.meal-screen');

function nextMeal() {
    if (currentIndex < screens.length - 1) {
        screens[currentIndex].classList.remove('active');
        screens[currentIndex].classList.add('flipped-left');

        currentIndex++;
        
        screens[currentIndex].classList.add('active');
        screens[currentIndex].classList.remove('flipped-left', 'flipped-right');
    }
}

function prevMeal() {
    if (currentIndex > 0) {
        screens[currentIndex].classList.remove('active');
        screens[currentIndex].classList.add('flipped-right');
        currentIndex--;
        screens[currentIndex].classList.remove('flipped-left', 'flipped-right');
        screens[currentIndex].classList.add('active');
    }
}
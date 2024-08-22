document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const projects = document.querySelectorAll('.project');
    let currentIndex = 0;

    function showProject(index) {
        if (index < 0) {
            currentIndex = projects.length - 1;
        } else if (index >= projects.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Calculate the offset to center the current project
        const projectWidth = 75; // 75% of carousel width
        const gap = 100 / carousel.offsetWidth * 100; // Convert 100px to percentage
        const offset = -(currentIndex * (projectWidth + gap) - (100 - projectWidth) / 2);
        
        carousel.style.transform = `translateX(${offset}%)`;
    }

    prevButton.addEventListener('click', () => {
        showProject(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showProject(currentIndex + 1);
    });

    // Initialize the carousel
    showProject(0);
});
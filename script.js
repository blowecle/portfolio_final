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

        const carouselWidth = carousel.offsetWidth;
        const projectWidth = carouselWidth * 0.75; // 75% of carousel width
        const gap = 100; // 100px gap
        
        // Calculate the offset to center the current project
        const totalWidthPerProject = projectWidth + gap;
        const offset = -(currentIndex * totalWidthPerProject - (carouselWidth - projectWidth) / 2);
        
        carousel.style.transform = `translateX(${offset}px)`;
    }

    prevButton.addEventListener('click', () => {
        showProject(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showProject(currentIndex + 1);
    });

    // Initialize the carousel
    showProject(0);

    // Recenter on window resize
    window.addEventListener('resize', () => showProject(currentIndex));
});
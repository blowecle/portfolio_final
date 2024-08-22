document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const projects = document.querySelectorAll('.project');
    let currentIndex = 0;

    function updateCarousel() {
        const carouselWidth = carousel.offsetWidth;
        const projectWidth = carouselWidth * 0.75; // 75% of carousel width
        const gap = 100; // 100px gap

        // Position each project
        projects.forEach((project, index) => {
            const leftPosition = index * (projectWidth + gap);
            project.style.left = `${leftPosition}px`;
            project.style.width = `${projectWidth}px`;
        });

        // Calculate the offset to center the current project
        const offset = -(currentIndex * (projectWidth + gap)) + (carouselWidth - projectWidth) / 2;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    function showProject(index) {
        if (index < 0) {
            currentIndex = projects.length - 1;
        } else if (index >= projects.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateCarousel();
    }

    prevButton.addEventListener('click', () => {
        showProject(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showProject(currentIndex + 1);
    });

    // Initialize the carousel
    updateCarousel();

    // Recenter on window resize
    window.addEventListener('resize', updateCarousel);
});
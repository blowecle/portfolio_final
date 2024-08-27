document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const projects = document.querySelectorAll('.project');
    let currentIndex = 0;
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    function updateCarousel() {
        const carouselWidth = carousel.offsetWidth;
        const gap = 100; // 100px gap

        // Remove 'active' class from all projects
        projects.forEach(project => project.classList.remove('active'));

        // Position each project
        projects.forEach((project, index) => {
            const projectWidth = project.offsetWidth;
            const leftPosition = index * (projectWidth + gap);
            project.style.left = `${leftPosition}px`;
        });

        // Calculate the offset to center the current project
        const currentProject = projects[currentIndex];
        const currentProjectWidth = currentProject.offsetWidth;
        const offset = -(currentProject.offsetLeft - (carouselWidth - currentProjectWidth) / 2);
        carousel.style.transform = `translateX(${offset}px)`;

        // Add 'active' class to current project
        currentProject.classList.add('active');
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

    // Flip card functionality
    projects.forEach(project => {
        const flipCard = project.querySelector('.flip-card');
        const backLink = flipCard.querySelector('.flip-card-back a');

        if (isMobile) {
            flipCard.addEventListener('touchstart', function(e) {
                if (!flipCard.classList.contains('flipped')) {
                    e.preventDefault();
                    flipCard.classList.add('flipped');
                }
            });

            backLink.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            });

            [prevButton, nextButton].forEach(button => {
                button.addEventListener('touchstart', function() {
                    projects.forEach(p => p.querySelector('.flip-card').classList.remove('flipped'));
                });
            });
        }
    });

    // Prevent default touch behavior on mobile
    if (isMobile) {
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        }, { passive: false });
    }
});
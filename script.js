document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const projects = document.querySelectorAll('.project');
    let currentIndex = 0;
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    function updateCarousel() {
        const carouselWidth = carousel.offsetWidth;
        const gap = 100;

        projects.forEach(project => project.classList.remove('active'));

        projects.forEach((project, index) => {
            const projectWidth = project.offsetWidth;
            const leftPosition = index * (projectWidth + gap);
            project.style.left = `${leftPosition}px`;
        });

        const currentProject = projects[currentIndex];
        const currentProjectWidth = currentProject.offsetWidth;
        const offset = -(currentProject.offsetLeft - (carouselWidth - currentProjectWidth) / 2);
        carousel.style.transform = `translateX(${offset}px)`;

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

    updateCarousel();

    window.addEventListener('resize', updateCarousel);

    projects.forEach(project => {
        const flipCard = project.querySelector('.flip-card');
        const flipCardInner = flipCard.querySelector('.flip-card-inner');
        const backLink = flipCard.querySelector('.flip-card-back a');

        function flipCardHandler(e) {
            if (project.classList.contains('active')) {
                e.preventDefault();
                flipCardInner.classList.toggle('flipped');
            }
        }

        if (isMobile) {
            flipCard.addEventListener('click', flipCardHandler);
        } else {
            project.addEventListener('mouseenter', function() {
                if (project.classList.contains('active')) {
                    flipCardInner.classList.add('flipped');
                }
            });

            project.addEventListener('mouseleave', function() {
                flipCardInner.classList.remove('flipped');
            });
        }

        backLink.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        [prevButton, nextButton].forEach(button => {
            button.addEventListener('click', function() {
                projects.forEach(p => p.querySelector('.flip-card-inner').classList.remove('flipped'));
            });
        });
    });

    if (isMobile) {
        document.body.style.touchAction = 'pan-y';
    }
});
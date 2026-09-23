document.addEventListener('DOMContentLoaded', () => {

    // Glow effect no fundo acompanhando o rato
    const glow = document.getElementById('mouse-glow');
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // Swiper is only used for the old carousel layout.
    // The portfolio now uses a static project grid, so we initialize it only if the carousel exists.
    if (document.querySelector('.mySwiper')) {
        const swiper = new Swiper('.mySwiper', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 80,
            grabCursor: true,
            loop: true,
            speed: 800,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // Fade in on scroll (Intersection Observer)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

    // Start the Shift introduction video when it is revealed, and pause it when it leaves view.
    const shiftVideo = document.querySelector('.shift-intro-video');
    if (shiftVideo) {
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    shiftVideo.play().catch(() => {});
                } else {
                    shiftVideo.pause();
                }
            });
        }, { threshold: 0.35 });

        videoObserver.observe(shiftVideo);
    }

    // Smooth scroll para âncoras internas
    document.querySelectorAll('.js-scroll-trigger').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else {
                window.location.href = targetId;
            }
        });
    });
});
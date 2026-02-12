document.addEventListener('DOMContentLoaded', () => {
    // Observer para mostrar elementos com a classe .hidden
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

    // Smooth Scroll para links internos
    document.querySelectorAll('.js-scroll-trigger').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Verifica se o link é para uma secção na mesma página
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = 80; 
                    const targetPosition = targetSection.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else {
                // Se for link para outra página (ex: nocturne.html)
                window.location.href = targetId;
            }
        });
    });
});
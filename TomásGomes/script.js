// 1. Bloquear o scroll automático do browser
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// 2. Forçar o topo ao carregar e remover foco de botões
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    if (document.activeElement) {
        document.activeElement.blur();
    }
});

// 3. Intersection Observer (Animações)
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            
            if (entry.target.classList.contains('tools')) {
                const bars = entry.target.querySelectorAll('.skill-per');
                bars.forEach(bar => {
                    const style = bar.getAttribute('style');
                    const width = style.match(/width:\s*(\d+%)/)[1];
                    bar.style.width = '0';
                    setTimeout(() => { bar.style.width = width; }, 200);
                });
            }
        }
    });
}, observerOptions);

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

// 4. Project Switcher (Sem disparar foco)
const projectItems = document.querySelectorAll(".project-item");
const previewTitle = document.getElementById("previewTitle");
const previewRole = document.getElementById("previewRole");
const previewDescription = document.getElementById("previewDescription");
const projectLink = document.getElementById("projectLink");

projectItems.forEach(item => {
    item.addEventListener("click", (e) => {
        // Impede que o botão segure o foco visual
        e.currentTarget.blur();
        
        projectItems.forEach(btn => btn.classList.remove("active"));
        item.classList.add("active");

        [previewTitle, previewRole, previewDescription].forEach(el => el.style.opacity = 0);
        
        setTimeout(() => {
            previewTitle.textContent = item.dataset.title;
            previewRole.textContent = item.dataset.role;
            previewDescription.textContent = item.dataset.description;
            projectLink.href = item.dataset.link;
            [previewTitle, previewRole, previewDescription].forEach(el => el.style.opacity = 1);
        }, 200);
    });
});

// 5. Smooth Scroll corrigido
document.querySelectorAll('.js-scroll-trigger').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
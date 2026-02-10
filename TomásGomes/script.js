window.onload = function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 10);
};

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

const projectItems = document.querySelectorAll(".project-item");
const previewTitle = document.getElementById("previewTitle");
const previewRole = document.getElementById("previewRole");
const previewDescription = document.getElementById("previewDescription");

projectItems.forEach(item => {
  item.addEventListener("click", () => {
    projectItems.forEach(btn => btn.classList.remove("active"));
    item.classList.add("active");

    previewTitle.textContent = item.dataset.title;
    previewRole.textContent = item.dataset.role;
    previewDescription.textContent = item.dataset.description;
  });
});

const modal = document.getElementById("projectModal");
const openModalBtn = document.querySelector(".open-modal");
const closeBtn = document.querySelector(".close");

if (openModalBtn) {
  openModalBtn.addEventListener("click", () => {
    const activeItem = document.querySelector(".project-item.active");
    document.getElementById("modalTitle").textContent = activeItem.dataset.title;
    document.getElementById("modalRole").textContent = activeItem.dataset.role;
    document.getElementById("modalDescription").textContent = activeItem.dataset.description;
    modal.classList.add("active");
  });
}

closeBtn.addEventListener("click", () => modal.classList.remove("active"));
window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("active"); });

const observerOptions = {
  threshold: 0.15, 
  rootMargin: "0px 0px -50px 0px" 
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      requestAnimationFrame(() => {
        entry.target.classList.add("show");
      });
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

document.querySelector('.js-scroll-trigger').addEventListener('click', function(e) {
  e.preventDefault();
  const targetId = this.getAttribute('href');
  document.querySelector(targetId).scrollIntoView({
    behavior: 'smooth'
  });
});
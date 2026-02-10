window.onload = function() {
  setTimeout(() => window.scrollTo(0, 0), 10);
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
    
    const modalImg = document.getElementById("modalImage");
    modalImg.src = activeItem.dataset.image;

    const featuresList = document.getElementById("modalFeatures");
    featuresList.innerHTML = "";
    const features = activeItem.dataset.features.split(",");
    features.forEach(feat => {
      let li = document.createElement("li");
      li.textContent = feat.trim();
      featuresList.appendChild(li);
    });

    modal.classList.add("active");
    document.body.style.overflow = 'hidden';
  });
}

const closeModal = () => {
  modal.classList.remove("active");
  document.body.style.overflow = 'auto';
};

closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

const observerOptions = { threshold: 0.2 };

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      
      if (entry.target.classList.contains('tools')) {
        const bars = entry.target.querySelectorAll('.skill-per');
        bars.forEach(bar => {
          const targetWidth = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 100);
        });
      }
      observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

document.querySelector('.js-scroll-trigger').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
});
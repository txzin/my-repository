const projectItems = document.querySelectorAll(".project-item");
const previewTitle = document.getElementById("previewTitle");
const previewRole = document.getElementById("previewRole");
const previewDescription = document.getElementById("previewDescription");

const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close");
const modalTitle = document.getElementById("modalTitle");
const modalRole = document.getElementById("modalRole");
const modalDescription = document.getElementById("modalDescription");

projectItems.forEach(item => {
  item.addEventListener("click", () => {
    projectItems.forEach(btn => btn.classList.remove("active"));
    item.classList.add("active");

    previewTitle.textContent = item.dataset.title;
    previewRole.textContent = item.dataset.role;
    previewDescription.textContent = item.dataset.description;
    
    // Sugestão: se tiveres imagens, podes usar:
    // previewImg.src = item.dataset.image;
  });
});

document.querySelector(".open-modal").addEventListener("click", () => {
  const activeProject = document.querySelector(".project-item.active");
  
  modalTitle.textContent = activeProject.dataset.title;
  modalRole.textContent = activeProject.dataset.role;
  modalDescription.textContent = activeProject.dataset.description;
  
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => modal.classList.remove("active"));

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
);

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));
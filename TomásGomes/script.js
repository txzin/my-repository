// ================= MODAL =================

const cards = document.querySelectorAll(".project-card");
const modal = document.getElementById("projectModal");
const closeBtn = document.querySelector(".close");

const modalTitle = document.getElementById("modalTitle");
const modalRole = document.getElementById("modalRole");
const modalDescription = document.getElementById("modalDescription");

cards.forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalRole.textContent = card.dataset.role;
    modalDescription.textContent = card.dataset.description;
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

// ================= SCROLL REVEAL =================

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // anima só 1 vez (mais profissional)
      }
    });
  },
  {
    threshold: 0.35,          // ⬅️ entra mais tarde
    rootMargin: "0px 0px -80px 0px"
  }
);

document.querySelectorAll(".hidden").forEach(el => observer.observe(el));

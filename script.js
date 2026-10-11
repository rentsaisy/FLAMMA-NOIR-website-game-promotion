const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const modal = document.querySelector("[data-modal]");
const feedbackForm = document.querySelector("#feedback-form");
const characterContent = document.querySelector("[data-character-content]");
const characterImage = document.querySelector("[data-character-image]");
const characterName = document.querySelector("[data-character-name]");
const characterRole = document.querySelector("[data-character-role]");
const characterDescription = document.querySelector("[data-character-description]");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

document.querySelectorAll("[data-character]").forEach((character) => {
  character.addEventListener("click", () => {
    const image = character.querySelector("img");
    characterImage.src = image.src;
    characterImage.alt = image.alt;
    characterName.textContent = character.dataset.character;
    characterRole.textContent = character.dataset.role;
    characterDescription.textContent = character.dataset.description;
    characterContent.hidden = false;
    modal.setAttribute("aria-labelledby", "modal-title");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});

feedbackForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(feedbackForm);
  const subject = `[FLAMMA NOIR] ${formData.get("type")}`;
  const body = [
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    "",
    formData.get("message")
  ].join("\n");
  window.location.href = `mailto:feedback@ashfallstudios.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const status = document.querySelector("#form-status");
  if (status) status.textContent = "Your transmission is ready in your email app.";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

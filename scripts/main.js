let clickCount = 0;
let holdTimer;

const button = document.querySelector("#meaningless-btn");

// 🖱️ Klick
button.addEventListener("click", () => {
  clickCount++;

  if (clickCount === 4) {
  alert("Sluta trycka...");
} else if (clickCount === 8) {
  alert("Allvarligt. Sluta.");
} else if (clickCount === 12) {
  alert("Nu blir det konsekvenser.");
}
else if (clickCount === 16) {
  button.classList.add("burning");
  button.textContent = "Du skulle ha slutat.";
}});

// ⏱️ Håll inne (desktop)
button.addEventListener("mousedown", () => {
  holdTimer = setTimeout(() => {
    window.location.href = "meningslos.html";
  }, 4000);
});

button.addEventListener("mouseup", () => {
  clearTimeout(holdTimer);
});

button.addEventListener("mouseleave", () => {
  clearTimeout(holdTimer);
});

button.addEventListener("touchstart", () => {
  holdTimer = setTimeout(() => {
    window.location.href = "meningslos.html";
  }, 4000);
});

button.addEventListener("touchend", () => {
  clearTimeout(holdTimer);
});
const body = document.body;
const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");

const digitalTimeEl = document.querySelector("#digital-time");
const digitalDateEl = document.querySelector("#digital-date");

const modeSwitch = document.querySelector(".mode-switch");
const themeButtons = document.querySelectorAll(".theme-btn");

/* Theme */
const setTheme = (theme) => {
  body.dataset.theme = theme;
  localStorage.setItem("theme", theme);

  themeButtons.forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.theme === theme);
  });
};

setTheme(localStorage.getItem("theme") || "ocean");

themeButtons.forEach(btn => {
  btn.addEventListener("click", () => setTheme(btn.dataset.theme));
});

/* Dark Mode */
if (localStorage.getItem("mode") === "dark") {
  body.classList.add("dark");
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("mode", body.classList.contains("dark") ? "dark" : "light");
});

/* Clock */
function updateTime() {
  const date = new Date();

  const sec = date.getSeconds();
  const min = date.getMinutes();
  const hr = date.getHours() % 12;

  const secDeg = sec * 6;
  const minDeg = (min + sec / 60) * 6;
  const hrDeg = (hr + min / 60) * 30;

  secondHand.style.transform = `rotate(${secDeg}deg)`;
  minuteHand.style.transform = `rotate(${minDeg}deg)`;
  hourHand.style.transform = `rotate(${hrDeg}deg)`;

  digitalTimeEl.textContent = date.toLocaleTimeString();
  digitalDateEl.textContent = date.toDateString();
}

setInterval(updateTime, 1000);
updateTime();
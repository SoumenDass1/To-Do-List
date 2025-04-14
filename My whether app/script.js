let is24Hour = true;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampm = "";

  if (!is24Hour) {
    ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
  }

  document.getElementById("clock").innerText =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${is24Hour ? "" : ampm}`;
}

function pad(num) {
  return num < 10 ? "0" + num : num;
}

function toggleFormat() {
  is24Hour = !is24Hour;
}

setInterval(updateClock, 1000);
updateClock();

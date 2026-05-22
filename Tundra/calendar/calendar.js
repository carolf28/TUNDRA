const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

/* ADICIONAR OS EVENTOS AQUI */
const events = [
  {
    date: "2026-05-24",
    title: "TUNDRA Screening"
  },
  {
    date: "2026-05-28",
    title: "Sound Intervention"
  },
  {
    date: "2026-06-12",
    title: "Archive Session"
  }
];

/* START AT CURRENT MONTH */
const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

/* RENDER CALENDAR */
function renderCalendar(month, year) {

    /* clear old calendar */
    calendarEl.innerHTML = "";

    /* update title */
    monthTitle.textContent = `${monthNames[month]} ${year}`;

    /* first + last day */
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const totalDays = lastDay.getDate();

    /* empty spaces before month starts */
    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
        const emptyEl = document.createElement("div");
        emptyEl.classList.add("empty");
        calendarEl.appendChild(emptyEl);
    }

    /* build days */
    for (let day = 1; day <= totalDays; day++) {

        const dayEl = document.createElement("div");
        dayEl.classList.add("day");

        dayEl.textContent = day;

        /* format date */
        const dateStr =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        /* check events */
        const event = events.find(e => e.date === dateStr);

        if (event) {
            dayEl.classList.add("event");
            dayEl.title = event.title;
        }

        /* highlight today */
        const todayStr = today.toISOString().split("T")[0];

        if (dateStr === todayStr) {
            dayEl.classList.add("today");
        }

        calendarEl.appendChild(dayEl);
    }
}

/* PREVIOUS MONTH */
prevBtn.addEventListener("click", () => {

    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }

    renderCalendar(currentMonth, currentYear);
});

/* NEXT MONTH */
nextBtn.addEventListener("click", () => {

    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    renderCalendar(currentMonth, currentYear);
});

/* 🚀 INITIAL RENDER */
renderCalendar(currentMonth, currentYear);
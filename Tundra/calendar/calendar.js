const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

const eventInfo = document.getElementById("eventInfo");

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
  },
  {
    date: "2026-07-12",
    title: "Album release"
  }
];

/* START AT CURRENT MONTH */
const today = new Date();

let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

/* MONTH NAMES (PT-PT) */
const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril",
  "Maio", "Junho", "Julho", "Agosto",
  "Setembro", "Outubro", "Novembro", "Dezembro"
];

/* RENDER CALENDAR */
function renderCalendar(month, year) {

    calendarEl.innerHTML = "";

    monthTitle.textContent = `${monthNames[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();

    /* empty cells */
    for (let i = 0; i < startDay; i++) {
        const emptyEl = document.createElement("div");
        emptyEl.classList.add("empty");
        calendarEl.appendChild(emptyEl);
    }

    /* days */
    for (let day = 1; day <= totalDays; day++) {

        const dayEl = document.createElement("div");
        dayEl.classList.add("day");

        dayEl.textContent = day;

        const dateStr =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const event = events.find(e => e.date === dateStr);

        if (event) {
            dayEl.classList.add("event");

            /* CLICK → SHOW EVENT ON RIGHT PANEL */
            dayEl.addEventListener("click", () => {
                eventInfo.innerHTML = `
                    <h2>${event.title}</h2>
                    <p>${event.date}</p>
                `;
            });
        }

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

/* INITIAL RENDER */
renderCalendar(currentMonth, currentYear);
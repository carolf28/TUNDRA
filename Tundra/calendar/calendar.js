const calendarEl = document.getElementById("calendar");
const monthTitle = document.getElementById("monthTitle");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

const eventInfo = document.getElementById("eventInfo");
const secondEvent = document.getElementById("secondEvent");



/* ADD EVENTS HERE */
const events = [
    {
        date: "2026-07-18",
        type: "tundra",

        title: "Album release",

        image: "assets/eventimages/event1.webp",

        caption: "The debut album is finally available on all streaming platforms.",

        link: {
            text: "Listen now",
            url: "https://link.com"
        }
    },

    {
        date: "2026-07-12",
        type: "tundra",

        title: "OUTRO",

        image: "assets/images/events/outro.webp",

        caption: "Description of the OUTRO event goes here.",

        link: {
            text: "More info",
            url: "https://your-link.com"
        }
    },

    {
        date: "2026-07-22",
        title: "marcha da visibilidade trans encontro no martim moniz 15H",
        type: "second"
    },

    {
        date: "2026-07-20",
        title: "marcha 2 16H",
        type: "second"
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

    /* Empty cells */
    for (let i = 0; i < startDay; i++) {
        const emptyEl = document.createElement("div");
        emptyEl.classList.add("empty");
        calendarEl.appendChild(emptyEl);
    }

    /* Days */
    for (let day = 1; day <= totalDays; day++) {

        const dayEl = document.createElement("div");
        dayEl.classList.add("day");

        dayEl.textContent = day;

        const dateStr =
            `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        const event = events.find(e => e.date === dateStr);

        if (event) {

            dayEl.classList.add("event");

            if (event.type === "second") {
                dayEl.classList.add("blue");
            }

            dayEl.addEventListener("click", () => {

                /* Remove previous selection */
                document.querySelectorAll(".day.selected").forEach(day => {
                    day.classList.remove("selected");
                });

                /* Select current event */
                dayEl.classList.add("selected");

                if (event.type === "second") {

                    const top = Math.random() * 50 + 25;
                    const left = Math.random() * 50 + 25;

                    secondEvent.style.top = `${top}%`;
                    secondEvent.style.left = `${left}%`;

                    secondEvent.classList.remove("hidden");

                    secondEvent.innerHTML = `
                        <h2>${event.title}</h2>
                    `;
                } else {

                    secondEvent.classList.add("hidden");

                eventInfo.innerHTML = `
                    <p class="event-date">${event.date}</p>

                    <h2>${event.title}</h2>

                    <img
                        class="event-image"
                        src="${event.image}"
                        alt="${event.title}"
                    >

                    <p class="event-caption">
                        ${event.caption}
                    </p>

                    <a
                        class="event-link"
                        href="${event.link.url}"
                        target="_blank"
                    >
                        ${event.link.text}
                    </a>
                `;
                }
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

document.addEventListener("click", (e) => {

    const clickedBlueDay = e.target.closest(".day.blue");

    if (!clickedBlueDay && !secondEvent.contains(e.target)) {

        secondEvent.classList.add("hidden");

        document.querySelectorAll(".day.blue.selected").forEach(day => {
            day.classList.remove("selected");
        });
    }

});

/* INITIAL RENDER */
renderCalendar(currentMonth, currentYear);
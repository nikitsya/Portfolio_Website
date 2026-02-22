const STORAGE_KEY = "nika_timetable_v1";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const defaultSchedule = {
  Mon: [
    { title: "C++", meta: "P1139 · D Flood" },
    { title: "C++", meta: "P1104 · D Flood" },
    { title: "Applied SW Project", meta: "P1139 · R Lynch" },
    { title: "Applied SW Project", meta: "P1104 · F Keenan" },
    { title: "", meta: "Independent work" }
  ],
  Tue: [
    { title: "Full Stack Development", meta: "P1107 · D O'Reilly" },
    { title: "OO Programming", meta: "P1159 · D Logue" },
    { title: "", meta: "Project prep" },
    { title: "UX Design", meta: "P1139 · D Flood" },
    { title: "Applied SW Project", meta: "P1139 · R Lynch" }
  ],
  Wed: [
    { title: "", meta: "Focus block" },
    { title: "UX Design", meta: "P1160 · D Flood" },
    { title: "C++", meta: "P1159 · D Flood" },
    { title: "Server-Side Development", meta: "P1106 · S Gates" },
    { title: "", meta: "Portfolio edits" }
  ],
  Thu: [
    { title: "Full Stack Development", meta: "P1160 · D O'Reilly" },
    { title: "Server-Side Development", meta: "P1106 · S Gates" },
    { title: "", meta: "Break / admin" },
    { title: "OO Programming", meta: "P1159 · D Logue" },
    { title: "", meta: "Creative lab" }
  ],
  Fri: [
    { title: "", meta: "No class" },
    { title: "Team check-in", meta: "Studio room · 11:00" },
    { title: "", meta: "Content production" },
    { title: "Portfolio polish", meta: "Publishing sprint" },
    { title: "", meta: "Personal project" }
  ]
};

const tbody = document.getElementById("timetable-body");
const selectedSlotNode = document.getElementById("selected-slot");
const titleInput = document.getElementById("slot-title-input");
const metaInput = document.getElementById("slot-meta-input");
const slotForm = document.getElementById("slot-form");
const clearSlotBtn = document.getElementById("clear-slot-btn");
const resetTableBtn = document.getElementById("reset-table-btn");
const yearNode = document.getElementById("year");

let schedule = loadSchedule();
let selected = null;

function cloneDefaultSchedule() {
  return JSON.parse(JSON.stringify(defaultSchedule));
}

function loadSchedule() {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return cloneDefaultSchedule();
  }

  try {
    const parsed = JSON.parse(stored);
    return days.every((day) => Array.isArray(parsed[day]) && parsed[day].length === 5)
      ? parsed
      : cloneDefaultSchedule();
  } catch {
    return cloneDefaultSchedule();
  }
}

function saveSchedule() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
}

function cellLabel(day, slotIndex) {
  const slotNames = [
    "09:00-10:30",
    "10:45-12:15",
    "12:30-14:00",
    "14:15-15:45",
    "16:00-17:30"
  ];

  return `${day} · ${slotNames[slotIndex]}`;
}

function renderTable() {
  if (!tbody) {
    return;
  }

  tbody.innerHTML = "";

  days.forEach((day) => {
    const row = document.createElement("tr");
    const dayCell = document.createElement("th");
    dayCell.textContent = day;
    row.appendChild(dayCell);

    schedule[day].forEach((slot, slotIndex) => {
      const td = document.createElement("td");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "slot-button";
      button.dataset.day = day;
      button.dataset.slot = String(slotIndex);

      const title = document.createElement("span");
      title.className = "slot-title";
      title.textContent = slot.title || "No class";
      button.appendChild(title);

      const meta = document.createElement("span");
      meta.className = "slot-meta";
      meta.textContent = slot.meta || "-";
      button.appendChild(meta);

      if (!slot.title && slot.meta) {
        button.classList.add("slot-empty");
      }

      if (selected && selected.day === day && selected.slot === slotIndex) {
        button.classList.add("is-selected");
      }

      td.appendChild(button);
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });
}

function selectSlot(day, slotIndex) {
  selected = { day, slot: slotIndex };
  const slotData = schedule[day][slotIndex];

  if (selectedSlotNode) {
    selectedSlotNode.textContent = cellLabel(day, slotIndex);
  }

  if (titleInput) {
    titleInput.value = slotData.title || "";
  }

  if (metaInput) {
    metaInput.value = slotData.meta || "";
  }

  renderTable();
}

tbody?.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const button = target.closest(".slot-button");

  if (!button) {
    return;
  }

  const day = button.dataset.day;
  const slotValue = button.dataset.slot;

  if (!day || slotValue === undefined) {
    return;
  }

  const slotIndex = Number(slotValue);

  if (Number.isNaN(slotIndex)) {
    return;
  }

  selectSlot(day, slotIndex);
});

slotForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selected || !titleInput || !metaInput) {
    return;
  }

  schedule[selected.day][selected.slot] = {
    title: titleInput.value.trim(),
    meta: metaInput.value.trim()
  };

  saveSchedule();
  renderTable();
});

clearSlotBtn?.addEventListener("click", () => {
  if (!selected || !titleInput || !metaInput) {
    return;
  }

  titleInput.value = "";
  metaInput.value = "";
  schedule[selected.day][selected.slot] = { title: "", meta: "" };
  saveSchedule();
  renderTable();
});

resetTableBtn?.addEventListener("click", () => {
  const shouldReset = window.confirm("Reset timetable to default values?");

  if (!shouldReset) {
    return;
  }

  schedule = cloneDefaultSchedule();
  selected = null;

  if (selectedSlotNode) {
    selectedSlotNode.textContent = "Pick any cell in the timetable.";
  }

  if (titleInput) {
    titleInput.value = "";
  }

  if (metaInput) {
    metaInput.value = "";
  }

  saveSchedule();
  renderTable();
});

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

renderTable();

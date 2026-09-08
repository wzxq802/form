/**
 * Course application form
 * Data copied from data/*.json (no fetch — per brief).
 */

const courses = [
  { id: 1, name: "Курсы повышения квалификации" },
  { id: 2, name: "Курсы профессиональной переподготовки" },
];

const programs = [
  { id: 1, name: "Промышленное и гражданское строительство" },
  { id: 2, name: "Экономика и управление в строительстве" },
  { id: 3, name: "Контроль качества строительных материалов" },
  { id: 4, name: "Инженерные системы зданий и сооружений" },
  { id: 5, name: "Автомобильные дороги" },
  { id: 6, name: "Проектирование и монтаж инженерных сетей" },
  { id: 7, name: "Электроснабжение" },
  { id: 8, name: "Информационные технологии в строительстве" },
  { id: 9, name: "Пожарная безопасность" },
  { id: 10, name: "Сметное дело в строительстве" },
  { id: 11, name: "Охрана труда в строительстве" },
  { id: 12, name: "Геодезия и картография" },
  { id: 13, name: "Водоснабжение и водоотведение" },
  { id: 14, name: "Теплогазоснабжение и вентиляция" },
  { id: 15, name: "Управление проектами в строительстве" },
];

const coursePrograms = [
  [1, 1],
  [1, 3],
  [1, 4],
  [1, 5],
  [1, 7],
  [1, 8],
  [1, 9],
  [1, 10],
  [1, 11],
  [1, 13],
  [1, 14],
  [1, 15],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 6],
  [2, 7],
  [2, 8],
  [2, 9],
  [2, 10],
  [2, 12],
  [2, 13],
  [2, 15],
];

// --- DOM ---
const form = document.getElementById("application-form");
const courseSelect = document.getElementById("course");
const courseResetBtn = document.getElementById("course-reset");
const programField = document.getElementById("field-program");
const programSelect = document.getElementById("program");

/** Fill course select from `courses` ("Не выбрано" is already in HTML). */
function fillCourses() {
  courses.forEach((course) => {
    const option = document.createElement("option");
    option.value = String(course.id);
    option.textContent = course.name;
    courseSelect.appendChild(option);
  });
}

/** Program ids linked to a course via coursePrograms pairs [courseId, programId]. */
function getProgramIdsForCourse(courseId) {
  return coursePrograms
    .filter(([cId]) => cId === courseId)
    .map(([, pId]) => pId);
}

/** Rebuild program options for the selected course; clears previous options. */
function fillProgramsForCourse(courseId) {
  programSelect.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "Не выбрано";
  programSelect.appendChild(placeholder);

  const programIds = getProgramIdsForCourse(courseId);
  const linkedPrograms = programs.filter((program) =>
    programIds.includes(program.id)
  );

  linkedPrograms.forEach((program) => {
    const option = document.createElement("option");
    option.value = String(program.id);
    option.textContent = program.name;
    programSelect.appendChild(option);
  });
}

/** Show program select and enable it. */
function showProgramField() {
  programField.hidden = false;
  programField.classList.remove("field--hidden");
  programSelect.disabled = false;
}

/** Hide program select, disable it, and clear selection/options leftover. */
function hideProgramField() {
  programSelect.value = "";
  programSelect.disabled = true;
  programSelect.innerHTML = '<option value="">Не выбрано</option>';
  programField.hidden = true;
  programField.classList.add("field--hidden");
}

/** Cascade: course change → show/filter programs or hide on empty. */
function onCourseChange() {
  const raw = courseSelect.value;

  if (!raw) {
    hideProgramField();
    return;
  }

  const courseId = Number(raw);
  fillProgramsForCourse(courseId);
  showProgramField();
}

/** Reset course to "Не выбрано" (also hides program via change handler). */
function resetCourse() {
  courseSelect.value = "";
  courseSelect.dispatchEvent(new Event("change", { bubbles: true }));
}

fillCourses();
hideProgramField();

courseSelect.addEventListener("change", onCourseChange);
courseResetBtn.addEventListener("click", resetCourse);

// No real submit yet (Task 3) — prevent page reload
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// --- Task 3: validation, fetch, success modal ---

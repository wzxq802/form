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

const SUBMIT_URL = "https://jsonplaceholder.typicode.com/posts";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- DOM ---
const form = document.getElementById("application-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const courseSelect = document.getElementById("course");
const courseResetBtn = document.getElementById("course-reset");
const programField = document.getElementById("field-program");
const programSelect = document.getElementById("program");
const consentPersonal = document.getElementById("consent-personal");
const consentPrivacy = document.getElementById("consent-privacy");
const submitBtn = document.getElementById("submit-btn");
const submitLabel = submitBtn.querySelector(".application__submit-label");
const submitSpinner = submitBtn.querySelector(".application__submit-spinner");
const successModalEl = document.getElementById("success-modal");
const successCourseName = document.getElementById("success-course-name");
const successProgramName = document.getElementById("success-program-name");
const successModal = new bootstrap.Modal(successModalEl);

const fieldMap = {
  name: {
    control: nameInput,
    errorId: "name-error",
    wrap: nameInput.closest(".field"),
  },
  email: {
    control: emailInput,
    errorId: "email-error",
    wrap: emailInput.closest(".field"),
  },
  course: {
    control: courseSelect,
    errorId: "course-error",
    wrap: document.getElementById("field-course"),
  },
  program: {
    control: programSelect,
    errorId: "program-error",
    wrap: programField,
  },
  "consent-personal": {
    control: consentPersonal,
    errorId: "consent-personal-error",
    wrap: document.getElementById("consent-personal-item"),
    invalidClass: "consents__item--invalid",
  },
  "consent-privacy": {
    control: consentPrivacy,
    errorId: "consent-privacy-error",
    wrap: document.getElementById("consent-privacy-item"),
    invalidClass: "consents__item--invalid",
  },
};

// --- Cascading selects ---

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
  clearFieldError("program");
  programSelect.value = "";
  programSelect.disabled = true;
  programSelect.innerHTML = '<option value="">Не выбрано</option>';
  programField.hidden = true;
  programField.classList.add("field--hidden");
}

/** Cascade: course change → show/filter programs or hide on empty. */
function onCourseChange() {
  clearFieldError("course");
  clearFieldError("program");

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

function findById(list, id) {
  return list.find((item) => item.id === Number(id));
}

// --- Validation UI ---

function setFieldError(key, message) {
  const meta = fieldMap[key];
  if (!meta) return;

  const errorEl = document.getElementById(meta.errorId);
  errorEl.textContent = message;
  errorEl.hidden = false;

  const invalidClass = meta.invalidClass || "field--invalid";
  meta.wrap.classList.add(invalidClass);
  meta.control.setAttribute("aria-invalid", "true");
}

function clearFieldError(key) {
  const meta = fieldMap[key];
  if (!meta) return;

  const errorEl = document.getElementById(meta.errorId);
  errorEl.textContent = "";
  errorEl.hidden = true;

  const invalidClass = meta.invalidClass || "field--invalid";
  meta.wrap.classList.remove(invalidClass);
  meta.control.removeAttribute("aria-invalid");
}

function clearAllErrors() {
  Object.keys(fieldMap).forEach(clearFieldError);
}

/**
 * Validate form. Returns { valid, payload } where payload is ready for POST.
 */
function validateForm() {
  clearAllErrors();

  let valid = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const courseId = courseSelect.value;
  const programVisible = !programField.hidden;
  const programId = programSelect.value;

  if (!name) {
    setFieldError("name", "Пожалуйста, заполните поле");
    valid = false;
  }

  if (!email) {
    setFieldError("email", "Пожалуйста, заполните поле");
    valid = false;
  } else if (!EMAIL_RE.test(email)) {
    setFieldError("email", "Введите корректный email");
    valid = false;
  }

  if (!courseId) {
    setFieldError("course", "Пожалуйста, заполните поле");
    valid = false;
  }

  if (programVisible && !programId) {
    setFieldError("program", "Пожалуйста, заполните поле");
    valid = false;
  }

  if (!consentPersonal.checked) {
    setFieldError("consent-personal", "Необходимо дать согласие");
    valid = false;
  }

  if (!consentPrivacy.checked) {
    setFieldError("consent-privacy", "Необходимо подтвердить ознакомление");
    valid = false;
  }

  const course = findById(courses, courseId);
  const program = findById(programs, programId);

  return {
    valid,
    payload: {
      name,
      email,
      courseId: courseId ? Number(courseId) : null,
      courseName: course ? course.name : "",
      programId: programId ? Number(programId) : null,
      programName: program ? program.name : "",
      comment: document.getElementById("comment").value.trim(),
    },
  };
}

// --- Submit ---

function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  submitLabel.hidden = isLoading;
  submitSpinner.hidden = !isLoading;
}

async function submitApplication(payload) {
  setLoading(true);

  try {
    const response = await fetch(SUBMIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    successCourseName.textContent = payload.courseName;
    successProgramName.textContent = payload.programName || "—";
    successModal.show();
  } catch (error) {
    // Network / API failure — show a simple alert so the user gets feedback
    console.error(error);
    window.alert("Не удалось отправить заявку. Попробуйте ещё раз.");
  } finally {
    setLoading(false);
  }
}

async function onFormSubmit(event) {
  event.preventDefault();

  const { valid, payload } = validateForm();
  if (!valid) {
    const firstInvalid = form.querySelector('[aria-invalid="true"]');
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  await submitApplication(payload);
}

/** Reset all fields after successful submit (when modal closes). */
function resetForm() {
  form.reset();
  clearAllErrors();
  hideProgramField();
}

// --- Init ---

fillCourses();
hideProgramField();

courseSelect.addEventListener("change", onCourseChange);
courseResetBtn.addEventListener("click", resetCourse);
programSelect.addEventListener("change", () => clearFieldError("program"));

nameInput.addEventListener("input", () => clearFieldError("name"));
emailInput.addEventListener("input", () => clearFieldError("email"));
consentPersonal.addEventListener("change", () => clearFieldError("consent-personal"));
consentPrivacy.addEventListener("change", () => clearFieldError("consent-privacy"));

form.addEventListener("submit", onFormSubmit);

successModalEl.addEventListener("hidden.bs.modal", resetForm);

// Stub consent links (no real pages in this task)
form.querySelectorAll(".consents__link").forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

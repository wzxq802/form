# Course Application Form / Форма заявки на курс

A responsive course application form based on a production reference.

---

### Tech stack

HTML5 / SCSS (BEM) / Bootstrap 5 (CDN) / Vanilla JavaScript

### Features

- Responsive semantic HTML5 form
- BEM-based SCSS
- Bootstrap 5 grid and components
- Cascading **Course → Program** selects
- Course and program data from local JSON files, embedded into JavaScript as literals
- Program options filtered by the selected course
- Course reset (clear button)
- Client-side validation:
  - required name
  - valid email format
  - selected course
  - selected program
  - required consent checkboxes
- Inline validation error messages (tooltip style)
- Form submission via `fetch`
- Loading state while submitting
- Bootstrap modal after successful submission (shows selected course and program)
- Form reset after closing the success modal
- No page reload during interaction or submission

### Running

No local server or build tool is required.

1. Open `index.html` directly in a browser (double-click the file).
2. Local JSON files are **not** fetched at runtime — their contents are embedded in `js/script.js`, so the project works from the file system.

### Project structure

```text
index.html
scss/
└── style.scss          — source SCSS (BEM)
css/
└── style.css           — compiled CSS used by the HTML
js/
└── script.js           — application logic + data from JSON as JS literals
data/
├── courses.json
├── programs.json
└── course_program.json
```

### SCSS compilation

```bash
npx sass scss/style.scss css/style.css
```

Watch mode:

```bash
npx sass --watch scss/style.scss:css/style.css
```

### Bootstrap 5

Bootstrap CSS and JavaScript are connected via [jsDelivr](https://www.jsdelivr.com/) CDN (v5.3.3).  
Bootstrap Icons are also connected via CDN.

### Form submission

After successful validation, the form is submitted asynchronously with `fetch` to the public JSONPlaceholder test API:

```text
https://jsonplaceholder.typicode.com/posts
```

No backend is required.

---

Адаптивная форма заявки на курс, сверстанная по предоставленному референсу с продакшн-версии.

### Стек

HTML5 / SCSS (БЭМ) / Bootstrap 5 (CDN) / Vanilla JavaScript

### Реализовано

- Адаптивная семантическая HTML5-разметка
- БЭМ для собственных CSS-классов
- Bootstrap 5 для сетки и компонентов
- Каскадные списки **Курс → Программа**
- Данные курсов и программ из локальных JSON-файлов
- Содержимое JSON встроено в `script.js` в виде JS-литералов
- Фильтрация программ в зависимости от выбранного курса
- Сброс выбранного курса и программы
- Клиентская валидация:
  - обязательное имя
  - корректный формат email
  - выбранный курс
  - выбранная программа
  - обязательные чекбоксы согласий
- Вывод ошибок валидации рядом с полями
- Асинхронная отправка формы через `fetch`
- Блокировка кнопки и состояние загрузки во время отправки
- Bootstrap-модалка после успешной отправки
- Отображение выбранного курса и программы в модальном окне
- Сброс формы после закрытия модалки
- Работа без перезагрузки страницы

### Запуск

Локальный сервер и сборщик не требуются.

1. Откройте `index.html` двойным кликом в браузере.
2. Локальные JSON-файлы **не** запрашиваются через `fetch` — их содержимое встроено в `js/script.js`, поэтому проект работает напрямую с файловой системы.

### Структура

```text
index.html
scss/
└── style.scss          — исходники SCSS (БЭМ)
css/
└── style.css           — скомпилированный CSS, подключённый в HTML
js/
└── script.js           — логика приложения + данные из JSON в виде JS-литералов
data/
├── courses.json
├── programs.json
└── course_program.json
```

### Компиляция SCSS

```bash
npx sass scss/style.scss css/style.css
```

Режим отслеживания изменений:

```bash
npx sass --watch scss/style.scss:css/style.css
```

### Bootstrap 5

CSS и JavaScript подключены через CDN jsDelivr (v5.3.3).  
Bootstrap Icons также подключены через CDN.

### Отправка формы

После успешной клиентской валидации форма отправляется асинхронно через `fetch` на публичный тестовый API JSONPlaceholder:

```text
https://jsonplaceholder.typicode.com/posts
```

Отдельный backend не требуется.

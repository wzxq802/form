Стек: HTML5 / SCSS (БЭМ) / Bootstrap 5 (CDN) / JS
Открытие: index.html двойным кликом

Структура
---------
index.html
scss/style.scss       — исходники стилей (БЭМ)
css/style.css         — скомпилированный CSS (подключён в HTML)
js/script.js          — логика + данные из JSON как литералы
data/courses.json
data/programs.json
data/course_program.json

Компиляция SCSS
---------------
npx sass scss/style.scss css/style.css
# watch:
npx sass --watch scss/style.scss:css/style.css

Bootstrap 5
-----------
CSS и JS — через CDN jsDelivr (v5.3.3). Иконки — Bootstrap Icons CDN.

Статус
------
Задачи 1–2 — сделаны.
Задача 3 — ещё нет.

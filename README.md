# templeit_css-html

для удобной верстки или тестов

- чтобы включить необходимо прописать в консоль: npm run gulp

при добавлении нижнего подчеркнивания к файлу \_vars в sass, его компиляцмя в dist не происходит, но его импорт работает в другие sass файлы.

- добавлено @use "vars" as \* для использования переменных, иначе нужно писать vars.$variable
- изменены настройки конфигурации gulp

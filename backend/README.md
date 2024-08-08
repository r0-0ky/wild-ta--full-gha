# ITWorkin - Test Frontend

## Описание задачи
[Cсылка на Notion](https://difficult-carol-7e6.notion.site/ITWorkin-Test-Frontend-88918a8f53a143b48c3eecdf648fd97b)

## Ссылки для скачивания базы репозитория

SSH clone URL: git@gitlab.itworkin.com:itworkin_public/test_frontend.git

HTTPS clone URL: https://gitlab.itworkin.com/itworkin_public/test_frontend.git

## Скопируйте репозиторий
git clone https://gitlab.itworkin.com/itworkin_public/test_frontend.git

## Переменные окружения
Для работы приложения необходимо добавить следующие переменные окружения
(Заполнить `.env` в корневой директории проекта)

`BOT = token_вашего_телеграм_бота`
### Получение ключа бота
* Перейти по ссылке в чат с BotFather https://telegram.me/BotFather
* напечатать команду /start
* напечатать команду /newbot
* ввести username для Вашего бота
* Скопировать token бота из сообщения от BotFather
* Вставить token в .env  файл BOT =
### Хост вашего WebAPP
Необходимо разместить ваш frontend на любом хостинге и вставить ссылку в .env файл.
Допускается использовать [github pages](https://pages.github.com/).

`WEBAPP_URL = url`

### В репозитории расположен Backend для работы WebAPP приложения.
Запустить Backend можно командой 

```sh
docker-compose up -d 
```
Команда для доступа к redis после поднятия контейнеров:
```
docker exec -it redis redis-cli
```
```
keys *  - получить все ключи
get {название ключа} - получить значение ключа
```
### Эндпоинт на получение данных из БД
 - `GET http://127.0.0.1:8002/test/user_entry_check/{user_id}`- принимает id пользователя, отдает из базы данных redis значения энергии и монет.
   ```
   return:
   { 
     'energy': energy,
     'coins': coins
   }
   ```
   **Запрос на этот эндпоинт выполняется при входе пользователя в приложение. Данные по балансу пользователя в начале сессии берутся из базы данных**.

### Эндпоинты на отправку данных из приложения в БД
Отправка данных о балансе энергии и коинов при закрытии приложения:
- `POST http://127.0.0.1:8002/test/user_exit/{user_id}` — user_id передается в url, в body передаются значения coins и энергии:
  ```
  {
    "coins": 50.0,
    "energy": 75.0
  }
  ```
Отправка данных о балансе энергии и коинов при активности в приложении через вебсокеты:
- `ws://127.0.0.1:8002/ws/coins_gain/{user_id}/` - получение информации о балансе коинов
 принимает json вида:
```
    {
      "coins": "75.0"
    }
```
- `ws://127.0.0.1:8002/ws/energy_gain/{user_id}/` - получение информации о балансе энергии
```
    {
      "energy": "75.0"
    }
```

Все эндпоинты представлены в папке src/routes
user_id = любое int число

[Docs](http://127.0.0.1:8002/docs#/)
# ITWorkin - Test Frontend

## Переменные окружения
Для работы приложения необходимо создать .env файл в директории backend и вставить следущие данные: 

`REDIS_HOST=redis`  
`REDIS_PORT=6379`  
`REDIS_DB=0`  
`BOT=7346103652:AAEIszNtAcdHSMIe3aSrYgp6GwL5978VAqY`  
`WEBAPP_URL=https://wild-tap-git-main-r0-0ky.vercel.app/`  

## Запуск проекта
Запуск осуществляется командой: 

```sh
docker-compose up -d 
```

frontend часть будет доступна по аддресу: `http://localhost:3000/`  
backend часть будет доступна по аддресу: `http://localhost:8002/`  

## Cписок необходимого ПО 
* WebApp
* React TS
* Vite
* SCSS
* Axios
* TMA.js
* Docker
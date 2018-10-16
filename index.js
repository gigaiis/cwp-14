const Sequelize = require('sequelize');
const config = require('./config.json');
const db = require('./models')(Sequelize, config);
let films = require('./data/films.json');
const actors = require('./data/actors.json');

(async () => {
    await db.sequelize.sync({force: true});

    // 1. Валидация полей budget, year и rating фильма
    await db.films.create({
        title: 'Баллада о солдате',
        rating: 8.241,
        year: 1959,
        budget: 24423,
        gross: 35020,
        poster: 'https://st.kp.yandex.net/images/film_iphone/iphone360_46019.jpg',
        position: 100
    });

    // 2. Пакетная вставка 3 фильмов
    await db.films.bulkCreate(films.slice(0,3));

    // 3. Пакетное обновление поля liked у актеров с 3 фильмами
    await db.actors.update({
        liked: 999
    },
    {
        where:{
            films: 3
        }    
    });

    // 4. Пакетное удаление актеров с liked равным 0
    await db.actors.destroy({
        where: {
            liked: 0
        }
    });

    // 5. Получение за один запрос фильм со всеми его актерами (include)
    (await db.films.findById(2, {
        include: [{
            model: db.actors,
            as: 'Actors'
        }]
    })).Actors.forEach((e) => {
        console.log(`>> ${e.name}`);
    });

    // 6. Создание и применение scope для фильмов вышедших с 2007 года
    (await db.films.scope('new')
    .findAll()).forEach((film) => {
        console.log(`>> ${film.title}`);
    })


})();
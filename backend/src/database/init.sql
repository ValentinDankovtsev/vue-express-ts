-- Если таблица существует, удалить ее
DROP TABLE IF EXISTS users cascade;

-- Создать таблицу users
CREATE TABLE users(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc'),
    "updatedAt" TIMESTAMP WITHOUT TIME ZONE
);

-- Если таблица существует, удалить ее
DROP TABLE IF EXISTS books cascade;

-- Создать таблицу books
CREATE TABLE books(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) UNIQUE NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITHOUT TIME ZONE DEFAULT(NOW() AT TIME ZONE 'utc')
);

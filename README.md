# Laboratory-Database
Database for univ-aizu Laboratory

## set up

1. clone project

    `git clone git@github.com:Andyyyy64/Laboratory-Database.git`

    `cd Laboratory-Datanbase/server`

2. set env

    `cp .env.development.example .env.development`

    ```
    #jwt
    JWT_SECRET_KEY=dev_secret

    #email
    GMAIL_USER=
    GMAIL_PASSWORD=

    #db
    DB_USER=postgres
    DB_HOST=db
    DB_NAME=labodbdev
    DB_PASSWORD=riz7

    #cors
    BASE_URL=http://localhost:5173

    NODE_ENV=development
    ```
3. run docker

    `docker-compose --env-file .env.development up --build`

4. run migration and seeds

    `docker-compose exec app sh`

    `npx knex migrate:latest`

    `npx knex seed:run`

5. server is running on port 3000

    you could loing to site with 

    email: student1@u-aizu.ac.jp
    
    pass: password123
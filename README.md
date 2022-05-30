# Chat-react-nestjs app

## Requirements
- `node 16+`
- `docker`
- `docker-compose`

## Installation
`docker-compose up`


### TODO / Improvements

- [x] Create frontend part
- [x] Create backend part
- [x] Write tests
- [ ] Add user entity
- [ ] Add authentication
 
    This can be done at `GraphQLModule` function in `app.module.ts` file. Validate token from connection / integrate auth0

- [ ] Add remove chat feature

    Don't forget about chat owner validation

- [ ] Add user roles in chat

    Update relationships with `role` field

- [ ] Add database instead of using in memory

    Install `typeorm` and store data in the database (postgres/mongo or whatever you want)

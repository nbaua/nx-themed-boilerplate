# nx-themed-boilerplate

This project was generated using [Nx](https://nx.dev).

This project uses [Paper DashBoard 2](https://www.creative-tim.com/product/paper-dashboard-2) for themes used in both admin and web frontend project.

## Running this project

```
Download or clone this repository and run `npm install`

once all the dependencies are installed execute the following command on terminal

>npm run start-all

this will start 4 applications at once

- Admin console
- Admin server(API)
- Web Application
- Web server(API)

If you need to start the individual project, use following commands as required:

> npm run start-admin
> npm run start-admin-api
> npm run start-web
> npm run start-web-api

```

---

`The objective of this project is to just provide a boilerplate project with a theme implemented in place. A few core components and service elements are provided, however concrete implementation is yet be done.`

---

### Environment variables

Use the following variables to start with

```
ADMIN_APP_PORT=3201
WEB_APP_PORT=3200
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=<DATABASE-USERNAME>
DB_PASSWORD=<DATABASE-PASSWORD>
DB_NAME=<DATABASE-NAME>
DB_SYNC=false
API_RATE_LIMIT_MS=900000
API_RATE_LIMIT_REQUESTS=100
JWT_SECRET=<SOME-REALLY-COOL-LONG-TEXT-WHICH-HELPS-SCREW-THOSE-HACKERS>

```

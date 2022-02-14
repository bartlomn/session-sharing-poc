# Session sharing POC

This proof of concept demonstrates the capability of sharing the session between 2 separate node applications behind an api gateway/reverse proxy.

## Implementation details

* 2 separate nodejs express apps - see `apps/app(1|2).js`
* Are being run in 2 separate node processes via PM2, and exposed on a single server via 2 ports, 3000 and 4000
* In front of it we have an nginx reverse proxy
* That is mapping `/` to app1@3000
* And `/app2` to app2@4000
* Everything is wrapped in docker-compose, and exposed locally on port `3050`,
* so that you can visit `http://localhost:3050/` or `http://localhost:3050/app2`
* session sharing via [cookie-session](https://github.com/expressjs/cookie-session) package.

## Running

* `docker-compose up --build`
* visit `http://localhost:3050/`
* observe response comes from app1
* observe session-based request counter increases with page refreshes
* visit `http://localhost:3050/app2`
* observe response comes from app2
* observe session-based request counter increases with page refreshes, and is shared between routes
* observe session expires after 10 sec, and counter resets for both routes

# FactIdle

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

to do:
	songs:


	board:
		fix bug when drag path includes top left tile
		move board calc to server :() 

	
## Development server

To get https:// and spotify login working locally, add the localhost.crt file as a trusted certificate
Run `ng serve --proxy-config proxy.conf.json --ssl --ssl-key ./localhost.key  --ssl-cert ./localhost.crt`
for a dev server.
Navigate to `https://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

Run server with `zero` in /zero_server.
Install zero on command line separately with `npm install -g zero`
Server should be running at `http://localhost:3000`.

run other server with node chat.js in /ws_server

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Endpoint specs
GET /users/:username
returns {username: string, userId: number}

POST /users/ accepts {state: {username: string}}
returns {username: string, userId: number}

GET /users/:username/state
returns ??

POST /users/:username/state ??
??

-- 

GET /chatHistory
returns [{message: string, username: string, timestamp: string}]

--

GET /song/current
returns {track: Track, offset_ms: number, startTime: string}

GET /song/pending
returns [{track: Track, chosenBy:[{username: string, userId: number}], score: number]

POST /song/add {track: Track, user: {username: string, userId: number}}
returns [{track: Track, chosenBy:[{username: string, userId: number}], score: number]

POST /song/choose {track: Track, user: {username: string, userId: number}}
returns [{track: Track, chosenBy:[{username: string, userId: number}], score: number]

POST /song/vote/ {track: Track, user: {username: string, userId: number}, vote: number}
returns [{track: Track, chosenBy:[{username: string, userId: number}], score: number]



## Websocket specs
Server:
{type: 'chatMessage', payload: {message: string, username: string, timestamp: string}}
responds with same message

Client:
{type: 'chatMessage'}
adds to message queue


## Thoughts
spotify state can stay on client, should cache locally
user state can stay on client, but no server persistent state means
server should trust client or client should try relog on load

changing object specs is causing problems
iron out what info is needed for each operation:

# DataVsCoronaVirus API

<p>
Backend solution for Hackaton Data vs Corona virus using Node.js, Express.js and MongoDB.<br/>
Hackaton website: https://www.datavscorona.com/ <br/>
Team: The Royal Wildlings (1st place in stage 1)<br/>
<p>

## Installation

```javascript
  #1. Clone repository
  > git clone https://github.com/mkinkela1/datavscoronavirus-api.git
  
  #2. Enter directory
  > cd datavscoronavirus-api
  
  #3. Install dependencies
  > npm install
```


## Set environment
4. Create .env file in root of the project
5. .env content:
```
PORT=8000
# Create dababase url using MongoDB connect
DATABASE_URL=
TOKEN_SECRET_KEY=abc
# Time in seconds
TOKEN_LIFE=12345
REFRESH_TOKEN_SECRET_KEY=abcd
# Time in seconds
REFRESH_TOKEN_LIFE=123456
```
## Commands

<b>Start project: </b> ```npm start```<br />
<b>Run tests: </b> ```npm run test```<br />
<b>Fill database with dummy data: </b> ```npm run fill-data```<br />

## Links

Local: http://localhost:8000/api-docs/ <br />
Heroku: https://stark-reef-59342.herokuapp.com/api-docs/

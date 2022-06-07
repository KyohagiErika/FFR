# FFR - FCode Face Recognition
_License_: MIT
## How to use
* Install __Nodejs__ and __MongoDB__
* Install __Docker__
* __For development__:
  * ```npm install```
  * ```npm run mongodb-init``` to initialize database
  * ```npm run start``` to run
  * ```npm run start:live``` to run with _nodemon_
  * ```npm run test``` to test
  * ```npm run mongodb-export``` to export database
* __For deployment__:
  * ```docker build -t ffr .``` to build with _Docker_
  * ```docker start -dp 3000:3000 ffr``` to run
  * ```docker ps``` to get the _CONTAINER ID_
  * ```docker stop <CONTAINER ID>``` to stop
# NCAA Basketball Tournament Predictor 


This is a simple example of node.js and Async. The application simulates NCAA Basketball Tournament 
games. Its not much of a predictor, it just uses the seeding and randomly handles the final four.

It uses node.js as the vehicle to run the javascript and uses Ascync to coordinate
simulating the regional games asynchronously. The async.parallel callback is used
to handle coordinating the asynchronous regional game simuations and when all regional 
games have been simulated the final four games are simulated.

## Instructions

1. git clone this repository
2. Go to the directory 
3. npm install
4. node predict.js
5. The results will be logged to the standard output window.

To make it clear what is happening the set timeout parameter is used on the first
function call that simulates the first regional round. It is set to 2000 which will
make the function wait 2 second before running. As you will see in the output, the other
regional games will be played before region 1 - they do not wait for it to finish.




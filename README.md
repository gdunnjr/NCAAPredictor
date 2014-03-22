# NCAA Basketball Tournament Predictor - A simple example of node.js and Async

This is a very simple application that simulates NCAA Basketball Tournament games.
It used node.js as the vehicle to run the javascript and uses Ascync to coordinate
simulating the regional games asynchronously, and using the async.parallel callback 
to execute when all of the 4 asynchronously processing regional games have 
been simulated.

## Instructions

1. git clone this repository
2. Go to the directory 
3. npm install
4. node predict.js

The results will be logged to the standard output window.

To make it clear what is happening the setimeout parameter is used on the first
function call that simulates the first regional round. It is set to 1000 which will
make the function wait 2 second before running. As you will see in the output, the other
regional games will be played before region 1 - they do not wait for it to finish.




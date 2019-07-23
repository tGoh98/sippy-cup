# What is Sippy-Cup? 
[Sippy-Cup](http://sippy-cup.herokuapp.com/) is a silly React/TensorFlow web application based on the idea that one could reduce the number of accidental coffee spills if a mug could distinguish whether the user is knocking the cup over or picking it up.

## Features
* Sequential Keras model created in Python and exported to TensorFlow.js
* Model hosted on AWS's Cloudfront CDN for faster loading time
* Server API for React to gather data to train the model
* Custom cursor with adjusted hotspot
* Deployed to Heroku: <http://sippy-cup.herokuapp.com/>


## How to run
1. Ensure that [node js](https://nodejs.org/en/) is installed on your system
2. Clone the repository
3. Run `npm install` and then `npm start`
4. The server should now be running on <https://localhost:3000>

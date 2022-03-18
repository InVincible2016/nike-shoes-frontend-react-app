### Nike Interview Frontend Code Challenge [React]


Start static server (Port 3000): `npm install -> npm start`
You need to start backend server (on port 8081), to be able to see live data in the frontend app

## How did you prioritize tasks?
- I finished the tasks in the following order: 2(not applicable) -> 1 -> 3.
- The modification to the endpoint comes first because it's a functional change, and I usually put functional change first before proceeding to writing tests. I know there are people work their way differently like test driven development. It's just my preference to code first then test.
- The CI part comes the last, because it matches what happens in everyday development. Implementation and tests are finished first in local before pushing for pull request.

## Description of your changes & code improvements.
- I moved the API call to a separate file named 'api.js'. I think it's better to separate UI elements with api calls. It would be easier to scale later with redux, and testings.
- I wrote some tests for the App component that cover the headers, model, price, state and auto refresh.
- an alpha.yml file is added to the project. It triggers the GitHub Actions runner. It runs on the latest Ubuntu available to the agent with Node 16. Note that it only runs npm test.(This project can also run in Node 14, whcih is the minimum required by the react-scripts used in this applicaiton)
## If you had more time, what would you add further.
- The application currently uses setInterval to fetch prices every 5 seconds, and I noticed that our API is actually hosted in US AWS, so I would add aborters to every request it send out so that it would abort the previous request before sending a new one out to prevent the latest price being overwritten by the old price which arrived later due to network issues.
- For application that has the need for real time data, I would take the Server-sent Event(SSE) approach. Firstly it would prevent racing issue mentioned earlier; secondly, it is more 'real time' than the refresh every 5 seconds from the client side; it's also more efficient because the UI would only update when there is indeed an update to the price.
- Over the years I've found that e2e testing is better for frontend web applications, because it mimics how the users interect with the application. I would have add e2e testings with Puppeteer and Chrome driver to ensure the application run as expected in the client environment. (This can be integrated to the CI too)
- This project is using react-scripts which I personally don't like becaues it hides a lot of details and not really configurable until it's ejected. I normally set up a react project from scrach and only put in packages I need. (I have one  setup in my GitHub https://github.com/InVincible2016/react-barebone)
- I'm not sure if user login/authentication is needed, if yes then it should be added. 
## What were your doubts, and what were your assumptions for the projects?
- I didn't have many doubts when looking at this application, it's pretty straight forward.
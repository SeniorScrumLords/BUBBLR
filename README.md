# BUBBLR

Welcome to Bubblr! At Bubblr there are a ton of drinks to browse or save for later. If you're feeling creative you can create your own drinks. You can always come back an edit your saved collections, and check out what your friends are liking! Plan a route for bar-hopping so you can meetup with friends! Keep track of your favorite drinks and liquors or wines that you own, or leave comments and reviews for drink that you've tried. You can even play games and keep track of your hangovers if you've partied too hard!


# Features
- Home page, here a random drink is displayed where users can click it and add it to favorites, users can also search for drinks by name here
- Account page, where users can search for others, view friends, concoctions, favorite originals, and reviews
- Community page, where users can see drinks by alphabet, and leave comments and reviews on them
- Bar Hop page, where users can create/delete events at different bars
- Creation Station page, where users can create their own drinks using a variety of mixers and even name them
- Match Game, where users can use images generated from api to play a match game and also upload their own images
- Trivia Game, where users can play food & drink trivia from an API; scores are dynamically added to a Leaderboard
- Avatar Selection, added the ability to select an avatar on the profile page
- Liquor Cabinet, where users can fill out a form to upload different liquors they own and a virtual bottle can be adjusted to show an accurate representation of how much is left in a given bottle
- Hangover Assessment, where users can log there past hangover experiences by date, substance, and main symptoms to avoid making the same mistakes again

# Developers

**Recent Node Version**
The most recently tested node version was node 22

**TECH STACK** (SERN)
  - **Api**:
    - CocktailDB [Docs](https://www.thecocktaildb.com/api.php)
    - Local Business Data [Link](https://rapidapi.com/letscrape-6bRBa3QguO5/api/local-business-data)
  - **Frontend**: React [Docs](https://react.dev/)
  - **Backend**: Express [Docs](https://expressjs.com/en/4x/api.html)
  - **Navigation**: React Router [Docs](https://reactrouter.com/)
  - **Build**: Webpack [Config Docs](https://webpack.js.org/configuration/)
  - **Database**: MySQL [Docs](https://dev.mysql.com/doc/) with Sequelize [Docs](https://sequelize.org/docs/v6/)
  - **Deployment**: AWS [Make An Account Here](https://aws.amazon.com/free/?gclid=Cj0KCQjw8--2BhCHARIsAF_w1gxqy2n-xVXx_xy7dM4sYBu7QCjL7IfB_oLIrqY4XcT9CJ9VAIbVKbIaAlnlEALw_wcB&trk=7541ebd3-552d-4f98-9357-b542436aa66c&sc_channel=ps&ef_id=Cj0KCQjw8--2BhCHARIsAF_w1gxqy2n-xVXx_xy7dM4sYBu7QCjL7IfB_oLIrqY4XcT9CJ9VAIbVKbIaAlnlEALw_wcB:G:s&s_kwcid=AL!4422!3!651751058796!e!!g!!aws%20console!19852662149!145019243977&all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)
  - **Auth**: Passport [Docs](https://www.passportjs.org/tutorials/google/)
  - **Styling**: React Bootstrap [Docs](https://react-bootstrap.netlify.app/), ChartJs [Docs](https://www.chartjs.org/)
  - **Environment Variables**: dotenv [Docs](https://www.npmjs.com/package/dotenv)


**DEPLOYMENT**
- **Don't forget to install all dependencies, mySQL, and your env variables on your deployed version.**

**STARTUP**
* Create the dot env file, copied from **.env.example**
* Install dependencies: ```npm install```
* Start a mySQL server: ```mysql.server start (mac)```  ```sudo service mysql start (WSL)```
* Connect to mySQL shell: ```mysql -u root (mac, WSL)```
* Start the server and build: ```npm start```
* Log in with Google
* If using seed file, fill it out: while connected to mySQL shell ```use bubblr;``` then ```SELECT * FROM users;```, use your googleId and displayName to fill out seed file in server/db/seed.js.
* *OPTIONAL* Seed db with users: comment out your personal account then run ```npm run seed``` (this should then be uncommented for deployed instance)
* Seed the Db with the Liquor Cabinet by running ``` npm run liquor```

**KNOWN BUGS**
- Bar Hop: Currently when making a new event, the bar list does not show correctly until a page refresh
- After refactoring, the filter in the nav bar is broken
- Searching for users is currently broken after refactor
- After editing a comment, the page does not immediately rerender properly
- Leaderboard does not account for ties
- Hangover Assessment does not fully render, information does not populate to graphs correctly
- The information in the hangover seed data does not populate correctly and will result in errors.
- When too many google client id's are made theres an error on the server that responds saying too many keys. The fix temporary fix was changing alter option when syncing the database to a force option as true .Then restarting the server, then changing force back to alter.


# Contributors
Thanks to all the following people for contributing to this project:
- [@PeytonOwen](https://github.com/peytono)
- [@CamronCaldwell](https://github.com/ccaldwell11)
- [@KylanPatton](https://github.com/kycodee)
- [@DakotaDay](https://github.com/mothroom)
- [@AdonijahJohnson](https://github.com/AJ-Gamer)
- [@KatherineHebbler](https://github.com/khebbler)
- [@StefanPoole](https://github.com/steviepee)
- [@DanielleGoldberg](https://github.com/mydogditto)
- [@KhamalChaney](https://github.com/khamal22)
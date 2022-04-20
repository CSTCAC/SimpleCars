**Project**
This project started off as a means to digitise a game that my son and I play when we're out.  It started off as a means to explore NodeJS and Express, but after being frustrated with the amount of refreshes that each turn made I stumbled across HTMX.  HTMX wasn't easy for me even with the documentation, and I am thankful for the examples that they provide links to.  However these were all using PUG.  Love it or not, I like EJS and so needed to make my own way. 

Hopefully this project if anything allows you to understand how to embed EJS with HTMX content and also how the updates are pushed with response headers.

**Rules**
- We can pick cars that pass by or are parked (in the game it's set to 20 turns)
- We can swap our current car for whichever one we currently have (in the game there are only 10 swaps and each swap moves on the turns)
- We can swap the other players car once for one that is less favourable, but we can only do this once.

**Running**
May struggle running as SQLITE has some pre-gyp / mapbox error. Plan to fix this at some point

- npm start

**Credits**
- Thanks to the person who generated the data set, not sure where I found it now
- Thanks to the site that I blatantly scrape for the Gran Turismo 6 cars.  I want to replace these at some point but that's a long winded affair.


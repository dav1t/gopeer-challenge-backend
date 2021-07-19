# URL-SHORTENER
Below I will describe what I have done and which methods did I use to complete task with little explanation.

## File  Structure 

    📦src

         ┣ 📂controller

         ┣ 📂middleware

            ┗ 📜auth.js

         ┣ 📂models

         ┣ 📂routes

         ┗ 📜server.js


## Auth
For authorization I am  using JWT, also with JWT I am saving Unique users if they are not registered. Purpose of saving unique users without authorization is to calculate more accurate url visits. 

## Shortening Method
For shortening url app is not using user submitted url, its using timestamp and converts to base 62 Number.  To Represent base 62 number I m using digits and [a-z;A-Z] symbols. If we take timestamp and convert into base 62 number we will get 7 symbol sequence. 7 symbols is not really shortening, so I decided to reduce 1 more symbol and subtract years from timestamp. 


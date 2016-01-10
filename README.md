# E Quiz

# Running Locally

``` bash
npm install
npm start
```
## API

GET http://10.0.0.2:5000/user/manoj.k@example.com to get/create
GET http://10.0.0.2:5000/quiz to list
GET http://10.0.0.2:5000/quiz/569205ea5fe406c7639ffbf7 to get-questions
POST http://10.0.0.2:5000/point/
user: 56922956043f9fbd0618f14a
question: 569203fa5fe406c7639ffbdd
points: 0
to post attempt-of-user-for-a-question
GET http://10.0.0.2:5000/user/56922956043f9fbd0618f14a/quiz/569205ea5fe406c7639ffbf7/point to get all-attempts-of-user
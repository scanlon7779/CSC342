# Head to Head Wagers
## Group W: Milestone 1

### Team Members
Joey Brefka <br/>
Joonwoo Lee <br/>
Colin Scanlon <br/>

Pages   | Status | Wireframe
------- | ------ | ---------
Login   | 20%    | [wireframe]()
Account | 50%    | [wireframe]()
Admin   | 20%    | [wireframe]()
Browse  | 50%    | [wireframe]()
Create  | 50%    | [wireframe]()
History | 70%    |
Pending Wager | 50 % | 
Accepted Wager | 50 % |

Method   | Route                         | Description
-------- | ----------------------------- | ---------
`POST`   | `/login`                      | Receives an email and password
`POST`   | `/register`                   | Creates a new user account and returns the new user object
`GET`    | `/users`                      | Retrieves an array of all active users in the system
`GET`    | `/users/currentUser`          | Retrieves a user that is currently logged in the system
`GET`    | `/users/:userId`              | Retrieves a user by its Id
`POST`   | `/bets`                       | Creates a new bet and returns the new bet object
`POST`   | `/activeBet  `                | Creates a new accepted bet and returns the new accepted bet object
`GET`    | `/users/:userId/bets`         | Retrieves a list of users bets
`GET`    | `/users/:userId/bets/:active` | Retrieves a list of users active bets
`GET`    | `/games`                      | Retrieves a list of all games in the system
`PUT`    | `/users/:userId/balance`      | Edits the balance of a user to reflect bets 
`DELETE` | `/users/:userId`              | Deletes a user with the given Id 
`DELETE` | `/users/:userId/bets/:betId`  | Deletes a users bet with the given Id 

Task | Owner | Status | Comments
-----|-------|--------|--------
Backend: server.js set up | Colin | Completed | -
Backend: APIRouter.js | Colin | Completed | -
Frontend: Create page | Joonwoo | Completed | -
Frontend: Account page | Joonwoo | Completed | -
Frontend: Login page | Joey | Completed | -
Frontend: Browse page | Joey | Completed | -
Frontend: Admin page | Joey | Completed | -





# Totally Balanced Chess

Totally Balanced Chess is a game app where all the pieces and starting positions are randomized. Inspired by the format of the Fischer Random, but ramped up with randomzing how many of the pieces and what pieces are there in the board. To try and keep the game somewhat balanced, in a way, there is equal material that is split between the two sides.



## Installation

Clone the project

```bash
  git clone https://github.com/floatingtales/totally-balanced-chess.git
```

Go to the project directory

```bash
  cd totally-balanced-chess
```

Install dependencies

```bash
  npm install
```

Create the database

```bash
  npx sequelize db:create
```

Migrate the database

```bash
  npx sequelize db:migrate
```

Start the server

```bash
  node app.js
```

App will run on port 1111 in localhost
## FAQ

#### Is this format of chess really balanced?

No. But what is balance if you're not as good in playing chess?

#### Do you really need to know chess to play this?

The common answer is that at least you know how the pieces move. BUT, you don't really need to know all the opening moves! Because that doesn't apply.

#### Is this format of chess fun?

All format of chess is fun if you're winning.

## Lessons Learned

This is a project for solidifying my knowlege on Sequelize, Express, the MVC framework and usage of third party libraries (chess.js / chessboard.js). Paired with cookies for logging in/out users, it's an ambitious project the moment I tried to do it, but coming out of it, I gained a lot of knowlege in how these technologies work.
## Authors

- [@floatingtales](https://www.github.com/floatingtales)


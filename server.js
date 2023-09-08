const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()

const dbPath = path.join(__dirname, 'mydatabase.db')

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(8080, () => {
      console.log('Server Running at http://localhost:8080/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

app.get('/', async (request, response) => {
  const getBooksQuery = `
    SELECT name FROM sqlite_master WHERE type='table';`
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})

app.get('/articles/', async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      articles;`
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})

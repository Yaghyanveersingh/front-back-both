const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydatabase.db')

db.serialize(() => {
  // Create the 'users' table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `)

  // Create the 'products' table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL
    )
  `)

  db.run(`
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY,
    title TEXT,
    image_url TEXT,
    avatar_url TEXT,
    author TEXT,
    topic TEXT
)`)
  // Create the 'orders' table
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      FOREIGN KEY (user_id) REFERENCES users (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  `)

  articlesInsertStatement = db.prepare(`
  INSERT INTO articles (id, title, image_url, avatar_url, author, topic)
VALUES (?,?,?,?,?,?);
`)
  articlesInsertStatement.run(
    1,
    'React v16.9.0 and the Roadmap Update',
    'https://miro.medium.com/max/1050/1*i3hzpSEiEEMTuWIYviYweQ.png',
    'https://miro.medium.com/max/4096/1*wiOSfPd2sY0gXSNK9vv6bg.jpeg',
    'Dan Abramov,',
    'React.js',
  )
  articlesInsertStatement.run(
    2,
    'React v16.7: No, This Is Not the One With Hooks',
    'https://miro.medium.com/max/3158/1*kEPCQNY4dwVyaFuLEwJcNQ.png',
    'https://avatars.githubusercontent.com/u/3624098?v=4',
    'Andrew Clark',
    'React.js',
  )
  articlesInsertStatement.run(
    3,
    'Introducing The Problem Solver React v17.0',
    'https://i.morioh.com/201014/e14da0fb.webp',
    'https://miro.medium.com/max/4096/1*wiOSfPd2sY0gXSNK9vv6bg.jpeg',
    'Dan Abramov',
    'ReactJs',
  )
  articlesInsertStatement.run(
    4,
    'Building Great User Experiences with Concurrent Mode and Suspense',
    'https://cdn.buttercms.com/O007i3wQgmRBu4ru92yF',
    'https://images.squarespace-cdn.com/content/v1/6042ecd4513f6b5c4dc91aaf/1615155824885-GIE4JGQZG2QOVGL294PK/ke17ZwdGBToddI8pDm48kF4bdfD-ia1l4Dx5GCxoHspZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyFxcEUL_E3rtTKOK6YDZfFOvno4nmWnq-VrpVZhpg5d7A5XYUWepj6KEiZHiJnCAU/Screen+Shot+2021-03-07+at+5.23.16+PM.png',
    'Joseph Savona',
    'React.js',
  )

  articlesInsertStatement.finalize()

  // Insert sample data into the 'users' table
  const userInsertStatement = db.prepare(`
    INSERT INTO users (name, email)
    VALUES (?, ?)
  `)

  //jhjh

  userInsertStatement.run('John Doe', 'john@example.com')
  userInsertStatement.run('Jane Smith', 'jane@example.com')
  userInsertStatement.run('Bob Johnson', 'bob@example.com')

  // Finalize the insert statement for 'users'
  userInsertStatement.finalize()

  // Insert sample data into the 'products' table
  const productInsertStatement = db.prepare(`
    INSERT INTO products (name, price)
    VALUES (?, ?)
  `)

  productInsertStatement.run('Product A', 19.99)
  productInsertStatement.run('Product B', 29.99)
  productInsertStatement.run('Product C', 9.99)

  // Finalize the insert statement for 'products'
  productInsertStatement.finalize()

  // Insert sample data into the 'orders' table
  const orderInsertStatement = db.prepare(`
    INSERT INTO orders (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `)

  orderInsertStatement.run(1, 1, 2) // John Doe orders 2 of Product A
  orderInsertStatement.run(2, 2, 1) // Jane Smith orders 1 of Product B
  orderInsertStatement.run(3, 3, 3) // Bob Johnson orders 3 of Product C

  // Finalize the insert statement for 'orders'
  orderInsertStatement.finalize()

  // Query the 'users' table and print the results
  db.each('SELECT * FROM users', (err, row) => {
    if (err) {
      console.error(err.message)
    }
    console.log(`User ID: ${row.id}, Name: ${row.name}, Email: ${row.email}`)
  })

  // Query the 'products' table and print the results
  db.each('SELECT * FROM products', (err, row) => {
    if (err) {
      console.error(err.message)
    }
    console.log(`Product ID: ${row.id}, Name: ${row.name}, Price: ${row.price}`)
  })

  db.each('SELECT * FROM articles', (err, row) => {
    if (err) {
      console.error(err.message)
    }
    console.log(
      `Id: ${row.id}, Title: ${row.title}, ImageUrl: ${row.image_url},avatar_url:${row.avatar_url},Author: ${row.author},Topic:${row.topic}`,
    )
  })
  // Query the 'orders' table and print the results
  db.each('SELECT * FROM orders', (err, row) => {
    if (err) {
      console.error(err.message)
    }
    console.log(
      `Order ID: ${row.id}, User ID: ${row.user_id}, Product ID: ${row.product_id}, Quantity: ${row.quantity}`,
    )
  })
})

db.close(err => {
  if (err) {
    console.error(err.message)
  }
  console.log('Database connection closed.')
})

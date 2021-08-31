import express from 'express'
// import mysql from 'mysql2/promise'

const router = express.Router();

// const mysqlConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'test1'
// }

router.get('/', (req, res) => {
    // const conn = await mysql.createConnection(mysqlConfig)
    // const [rows, fields] = await conn.execute('select * from todos where done=0')
    // const result = JSON.parse(JSON.stringify(rows))

    // const [rows_, fields_] = await conn.execute('select * from todos where done=1 order by date DESC')
    // const resultDone = JSON.parse(JSON.stringify(rows_))

    // const [rows__, fields__] = await conn.execute('select * from todos_archiv order by date DESC')
    // const archiv = JSON.parse(JSON.stringify(rows__))
    res.render('features')
})

// router.post('/', async (req, res) => {
//     // const conn = await mysql.createConnection(mysqlConfig)
//     // await conn.execute(`insert into todos(text) values("${req.body.input}")`)
//     res.end('/')
// })

// router.post('/delete', async (req, res) => {
//     const conn = await mysql.createConnection(mysqlConfig)
//     await conn.execute(`delete from todos where text = "${req.body.deleteElement}"`)
//     res.end('/')
// })

// router.post('/update', async (req, res) => {
//     const conn = await mysql.createConnection(mysqlConfig)
//     await conn.execute(`UPDATE todos SET done = 1 WHERE (text = "${req.body.element}")`)
//     res.end('/')
// })

// router.post('/clear-all', async (req, res) => {
//     const conn = await mysql.createConnection(mysqlConfig)
//     await conn.execute(`insert into todos_archiv select * from todos where done=1`)
//     await conn.execute(`delete from todos`)
//     res.end('/')
// })

// router.post('/clear-done', async (req, res) => {
//     const conn = await mysql.createConnection(mysqlConfig)
//     await conn.execute(`insert into todos_archiv select * from todos where done=1`)
//     await conn.execute(`delete from todos where done = 1`)
//     res.end('/')
// })

// router.post('/archiv', async (req, res) => {
//     const conn = await mysql.createConnection(mysqlConfig)
//     const [rows, fields] = await conn.execute(`SELECT * FROM todos_archiv WHERE date >= '${req.body.from}' and date <= '${req.body.to}'
//     ORDER BY date DESC`)
//     res.json(rows)
// })

// router.post('/archiv-delete', async (req, res) => {
//     const conn = await mysql.createConnection(mysqlConfig)
//     await conn.execute(`delete from todos_archiv`)
//     res.end('/')
// })

export default router
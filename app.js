import express from 'express'
import features from './routes/features.js'

const app = express()
const PORT = 3000

app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/features', features)


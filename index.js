const express = require('express')
const chalk = require('chalk')
const path = require('path')
const { addNote, getNotes, updateNote, removeNote } = require('./notes.controller')

const PORT = 3000
const app = express()
app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  })
})

app.put('/:id/:title', async (req, res) => {
  await updateNote(req.params.id, req.params.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  })
})

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.listen(PORT, () => {
  console.log(chalk.bgGreen(`Server has been started on port: ${PORT}`))
})


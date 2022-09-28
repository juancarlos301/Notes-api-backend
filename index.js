const logger = require('./loggerMiddleware')
const express = require('express')
const cors = require('cors')
const app = express()
/*
const app = http.createServer((reques, response)=> {
    response.writeHead(200, {'content-type': 'text/plain'})
    response.end('hello world')
}) */

app.use(cors())

app.use(express.json())

app.use(logger)



let notes = [
  {
    id: 1,
    content: 'repasar los retas de js',
    date: '2019-05-20',
    important: true
  },
  {
    id: 2,
    content: 'lavar los platos',
    date: '2019-05-10',
    important: false
  },
  {
    id: 3,
    content: 'hacer tareas',
    date: '2019-05-9',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>holaa</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  const note = notes.find((nota) => nota.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (note || !note.content) {
    return response.status(400).json({
      message: 'note.content is missing'
    })
  }
  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id
  notes = notes.filter((nota) => nota.id !== id)
  if (notes) {
    res.json(notes)
  } else {
    res.status(404).end()
  }
})

app.use((req, res) => {
  res.status(404).json({
    error: "not found"
  })
})
const PORT = 3001

app.listen(PORT, () => {
  console.log('server running')
})

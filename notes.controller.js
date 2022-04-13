const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')
const { networkInterfaces } = require('os')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }
  notes.push(note)
  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalk.green.inverse('Note was added'))
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function updateNote(id, title) {
  const notes = await getNotes()
  const newNotes = notes.map((updateNote) => updateNote.id === id.toString()
    ? {...updateNote, title}
    : updateNote)
  console.log(id.toString(), typeof title, newNotes)
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
  console.log(chalk.green.inverse('Note was updated'))
}

async function removeNote(id) {
  const notes = await getNotes()
  const deletedId = notes.filter((delNote) => {
    return delNote.id === id.toString()
  })
  const newNotes = notes.filter((note) => {
    return note.id !== id.toString()
  })
  await fs.writeFile(notesPath, JSON.stringify(newNotes))
  console.log(chalk.bgRed(`Note with id ${deletedId[0].id} was removed`))
  printNotes()
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.bgBlue('Here is the list of notes:'))
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title))
  })
}

module.exports = {
  addNote, getNotes, removeNote, updateNote
}

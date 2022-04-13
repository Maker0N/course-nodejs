document.addEventListener('click', (e) => {
  if (e.target.dataset.type === 'remove') {
    const id = e.target.dataset.id
    remove(id).then(() => {
      e.target.closest('li').remove()
    })
  }
  if (e.target.dataset.type === 'edit') {
    const id = e.target.dataset.id
    let title = e.target.dataset.title
    const newTitle = prompt(`Edit note`, title)
    if (newTitle) {
    edit(id, newTitle)
      .then(() => {
        const li = e.target.closest('li')
        let [text] = Array.from(li.childNodes)
          .filter((node) => node.innerText === title)
        text.innerText = newTitle
        e.target.dataset.title = newTitle
    })
    }
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
  await fetch(`/${id}/${title}`, { method: 'PUT' })
}

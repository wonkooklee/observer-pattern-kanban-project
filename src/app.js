const $ = (identifier) => document.querySelector(identifier)
const $$ = (identifier) => document.getElementsByClassName(identifier)
const $$$ = (identifier) => document.createElement(identifier)

const board = $('.kanban-board')
const card = $('.kanban-card')
const columns = $$('kanban-column')
const columnsArr = Array.prototype.slice.call(columns)

const maxColumns = 0

board.addEventListener('dragenter', (e) => {
  if (e.target.className === 'kanban-card') {
    console.log('card');
  }

  if (e.target.className === 'kanban-cards') {
    const movingCardId = e.relatedTarget.id
    const destColumn = e.target.id
    // 추후 리팩토링
    // 카드 제거
    // 카드 추가
    render()
  }
})

const addColumn = (columnName) => {
  const html = `<section class="kanban-column">
  <div class="column-title">
  <h3>${columnName}</h3>
  </div>
  <ul class="kanban-cards">
  </ul>
  </section>`
  board.innerHTML += html
}

const data = [
  {
    id: 1,
    title: 'Requested',
    cards: [
      {
        id: 1,
        title: 'Wonkook Lee',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veniam itaque perspiciatis a repudiandae accusamus, quis mollitia molestias, non numquam reiciendis odit minima commodi laboriosam amet dolorum modi aliquam? Molestias!'
      },
      {
        id: 1,
        title: 'Wonkook Lee',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veniam itaque perspiciatis a repudiandae accusamus, quis mollitia molestias, non numquam reiciendis odit minima commodi laboriosam amet dolorum modi aliquam? Molestias!'
      }
    ]
  },
  {
    id: 2,
    title: 'To-Do',
    cards: []
  },
  {
    id: 3,
    title: 'Done',
    cards: []
  }
]

const render = () => {
  const _data = data
  const fragment = new DocumentFragment()
  
  const renderingColumn = (id, columnName, cards) => {
    if (!id) return
    const column = $$$('section')
    column.classList.add('kanban-column', 'column-' + id)
    const html = `<div class="column-title"><h3>${columnName}</h3></div><ul class="kanban-cards" id="list-${id}"></ul><button id="${id}" class="add-card-btn">Add Card</button>`
    column.innerHTML = html
    const list = column.querySelector('.kanban-cards')
    cards.forEach(card => {
      const cardEl = renderingCards(card)
      list.append(cardEl)
    })
    fragment.append(column)
  }

  const renderingCards = ({ id, title, description }) => {
    const card = $$$('li')
    card.classList.add('kanban-card')
    card.id = id
    card.setAttribute('draggable', 'true')
    card.innerHTML = `<div class="card-header"><div class="card-title"><h4>${title}</h4></div><div class="card-user-profile"><figure><a href="#"><img src="https://velog.velcdn.com/images/oneook/profile/6435ac79-fe70-444e-8d7c-1698b6055516/Untitled-3.jpg" alt=""></a></figure></div></div><div class="card-content"><div class="description"><p>${description}</p></div></div>`
    return card
  }

  _data.forEach(({id, title, cards}) => {
    renderingColumn(id, title, cards)
  })

  renderingColumn()

  board.innerHTML = ''

  board.append(fragment)
}

// 초기화
render()


const addColumnBtn = $('.add-btn')
const addCardBtn = $('.add-card-btn')

addCardBtn.addEventListener('click', (e) => {
  const id = +e.target.id
  data.map(column => {
    if (column.id !== id) return
    column.cards.push({
      id: Math.floor(Math.random() * 10000),
      title: 'Dummy',
      description: 'Such a feelings come and over me, There is wonder in most everything I see.'
    })
  })
  render()
})
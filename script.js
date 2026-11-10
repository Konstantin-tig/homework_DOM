'use strict'

const commentsList = document.querySelector('.comments')
const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')
const addButton = document.querySelector('.add-form-button')

const comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true,
    },
]

commentsList.addEventListener('click', (event) => {
    const likeButton = event.target.closest('.like-button')
    const commentItem = event.target.closest('.comment')

    if (likeButton) {
        event.stopPropagation()

        const index = likeButton.dataset.index
        const comment = comments[index]

        if (comment.isLiked) {
            comment.isLiked = false
            comment.likes -= 1
        } else {
            comment.isLiked = true
            comment.likes += 1
        }

        renderComments()
        return
    }

    if (commentItem) {
        const index = commentItem.dataset.index
        const comment = comments[index]

        textInput.value = `> ${comment.text}\n\n${comment.name}, `
        textInput.focus()
    }
})

const renderComments = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            const likeClass = comment.isLiked ? '-active-like' : ''
            return `
            <li class="comment" data-index="${index}">
              <div class="comment-header">
                <div>${comment.name}</div>
                <div>${comment.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  ${comment.text}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comment.likes}</span>
                  <button data-index="${index}" class="like-button ${likeClass}"></button>
                </div>
              </div>
            </li>
          `
        })
        .join('')

    commentsList.innerHTML = commentsHtml
}

addButton.addEventListener('click', () => {
    nameInput.style.backgroundColor = ''
    textInput.style.backgroundColor = ''

    if (nameInput.value.trim() === '' || textInput.value.trim() === '') {
        nameInput.style.backgroundColor = '#ffcccc'
        textInput.style.backgroundColor = '#ffcccc'
        return
    }

    if (nameInput.value.trim() === '') {
        nameInput.style.backgroundColor = '#ffcccc'
        return
    }
    if (textInput.value.trim() === '') {
        textInput.style.backgroundColor = '#ffcccc'
        return
    }

    const d = new Date()
    const dateStr =
        ('0' + d.getDate()).slice(-2) +
        '.' +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        '.' +
        String(d.getFullYear()).slice(-2) +
        ' ' +
        ('0' + d.getHours()).slice(-2) +
        ':' +
        ('0' + d.getMinutes()).slice(-2)

    const safeName = nameInput.value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')

    const safeText = textInput.value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')

    comments.push({
        name: safeName,
        date: dateStr,
        text: safeText,
        likes: 0,
        isLiked: false,
    })

    nameInput.value = ''
    textInput.value = ''

    renderComments()
})

nameInput.addEventListener(
    'input',
    () => (nameInput.style.backgroundColor = ''),
)
textInput.addEventListener(
    'input',
    () => (textInput.style.backgroundColor = ''),
)

renderComments()
console.log('It works!')

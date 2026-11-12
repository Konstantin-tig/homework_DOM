import { comments, toggleLike, addComment } from './data.js'
import { formatDate, sanitizeHtml } from './utils.js'
import { renderComments } from './render.js'

export const initEventListeners = () => {
    const commentsList = document.querySelector('.comments')
    const nameInput = document.querySelector('.add-form-name')
    const textInput = document.querySelector('.add-form-text')
    const addButton = document.querySelector('.add-form-button')

    commentsList.addEventListener('click', (event) => {
        const likeButton = event.target.closest('.like-button')
        const commentItem = event.target.closest('.comment')

        if (likeButton) {
            event.stopPropagation()
            const index = likeButton.dataset.index
            toggleLike(index)
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

    addButton.addEventListener('click', () => {
        nameInput.style.backgroundColor = ''
        textInput.style.backgroundColor = ''

        const isNameEmpty = nameInput.value.trim() === ''
        const isTextEmpty = textInput.value.trim() === ''

        if (isNameEmpty || isTextEmpty) {
            if (isNameEmpty) nameInput.style.backgroundColor = '#ffcccc'
            if (isTextEmpty) textInput.style.backgroundColor = '#ffcccc'
            return
        }

        addComment({
            name: sanitizeHtml(nameInput.value),
            date: formatDate(),
            text: sanitizeHtml(textInput.value),
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
}

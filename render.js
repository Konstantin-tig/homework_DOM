import { comments } from './data.js'

const commentsList = document.querySelector('.comments')

export const renderComments = () => {
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

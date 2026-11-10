export const comments = [
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

export const toggleLike = (index) => {
    const comment = comments[index]
    if (comment.isLiked) {
        comment.isLiked = false
        comment.likes -= 1
    } else {
        comment.isLiked = true
        comment.likes += 1
    }
}

export const addComment = (newComment) => {
    comments.push(newComment)
}

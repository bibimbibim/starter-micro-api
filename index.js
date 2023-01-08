const { WeverseClient } = require("weverse");

myToken = process.env.myToken
const myClient = new WeverseClient({ token: myToken })
myClient.init({ allPosts: true, allNotifications: false })

console.log("실행!")

myClient.on('init', async (ready) => {
    if (ready) {
        myClient.listen({ listen: true, interval: 5000 })
    }
})

myClient.on('comment', (comment, post) => {
    // all objects are typed
    console.log("comment: ", comment)
    const commenter = myClient.artistById(comment.artist.id)
    console.log("commenter: ", commenter)
    const postAuthor = myClient.artistById(post.artist.id)
    console.log(`${commenter.name} commented on ${postAuthor.name}'s post!`)
})

myClient.on('post', (post) => {
    if (post.photos.length) {
        post.photos.forEach(photo => {
            downloadImage(photo.orgImgUrl)
        })
    }
})

myClient.on('notification', (notification) => {
    console.log(notification)
})
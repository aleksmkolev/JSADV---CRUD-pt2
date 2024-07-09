const endpoints = {
    posts: "http://localhost:3030/jsonstore/collections/myboard/posts",
    comments: "http://localhost:3030/jsonstore/collections/myboard/comments"
}

document.querySelector("nav a").addEventListener("click", showHome)
const topicBorderRef = document.querySelector("div.new-topic-border")
const topictitleRef = document.querySelector("div.topic-title")
const themeContentRef = document.querySelector("div.theme-content")

const commentsRef = document.querySelector("div.comment")
const commentFormSectionRef = document.querySelector("answer-comment")


const themeTitleRef = document.querySelector("div.theme-title")
const topicContainer = document.querySelector("div.topic-container")
const mainRef = document.querySelector("main")
const formRef = mainRef.querySelector("form")

topicBorderRef.remove()
topictitleRef.remove()
themeContentRef.remove()

formRef.addEventListener("submit", onSubmit)

async function showHome(e) {
    mainRef.replaceChildren(topicBorderRef)
    mainRef.appendChild(topictitleRef)
    const response = await fetch(endpoints.posts)
    const posts = await response.json()
    topicContainer.innerHTML = ""
    Object.values(posts).forEach(x => {
        const post = createPost(x)
        topicContainer.appendChild(post)
    })

}

function createPost(post) {
    

    const divContainer = document.createElement("div")
    divContainer.classList.add("topic-name-wrapper")
    divContainer.innerHTML = `
    
        <div class="topic-name">
            <a href="#" class="normal">
                <h2>${post.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${post.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${post.username}</span></p>
                    </div>
                </div>
            </div>
        </div>
   
    `
    divContainer.querySelector("a").addEventListener("click", showDetails)

    return divContainer;

}

function onSubmit(e) {
    e.preventDefault()
    const hasCancel = e.submitter.classList.contains("cancel")

    if(hasCancel){
        clear(e.target)
        return
    }

    const formData = new FormData(e.target)
    const title = formData.get("topicName")
    const username = formData.get("username")
    const postText = formData.get("postText")

    if (!title || !username || !postText) {
        return
    }

    savePost({ title, username, postText, date: new Date() })

    clear(e.target)

}

function clear(formRef){

    formRef.reset()

}

async function savePost(data) {
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(endpoints.posts, option)
    showHome()


}

/*--------------------------------------------------------------------*/
let postId = null
async function showDetails(e){
    commentFormSectionRef?.querySelector("form").addEventListener("submit", onCreateComment)
    mainRef.replaceChildren(themeContentRef)
    postId = e.currentTarget.dataset.id

    const response = await fetch(endpoints.posts+"/"+ postId)
    const post = await response.json()

    const title = createPostTitle(post)
    const details = createPostDetails(post)
    const comments = await getComments()
    showComments(postId, comments)

    themeTitleRef.appendChild(title)
    commentsRef.appendChild(details)


}

function showComemnts(postId, comment){
    data.filter
}
async function getComments(){

    const response = await fetch(endpoints.comments)

    const data = await response.json()

    return data
}

function createPostTitle(post){
    const divContainer = document.createElement("div")
    divContainer.classList.add("theme-name-wrapper")
    divContainer.innerHTML = `
    
    
            <div class="theme-name">
                <h2>${post.title}</h2>
            </div>
     
   `
   return divContainer
}

function createPostDetails(post){
    const divContainer = document.createElement("div")
    divContainer.classList.add("header")
    divContainer.innerHTML = `
    
   <div class="header">
        <img src="./static/profile.png" alt="avatar">
        <p><span>${post.username}</span> posted on <time>${post.date}</time></p>
        <p class="post-content">${post.postText}</p>
    </div>
   
  `
  return divContainer
}

function onCreateComment(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    const commentText = formData.get("postText")
    const username = formData.get("username")
    
    if(!commentText || !username){
        return
    }else{
        saveComment({commentText, username, postId})
    }

}
async function saveComment(data){
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch(endpoints.comments, option)
}
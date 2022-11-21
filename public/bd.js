document.getElementById("postForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const text = document.getElementById("postText").value;
    const post = {
        text: text,
        user_id: firebase.auth().currentUser == null ? "Usuário não logado" : firebase.auth().currentUser.displayName,
        likes: 0,
        comments: [],
    }

    const postsCollection = firebase.firestore().collection("posts")
    postsCollection.add(post).then(res => {
        document.getElementById("postText").value = ""

        loadPosts()
    })
});

function listPosts(post) {
    const postTemplate = `
        <li id="${post.id}" style="font-family: 'Courier New', Courier, monospace;">
            <input type="button" value="🗑️" id="btnDeletePost" onclick="deletePost('${post.id}')"> <br/>
            <strong>Id da mensagem</strong>: ${post.id} <br/> <strong>Texto</strong>: ${post.data().text} <br/> <strong>Likes</strong>: ❤️${post.data().likes} <br/> <strong>Usuário</strong>: ❤️${post.data().user_id}
            <hr/>
        </li>
    `

    document.getElementById("posts").innerHTML += postTemplate;
}

function loadPosts() {
    const postsCollection = firebase.firestore().collection("posts")

    document.getElementById("posts").innerHTML = "Carregando..."

    postsCollection.get().then(snap => {
        document.getElementById("posts").innerHTML = ""

        snap.forEach(post => {
            listPosts(post)
        })
    })
}

function deletePost(postId) {
    const postsCollection = firebase.firestore().collection("posts")

    postsCollection.doc(postId).delete().then(doc => {
        console.log("Apagou o post " + postId + ". LEGAAAALLLL!!!");

        loadPosts()
    })
}
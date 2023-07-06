const addCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector("#comment_text").value;
    const post_id = event.target.getAttribute("data-postid")
    console.log(comment_text, post_id)
    if (comment_text) {
        const response = await fetch('/api/posts/comment', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log("added",response)
        if (response.ok) {
            //location.reload()
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
    console.log("test")
};

document.querySelector('.addComment').addEventListener('submit', addCommentFormHandler);      
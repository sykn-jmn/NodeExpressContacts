function deleteContact(id){
    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/deleteContact/'+id;
    Http.open("DELETE", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        window.location.href = Http.responseText;
        console.log(Http.responseText)
    }
}
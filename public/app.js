$.ajaxSetup({
    beforeSend: function(){
        $('#loading').show()
    },
    complete: function(){
        $('#loading').fadeOut(1000)
    },
    error: function(){
        $('#loading').hide()
    }
});

$(function(){
    $('.peopletbl tbody tr').on('click', function(){
        var tr = $(this)
        var id = tr.data('id')
        console.log(id)
        $.ajax({
            url:'/contact/' +id,
            success:function(html){
                $('#content').html(html)
                $('#content').fadeIn(3000)
            }
        })
    })
    
    $('#addContact').on('click',function(){
        $.ajax({
            url:'/contact/new',
            success:function(html){
                $('#content').html(html)
                $('#content').fadeIn(3000)
            }
        })
    })
})




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

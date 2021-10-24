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
                $('#content').fadeIn()
            }
        })
    })
    
    $('#addContact').on('click',function(){
        $.ajax({
            url:'/contact/new',
            success:function(html){
                $('#content').html(html)
                $('#content').fadeIn()
            }
        })
    })

    $('#addContact').on('click',function(){
        $.ajax({
            url:'/contact/new',
            success:function(html){
                $('#content').html(html)
                $('#content').fadeIn()
            }
        })
    })

    $('.deleteContact').on("click",function(e){
        var btn = $(this);
        var tr = btn.closest('tr');
        var id = tr.data('id')
        $.ajax({
            url:'contacts/delete/'+id,
            type: 'DELETE',
            success:function(){
                tr.remove();
            }
        })
        return false; 
    })

    $('.contactsBody tr').mouseenter(function() {
        $(this).children().last().animate({opacity: '1'},300);
      })
      .mouseleave(function() {
        $(this).children().last().stop();
        $(this).children().last().css("opacity","0");
      });
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

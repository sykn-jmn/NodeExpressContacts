$(function(){
    var eatblbody = $('.person-form .ea-tbl tbody');

    function removeEaTr(btn){
        btn.closest('tr').remove();
    }

    $('.person-form .ea-btn-add').on("click", function(){
        var btn = $(this);
        var html = `<tr>
        <th><a href="javascript:" class="btn btn-primary ea-btn-remove"><i class="bi bi-x"></i></a></th>
            <th>
                <input type="text" class="form-control" name="emailAddresses">
            </th>
        </tr>`;
        html = $(html);
        eatblbody.append(html);
        html.find('.ea-btn-remove').on("click",function(){
            removeEaTr($(this));
        })
    })

    $('.person-form .ea-btn-remove').on("click", function(){
       removeEaTr($(this));
    })

    $('.person-form').on("submit", function(e){
        e.preventDefault()
        var form = $(this)
        $.ajax({
            url: '/contact',
            type: 'POST',
            data: form.serialize(),
            success: function(){
                form.find('#msg').show().delay(3000).fadeOut()
                $('.behind').fadeOut()
            }
        })
    })
    $('#closeNewContact').on("click",function(){
        $('#content').fadeOut()
    })
})
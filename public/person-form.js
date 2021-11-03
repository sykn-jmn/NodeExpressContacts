$(function(){
    var eatblbody = $('.person-form .ea-tbl tbody');
    var patblbody = $('.person-form .pa-tbl tbody');

    function removeEaTr(btn){
        btn.closest('tr').remove();
    }

    function removePaTr(btn){
        patblLength--;
        btn.closest('tr').remove();
    }

    var patblLength = $('.pa-tbl tbody tr').length;
    $('.ea-btn-add').unbind("click").on("click", function(){
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
        return false;
    })
    $('.pa-btn-add').unbind("click").on("click", function(){
        var idx = patblLength;
        patblLength++;
        var html =`<tr>
        <td><a href="javascript:" class="btn btn-primary pa-btn-remove"><i class="bi bi-x"></i></a></td>
        <td>
            <input type="text" class="form-control" name="postaladdresses[${idx}].street">
        </td>
        <td>
            <input type="text" class="form-control" name="postaladdresses[${idx}].city">
        </td>
        <td>
            <input type="text" class="form-control" name="postaladdresses[${idx}].zipcode">
        </td>
        </tr>`;
        html = $(html);
        patblbody.append(html);
        html.find('.pa-btn-remove').on("click",function(){
            removePaTr($(this));
        })
        return false;
    })

    $('.ea-btn-remove').on("click", function(){
       removeEaTr($(this));
    })

    $('.pa-btn-remove').on("click", function(){
        removePaTr($(this));
     })

    $('.person-form').unbind('submit').on("submit", function(e){
        e.preventDefault()
        var form = $(this)
        $.ajax({
            url: '/contact',
            type: 'POST',
            data: form.serializeToJSON({associativeArrays:false}),
            success: function(){
                form.find('#msg').show().delay(3000).fadeOut()
                $('.behind').fadeOut()
            }
        })
        return false;
    })
    $('#closeNewContact').on("click",function(){
        $('#content').fadeOut()
    })
})
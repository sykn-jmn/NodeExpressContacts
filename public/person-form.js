modules['person-form-js'] = function(html){

    var _form = html.find('.person-form')
        
    var eatblbody = _form.find('.ea-tbl tbody');
    
    var patblbody = _form.find('.pa-tbl tbody');

    function removeTr(btn){
    
        btn.closest('tr').remove();
    }

    _form.find('.ea-btn-add').on("click", function(){
    
        var _html = `<tr>
    
        <th><a href="javascript:" class="btn btn-primary ea-btn-remove"><i class="bi bi-x"></i></a></th>
    
        <th>
    
        <input type="text" class="form-control" name="emailAddresses">
    
        </th>
    
        </tr>`;

        _html = $(_html);
    
        eatblbody.append(_html);
        
        _html.find('.ea-btn-remove').on("click",function(){
        
            removeTr($(this));
        })
        
        return false;
    })
    
    _form.find('.pa-btn-add').on("click", function(){
    
        var idx = _form.find('.pa-tbl tbody tr').length;
    
        var _html =`<tr>
    
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
    
        _html = $(_html);
    
        patblbody.append(_html);
    
        _html.find('.pa-btn-remove').on("click",function(){
    
            removeTr($(this));
        })
    
        return false;
    })

    _form.find('.ea-btn-remove').on("click", function(){
    
        removeTr($(this));
    })

    _form.find('.pa-btn-remove').on("click", function(){
    
        removeTr($(this));
    })

    _form.on("submit", function(e){
    
        e.preventDefault()
    
        var form = $(this)

        var data = form.serializeToJSON({associativeArrays:false});
    
        app.ajax({
    
            url: '/contact',
    
            type: 'POST',
    
            data: data,
    
            success: function(){
                
                location.hash = '';

                form.find('#msg').show().delay(3000).fadeOut()
    
                html.find('.behind').fadeOut()
            }
        })
    
        return false;
    })

    _form.find('#closeNewContact').on("click",function(){
        
        html.find('.behind').fadeOut()

        location.hash = '';        
    })

}
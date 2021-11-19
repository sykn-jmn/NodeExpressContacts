var modules = {}

var currentUpdate = null;

function addJQueryFunctions(){
    $('.peopletbl tbody tr').on('click', function () {

        currentUpdate = $(this);
    
        var tr = $(this);
    
        var id = tr.data('id');
    
        console.log(id);
    
        location.hash = 'contact/'+id;
    })

    $('#addContact').on('click', function () {

        location.hash = 'contact/new'
    })

    $('.deleteContact').on("click", function (e) {
    
        var btn = $(this);
    
        var tr = btn.closest('tr');
    
        var children = tr.children();
    
        var firstname = children.eq(0).html();
    
        var lastname = children.eq(1).html();
    
        var id = tr.data('id');
    
        if (confirm(`Do you wish to continue deleting ${firstname} ${lastname}`)) {
    
            app.ajax({
    
                url: '/delete/' + id,
    
                type: 'DELETE',
    
                success: function () {
    
                    tr.remove();
                }
            })
        }
        return false;
    })

    $('.contactsBody tr').mouseenter(function () {
    
        $(this).children().last().animate({
    
            opacity: '1'
        }, 300);
    }).mouseleave(function () {
      
        $(this).children().last().stop();
      
        $(this).children().last().css("opacity", "0");      
    });
}

$.ajaxSetup({

    beforeSend: function () {
    
        $('#loading').show()
    },
    
    complete: function () {
    
        $('#loading').fadeOut(1000)
    },
    
    error: function () {
    
        $('#loading').hide()
    }
});

$(addJQueryFunctions());

window.onhashchange = function(){

    var hash = location.hash.replace('#','');
    
    if(!hash) {

        app.ajax({
    
            url: location.origin+"/update",
        
            success: function (html) {
        
                $('#contactsContainer').html(html)

                addJQueryFunctions();
            }
        })

        $('#content').fadeOut()

        return;
    }
    
    app.ajax({
    
        url: hash,
    
        success: function (html) {
    
            $('#content').html(html)
    
            $('#content').fadeIn()
        }
    })
}


function deleteContact(id) {
    
    const Http = new XMLHttpRequest();
    
    const url = 'http://localhost:3000/deleteContact/' + id;
    
    Http.open("DELETE", url);
    
    Http.send();

    Http.onreadystatechange = (e) => {
    
        window.location.href = Http.responseText;
    
        console.log(Http.responseText)
    }
}


var app = (function () {

    function bindScripts(html) {

        var scriptAttr = html.parent().find('[js-modules]');

        if (!scriptAttr[0]) return;

        for(var i = 0; i <scriptAttr.length; i++){
            
            item = scriptAttr[i];
            
            item = $(item)

            var scriptName = item.attr('js-modules');

            item.removeAttr('js-modules');

            // if (!scriptName) throw 'scriptname is empty';
            if (scriptName) {

                for (var name of scriptName.split(' ')) {

                    var target = modules[name];

                    if (!target) return

                    target(item);
                }
            }
        }
    }

    return {

        ajax: function (options) {

            if (options.success) {

                var success = options.success

                options.success = function (response, textStatus, xhr) {

                    var ishtml = /<\/?[a-z][\s\S]*>/i.test(response)

                    if (ishtml) {

                        response = $(response)
                    }

                    success(response, textStatus, xhr)

                    if (ishtml) {

                        bindScripts(response)
                    }
                }
            }

            $.ajax(options)
        }
    }
})()
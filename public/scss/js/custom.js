$(document).ready(function() {
    // all custom jQuery will go here
    console.log("Document ready!");

    $(document).on('click','#edit',function(event){
      console.log("Something is being edited");

      $.confirm({
    content: function () {
        var self = this;
        return $.ajax({
            url: '/header/new',
            dataType: 'html',
            method: 'get'
        }).done(function (response) {
        //     self.setContent('Description: ' + response.description);
        //     self.setContentAppend('<br>Version: ' + response.version);
        //     self.setTitle(response.name);
        console.log(response);
        }).fail(function(){
            self.setContent('Something went wrong.');
        });
    }
});

    });
});

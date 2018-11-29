$(document).ready(function() {
  // all custom jQuery will go here
  console.log("Document ready!");

  var max_fields      = 10; //maximum input field allowed
          var fields          = $(".fields"); //Fields
          var add_button      = $(".add_field"); //Add button

          var x = 1; //initlal text box count
          $(add_button).click(function(e){ //on add input button click
              e.preventDefault(); //undo event
              if(x < max_fields){ //max input box allowed
                  x++; //text box increment
                  $(fields).append('<div><input type="text"/><a href="#" class="remove_field">×</a></div>'); //add input box
              }
          });

          $(fields).on("click",".remove_field", function(e){ //user click on remove text
              e.preventDefault();
              $(this).parent('div').remove(); x--;
          });






  // $(document).on('click', '.edit-option', function(event) {
  //   console.log("Something is being edited");
  //   console.log($(this));
  //   var formUrl = $(this).attr('form_url');
  //   console.log(formUrl);
  //
  //   $.confirm({
  //     title: "Update details",
  //     closeIcon: true,
  //     // columnClass: 'medium',
  //     buttons: false,
  //     content: function() {
  //       var self = this;
  //       self.setContent('Checking callback flow');
  //       return $.ajax({
  //         url: formUrl,
  //         dataType: 'html',
  //         method: 'get'
  //       }).done(function(response) {
  //         self.setContent(response);
  //
  //
  //
  //
  //
  //
  //
  //
  //       }).fail(function() {
  //         self.setContentAppend('<div>Fail!</div>');
  //       }).always(function() {
  //         console.log("This will always be triggered");
  //       });
  //     },
  //     contentLoaded: function(data, status, xhr) {
  //       console.log("content loaded!");
  //     },
  //     onContentReady: function() {
  //       console.log("content ready!");
  //     }
  //   });
  //
  //
  //
  //
  //
  //
  //
  // });
  //
  //



});

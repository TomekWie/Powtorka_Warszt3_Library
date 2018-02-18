$(function()
{
  $.ajax
  ({
    url:"http://date.jsontest.com",
    type:"GET",
    dataType: "JSON"
  })
    .done(function(response)//response jak event w callbacku
    {
      //console.log(response);
      var date = response.date;
      //console.log(date);
      var div = $("<div>" + date + "</div>");
      $("body").append(div);
    })
    .fail(function()
    {
      console.log("nie udało się :( !")
    })
    .always(function()
    {
      console.log("jeśli się udało to super, a jak nie to nic nie szkodzi, w koncu się uda")
    });
});

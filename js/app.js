$(function()
{
  $.getJSON
  ({
    url:"http://localhost/Powtorka_Warszt3_Library/api/books.php"
  })
    .done(function(response)//response jak event w callbacku
    {
      console.log("udało się! :)");
      console.log(response);

      var books = response;

      for (var book of books)
      {

        var div = $("<div>" + book.name + "<div></div></div>");
        $("body").append(div);
      }
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

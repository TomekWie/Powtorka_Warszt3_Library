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
    allBooks(books);
  })
  .fail(function(jqXHR, textStatus) {alert("Request failed: " + textStatus);})
  .always(function(){console.log("jeśli się udało to super, a jak nie to nic nie szkodzi, w koncu się uda")});

  function allBooks(books)
  {
    for (var book of books)
    {
      var id = book.id;
      var div = $("<div class='name' data-id=" + id + ">" + book.name + "<div class='info'></div></div>");
      $("body").append(div);
      div.click(showInfo)//gdyby było click(showInfo()) to jako callback zostal by przekazany od razu wynik dzialania funkcji a nie funkcja jako taka.
    }
  }

  function showInfo()
  {
    var id = this.dataset.id; //lub var id = $(this).data("id");

    $.getJSON
    ({
      url:"http://localhost/Powtorka_Warszt3_Library/api/books.php?id="+id
    })
    .done(function(response)//response jak event w callbacku
    {
      console.log("znów się udało! :)");
      var book = response;
      var infoDiv = $("div[data-id="+id+"]").find("div.info");
      infoDiv.text("author: "+ book.author +" description: "+book.description);
    })
    .fail(function(jqXHR, textStatus) {alert("Request failed: " + textStatus);})
    .always(function(){console.log("jeśli się udało to super, a jak nie to nic nie szkodzi, w koncu się uda")});
  }
});

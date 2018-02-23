$(function()
{
  // main variables--------------------------------------------------------

  var booksDiv = $("#booksList");
  var mainForm = $("#mainForm");

  //main ajax--------------------------------------------------------------

  $.ajax
  ({
    url:"http://localhost/Powtorka_Warszt3_Library/api/books.php",
    type: "GET",
    dataType: "JSON"
  })
  .done(function(response)//response jak event w callbacku
  {
    allBooks(response);
  })
  .fail(function(jqXHR, textStatus) {alert("Request failed: " + textStatus);});

  //allBooksFunction - showing all books names--------------------------------

  function allBooks(books)
  {
    for (var book of books)
    {
      var id = book.id;
      var name = book.name;
      var div = $("<div class='name' data-id="+id+">" + name + "<div class='info'></div></div>");
      var button = $("<button data-id="+id+">usuń</button>");

      booksDiv.append(div);
      div.click(showInfo);
      div.after(button);
      button.click(deleteBook);
    }
  }

  //deleteBookFunction--------------------------------------------------------

  function deleteBook()
  {
    var id = this.dataset.id;
    
    $.ajax
    ({
      url: "http://localhost/Powtorka_Warszt3_Library/api/books.php?id="+id,
      type: "DELETE",
      dataType: "JSON"
    })
    .done(function(response)
    {
       booksDiv.empty();
       mainForm[0].reset();
       allBooks(response);
    })
    .fail(function(jqXHR, textStatus) {alert("Request failed: " + textStatus);});
  }

  //showInfoFunction - showing info DIV about single book----------------------

  function showInfo()
  {
    var id = this.dataset.id;

    $.ajax
    ({
      url:"http://localhost/Powtorka_Warszt3_Library/api/books.php?id="+id+"",
      type: "GET",
      dataType: "JSON"
    })
    .done(function(response)
    {
      var author = response.author;
      var description = response.description;
      var infoDiv = $("div[data-id="+id+"]").find("div.info");
      infoDiv.text("autor: "+ author +" opis: "+ description);
    })
    .fail(function(jqXHR, textStatus) {alert("Request failed: " + textStatus);});
  }

  //addingBookByForm-----------------------------------------------------------------

  mainForm.on("submit", function(event)
  {
    event.preventDefault();

    $.ajax
    ({
    url:  mainForm.attr("action"),
    type: "POST",
    data: mainForm.serialize(),
    dataType: "JSON"
    })
    .done(function(response)
    {
      booksDiv.empty();
      mainForm[0].reset();
      allBooks(response);
    });
  });
});

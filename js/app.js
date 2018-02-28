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
      var author = book.author;
      var description = book.description;

      var bookDiv = $("<div class='name' data-id="+id+">" + name + "</div>");
      var button = $("<button data-id="+id+">usuń tę książkę</button><br><br><hr>");

      booksDiv.append(bookDiv);
      bookDiv.after(button);

      bookDiv.click(showInfo);
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
    if ($(this).attr("data-info"))
    {
      $(this).find(".info").toggleClass("hidden");
    }
    else
    {
      var id = this.dataset.id;
      $(this).attr("data-info","true");

      $.ajax
      ({
        url:"http://localhost/Powtorka_Warszt3_Library/api/books.php?id="+id+"",
        type: "GET",
        dataType: "JSON"
      })
      .done(function(response)
      {
        var name = response.name;
        var author = response.author;
        var description = response.description;

        var infoDiv = $("<div class='info'> <strong> Autor: </strong> "+author+" <strong> Opis:</strong> "+description+" </div>");

        var modifyBookForm =
        $("<form data-id='"+id+"' data-name='"+name+"'data-author='"+author+"' data-description='"+description+"'><br> Zmień dane tej książki<br>"+
        "<input name='name' placeholder='nowy tytuł'><br>"+
        "<input name='author' placeholder='nowy autor'><br>"+
        "<input name='description' placeholder='nowy opis książki'><br>"+
        "<input value='zmień' type='submit'>"+
        "</form>");

        $("div[data-id="+id+"]").append(infoDiv);
        infoDiv.append(modifyBookForm);
        modifyBookForm.on("click", modifyBook);

      })
      .fail(function(jqXHR, textStatus) {alert("Request failed: " + textStatus);});
    }
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

  //modifyBookByForm-------------------------------------------------------------

  function modifyBook(event)
  {
    event.stopImmediatePropagation();

    $(this).on("submit", function(event)
    {
      event.preventDefault();
      var id = this.dataset.id;
      var name = this.dataset.name;
      var author = this.dataset.author;
      var description = this.dataset.description;
      var smallForm = $("form[data-id="+id+"]");

      $.ajax
      ({
        url:"http://localhost/Powtorka_Warszt3_Library/api/books.php?id="+id+"&name="+name+"&author="+author+"&description="+description+"",
        type: "PUT",
        data: smallForm.serialize(),
        dataType: "JSON"
      })
      .done(function(response)
      {
        booksDiv.empty();
        mainForm[0].reset();
        allBooks(response);
      })
      .fail(function(jqXHR, textStatus) {alert("Request failed: " + textStatus);});
    });
  }
});

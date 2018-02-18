// Stwórz w PHP tablicę kolorów i zamień ją na
// JSON (wyświetl ją na stronie). Napisz stronę
// HTML, na której za pomocą jQuery wczytasz
// tablicę kolorów ze swojej strony PHP
// i wyświetlisz ją na stronie.


$(function()
{
  $.ajax
  ({
    url:"http://localhost/Powtorka_Warszt3_Library_REST_AJAX/ajax_exercise2.php",
    dataType: "JSON"// bez tego nie pójdzie!
  })
    .done(function(response)//response jak event w callbacku
    {
      console.log("udało się! :)");
      var colorsArr = response;
      console.log(colorsArr);

      var counter = 0;
      for (var color of colorsArr)
      {
        var div = $("<div>" + color + "</div>");
        div.css("background-color",color);
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

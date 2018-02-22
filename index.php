<!doctype html>
<html lang="pl">

<head>
  <meta charset="utf-8">

  <title>Strona główna</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="js/app.js"></script>
</head>

<body>

  <form id="mainForm" action="api/books.php" method="POST">
    <h3>Dodaj książkę do bazy!</h3>
    <input id="inputName" name="name" placeholder="tytuł książki" required>
    <input id="inputAuthor" name="author" placeholder="autor" required>
    <input id="inputDescription" name="description" placeholder="opis książki" required>
    <input value="submit" type="submit">
  </form>

  <div id="booksList">
  </div>

</body>

</html>

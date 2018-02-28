<?php

require __DIR__ . "/src/conn.php";
require __DIR__ . "/src/Book.php";

if($_SERVER["REQUEST_METHOD"]=="POST")
{
  $name = $_POST['name'];
  $author = $_POST['author'];
  $description = $_POST['description'];

  $newBook = new Book;
  $newBook->create($conn, $name, $author, $description);
  
  $booksArr = Book::loadAllFromDB($conn);
  $serializedBooksArr =  json_encode($booksArr);
  echo $serializedBooksArr;//ajax wyłapuje tylko to co się wyświetla na stronie
}

if($_SERVER["REQUEST_METHOD"]=="GET")
{
  if(isset($_GET['id']))
  {
     $id = $_GET['id'];
     $book = Book::loadFromDB($conn, $id);
     $serializedBook = json_encode($book);
     echo $serializedBook;
  }
  else
  {
    $booksArr = Book::loadAllFromDB($conn);
    $serializedBooksArr =  json_encode($booksArr);
    echo $serializedBooksArr;
  }
}

if($_SERVER['REQUEST_METHOD'] == "DELETE")
{
  $id = $_GET['id'];
  book::staticDeleteFromDB($conn, $id);
  $booksArr = Book::loadAllFromDB($conn);
  $serializedBooksArr =  json_encode($booksArr);
  echo $serializedBooksArr;
}

if($_SERVER['REQUEST_METHOD'] == "PUT")
{
  $id = $_GET['id'];

  parse_str(file_get_contents("php://input"), $put_vars);

  $put_vars['name']==""? $name = $_GET['name'] : $name = $put_vars['name'];
  $put_vars['author']==""? $author = $_GET['author'] : $author = $put_vars['author'];
  $put_vars['description']==""? $description = $_GET['description'] : $description = $put_vars['description'];

  book::staticUpdate($conn, $id, $name, $author, $description);

  $booksArr = Book::loadAllFromDB($conn);
  $serializedBooksArr =  json_encode($booksArr);
  echo $serializedBooksArr;
}
?>

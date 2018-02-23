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
?>

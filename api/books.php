<?php

require __DIR__ . "/src/conn.php";
require __DIR__ . "/src/Book.php";

if($_SERVER["REQUEST_METHOD"]=="POST")
{
     $name = $_POST['postname'];
     $author = $_POST['postauthor'];
     $description = $_POST['postdescription'];
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
     //var_dump($serializedBook);//gdyby ten var_dump nie był zakomentowany to ajax rzucał by błedem parseerror
     echo $serializedBook;//ajax wyłapuje tylko to co się wyświetla na stronie
     //echo $book->getName();
  }
  else
  {
    $booksArr = Book::loadAllFromDB($conn);
    $serializedBooksArr =  json_encode($booksArr);
    echo $serializedBooksArr;//ajax wyłapuje tylko to co się wyświetla na stronie
  }
}
?>

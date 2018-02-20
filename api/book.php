<?php

require __DIR__ . "/src/conn.php";
require __DIR__ . "/src/Book.php";

if($_SERVER["REQUEST_METHOD"]=="GET")
{
  $booksArr = Book::loadAllFromDB($conn);

  $serializedBooksArr =  json_encode($booksArr);
  echo $serializedBooksArr;

  //Stosuję powyższe rozwiązanie zamiast poniższego które serializowalo by poszczególne obiekty
  // foreach ($booksArr as $book)
  // {
  //   $serializedBook = json_encode($book);
  //   echo $serializedBook . "<br>";
  // }
}
?>

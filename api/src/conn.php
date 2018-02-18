<?php

$server = "localhost";
$user = "root";
$pass = "coderslab";
$dataBase = "Powtorka_Warszt3_Library";

$conn = new mysqli($server, $user, $pass, $dataBase);

if($conn->connect_error)
{
  die("Błąd ". $conn->connect_error);
}
echo "Połacznie udane";

?>

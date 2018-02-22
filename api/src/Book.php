<?php

require __DIR__ . "/conn.php";

class Book implements JsonSerializable
{
  private $id;
  private $name;
  private $author;
  private $description;

  public function __construct()
  {
    $this->id = -1;
    $this->name = '';
    $this->author = '';
    $this->description = '';
  }

  public function jsonSerialize()
  {
    return
    [
    'id' => $this->id,
    'name' => $this->name,
    'author' => $this->author,
    'description' => $this->description
    ];
  }

  public function getId()
  {return $this->id;}

  public function getName()
  {return $this->name;}

  public function getAuthor()
  {return $this->author;}

  public function getDescription()
  {return $this->description;}

  public function setName($name)
  {$this->name = $name;}

  public function setAuthor($author)
  {$this->author = $author;}

  public function setDescription($description)
  {$this->description = $description;}


  static public function loadFromDB (mysqli $conn, $id)
  {
    $sql = "SELECT * FROM Book WHERE id = $id";
    $result = $conn->query($sql);
    if ($result==true && $result->num_rows == 1)
    {
      $row = $result->fetch_assoc();
      $book = new Book();
      $book->id = $row['id'];
      $book->setName($row['name']);
      $book->setAuthor($row['author']);
      $book->setDescription($row['description']);
      return $book;
    }
    return null;
  }

  static public function loadAllFromDB (mysqli $conn)
  {
    $sql = "SELECT * FROM Book";
    $result = $conn->query($sql);
    if ($result==true && $result->num_rows >= 1)
    {
      $booksArr = [];
      foreach ($result as $row) {
        $book = new Book();
        $book->id = $row['id'];
        $book->setName($row['name']);
        $book->setAuthor($row['author']);
        $book->setDescription($row['description']);
        $booksArr[] = $book;
      }
      return $booksArr;
    }
    return null;
  }


  public function create(mysqli $conn, $name, $author, $description)
  {
    if($this->id == -1)
    {
      $sql = "INSERT INTO Book (name, author, description) VALUES ('$name', '$author', '$description')";

      $result = $conn->query($sql);
      if ($result==true)
      {
        $this->id = $conn->insert_id;
        return true;
      }
    }
    echo "Błąd " . $conn->error;
    return false;
  }

  public function update(mysqli $conn)
  {
    if($this->id != -1)
    {
      $sql = "UPDATE `Book`
              SET `name`='$this->name',
                  `author`='$this->author',
                  `description`='$this->description'
              WHERE `id`='$this->id'";

      $result=$conn->query($sql);
      if($result==true)
      {
        return true;
      }
      echo "Błąd podczas update'u książki o id $id: " . $conn->error;
      return false;
    }
    echo "Tej książki jeszcze nie ma w bazie, zatosuj funkcję create";
    return false;
  }

  public function deleteFromDB(mysqli $conn)
  {
    if ($this->id != -1)
    {
      $sql = "DELETE FROM `Book` WHERE `id`='$this->id'";
      $result=$conn->query($sql);
      if($result==true)
      {
        $this->id = -1;
        return true;
      }
      return false;
    }
    return true;
  }

  static public function staticDeleteFromDB(mysqli $conn, $id)
  {
    if ($id != -1)
    {
      $sql = "DELETE FROM `Book` WHERE `id`= $id";
      $result=$conn->query($sql);
      if($result==true)
      {
        return true;
      }
      return false;
    }
    return true;
  }
}

?>

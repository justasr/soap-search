<?php


class AuthorsSearch implements  ISearchProduct {

    private $items;
    private $params;
    public function __construct($params) {
        $this->params = array_filter($params);
    }

    public function search() {
        $connDB = new PDO('mysql:host='.DB_HOST.';dbname='.DB_DBNAME, DB_USER, DB_PASSWORD);

        $sql = "SELECT authors.name,authors.birthdate FROM authors JOIN books ON books.author_id = authors.id ";

        if( count($this->params) > 0 ) {
             $columnNames = array_keys($this->params);
             $firstColumn = array_pop($columnNames);

            $sql .= " WHERE ";
            $sql .= sprintf(" %s LIKE :%s ",$firstColumn,$firstColumn);

            foreach( $columnNames as $columnName )
                $sql .= sprintf(" AND %s LIKE :%s ",$columnName,$columnName);
        }

        $sql.= " GROUP BY authors.id";

        $statment = $connDB->prepare($sql);

        (isset($this->params['name'])) ? $statment->bindValue(':name','%'.$this->params['name'].'%' ) : '';
        (isset($this->params['birthdate'])) ? $statment->bindValue(':birthdate','%'.$this->params['birthdate'].'%') : '';
        (isset($this->params['title'])) ? $statment->bindValue(':title','%'.$this->params['title'].'%') : '';
        (isset($this->params['isbn'])) ? $statment->bindValue(':isbn','%'.$this->params['isbn'].'%') : '';
        (isset($this->params['theme'])) ? $statment->bindValue(':theme','%'.$this->params['theme'].'%') : '';

        $statment->execute();
        $this->items = $statment->fetchAll(PDO::FETCH_ASSOC);

    }

    public function __toString() {
        $output = "";

        if( count($this->items) > 0 )
        {
            $output.= "<table class='table'>";
                $output.= "<thead><tr>";
                    $output.= "<th>Author</th>";
                    $output.= "<th>Birthdate</th>";
                $output.= "</tr></thead>";
                $output.= "<tbody>";
                    foreach($this->items as $item) {
                        $output.= "<tr>";
                            $output.= sprintf("<td>%s</td>",$item['name']);
                            $output.= sprintf("<td>%s</td>",$item['birthdate']);
                        $output.= "</tr>";
                    }
                $output.= "</tbody>";
            $output.= " </table> ";
        } else {
            $output .= sprintf( "No results found.." );
        }

        return $output;
    }
}
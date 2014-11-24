<?php

require_once( __DIR__."/../libs/includes.php" );


class Client {

    public function searchForAuthors( $name = '',$birthdate = '',$bookTitle = '',$isbn = '',$theme = '' ) {

        $params = array(
            'name' => $name,
            'birthdate' => $birthdate,
            'title' => $bookTitle,
            'isbn' => $isbn,
            'theme' => $theme,
        );

        $authorSearch = SearchFactory::makeSearch(PRODUCT_AUTHOR_SEARCH, $params);
        $authorSearch->search();

        return $authorSearch->__toString();
    }

    public function searchForBooks( $name = '',$birthdate = '',$bookTitle = '',$isbn = '',$theme = '' ) {
        $params = array(
            'name' => $name,
            'birthdate' => $birthdate,
            'title' => $bookTitle,
            'isbn' => $isbn,
            'theme' => $theme,
        );

        $booksSearch = SearchFactory::makeSearch(PRODUCT_BOOKS_EARCH, $params);
        $booksSearch->search();

        return $booksSearch->__toString();
    }

    public function getAll( ) {
        $params = array(
            'name' => '',
            'birthdate' => '',
            'title' => '',
            'isbn' => '',
            'theme' => '',
        );

        $booksSearch = SearchFactory::makeSearch(PRODUCT_BOOKS_EARCH, $params);
        $booksSearch->search();

        $authorSearch = SearchFactory::makeSearch(PRODUCT_AUTHOR_SEARCH, $params);
        $authorSearch->search();

        $output = $authorSearch->__toString(). "<br/>". $booksSearch->__toString();

        return $output;
    }

}

$server = new soap_server();
//$server->soap_defencoding = 'UTF-8';
//$server->decode_utf8 = false;

$server->soap_defencoding = 'UTF-8';
$server->decode_utf8 = false;
$server->encode_utf8 = true;

$server->configureWSDL("search", "urn:search");

$server->register(
    "Client.searchForAuthors",
    array(
        "name" => "xsd:string",
        "birthdate" => "xsd:string",
        "bookTitle" => "xsd:string",
        "isbn" => "xsd:string",
        "theme" => "xsd:string",
    ),
    array("authors" => "xsd:string"),
    "urn:search",
    "urn:search#Client.searchForAuthors",
    "rpc",
    "encoded",
    "Search For Authors"
);

$server->register(
    "Client.searchForBooks",
    array(
        "name" => "xsd:string",
        "birthdate" => "xsd:string",
        "bookTitle" => "xsd:string",
        "isbn" => "xsd:string",
        "theme" => "xsd:string",
    ),
    array("books" => "xsd:string"),
    "urn:search",
    "urn:search#Client.searchForBooks",
    "rpc",
    "encoded",
    "Search For Books"
);

$server->register(
    "Client.getAll",
    array(),
    array("output" => "xsd:string"),
    "urn:search",
    "urn:search#Client.getAll",
    "rpc",
    "encoded",
    "Getting All data"
);


if ( !isset( $HTTP_RAW_POST_DATA ) ) $HTTP_RAW_POST_DATA =file_get_contents( 'php://input' );
$server->service($HTTP_RAW_POST_DATA);
exit();
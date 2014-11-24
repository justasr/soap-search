<?php

class SearchFactory implements ISearchFactory {
    public static function makeSearch($choice, $params) {
        $searchProduct = null;

        switch($choice) {
            case PRODUCT_AUTHOR_SEARCH:
                $searchProduct = new AuthorsSearch($params);
                break;
            case PRODUCT_BOOKS_EARCH:
                $searchProduct = new BooksSearch($params);
                break;
        }

        return $searchProduct;
    }
}

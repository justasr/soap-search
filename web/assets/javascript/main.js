//var soapEnvelope = '<?xml version="1.0" encoding="ISO-8859-1"?><SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="urn:productlist"><SOAP-ENV:Body><tns:getProd xmlns:tns="urn:productlist"><category xsi:type="xsd:string">books</category></tns:getProd></SOAP-ENV:Body></SOAP-ENV:Envelope>';
var authorsSearchEnvelope = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="urn:search"><SOAP-ENV:Body><tns:Client.searchForAuthors xmlns:tns="urn:search"><name xsi:type="xsd:string">{name}</name><birthdate xsi:type="xsd:string">{birthdate}</birthdate><bookTitle xsi:type="xsd:string">{bookTitle}</bookTitle><isbn xsi:type="xsd:string">{isbn}</isbn><theme xsi:type="xsd:string">{theme}</theme></tns:Client.searchForAuthors></SOAP-ENV:Body></SOAP-ENV:Envelope>';
var booksSearchEnvelope = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="urn:search"><SOAP-ENV:Body><tns:Client.searchForBooks xmlns:tns="urn:search"><name xsi:type="xsd:string">{name}</name><birthdate xsi:type="xsd:string">{birthdate}</birthdate><bookTitle xsi:type="xsd:string">{bookTitle}</bookTitle><isbn xsi:type="xsd:string">{isbn}</isbn><theme xsi:type="xsd:string">{theme}</theme></tns:Client.searchForBooks></SOAP-ENV:Body></SOAP-ENV:Envelope>';
var getAllEnvelope = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="urn:search"><SOAP-ENV:Body><tns:Client.getAll xmlns:tns="urn:search"></tns:Client.getAll></SOAP-ENV:Body></SOAP-ENV:Envelope>';
//var getAllEnvelopeUTF8 = '<?xml version="1.0" encoding="UTF-8"?><SOAP-ENV:Envelope SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:tns="urn:search"><SOAP-ENV:Body><tns:Client.getAll xmlns:tns="urn:search"></tns:Client.getAll></SOAP-ENV:Body></SOAP-ENV:Envelope>';

jQuery(function() {

    loadDatabaseData();

    jQuery('#doSearch').click( function(e) {
        e.preventDefault();

        jQuery("#searchCon").css('display','block');

        searchType = jQuery('input[name=searchType]:checked', '#search').val();

        if( searchType == 1 /*authorRadio*/ )
            makeAuthorsSearch();
        else if(  searchType == 2 /*booksRadio*/ )
            makeBooksSearch();

    });
});

function makeAuthorsSearch(){
    server_url = jQuery("#server_url").val();
    envelopeData = formSOAPEnvelope(authorsSearchEnvelope);
    envelopeData = envelopeData.trim();

    // Post SOAP request.
    $.ajax({
        type: "post",
        url: server_url,
        contentType: 'text/xml;  charset=UTF-8',
        data: envelopeData,
        dataType: "xml",
        processData: false,
        beforeSend: function( xhr ){
            xhr.setRequestHeader(
                "SOAPAction",
                "urn:search#Client.searchForAuthors"
            );
        },
        success: function( response ){
            xml = $( response );
            responseText = xml.find('authors').text();
            jQuery("#searchResults").html(responseText);


        },
        error: function(){
            console.log( "ERROR", arguments );
        }
    });
}

function makeBooksSearch(){
    server_url = jQuery("#server_url").val();
    envelopeData = formSOAPEnvelope(booksSearchEnvelope);
    envelopeData = envelopeData.trim();

    // Post SOAP request.
    $.ajax({
        type: "post",
        url: server_url,
        contentType: 'text/xml;  charset=UTF-8',
        data: envelopeData,
        dataType: "xml",
        processData: false,
        beforeSend: function( xhr ){
            xhr.setRequestHeader(
                "SOAPAction",
                "urn:search#Client.searchForBooks"
            );
        },
        success: function( response ){
            console.log( response );
            xml = $( response );
            responseText = xml.find('books').text();
            jQuery("#searchResults").html(responseText);


        },
        error: function(){
            console.log( "ERROR", arguments );
        }
    });
}

function formSOAPEnvelope(envelope) {
    currentEnvelope = envelope;
    inputAuthor = jQuery("#search input[name=author]").val().trim();
    inputBirthdate = jQuery("#search input[name=birthdate]").val().trim();
    inputBookTitle = jQuery("#search input[name=bookTitle]").val().trim();
    inputIsbn = jQuery("#search input[name=isbn]").val().trim();
    inputTheme = jQuery("#search input[name=theme]").val().trim();

    currentEnvelope = currentEnvelope.replace('\{name\}',inputAuthor);
    currentEnvelope = currentEnvelope.replace('\{birthdate\}',inputBirthdate);
    currentEnvelope = currentEnvelope.replace('\{bookTitle\}',inputBookTitle);
    currentEnvelope = currentEnvelope.replace('\{isbn\}',inputIsbn);
    currentEnvelope = currentEnvelope.replace('\{theme\}',inputTheme);

    return currentEnvelope;
}

function loadDatabaseData() {
    server_url = jQuery("#server_url").val();
    envelopeData = getAllEnvelope;

    // Post SOAP request.
    $.ajax({
        type: "post",
        url: server_url,
        data: envelopeData,
        dataType: "xml",
        contentType: 'text/xml;  charset=UTF-8',
        processData: false,
       // headers: { 'Content-Type': 'text/xml;  charset=UTF-8' },
        beforeSend: function( xhr ){
            xhr.setRequestHeader('SOAPAction', 'urn:search#Client.getAll');
            //xhr.setRequestHeader('Content-Type', 'text/xml; charset=ISO-8859-1');
            //setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        },
        success: function( response ){
            console.log( response );
            xml = $( response );
            responseText = xml.find('output').text();
            jQuery("#database_data").html(responseText);


        },
        error: function(){
            console.log( "ERROR", arguments );
        }
    });
}
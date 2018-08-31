/*global fetch checkStatus */
/*
This JavaScript file fetches the quote of the day from Quotes REST API.
 */
"use strict";
// (function () {
    var quote;
    var author;
    var blockquote;

    window.onload = function() {
        var img = document.getElementsByClassName("bg-img")[0];
        console.log(img.offsetHeight);
        var header = document.getElementsByTagName("header")[0];
        console.log(header.offsetHeight);

        blockquote = document.getElementById("quote");
        getQuote();
    };

    getQuote();

    function getQuote() {
        var url = "http://quotes.rest/qod.json";

        fetch(url)
            .then(checkStatus)
            .then(JSON.parse)
            .then(fillInQuote)
            .catch(function(error) {
                quote = "The best thing about a boolean is even if you are wrong, you are only off by a bit.";
                author = "Anonymous";
                blockquote.innerText = "\"" + quote + "\"";
                // alert(error);
            });
    }

    function fillInQuote(response) {
        quote = response.contents.quotes[0].quote;
        blockquote.innerText = "\"" + quote + "\"";
        author = response.contents.quotes[0].author;
    }

    function getQOD() {
        blockquote.style.color = "black";
        blockquote.innerText = "\"" + quote + "\"";
    }

    function getAuthor() {
        blockquote.style.color = "gray";
        blockquote.innerText = "- " + author;
    }

    // Checks status of JSON 'response'
    // Returns 'response' text if valid,
    // otherwise returns the error status
    function checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response.text();
        } else {
            return Promise.reject(new Error(response.status + ": " + response.statusText));
        }
    }
// })();



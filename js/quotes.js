/*global fetch checkStatus */
/*
This JavaScript file fetches the quote of the day from Quotes REST API.
 */
"use strict";
var quote;
var author;
var blockquote;

window.onload = function () {
    blockquote = document.getElementById("quote");
    getQuote();
    resizeSection();
    window.onresize = resizeSection;
};

function getQuote() {
    var url = "https://quotes.rest/qod.json?category=inspire";

    fetch(url)
        .then(checkStatus)
        .then(JSON.parse)
        .then(fillInQuote)
        .catch(function (error) {
            quote = "The best thing about a boolean is even if you are wrong, you are only off by a bit.";
            author = "Anonymous";
            blockquote.innerText = "\"" + quote + "\"";
        });
}

function fillInQuote(response) {
    quote = response.contents.quotes[0].quote;
    blockquote.innerText = "\"" + quote + "\"";
    author = response.contents.quotes[0].author;
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

function getQOD() {
    blockquote.style.color = "black";
    blockquote.innerText = "\"" + quote + "\"";
}

function getAuthor() {
    blockquote.style.color = "gray";
    blockquote.style.height = blockquote.offsetHeight + "px";
    blockquote.innerText = "- " + author;
}

function resizeSection() {
    blockquote.style.height = null;
    var educationWidth = document.getElementById("edu-text").offsetWidth;
    var eduSection = document.getElementById("education");
    if (educationWidth == 300) {
        eduSection.style.paddingBottom = "350px";
    } else {
        eduSection.style.paddingBottom = "125px";
    }
}

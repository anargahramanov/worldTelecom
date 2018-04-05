var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");

function scrapePage () {
    //make an HTTP request for the page to be scraped
    request('https://www.w-t.az', function (error, response, html){        

        //write the entire scraped page to the local file system
        fs.writeFile('w-t-index-page.txt', html, function(err){
            console.log('entire-page.html successfully written to HTML folder');
        })
    }) ;
}

scrapePage();
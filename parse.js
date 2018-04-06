var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");

function scrapePage() {
    //make an HTTP request for the page to be scraped
    request('https://www.w-t.az', function (error, response, html) {

        var url = 'https://www.w-t.az';
        var $ = cheerio.load(html);
        var anar ="";
         $(".nav a").each(function (element) {
            var a = $(this).text();
            var b = $(this).attr("href");
            a += " - " + url + b;
            anar += a;
        });

        console.log(anar);
        
        //write the entire scraped page to the local file system

        fs.writeFile('kateqoriyalar.txt', anar, function (err) {
            console.log('entire-page.html successfully written to HTML folder');
        });
    });
}

scrapePage();
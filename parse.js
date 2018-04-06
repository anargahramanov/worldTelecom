var request = require('request');
var cheerio = require('cheerio');
var fs = require("fs");

function scrapePage() {
    //make an HTTP request for the page to be scraped
    request('https://www.w-t.az', function (error, response, html) {

        var url = 'https://www.w-t.az';
        var $ = cheerio.load(html);
        var kategor = [];
        var kategUrls = [];
        $(".nav a").each(function (element) {
            var kategText = $(this).text();
            var kategUrl = $(this).attr("href");
            kategUrls.push(url + kategUrl);
            kategText += " - " + url + kategUrl;
            kategor += kategText;
        });

        kategUrls.forEach(function (a) {
            var fileName = a.slice(22);

            //make an HTTP request for the page to be scraped
            request(a, function (error, response, html) {
                var $ = cheerio.load(html);
                var url = 'https://www.w-t.az';
                var items = [];
                $(".item_a").each(function () {
                    var mehsulText = $(this).text();
                    var mehsulUrl = $(this).attr("href");
                    var mehsulTextAndUrl = mehsulText + " - " + url + mehsulUrl; 
                    items.push(mehsulTextAndUrl);
                });

                //write the entire scraped page to the local file system
                fs.writeFile(fileName, items, function (err) {
                    console.log('Writing new file successfully written to HTML folder');
                });

            });


        });
    });
}

scrapePage();
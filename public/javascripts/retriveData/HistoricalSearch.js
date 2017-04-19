var cheerio = require('cheerio')
var fs = require('fs')
var request = require('request');
var FuzzySet = require('FuzzySet.js');

var Nightmare = require('nightmare');

locations = [];
dataArray = []
var url = "http://www1.skysports.com/racing/"
// var page = "?performancePage="
var trainer = "R. Walsh"
var result = ""
var type = 'Trainer';
data = {};


// var mongoose = require('mongoose');
// var url = 'mongodb://admin:admin@dbh54.mlab.com:27547/horseracing'

// mongoose.connect('mongodb://admin:admin@dbh54.mlab.com:27547/horseracing');

// var db = mongoose.connection;

// db.on('error', function (err) {
//     console.log('connection error', err);
// });

// db.once('open', function () {
//     console.log('connected to database');
// });


// if(type ==='Horse'){
//  tab = '.w-three-tabs :nth-child(1)';
// }
// if(type === 'Trainer'){
//   tab = ;
// }
// if(type === 'Jockey'){
// tab = '.w-three-tabs :nth-child(2)';
// }
Search();



function Search(){

    var nightmare = new Nightmare()
        .goto(url+'search')
        .wait(1000)
        .type('form[action*="/racing/search"] [name=search]', 'Walsh')
        .evaluate(function () {
            var click = document.querySelector('.v5-form-opts #Jockeys').click();
        })
        .wait(3000)
        .click('.v5-btn-t1')
        // .evaluate(function () {
        //     var ClickButton = document.querySelector('button').click();
        //  })
        .wait(3000)

        .evaluate(function () {
            var searchUrl = document.querySelector('.v5-tbl-t1 tbody').innerHTML;
            return searchUrl;
        })
        .end()

        .then(function (result) {
            // console.log(result);       ///USE FUZZYSET OF COMPARE THE REULTS AND GET THE RIGHT LINK
            var compare = FuzzySet(['R Walsh']);

            var result = result.replace(' ', '');
            result = result.replace(/[^\x20-\x7E]/gmi, "");

            var resultArray = result.split("<td>");

// console.log(resultArray)
            var resultNames = []
            for (var i = 0; i < resultArray.length; i++) {
                resultName = resultArray[i].substring(resultArray[i].indexOf('">') +2, resultArray[i].indexOf('</a>'));
                resultNames.push(resultName)
                // console.log(resultNames
            }

// console.log(compare.get(result));
// console.log(compare.get('R. Walsh'));
            var fuzzyarraykey = [];
            var fuzzyarrayValue = [];

            for(var i =1; i<=resultNames.length; i++){
                if(resultNames[i]!=null){

//resultArray[i] is the links
                    var fuzzydata = compare.get(resultNames[i])[0][0];
// fuzzyarray = {'key': parseFloat(fuzzydata),}];


// fuzzyarray.push(parseFloat(fuzzydata), resultArray[i]);
                    fuzzyarraykey.push(parseFloat(fuzzydata.toFixed(5)));
                    fuzzyarrayValue.push(resultArray[i]);
                }
            }
// console.log(fuzzyarrayValue)
// console.log(fuzzyarraykey)


             // var i = fuzzyarraykey.indexOf(Math.max(...fuzzyarraykey));

            result = fuzzyarrayValue[i];
            console.log(result);


// result ='<a target="_blank" href="/horse-racing/jockey-form/mr-r-walsh/000000013510">Mr R. Walsh</a>'

            result = result.substring(result.indexOf('/search/') +18, result.indexOf('">'));


            var html = url+result;
            console.log(html)
            var options = {
                rejectUnauthorized: false,
                url: html,
            }
            request(options, getInfo)
        });

}



function getInfo(error, response, html) {
    if (error) console.log(error)
    // console.log(html)
    // saveInfo(html)

    // console.log("Status Code:", response)
    // saveInfo(response);
    // console.log(response)
    // instead of console.log'ing the html, pass the html into the
    // getInfo function:
    scrapeData(html)
}

function scrapeData(html) {
    var $ = cheerio.load(html)
    // console.log( $.text())
    // get all rows
    var section = $('.tab-section table.v5-tbl-t1 tr')

    // cleanup: remove all <script> tags from the table (so they dont show up in our data)
    section.find('script').remove()

    // the first tr is the header row
    var headers = section[0]

    // get only the <th> elements from the header row
    var headers = $(headers).find('th')

// console.log(headers.text())
    // remove the header row from our contracts array
    section = section.slice(1)

    // to store our data objects that we are about to create
    var dataArray = []

    // loop over each row, tdEl stands for <td> element
    section.each(function(num, tdEl) {
        var cells = $(tdEl).find('td')

        // loop over each header, thEl stands for <th> element

        headers= ['Date', 'Position', 'RunnerName', 'StartingPrice', 'Course', 'Distance', 'Going', 'Class', 'Trainer']

        // headers.each(function(num, thEl) {
// console.log(headers.text())
        for(var num=0; num<9; num++){
            var headerText = headers[num];

            headerText = headerText.replace(/[^\x20-\x7E]/gmi, "");
            headerText = headerText.replace(" ", "");

            if(headerText.includes("Period")){
                headerText="Date";
            }
            if(headerText.includes("Runs")){
                headerText="Position";
            }
            if(headerText.includes("1st")){
                headerText="RunnerName";
            }
            if(headerText.includes("2nd")){
                headerText="StartingPrice";
            }

            if(headerText.includes("3rd")){
                headerText="Course";
            }

            if(headerText.includes("Win%")){
                headerText="Distance";
            }

            if(headerText.includes("To1 level stake")){
                headerText="Going";
            }

            if(headerText == 'BSP' || headerText == 'TFR' || headerText == 'IPHi/Lo' || headerText == 'ISP'){

            }
            else{
                var cellText = $(cells[num]).text()
                cellText = cellText.replace(/[^\x20-\x7E]/gmi, "");
                data[headerText] = cellText
            }

        }

        // })


        console.log(data)


        // add the current object to the data array
        dataArray.push(data)
        return data;
    })

    // now that we're done, pass the data array to saveInfo

}

// function AddTodb(dataArray){
saveInfo(dataArray);


//   mongo.connect(url, function(err, db){

// assert.equal(null, err);

// db.collection("Trainers", function(err,col) {
// if(err) console.log(err);
//   col.insertMany(dataArray);

//      assert.equal(null,err);
//             console.log('Trainers Inserted in DB')
//            db.close;

//     });

//       });
// }


function saveInfo(dataArray) {
    // console.log(dataArray)
    dataArray = JSON.stringify(dataArray);
    fs.writeFile('trainerdata.json', dataArray);
}
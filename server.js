var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var config = {
    user: 'ajithkumarm',
    database: 'ajithkumarm',
    port: '5432',
    host: 'db.imad.hasura-app.io',
    password:process.envi.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
var articleone= { 
    title:'Article one i am Ajith Kumar M',
    heading: 'Article one',
    date: 'march 27 1997',
    content:`<p>
                this is my first webpage excited!!!! this is my first webpage excited!!!! this is my first webpage excited!!!!
            </p>
            <p>
                this is my first webpage excited!!!!this is my first webpage excited!!!!this is my first webpage excited!!!!
            </p>`
    };
function createTemplate(data)  {  
    var title= data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
var htmlTemplate=`<html>
    <head>
        <title>
            Article One I am Ajith Kumar M
        </title>
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
</html>

`;
return htmlTemplate;
}
var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    pool.query("SELECT * FROM names", function(err,result) {
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result));
       } 
        
        
    });
    
    

});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/ui/style.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/article-one', function(req, res) {
  res.send(createTemplate(articleone));
});
app.get('/article-two', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});
app.get('/article-three', function(req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

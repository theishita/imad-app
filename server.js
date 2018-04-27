//importing software packages/libraries
var express = require('express'); //creates web server
var morgan = require('morgan'); //to help output logs of server
var path = require('path');
var Pool = require('pg').Pool;

var config = {
    user: 'ishitajaju2016',
    database: 'ishitajaju2016',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-ishitajaju2016-12905'
}

var app = express();
app.use(morgan('combined'));

var ArticleOne = {
  title: 'Article One',
  heading: 'Article One',
  date: 'Mar 18, 2018',
  content: `
            <p>
                This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
            </p>
            <p>
                This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
            </p>
            <p>
                This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article. This is the content for my first article.
            </p>`
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = dara.content
    var htmlTemplate = `
    <html>
    
    <head>
        <title> ${title} </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel=stylesheet />
    </head>
    
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr/>
        <h3> ${heading} </h3>
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function (req,res) {
    //make a select request
    //return a response with the results
    pool.query('SELECT * FROM test',function (err, result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    });
});


app.get('/article-one',function(req, res){
  res.send(createTemplate(articleOne));
});

app.get('/article-two',function(req, res){
    res.send('Article 2 requested and will be served here');
});

app.get('/article-three',function(req, res){
    res.send('Article 3 requested and will be served here');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.use(express.static('ui'));

var articles = {
    'article-one': {
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
    },
    'article-two': {
      title: 'Article Two',
      heading: 'Article Two',
      date: 'Mar 19, 2018',
      content: `
                <p>
                    This is the content for my second article.
                </p>`
    }
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content
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

var counter=0;
app.get('/counter', function(req,res){
   counter = counter+1;
   res.send(counter.toString());
});

app.get('/:articleName',function(req, res){
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

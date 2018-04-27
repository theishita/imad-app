app.get('/', function(req, res, next) {  
    console.log("before redirection");
    res.sendfile('index.html'); 
});

alert('Hi!');
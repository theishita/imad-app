//counter
var button = document.getElementById('counter');
button.onclick = function(){
    
    //create a request object
    var request = new XMLHttpRequest();
    
    //capture response and store in a var
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200){
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    
    //make the request
    request.open('GET','http://ishitajaju2016.imad.hasura-app.io//counter',true);
    request.send(null);
}
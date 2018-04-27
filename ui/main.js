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
    request.open('GET', 'http://ishitajaju2016.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit');
submit.onclick = function() {
    //make a request to the server and send the name
    
    //capture a list of names and render it as a list
    var names = ['name1', 'name2' , 'name3'];
    var list = '';
    for(var i=0;i<names.length;i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML=list;
};
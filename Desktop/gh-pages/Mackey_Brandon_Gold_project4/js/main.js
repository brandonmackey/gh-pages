$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){
    delete $.validator.methods.date;
    var myForm = $('#additemform'),
	errorsLink = $('#errorsLink')
    ; 
    myForm.validate({
	invalidHandler: function(form, validator) {
	    errorsLink.click();
	    var html = "";
	    for(var key in validator.submitted){
		var label = $('label[for^="'+ key +'"]').not('[generated]');
		var legend = label.closest('fieldset').find('.ui-controlgroup-label');
		var fieldName = legend.length ? legend.text() : label.text();
		html+= '<li>'+ fieldName +'</li>';
	    };
	    $("#errors ul").html(html);
	},
	submitHandler: function() { 
		var data = myForm.serializeArray();
		storeData(data);
	}  
    });
	
	//any other code needed for addItem page goes here
	$('#clear').bind("click", clearLocal);
});


$('#displayPage').on('pageinit', function(){
	getData();
});



//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autoFillData = function (){
	// The actaul JSON Object data required for this to work is coming from our JSON.js file.
	// Store the JSON Object into Local Storage
	for(var n in json){
	    var id = Math.floor(Math.random()*10000001);
	    localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var getData = function(){
   if(localStorage.length === 0){
            alert("There is no data in Local Storage so default data was added.");
	    autoFillData();
	    // -- Comment Out Reload Page when using Test JSON Data Uncommit when not testing!! --
            //window.location.reload();
        //}
        //if ($("#items")){
	   // $("#items").innerHTML="";
	} else {
	var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "listItem");
	//makeDiv.setAttribute("data-role", "listview");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        //document.body.appendChild(makeDiv);
	$('#items').append(makeDiv);
        //$('#items').style.display = "block";
        for (var i=0, len=localStorage.length; i<len; i++){
            var makeLi = document.createElement('Li');
	    var linksLi =document.createElement('li');
            makeList.appendChild(makeLi);
            var key =localStorage.key(i);
            var value = localStorage.getItem(key);
            // convert the string from local storage value back to an object by JSON.parse  
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList);
            //getImage(obj.group[1], makeSubList);
	    for (var n in obj){
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n] [0]+""+obj [n][1];
                makeSubLi.innerHTML = optSubText;
		makeSubList.appendChild(linksLi);
            }
	    //makeItemLinks(localStorage.key(i), linksLi); // create edit and delete buttons/link for each item in local storage.
	}
	}
    };

var storeData = function(data){
    if(!data.key){
	    // key number for your object (random #) 
	    var id              = Math.floor(Math.random()*10000001);
	}else{
	    // Set the id to the existing key we're editing so that will save over the data.
	    // The key is the sam ekey that's been passed alond from the editSubmit event handler
	    // to the validate function, and then passed here, into the storeData function.
	    id = key;
	}
	//getSelectedRadio();
        //getCheckBoxValue();
        var item            ={};
            item.group      =["Type: ", $('#groups').val()];
            //item.importance =["Priority:", priorityValue];
            item.date       =["Date: ", $('#date').val()];
            item.quantity   =["Quantity: ", $('#range').val()];
            item.what       =["What: ", $('#what').val()];
            item.where      =["Where: ", $('#where').val()];
            item.notes      =["Notes: ", $('#notes').val()];
            //item.favorite   =["Favorite:", favoriteValue];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your List has been Saved!");
        location.reload();
    };


var	deleteItem = function (){

};

var clearLocal = function(){
   if(localStorage.length === 0){
            alert("There is no data to clear.")
        }else{
            localStorage.clear();
            alert("All Lists are deleted!");
            window.location.reload();
            return false;
        }
};
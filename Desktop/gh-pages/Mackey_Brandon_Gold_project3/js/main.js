//$('#home').on('pageinit', function(){
	//code needed for home page goes here
//});	
		
$('#additem').on('pageinit', function(){

		var myForm = $('#additemform');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
	// save local storage from form field
    function storeData(key){
	// If there is no key, this means this is a brand new key.
	if(!key){
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
            item.group      =["Type:", $('#groups').value];
            //item.importance =["Priority:", priorityValue];
            item.date       =["Date:", $('#date').value];
            item.quantity   =["Quantity:", $('#range').value];
            item.what       =["What:", $('#what').value];
            item.where      =["Where:", $('#where').value];
            item.notes      =["Notes:", $('#notes').value];
            //item.favorite   =["Favorite:", favoriteValue];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your List has been Saved!");
        location.reload();
    }
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


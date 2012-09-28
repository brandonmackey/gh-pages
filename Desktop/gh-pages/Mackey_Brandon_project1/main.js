/*
Brandon Mackey
Web App Part 1
Term 1210
Sept 26, 2012
MiU
*/

// Wiat till DOM is Ready
window.addEventListener("DOMContentLoaded", function(){

    // get function by id
    function ge(x){
        var theElement = document.getElementById(x);
        return theElement;
    }

    // create a select field "drop down box"
    function makeDropDown(){
        var formtag =document.getElementsByTagName("form"); // formtag is Array
            selectLi = ge('select'),
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "groups");
        for(var i=0, j=dropList.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = dropList[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }


    // Find value of Radio button 
    function getSelectedRadio(){
        var radios =document.forms[0].importance;
        for(var i=0; i<radios.length; i++){
            if (radios[i].checked){
                priorityValue = radios[i].value;
            }
        } 
    }
    
    // -- Get check box value -- 
    function getCheckBoxValue(){
        if(ge('fav').checked){ 
            favoriteValue = ge('fav').value
        }else{
            favoriteValue = "No"
        }
    }
    
       // -- Quantity function to give slider a value --
    function showValue(){
	var newValue = ge('range').value;
	document.getElementById("rangeValue").innerHTML=newValue;
    }

    
    function toggleControls(n){
        switch(n){
            case "on":
                ge('listForm').style.display = "none";
                ge('clear').style.display = "inline";
                ge('displayLink').style.display = "none";
                ge('addNew').style.display = "inline";
                break;
            case "off":
                ge('listForm').style.display = "block";
                ge('clear').style.display = "inline";
                ge('displayLink').style.display = "inline";
                ge('addNew').style.display = "none";
                ge('items').style.display = "none";
                break;
            default:
                return false;
        }
    }
    
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
	getSelectedRadio();
        getCheckBoxValue();
        var item            ={};
            item.group      =["Type:", ge('groups').value];
            item.importance =["Priority:", priorityValue];
            item.date       =["Date:", ge('date').value];
            item.quantity   =["Quantity:", ge('range').value];
            item.what       =["What:", ge('what').value];
            item.where      =["Where:", ge('where').value];
            item.notes      =["Notes:", ge('notes').value];
            item.favorite   =["Favorite:", favoriteValue];
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your List has been Saved!");
        window.location.reload();
    }

   
    // write data from local storage to the browser
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There is no data in Local Storage so default data was added.");
	    autoFillData();
	    // -- Commit Out Reload Page when using Test JSON Data Uncommit when not testing!! --
            //window.location.reload();
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ge('items').style.display = "block";
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
            getImage(obj.group[1], makeSubList);
	    for (var n in obj){
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubText = obj[n] [0]+""+obj [n][1];
                makeSubLi.innerHTML = optSubText;
		makeSubList.appendChild(linksLi);
            }
	    makeItemLinks(localStorage.key(i), linksLi); // create edit and delete buttons/link for each item in local storage.
	}   
    }
    
    
    // Get the Image for the right category from the drop
    function getImage(catName, makeSubList){
	var imageLi = document.createElement('li');
	makeSubList.appendChild(imageLi);
	var newImg = document.createElement('img');
	var setSrc = newImg.setAttribute("src", "image/" + catName + ".png");
	imageLi.appendChild(newImg);
    }
    

    // Auto Populate local storage
    function autoFillData(){
	// The actaul JSON Object data required for this to work is coming from our JSON.js file.
	// Store the JSON Object into Local Storage
	for(var n in json){
	    var id = Math.floor(Math.random()*10000001);
	    localStorage.setItem(id, JSON.stringify(json[n]));
	}
    }
    
    
    
    // make item links function
    // create the edit and delete links for each stored item when displayed.
    function makeItemLinks(key, linksLi){
	// add edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#";
	editLink.key = key;
	var editText = "Edit List";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);
	
	
	// --DO NOT Like the Line Break So commited out --
	// add line break
	//var breakTag = document.createElement('br');
	//linksLi.appendChild(breakTag);
	
	
	
	// add delete single item link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete List";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
    }
    
    function editItem(){
	// grab the data from local storage.
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);
	
	// show the form
	toggleControls("off");
	
	// populate the form fields with current localStorage values.
	ge('groups').value = item.group[1];
	var radios = document.forms[0].importance;
	for(var i=0; i<radios.length; i++){
	    if(radios[i].value =="High Priority" && item.importance[1] == "High Priority"){
		radios[i].setAttribute("checked", "checked");
	    }else if(radios[i].value == "Low Priority" && item.importance[1] == "Low Priority"){
		radios[i].setAttribute("checked", "checked");
	    }
	ge('date').value = item.date[1];
	ge('range').value = item.quantity[1];
	ge('what').value = item.what[1];
	ge('where').value = item.where[1];
	ge('notes').value = item.notes[1];
	}
	if(item.favorite[1] == "Yes"){
	    ge('fav').setAttribute("checked", "checked");
	}
	// Remove the initial listener from the input 'save List' (saveIt) button
	saveIt.removeEventListener("click", storeData );
	// Change Save It Now button value to Edit button.
	ge('submit').value = "Edit List";
	var editSubmit = ge('submit');
	// Save the key value established in this function as a property of the editSubmit event
	// so we can use that value when we save the data we edited.
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key;
    }
    
    
    function deleteItem(){
	var ask = confirm("Are you sure you want to delete this List?");
	if(ask){
	    localStorage.removeItem(this.key);
	    alert("List was deleted!");
	    window.location.reload();
	}else{
	    alert("List was NOT deleted.");
	}
    }
    
    
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.")
        }else{
            localStorage.clear();
            alert("All Lists are deleted!");
            window.location.reload();
            return false;
        }
    }

    
    function validate(e){
	// define the element we want to check
	var getGroup = ge('groups');
	//var getDate = ge('date');
	var getWhat = ge('what');
	var getWhere = ge('where');
	
	// Reset Error Messages
	errMsg.innerHTML = "";
	getGroup.style.border = "1px solid black";
	//getDate.style.border  = "1px solid black";
	getWhat.style.border  = "1px solid black";
	getWhere.style.border = "1px solid black";
	
	// Get error messages on top for validation
	var messageAry = [];
	// -- Group validation "drop down box" --
	if(getGroup.value === "--Choose A List--"){
	    var groupError = "Please choose a List.";
	    getGroup.style.border = "1px solid red";
	    messageAry.push(groupError);
	}
	
	// Date validation
	//var re = /^\d{2}\/\d{2}\/\d{4}ge/;
	//if(!(re.test(getDate.value))){
	    //var dateError = "Please input a Date.";
	    //getDate.style.border = "1px solid red";
	    //messageAry.push(dateError);
	//}
	
	// What validation
	if(getWhat.value === ""){
	    var whatError = "Please enter what you want.";
	    
	    getWhat.style.border = "1px solid red";
	    messageAry.push(whatError);
	} 
	
	// Where validation
	if(getWhere.value === ""){
	    var whereError = "Please enter where you will get it.";
	    getWhere.style.border = "1px solid red";
	    messageAry.push(whereError);
	}
	
	// If there were errors, display them on the screen.
	if(messageAry.length >= 1){
	    for(var i=0, j=messageAry.length; i < j; i++){
		var txt = document.createElement('li');
		txt.innerHTML = messageAry[i];
		txt.style.color = "red";
		errMsg.appendChild(txt);
	    }
	    e.preventDefault();
	return false;
	}else{
	    //if all is ok save our data! Send the key value (which came from the editData function).
	    // Remember this key value was passed though the editSubmit event listener as a property.
	    storeData(this.key);
	}
	
    }

    
    // variables defaults
    var dropList = ["--Choose A List--", "Grocery_List", "Don't_Forget!", "Wish_List", "Honey_Do_List!" ],
        priorityValue,
        favoriteValue = "No",
        newValue,
	errMsg = ge('errors')
    ;
    makeDropDown();
    
    // set link & submit click events
    var displayLink = ge('displayLink');
    displayLink.addEventListener("click", getData);
    var clearLink = ge('clear');
    clearLink.addEventListener("click", clearLocal);
    var saveIt = ge('submit');
    saveIt.addEventListener("click", validate);
    ge('range').addEventListener("change", showValue);
    
/*    
    // Search 
    var search   = ge('searchBtn');
    
    var getSearch = function(){
	var category = ge('groups').value;
	var term     = ge('search').value;
	
	// Search by Category Only
	if(category != "--Choose A List--" && term === ""){
	    for(i=0, j=localStorage.length; i<j; i++){
		var key   = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj   = JSON.parse(value);
		if(category === obj.group[1]){
		    for (n in obj){
			console.log(obj [n] [1]);
		    }
		}
	    }
	}
    
	// Search by Term Only
	if(term != "" && category === "--Choose A List--"){
	    for(i=0, j=localStorage.length; i<j; i++){
		var key   = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj   = JSON.parse(value);
		for(n in obj){
		    if(term === obj [n] [1]){
			for (q in obj){
			    console.log(obj [q] [1]);
			}
		    }
		}
	    }
	}
    
	// Search by BOTH Category and Term
	if(term != "" && category === "--Choose A List--"){
	    for(i=0, j=localStorage.length; i<j; i++){
		var key   = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj   = JSON.parse(value);
		for(n in obj){
		    if(term === obj [n] [1] && category === obj.group[1]){
			for (q in obj){
			    console.log(obj [q] [1]);
			}
		    }
		}
	    }
	}
    };
    
    search.addEventListener("click", getSearch);
*/

});  
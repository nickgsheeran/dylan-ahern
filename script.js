var project = 1;
var data_array = {}
var image_array1 = []
var image_array2 = []
var i;
var image_count = 1;
var project_title;
var project_materials;
var project_dimensions;
var project_year;
var hash_name;
var fontType = ["Georgia", "Palatino Linotype",  "Times New Roman", "Arial", "Arial Black", "Lucida Sans Unicode", "Tahoma", "Trebuchet MS", "Verdana", "Courier New", "Lucida Console"];
var contact = false;


function changeFont() {
    document.body.style.fontFamily = fontType[Math.floor(Math.random() * fontType.length)];
}

function load_hash() {
    hash_name = location.hash;
    
    if (location.hash == undefined) {
        project = 1;
    } else {
        project = hash_name.replace("#", "");
    }
}

function countdown() {
    if (project <= 1) {
        project = data_array.length-1;
    } else {
        project--;
    }
    
    append_data();
}

function countup() {
    if (project >= data_array.length-1) {
        project = 1;
    } else {
        project++;
    }
    
    append_data();
}

function get_data_array() {
 	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
			data_array = JSON.parse(this.responseText).values;
            append_data();
	    }
  	};
  	xhttp.open("GET", "https://sheets.googleapis.com/v4/spreadsheets/1rUzok6LASw2FVJ1aWlw9ificMSvcH-mAgdNpaxpjPao/values/sheet1?key=AIzaSyAmcp44cOi9-6XM4EqjCjIQLbj_D__1YPE");
	xhttp.send();
}

function append_data() {    
    image_array1 = data_array[project][0];
    image_array2 = image_array1.split(",");
    
    project_title = data_array[project][1];
    project_materials = data_array[project][2];
    project_dimensions = data_array[project][3];
    project_year = data_array[project][4];
            
    update_project();
    console.log(project, data_array.length);
}

function update_project() {
    image_count = image_array2.length;
    i = 0;
    
    document.getElementById("image").src = image_array2[i];
    
    document.getElementById("image_num").innerHTML = i+1;
    document.getElementById("image_count").innerHTML = image_count;
    
    document.getElementById("title-holder").innerHTML = project_title;
    document.getElementById("mat").innerHTML = project_materials;
    document.getElementById("dim").innerHTML = project_dimensions;
    document.getElementById("year").innerHTML = project_year;
//    hash_name = project_title.replace(" ", "-");
    window.location.hash = project;        
}

function change_image() {
    var slide = i+1;
    
    if(slide == image_count) {
        i = 0;
        console.log("slide limit reached", image_count);
    } else {
        i++;
    }
    
    document.getElementById("image").src = image_array2[i];    
    document.getElementById("image_num").innerHTML = i+1;
    document.getElementById("image_count").innerHTML = image_count;
}

function contact_switch() {
    contact = !contact;
    if (contact == true) {
        document.getElementById("nav_info").innerHTML = "is an artist in Ridgewood, Queens";
        document.getElementById("contact").style.display = "block";
    } else if (contact == false) {
        document.getElementById("nav_info").innerHTML = "";
        document.getElementById("contact").style.display = "none";
    }
}

window.onload = function() {
    changeFont();
    load_hash();
    console.log(project);
}

get_data_array();
function showMe(id, type) {
  switch(type){
    case "base":
      document.getElementById(id + "-base").style.display="block";
      document.getElementById(id + "-type1").style.display="none";
      document.getElementById(id + "-type2").style.display="none";
      document.getElementById(id + "-type3").style.display="none";
      document.getElementById(id + "-base-but").classList.add("checked_ingr");
      document.getElementById(id + "-type1-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type2-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type3-but").classList.remove("checked_ingr");
      break;
    case "type1":
      document.getElementById(id + "-base").style.display="none";
      document.getElementById(id + "-type1").style.display="block";
      document.getElementById(id + "-type2").style.display="none";
      document.getElementById(id + "-type3").style.display="none";
      document.getElementById(id + "-base-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type1-but").classList.add("checked_ingr");
      document.getElementById(id + "-type2-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type3-but").classList.remove("checked_ingr");
      break;
    case "type2":
      document.getElementById(id + "-base").style.display="none";
      document.getElementById(id + "-type1").style.display="none";
      document.getElementById(id + "-type2").style.display="block";
      document.getElementById(id + "-type3").style.display="none";
      document.getElementById(id + "-base-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type1-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type2-but").classList.add("checked_ingr");
      document.getElementById(id + "-type3-but").classList.remove("checked_ingr");
      break;
    case "type3":
      document.getElementById(id + "-base").style.display="none";
      document.getElementById(id + "-type1").style.display="none";
      document.getElementById(id + "-type2").style.display="none";
      document.getElementById(id + "-type3").style.display="block";
      document.getElementById(id + "-base-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type1-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type2-but").classList.remove("checked_ingr");
      document.getElementById(id + "-type3-but").classList.add("checked_ingr");
      break;
  }
}

function dropMe(id, type, name, phys, magic, holy, def, atc) {
	if((phys == 0 && magic == 0) && type == 'base') {
		alert('Это секретный ингредиент! Его сырым класть нельзя. Сначала обработайте.');
	} else {
		if(parseInt(document.getElementById("count_" + id + "-" + type).innerText, 10) > 0){
			let typeNum = 0;
			switch(type) {
				case "base": typeNum = 1; break;
				case "type1": typeNum = 2; break;
				case "type2": typeNum = 3; break;
				case "type3": typeNum = 4; break;
			}
		  var myHtmlContent = '<td>'+name+'</td>';
		   if(document.getElementById('secret_textarea').value.length < 1) {
		     document.getElementById('secret_textarea').value += id + "-" + typeNum;
		   } else {
		     document.getElementById('secret_textarea').value += "|" + id + "-" + typeNum;
		   }
		  var tableRef = document.getElementById('ingr_in_boiler').getElementsByTagName('tbody')[0];

		  var newRow = tableRef.insertRow(tableRef.rows.length);
		  newRow.innerHTML = myHtmlContent;
		  updBoilerParams('phys', phys);
		  updBoilerParams('magic', magic);
		  updBoilerParams('holy', holy);
		  updBoilerParams('def', def);
		  updBoilerParams('atc', atc);
		  document.getElementById("ingr_in_boiler_count").innerText = parseInt(document.getElementById("ingr_in_boiler_count").innerText, 10) + 1;
		  document.getElementById("count_row").style.display="block";
		  document.getElementById("count_" + id + "-" + type).innerText =  parseInt(document.getElementById("count_" + id + "-" + type).innerText, 10) - 1;
		} else {
			alert('Ингредиент "' + name + '" закончился!');
		}
	}
}

function transformMe(id, type) {
  // TODO
}

function updBoilerParams(type, addValue) {
	var textareaId = "boiler_" + type + "_str";
	var barId = "boiler_" + type;
	var existStr = document.getElementById(textareaId).value;
	var newStr = "";
	var count = 0;
	var sum = 0;
	if(existStr.length < 1) {
		newStr = addValue;
    count = 1;
    sum = addValue;
	} else {
		newStr = existStr + " " + addValue;
    var values = newStr.split(' ');
	values.forEach(element => {
		count++;
		sum += parseInt(element, 10);
	});
	}
   document.getElementById(textareaId).value = newStr;
	
	document.getElementById(barId).style.width = sum/count + "%";
	document.getElementById(barId+"_title").title = sum/count + "%";
}
function sendMePls(uid){
	var potContent = document.getElementById("secret_textarea").value;
	let potArr = potContent.split("|");
	if(potArr.length > 2) {
		jQuery.post("/mods/holydays/alchimia/potions.php",  { 
				id: uid,
				potContent: potContent
			}).done(function(data) {
				alert(data);
				if(data != 0){}
			});
	} else {
		alert("В котле должн быть не менее трёх ингредиентов!");
	}
}

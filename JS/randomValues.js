$(document).ready(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
});


//console.log($('input[name="gender"]:checked').val());
//var index = adtArray.indexOf("asdddd");
//console.log(index);
var arr = [];
var zip = new JSZip();

//Current Date Time
var x = new Date();
var yyyy = x.getFullYear().toString();
var mm = (x.getMonth() + 1).toString();
var dd = x.getDate().toString();
var hh = x.getHours().toString();
var mins = x.getMinutes().toString();
var ss = x.getSeconds().toString();
dd.length == 1 && (dd = "0" + dd);
mm.length == 1 && (mm = "0" + mm);
hh.length == 1 && (hh = "0" + hh);
mins.length == 1 && (mins = "0" + mins);
ss.length == 1 && (ss = "0" + ss);

$("#save-btn").click(function () {
  var patient_class = "";
  var gender = "";
  //Patient Class Checkbox
  $('.patient_class:checked').each(function () {
    patient_class += $(this).val() + ',';
  });
  patient_class = patient_class.substring(0, patient_class.length - 1);
  //console.log(patient_class);
  var patientClassArray = patient_class.split(',');
  //console.log(patientClassArray);

  //Gender Radio button
  $('.gender:checked').each(function () {
    gender += $(this).val() + ',';
  });
  gender = gender.substring(0, gender.length - 1);
  if (gender == "Male")
    adtArray.splice(32, 1, "M");
  if (gender == "Female")
    adtArray.splice(32, 1, "F");
  if (gender == "Unknown")
    adtArray.splice(32, 1, "U");
  var incr = $('#messagecount').val();
  var message_type = $('#messagetype').val();
  adtArray.splice(8, 1, "ADT^" + message_type);
  adtArray.splice(20, 1, message_type);
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  for (var i = 0; i < incr; i++) { //2035
    if (message_type == "Random") {
      var random_message_type = messageTypeArray[(Math.random() * messageTypeArray.length) | 0];
      adtArray.splice(8, 1, "ADT^" + random_message_type);
      adtArray.splice(20, 1, "ADT^" + random_message_type);
    }
    var yyyymmdd = yyyy + mm + dd + hh + mm + ss;
    //MSH7
    adtArray.splice(6, 1, yyyymmdd);
    //EVN.2
    adtArray.splice(21, 1, yyyymmdd);
    //Random Patitient ID
    var pid = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
    adtArray.splice(9, 1, pid + "M2210")
    adtArray.splice(26, 1, pid);
    adtArray.splice(27, 1, pid);
    adtArray.splice(55, 1, pid);
    // Random Patient Name
    var firstrand = firstname[(Math.random() * firstname.length) | 0];
    var lastrand = lastname[(Math.random() * lastname.length) | 0];
    var midrand = middlename[(Math.random() * lastname.length) | 0];
    adtArray.splice(29, 1, lastrand + "^" + firstrand + "^" + midrand);
    //address
    var address = addr[(Math.random() * addr.length) | 0];
    adtArray.splice(35, 1, address);
    //phone number
    var areacode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    var prefix = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    var line_number = Math.floor(1000 + Math.random() * 9000);
    adtArray.splice(37, 1, "(" + areacode + ") " + prefix + "-" + line_number);
    //Patient Class
    if (jQuery.inArray("Random", patientClassArray) == -1) {
      var patientClass1 = patientClassArray[(Math.random() * patientClassArray.length) | 0];
      var patientClass2 = patientClass1.charAt(0);
    } else {
      var patientClass1 = patientClass[(Math.random() * patientClass.length) | 0];
      var patientClass2 = patientClass1.charAt(0);
    }
    //PID.8 If gender = random
    if (gender == "Random") {
      var random_gender = genderarray[Math.floor(Math.random() * genderarray.length)];
      adtArray.splice(32, 1, random_gender);
    }
    adtArray.splice(76, 1, patientClass1);
    adtArray.splice(60, 1, patientClass2);
    //Visit ID
    adtArray.splice(42, 1, pid + "VZ5097");
    adtArray.splice(77, 1, pid + "VZ5097");
    //PV1.3
    var poc = points_of_care[(Math.random() * points_of_care.length) | 0];
    var rooms = Math.floor(Math.random() * (100 - 121 + 1)) + 121;
    var dept = department[(Math.random() * department.length) | 0];
    adtArray.splice(61, 1, poc + "^" + rooms + "^" + "^" + "^" + "^" + "^" + "^" + "^" + dept);
    //PV1.7 
    var npi = Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000;
    var provider_last_rand = lastname[(Math.random() * lastname.length) | 0];
    var provider_first_rand = middlename[(Math.random() * lastname.length) | 0];
    adtArray.splice(65, 1, npi + "^" + provider_last_rand + "^" + provider_first_rand);
    //PV1.17
    var npi = Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 100000000;
    var provider_last_rand = lastname[(Math.random() * lastname.length) | 0];
    var provider_first_rand = middlename[(Math.random() * lastname.length) | 0];
    adtArray.splice(75, 1, npi + "^" + provider_last_rand + "^" + provider_first_rand);
    //PV1.44
    adtArray.splice(102, 1, yyyymmdd);
    //AL1.3
    var allergyCode = allergenCode[(Math.random() * allergenCode.length) | 0];
    adtArray.splice(106, 1, allergyCode);
    //GT1.3
    var guarantorFname = lastname[(Math.random() * lastname.length) | 0];
    var guarantorLname = firstname[(Math.random() * firstname.length) | 0];
    adtArray.splice(113, 1, guarantorFname + "^" + guarantorLname);
    //GT1.5
    adtArray.splice(115, 1, address);
    //GT1.6
    var gareacode = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    var gprefix = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    var gline_number = Math.floor(1000 + Math.random() * 9000);
    adtArray.splice(116, 1, "(" + gareacode + ") " + gprefix + "-" + gline_number);
    //GT1.11
    var grelationship = relationship[(Math.random() * relationship.length) | 0];
    adtArray.splice(121, 1, grelationship);
    //IN1.2
    var insuranceName = insurance[(Math.random() * insurance.length) | 0];
    adtArray.splice(124, 1, insuranceName);
    //IN1.3
    var insuranceCompanyName = insuranceCompany[(Math.random() * insuranceCompany.length) | 0];
    adtArray.splice(125, 1, insuranceCompanyName);
    /* for (var j=0;j<msh.length;j++)
    {document.write(msh[j] + "|");
    }
    document.write("<br><br><br><br>"); */

    for (var j = 0; j < adtArray.length; j++) {
      arr.push(adtArray[j].toString() + "|");
    }
    zip.add("ADT " + (i + 1) + ".txt", arr.join(''));
    arr = [];
  }
  content = zip.generate();
  location.href = "data:application/zip;base64," + content;
});

function CopyToClipboard(containerid) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select().createTextRange();
    document.execCommand("copy");
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().addRange(range);
    document.execCommand("copy");
  }
}


//Restrict Count limit
$("#messagecount").on("keypress", function (e) {
  var currentValue = String.fromCharCode(e.which);
  var finalValue = $(this).val() + currentValue;
  if (finalValue > 2000) {
    e.preventDefault();
  }
});
//Display Message Count
var showcount = function (val) {
  document.getElementById('messagecount').value = parseInt(val);
}
//Display Message Type
var showtype = function (val) {
  document.getElementById('messagetype').value = val;
}
$('.pop').popover().click(function () {
  setTimeout(function () {
    $('.pop').popover('hide');
  }, 500);
});

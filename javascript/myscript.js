//checkbox common logic
function validateCheckbox1(){
	if(document.getElementById("s01").checked===true){
		document.getElementById("s02").checked=false;
     }
}
function validateCheckbox2(){
	if(document.getElementById("s02").checked===true){
		document.getElementById("s01").checked=false;
     }
}
function validateCheckboxc01(){
	if(document.getElementById("c01").checked===true){
		document.getElementById("c02").checked=false;
     }

}
function validateCheckboxc02(){
	if(document.getElementById("c02").checked===true){
		document.getElementById("c01").checked=false;
     }

}

//validation for whole form
//https://zenit.senecac.on.ca/~emile.ohan/int222/examples/formValidation/js-validation-example-elementById/example.js

     // Subject       : INT222 
     // Author        : Jie
     // Written on    : 7/29
     // Last Modified : 


     // **************************************************************** 
     // ** Function Name : formValidation()
     // ** Called from   : index.html
     // ****************************************************************
     // ** Function Description
     // ** ====================
     // **
     // ** This function .........Main function
     // **
     // ****************************************************************
function validateForm() {
    var errMessages = "";             // Initialize for each time the function is called
    
        errMessages += appendErrorMessge(  valFName() );
        errMessages += appendErrorMessge( validateSurname());  // Call name validation function
		errMessages += appendErrorMessge( validateDateOfBirth());
		errMessages += appendErrorMessge( validateEmail());
		errMessages += appendErrorMessge( validationPhone());
		errMessages += appendErrorMessge( validateAddress());
		errMessages += appendErrorMessge( validateApt());
		errMessages += appendErrorMessge( validateCity());

		var errProvince = validateProvince();
		var errPostal = validatePostal();
		errMessages += appendErrorMessge( errProvince);
		errMessages += appendErrorMessge( errPostal);

		if (errProvince === "" && errPostal === "") {
		    errMessages += appendErrorMessge( ProvincePostalRelationship());
        }
		errMessages += appendErrorMessge( validatePayment());
		errMessages += appendErrorMessge( validateIncome());
		errMessages += appendErrorMessge( validateCurrYears());
		errMessages += appendErrorMessge(validatePreCode());
       
       if (errMessages !== "") {          // if true - there is at least one error
                                         // Prepare to show the errors detected
          showErrors(errMessages);       // Prepare to show the errors detected
          return false;                  // return false to the browser
                                         // in order for the form not be submitted
                                         // this will allow for corrections
       }                               
       else {
          clearShowErrors();                          
          return true;                   // No errors - return to browser and submit form
       }
 
     }  //  End of main function

function appendErrorMessge(errMessage) 
{
    if (errMessage === "")
        return "";
    return "<li>" + errMessage + "</li>";
}

//First Name validation
function valFName() {
    var errMessages = "";
    //var fnamelength = document.getElementById("fName").value.length;
    var fname = document.getElementById("fName").value;
    fname = fname.trim();
    fnamelength = fname.length;
    var countNonAlpha=0;
    var countHyphen=0;
    if (fnamelength === 0) {
        errMessages = "Firt name must be present.<br/>";
        return errMessages;
     }else{
    fname=fname.trim();
    if(fnamelength<3){
        errMessages = "Firt name must have at least 3 alphabets.<br/>";
        return errMessages;
    }else{
        fname = fname.toUpperCase();
        //only 1 hyphen
        for (var i = 0; i < fnamelength; i++) {
            if (fname.charCodeAt(i) === 45) {
                countHyphen++;
            }
        }
        if (countHyphen > 1) {
            errMessages = "Firt name: allow just one optional hyphen.<br/>";
            return errMessages;
        }
        //other
      for(var i=0;i<fnamelength;i++){
          if (i > 2) {
              if ((i = fnamelength - 1) && fname.charCodeAt(i) === 45) {
                  errMessages = "Firt name:the hyphen cannot be at the end";
                  return errMessages;
              } else {//---i=3 4 ...not the last one
                  
                  if (!(fname.charCodeAt(i) > 64 && fname.charCodeAt(i) < 91) && fname.charCodeAt(i) !== 45) {// changed
                      errMessages = "Firt name: allowable characters - upper or lower alphabets - one optional hyphen";
                      return errMessages;
                  }
              }
          }else{//0 1 2
            if (!(fname.charCodeAt(i) > 64 && fname.charCodeAt(i) < 91) ) {
                countNonAlpha++;
            }
          }
          
        }
     
      if(countNonAlpha!==0){
          errMessages = "Firt name must have at least 3 alphabets at the beginning.<br/>";
          return errMessages;
        }
    }
    
  }
  return errMessages;
}
//Sur Name validation
function validateSurname() {
    var errMessages = "";
    var sname = document.getElementById("sName").value;
    sname = sname.trim();
    var snamelength = sname.length;
    var countHyphen = 0;
    var countApostrophe = 0;
    if (snamelength === 0) {
        errMessages = "Surname must be present.<br/>";
        return errMessages;
    }
    //one optional hyphen & one optional apostrophe
    for (var i = 0; i < snamelength; i++) {
        if (sname.charCodeAt(i) === 45) {
            countHyphen++;
            //next cannot be '
            if (sname.charCodeAt(i+1) === 39) {
                errMessages = "Surname : a hyphen and an apostrophe are present, they cannot be next to each other.<br/>";
                return errMessages;
            }
        }
        if (sname.charCodeAt(i) === 39) {
            countApostrophe++;
            //next cannot be -
            if (sname.charCodeAt(i + 1) === 45) {
                errMessages = "Surname : a hyphen and an apostrophe are present, they cannot be next to each other.<br/>";
                return errMessages;
            }
        }
        if (i ==snamelength - 1) {// a hyphen or an apostrophe are present, they cannot be at the end
            if (sname.charCodeAt(i) === 45 || sname.charCodeAt(i) === 39) {
                errMessages = "Surname : a hyphen or an apostrophe are present, they cannot be at the end<br/>";
                return errMessages;
            }
        }
    }
    if (countHyphen > 1 || countApostrophe > 1) {
        errMessages = "Surname allow just one optional hyphen & one optional apostrophe.<br/>";
        return errMessages;
    } 
    //Must have at least 4 alphabets at the beginning
    sname=sname.toUpperCase();
    if (snamelength < 4) {
        errMessages = "Surname Must have at least 4 alphabets.<br/>";
        return errMessages;
    } else {//length =4 5 6 7 ...
        for(var i=0;i<4;i++){//check i=0 1 2 3 
            if (!(sname.charCodeAt(i) > 64 && sname.charCodeAt(i) < 91)) {
                errMessages = "Surname Must have at least 4 alphabets at the beginning.<br/>";
                return errMessages;
            }
        }
        for (var i = 4; i < snamelength; i++) {//check surname ' index = 4 5 6 ....
            if ((!(sname.charCodeAt(i) > 64 && sname.charCodeAt(i) < 91)) 
                && sname.charCodeAt(i)!==39
                && sname.charCodeAt(i) !== 45) {
                errMessages = "Surname Allowable characters - upper or lower alphabets - one optional hyphen & one optional apostrophe.<br/>";
                return errMessages;
            }
        }
    }
    
    
    return errMessages;
}


//Date of Birth validation
function validateDateOfBirth() {
    var errMessages = "";
    var dob = document.getElementById("dob").value;
    dob = dob.trim();
    //var dobint = parseInt(dob);
    if (dob.length < 7) {
        errMessages = " Date of Birth must be present.<br/>";
        return errMessages;
    }
    var dobMonth = dob.substr(0, 3);
    var dobYear = dob.substr(3, 4);
    
    //Month  MMM must be a valid three letter abbreviation of the month - uppercase, lowercase or a mix
    dobMonth = dobMonth.toUpperCase();
    var monthLength = dobMonth.length;
    for (var i = 0; i < monthLength; i++) {
        if (!(dobMonth.charCodeAt(i) > 64 && dobMonth.charCodeAt(i) <91)) {
            errMessages = "MMM must be a valid three letter abbreviation of the month - uppercase, lowercase or a mix<br/>";
            return errMessages;
        }
    }
    // valid month character JanFeb. Mar.Apr.May  Jun.Jul. Aug. Sep. Oct. Nov. Dec.
    if (dobMonth !== "JAN" && 
        dobMonth !== "FEB" && 
        dobMonth !== "MAR" && 
        dobMonth !== "APR" && 
        dobMonth !== "MAY" && 
        dobMonth !== "JUN" && 
        dobMonth !== "JUL" && 
        dobMonth !== "AUG" && 
        dobMonth !== "SEP" && 
        dobMonth !== "OCT" && 
        dobMonth !== "NOV" && 
        dobMonth !== "DEC"
        ) {
        errMessages = "Date of Birth :position 1 to 3 not a valid month.";
        return errMessages;
    }
    //Year  YYYY must be numeric and 
    for (var i = 0; i < 4; i++) {
        if (!(dobYear.charCodeAt(i) > 47 && dobYear.charCodeAt(i) < 58)) {
            errMessages = "Year  YYYY must be numeric<br/>";
            return errMessages;
        }
    }
    //Year must be 20 years less than the current year
    var dobYearInt = parseInt(dobYear);
    var nowYear = new Date();
    nowYear = nowYear.getFullYear();
    if (dobYearInt > (nowYear - 20)) {
        errMessages = "Year must be 20 years less than the current year<br/>";
        return errMessages;
    }
    return errMessages;
}
// Email validation

function validateEmail() {
    var errMessages = "";
    var Email = document.getElementById("email").value;
    Email = Email.trim();
    var Emailength = Email.length;
    var atnum=0;
    var periodnum = 0;
    var atindex = -1;
    var periodIndex = -1;
    //
    if (Emailength === 0) {
        errMessages = "Email must be present.";
        return errMessages;
    }
    for (var i = 0; i < Emailength; i++) {
        if (Email.charAt(i) == '@') {
            atnum++;
        }
        if (Email.charAt(i) == '.') {
            periodnum++;
        }
    }
    if (atnum != 1 || periodnum != 1) {
        errMessages = "Email:only one and must have one @ or only one period [.] character is allowed in the email address   ";
        return errMessages;
    }
    //1@part2.part3 -order
    for (var i = 0; i < Emailength; i++) {
        if (Email.charAt(i) == '@') {
            atindex=i;
        }
        if (Email.charAt(i) == '.') {
            periodIndex=i;
        }
    }
    if (atindex > periodIndex) {
        errMessages = "Must be present - part1@part2.part3 -order";
        return errMessages;
    }
    //
    if (Email.charAt(0) == '@'
        || Email.charAt(0) == '.'
        || Email.charAt(Emailength-1) == '@'
        || Email.charAt(Emailength-1) == '.'
              ) {
        errMessages = "the @ or the period [.] cannot be at the beginning or at the end of the email address<br/>";
        return errMessages;
    }
    //
    for (var i = 0; i < Emailength; i++) {
        if (Email.charAt(i) == '@' && Email.charAt(i + 1) == '.') {
            errMessages = "the @ and the period [.] cannot be next to each other.";
            return errMessages;
        }
    }
    //par1
    
    var part1 = Email.substring(0, atindex);//not include the stop index char
    var part2 = Email.substring(atindex+1, periodIndex);
    var part3 = Email.substring(periodIndex+1);//no stop mean to the end
    if (part1.length < 3 || part2.length < 3) {
        errMessages = "Email: (part1@part2.part3)  part1 and part2- minimum 3 characters";
        return errMessages;
    }
    var part3upper = part3.toUpperCase();
    if (!(part3upper == "COM" || part3upper == "CA")) {
        errMessages = "Email: (part1@part2.part3) part3 - can only be com or ca ";
        return errMessages;
    }
    //!(dobYear.charCodeAt(i) > 47 && dobYear.charCodeAt(i) < 58) not a alphabets
    //!(dobMonth.charCodeAt(i) > 64 && dobMonth.charCodeAt(i) <91) not numbers
    var part1Up=part1.toUpperCase();
    var part2Up=part2.toUpperCase();
    for (var i = 0; i < part1.length; i++) {
        if (! ( (part1Up.charCodeAt(i) > 47 && part1Up.charCodeAt(i) < 58)
            || (part1Up.charCodeAt(i) > 64 && part1Up.charCodeAt(i) < 91))
            
            ){
            errMessages = "Email: (part1@part2.part3) part1 - can only be can be alphabets or numbers or a mix";
            return errMessages;
        }
    }
    //part2.....
    for (var i = 0; i < part2.length; i++) {
        if (!((part2Up.charCodeAt(i) > 47 && part2Up.charCodeAt(i) < 58)
            || (part2Up.charCodeAt(i) > 64 && part2Up.charCodeAt(i) < 91))

            ) {
            errMessages = "Email: (part1@part2.part3) part2 - can only be can be alphabets or numbers or a mix";
            return errMessages;
        }
    }
    return errMessages;
}
/* Phone validation

*/
function validationPhone() {
    var errMessages = "";
    var phone = document.getElementById("phone").value;
    phone = phone.trim();
    var phonelength = phone.length;
    if (phonelength != 12) {
        errMessages = "Phone must be present - nnn-nnn-nnnn";
        return errMessages;
    }
    for (i = 0; i < phonelength; i++) {
        if ((!(phone.charCodeAt(i) > 47 && phone.charCodeAt(i) < 58))
            && phone.charCodeAt(i)!==45
            ) {
            errMessages = "Phone must be present in numbers. ";
            return errMessages;
        }
    }
    var part1=parseInt(phone.substring(0,3));
    var part2 = parseInt(phone.substring(4, 7));
    var part3 = parseInt(phone.substring(8));
    if(!(part1===416||part1===647)){
        errMessages = "Phone : <mark>nnn</mark>-nnn-nnnn must 416 or 647. ";
        return errMessages;
    }
    if(part2<200||part2>600){
        errMessages = "Phone : nnn-<mark>nnn</mark>-nnnn must be in the range of 200 ...... 600 inclusive. ";
        return errMessages;
    }
    if (!(part3 >= 1001 && part2 <= 9999)) {
        errMessages = "Phone : nnn-nnn-<mark>nnnn</mark> must be in the range of 1001 ...... 9999 inclusive. ";
        return errMessages;
    }
    return errMessages;
}
/* Address validation

*/
function validateAddress() {
    var errMessages = "";
    var address = document.getElementById("address").value;
    address = address.trim();
    var addlength = address.length;
    if (addlength===0) {
        errMessages = "Address must be present. ";
        return errMessages;
    }
    var addressUpper = address.toUpperCase();
    var countAlpNo = 0;
    for (var i = 0; i < addlength; i++) {
        if (addressUpper.charCodeAt(i) > 64 && addressUpper.charCodeAt(i) < 91) {
            countAlpNo++;
        }
    }
    if (countAlpNo<5) {
        errMessages = "Address must have at least 5 alphabets - otherwise free format. ";
        return errMessages;
    }
    return errMessages;
}

/* Apt validation

*/
function validateApt() {
    var errMessages = "";
    var apt = document.getElementById("apt").value;
    apt = apt.trim();
    var aptlength = apt.length;
    var countAlpOrNum=0;
    if (aptlength>0) {
        for (var i = 0; i < aptlength, i++;){
            if( (apt.charCodeAt(i)> 64 && apt.charCodeAt(i) < 91) ||
                (apt.charCodeAt(i)> 47 && apt.charCodeAt(i) < 58)
                )
            {
                countAlpOrNum++;
            }
         }
        if (countAlpOrNum === 0) {
            errMessages = "Apt If present - Must have at least 1 alphabet or 1 number. ";
            return errMessages;
        }
    }
    return errMessages;
}
/* City validation

*/
function validateCity() {
    var errMessages = "";
    var city = document.getElementById("city").value;
    city = city.trim();
    var citylength = city.length;
    var cityUpper=city.toUpperCase();
    if (citylength === 0) {
        errMessages = "City must be present. ";
        return errMessages;
    }
    //
    var hyphenNum = 0;
    for (var i = 0; i < citylength; i++) {
        if (city.charAt(i) === "-") {
            hyphenNum++;
        }
    }
    if (hyphenNum>1) {
        errMessages = "City  Allowable characters - just one optional hyphen. ";
        return errMessages;
    }
    //
    for (var i = 0; i < citylength; i++) {
        if (!(
           (cityUpper.charCodeAt(i) > 64 && cityUpper.charCodeAt(i) < 91) ||
           cityUpper.charCodeAt(i) === 45)) {
            errMessages = "City Allowable characters - upper or lower alphabets - one optional hyphen ";
            return errMessages;
        }
        if (i == citylength - 1 && cityUpper.charCodeAt(i) === 45) {
            errMessages = "City: If a hyphen is present, the hyphen cannot be at the end. ";
            return errMessages;
        }
    }
    //Must have at least 5 alphabets at the beginning
    if (citylength<5){
        errMessages = "City: Must have at least 5 alphabets at the beginning. ";
        return errMessages;
    }
    for (var i = 0; i < 5; i++) {
        if (!(cityUpper.charCodeAt(i) > 64 && cityUpper.charCodeAt(i) < 91)) {
            errMessages = "City: Must have at least 5 alphabets at the beginning. ";
            return errMessages;
        }
    }
    return errMessages;
}


/* Province validation****unfinish......

*/
function validateProvince() {
    var errMessages = "";
    var provinceSelect = document.getElementById("province").selectedIndex;
    if (provinceSelect === -1) {
        errMessages = "Province must be selected from the list of provinces. ";
        return errMessages;
    }
    return errMessages;
}


/* Postal validation


*/
function validatePostal() {
    var errMessages = "";
    var postal = document.getElementById("postal").value;
    postal = postal.trim();
    var postalength = postal.length;
    if (postalength === 0) {
        errMessages = "Postal must be present. ";
        return errMessages;
    }
    if (postalength!=7) {
        errMessages = "Postal must be present in Format :ANA NAN. ";
        return errMessages;
    }
    if (!(postal.charCodeAt(0) > 64 && postal.charCodeAt(0) < 91)) {
        errMessages = "Postal Format :ANA NAN. First alphabet is uppercase";
        return errMessages;
    }
    if (!(postal.charCodeAt(2) > 64 && postal.charCodeAt(2) < 91)) {
        errMessages = "Postal Format :ANA NAN. Third alphabet is uppercase";
        return errMessages;
    }
    if (!(postal.charCodeAt(5) > 64 && postal.charCodeAt(5) < 91)) {
        errMessages = "Postal Format :ANA NAN. Sixth alphabet is uppercase";
        return errMessages;
    }
    if (!(postal.charCodeAt(1) > 47 && postal.charCodeAt(1) < 58)) {
        errMessages = "Postal Format :ANA NAN. Sencond is number";
        return errMessages;
    }
    if (!(postal.charCodeAt(4) > 47 && postal.charCodeAt(4) < 58)) {
        errMessages = "Postal Format :ANA NAN. Fiveth is number";
        return errMessages;
    }
    if (!(postal.charCodeAt(6) > 47 && postal.charCodeAt(6) < 58)) {
        errMessages = "Postal Format :ANA NAN. Seventh is number";
        return errMessages;
    }
    if (postal.charAt(3) !== " ") {
        errMessages = "Postal Format :ANA NAN. Fourth is a blank character ";
        return errMessages;
    }
    

    return errMessages;
}

// Province Postal Relationship...........
function ProvincePostalRelationship() {
    var errMessages = "";
    var postal = document.getElementById("postal").value;
    var provinceSelectNo = document.getElementById("province").selectedIndex;
    /* //var carList = document.getElementById("car");
    
    //var selCar = carList.options[carList.selectedIndex].value;
    */
    var provinceList = document.getElementById("province");
       //var carList = document.getElementById("car");
    var province = provinceList.options[provinceList.selectedIndex].value;
         //var selCar = carList.options[car     List.selectedIndex].value;

    if (province === "Newfoundland & Labrador" && postal.charAt(0) !== "A") {
        errMessages = "Newfoundland and Labrador Postal's first character must be \"A\". ";
        return errMessages;
    }
    if (province === "Nova Scotia" && postal.charAt(0) !== "B") {
        errMessages = "Nova Scotia Postal's first character must be \"B\". ";
        return errMessages;
    }
    if (province === "Prince Edward Island" && postal.charAt(0) !== "C") {
        errMessages = "Prince Edward Island Postal's first character must be \"C\". ";
        return errMessages;
    }
    if (province === "New Brunswick" && postal.charAt(0) !== "E") {
        errMessages = "Prince New Brunswick Postal's first character must be \"E\". ";
        return errMessages;
    }
    if (province === "Manitoba" && postal.charAt(0) !== "R") {
        errMessages = "Prince Manitoba Postal's first character must be \"R\". ";
        return errMessages;
    }
    if (province === "Saskatchewan" && postal.charAt(0) !== "S") {
        errMessages = "Prince Saskatchewan Postal's first character must be \"S\". ";
        return errMessages;
    }
    if (province === "Alberta" && postal.charAt(0) !== "T") {
        errMessages = "Prince Alberta Postal's first character must be \"T\". ";
        return errMessages;
    }
    if (province === "British Columbia" && postal.charAt(0) !== "V") {
        errMessages = "Prince British Columbia Postal's first character must be \"V\". ";
        return errMessages;
    }
    if (province === "Northwest Territories" && postal.charAt(0) !== "X") {
        errMessages = "Prince Northwest Territories Postal's first character must be \"X\". ";
        return errMessages;
    }
    if (province === "Nunavut" && postal.charAt(0) !== "X") {
        errMessages = "Prince Nunavut Postal's first character must be \"X\". ";
        return errMessages;
    }
    if (province === "Yukon" && postal.charAt(0) !== "Y") {
        errMessages = "Prince Yukon Postal's first character must be \"Y\". ";
        return errMessages;
    }
    if (province === "Quebec" && (postal.charAt(0) !== "G" || postal.charAt(0) !== "H" || postal.charAt(0) !== "J")) {
        errMessages = "Prince Quebec Postal's first character must be \"G\" \"H\" \"J\". ";
        return c;
    }

    if (province === "Ontario" && (postal.charAt(0) !== "K" && postal.charAt(0) !== "L" && postal.charAt(0) !== "M"
            && postal.charAt(0) !== "N"&&postal.charAt(0) !== "P")) {
        errMessages = "Prince Ontario Postal's first character must be \"K\" \"L\" \"M\" \"N\" \"P\". ";
        return errMessages;
    }
    return errMessages;
}

/* Payment validation
*/
function validatePayment() {
    var errMessages = "";
    var payment = document.getElementById("payment").value;
    payment = payment.trim();
    var paymentlength = payment.length;
    if (paymentlength === 0) {
        errMessages = "Payment must be present. ";
        return errMessages;
    }
    //
    for (var i = 0; i < paymentlength; i++) {
        if (!(payment.charCodeAt(i) > 47 && payment.charCodeAt(i) < 58)) {
            errMessages = "Payment must be an integer value. ";
            return errMessages;
        }
    }
    //
    var paymentInt = parseInt(payment);
    if (paymentInt<200) {
        errMessages = "Payment Must be an integer value greater than 200. ";
        return errMessages;
    }

    return errMessages;
}

//Income
function validateIncome() {
    var errMessages = "";
    var income = document.getElementById("income").value;
    income = income.trim();
    var payment = document.getElementById("payment").value;
    var paymentInt = parseInt(payment);
    var incomelength = income.length;
    if (incomelength === 0) {
        errMessages = "Income must be present. ";
        return errMessages;
    }
    //
    for (var i = 0; i < incomelength; i++) {
        if (!(income.charCodeAt(i) > 47 && income.charCodeAt(i) < 58)) {
            errMessages = "Income must be an integer value. ";
            return errMessages;
        }
    }
    //
    var incomeInt = parseInt(income);
    if (incomeInt < 4*paymentInt) {
        errMessages = "Income must be at least 4 times the monthly payment. ";
        return errMessages;
    }

    return errMessages;
}

/*CurrYears

*/

function validateCurrYears() {
    var errMessages = "";
    var currYears = document.getElementById("currYears").value;
    currYears = currYears.trim();
    var currYearslength = currYears.length;
    if (currYearslength === 0) {
        errMessages = "Years at current location must be present. ";
        return errMessages;
    }
    //
    for (var i = 0; i < currYearslength; i++) {
        if (!(currYears.charCodeAt(i) > 47 && currYears.charCodeAt(i) < 58)) {
            errMessages = "Years at current location must be an integer value. ";
            return errMessages;
        }
    }
    //
    var currYearsInt = parseInt(currYears);
    if (currYearsInt <= 0||currYearsInt >=40) {
        errMessages = "Years at current location: allowable range 1 ..... 40. ";
        return errMessages;
    }

    return errMessages;
}

//errMessages += appendErrorMessge( validatePreCode(errMessages);
/*

    Optional
    If present
        Must have the following format NNN-NNNN
        NNN-NNNN must be numeric - allowable digits 1 to 9
        NNN-NNNN must be a hyphen
        NNN-NNNN must be numeric - allowable digits 1 to 9
        The following should be checked if the above 4 rules are adhered to:
        The sum of the digits to the right of the hyphen are double the sum of the digits to the left of the hyphen

*/
function validatePreCode() {
    var errMessages = "";
    var preCode = document.getElementById("preCode").value;
    preCode = preCode.trim();
    var preCodelength = preCode.length;
    //
   
    if (preCodelength!==0) {
        if (preCodelength != 8 || preCode.charAt(3) !== "-") {
            errMessages = "PreCode Must have the following format NNN-NNNN. ";
            return errMessages;
        }
        //NNN-NNNN
        //part1-part2
        //left-right
        var part1 = preCode.substring(0, 3);
        var part2 = preCode.substring(4);
        for (i = 0; i < 3; i++) {
            if (!(part1.charCodeAt(i) > 47 && part1.charCodeAt(i) < 58)) {
                errMessages = "PreCode must be present in numbers. ";
                return errMessages;
            }
        }
        for (i = 0; i < 4; i++) {
            if (!(part2.charCodeAt(i) > 47 && part2.charCodeAt(i) < 58)) {
                errMessages = "PreCode must be present in numbers. ";
                return errMessages;
            }
        }
        var totLeft = 0;
        totLeft = parseInt(part1);
        var totRight = 0;
        totRight = parseInt(part2);

        if (totRight != 2 * totLeft) {
            errMessages = "PreCode : The sum of the digits to the right of the hyphen are double the sum of the digits to the left of the hyphen. ";
            return errMessages;
        }
    }
    
    return errMessages;
}

// ****************************************************************
     // ** Function Name : showErrors(messages)                       **
     // **                                                            **
     // ** Called from   : formValidationExample()                    **
     // ****************************************************************
     // ** Function Description                                       **
     // ** ====================                                       **
     // **                                                            **
     // ** This function is called if there are errors                **
     // **                                                            **
     // ****************************************************************


     function showErrors(errMessages) {
      
        
         document.getElementById('errors').innerHTML = "<ol>" + errMessages + "</ol>";

     }  //  End of function

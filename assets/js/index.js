let btnGenerate = document.querySelector(".btn-generate");
let passwordDisplay = document.querySelector(".generated-pass");
let clipboardNotify = document.querySelector(".copy-notice")

let charLengthSlider = document.querySelector(".char-length-slider");
let sliderCount =  document.querySelector(".length-count")  

let passwordLength = charLengthSlider.value;

let btnCopyPass = document.querySelector(".btn-copy");
let passwordContainer = document.querySelector(".password-container");


const CHAR_SETS = {
    lowercaseSet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    uppercaseSet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    numbersSet: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    specialSet: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ';', ':', '"', "'", '<', '>', ',', '.', '/', '?', '|']
}


//Range Slider Stuff
const getSliderVal = () => {
    sliderCount.textContent = charLengthSlider.value;
    passwordLength = charLengthSlider.value;
};
charLengthSlider.addEventListener('input', getSliderVal);


//Generate Random Character 
function generateChar() {
    let uppercaseCheckBox = document.querySelector(".chk-uppercase-char");  
    let specialCheckBox = document.querySelector(".chk-special-char")
    let randomNumber = 0;
    let allCharacters = [];
    allCharacters = allCharacters.concat( CHAR_SETS.numbersSet, CHAR_SETS.lowercaseSet); //two sets of characters needed

    if ((uppercaseCheckBox.checked) === (true)){
        allCharacters = allCharacters.concat(CHAR_SETS.uppercaseSet);
    }

    if (specialCheckBox.checked === true) {
        allCharacters = allCharacters.concat(CHAR_SETS.specialSet);
    }

    randomNumber = Math.floor( Math.random() * (allCharacters.length))
    return allCharacters[randomNumber];
}   

//Generating Password
function generatePassword(length) {
    let passwordResult = "";
    let generatedChar = "";
    let repeatCheck = "";

    for (let i = 0; i < length; i++) {
        repeatCheck = generatedChar;
        generatedChar = generateChar();
        
        //Checks for repeated character. Will generate a character until it was different than the precedent number
        while (repeatCheck === generatedChar){
            generatedChar = generateChar();
        }
        passwordResult += generatedChar;
    }
    return passwordResult;
}




//Displaying the Password
btnGenerate.addEventListener("click", displayPassword);

function displayPassword() {
    btnCopyPass.style.cssText = "opacity: 100%";
    passwordDisplay.style.cssText = "opacity: 100%";
    btnCopyPass.classList.add("copy-icon-effect");

    let generatedPassword = generatePassword(passwordLength);

    passwordDisplay.textContent = generatedPassword;
    console.log("Password Generated");
}


//Clipboarding the Password 
btnCopyPass.addEventListener("click", clipboardPassword);

function clipboardPassword() {
    if (passwordDisplay.textContent != "Generated password") {
        navigator.clipboard.writeText(passwordDisplay.textContent);

        clipboardNotify.style.cssText = "opacity: 50%";
        clipboardNotify.textContent = "Copied!";
        passwordContainer.classList.add("password-container-effect");

        setTimeout( function(){
            clipboardNotify.style.cssText = "transition: all 1s; opacity: 0";
            passwordContainer.classList.remove("password-container-effect");

            setTimeout( function(){
                clipboardNotify.style.removeProperty("transition, opacity");
                clipboardNotify.textContent = "";
                }, 1000 );

        }, 1000 );

        console.log("Password copied to the clipboard!");
    }
}
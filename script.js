const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector(".data-copyMsg");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#number");
const symbolCheck = document.querySelector("#symbol");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelector("input[type=checkbox]");
const symbol = "~!@#$%^&*(+){\}?>=<";


let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();

setIndicator("#ccc")

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText =passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRanInt(min, max){
   return  Math.floor(Math.random()*(max-min))+min; 
}
function gererateRandomNum(){
    return getRanInt(0,9);
}
function generateLowerCase(){
   return String.fromCharCode(getRanInt(97, 123));
}
function generateUpperCase(){
    return String.fromCharCode(getRanInt(65, 91));
 }
 
 function generateSymbol(){
    const randNum = getRanInt(0, symbol.length);
    return symbol.charAt(randNum);
 }
function calcStrength(){
    let hasUpper =false;
    let haslower =false;
    let hasNum =false;
    let hasSym =false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) haslower = true;
    if(numberCheck.checked) hasNum = true;
    if(symbolCheck.checked) hasSym = true;

    if(hasNum && haslower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator("#00ff44");
    }
    else if ((haslower || hasUpper) && (hasNum || hasSym) && passwordLength>=6){
        setIndicator("#e7fc00");
    }
    else {
        setIndicator("red");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
         copyMsg.innerText= "failed";
    }
    // copyMsg.classList.add("active");
    // setTimeout(() =>{
    //     copyMsg.classList.remove("active");
    // },2000);   
    setTimeout(()=>{
        copyMsg.innerText = "";
    }, 1000)
}

function shufflePassword(array){
    for(let i =array.length-1; i>0; i--){
        const j = Math.floor(Math.random()* (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j]=temp;
    }
    let str ="";
    array.forEach((el)=>(str+=el));
    return str;
}

// function handleCheckBoxChange(){
//     checkCount = 0;
//     allCheckBox.forEach( (checkbox) =>{
//         if(checkbox.checked)
//             checkCount++;
//     });

//     if(passwordLength< checkCount){
//         passwordLength = checkCount;
//         handleSlider();
//     }
// }

// allCheckBox.forEach((checkbox)=>{
//     checkbox.addEventListener('change', handleCheckBoxChange);
// })
 
// allCheckBox.forEach((checkBox) => {
//     checkBox.addEventListener('change', handleCheckBoxChange);
// })

inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
} )



copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value)
        copyContent();
} )

generateBtn.addEventListener('click',()=>{
    if(checkCount==0) return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    password ="";

    // if(uppercaseCheck.checked){
    //     password+=generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password+=generatelowerCase();
    // }

    // if(numberCheck.checked){
    //     password+=gererateRandomNum();
    // }

    // if(symbolCheck.checked){
    //     password+=generateSymbol();
    // }

    let funArr = [];
    if(uppercaseCheck.checked)
        funArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funArr.push(generateLowerCase);

    if(numberCheck.checked)
        funArr.push(gererateRandomNum);

    if(symbolCheck.checked)
        funArr.push(generateSymbol);

    for(let i=0; i<funArr.length; i++){
        password+=funArr[i]();
    }
    for(let i= 0; i<passwordLength-funArr.length; i++){
        let randIndex = getRanInt(0, funArr.length);
        password += funArr[randIndex]();
    }


    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;

    calcStrength();
} )

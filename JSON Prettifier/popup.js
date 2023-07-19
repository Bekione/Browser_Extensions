/* 
  ##### JSON Prettifier Browser Extension Version 01 | By Bereket Kinfe ##### 
*/
const logo = document.getElementById("jpLogo");
const prettifyBtn = document.getElementById("prettifyButton");
const copyBtn = document.querySelector(".clipboard_copy");
const resultEl = document.querySelector(".textarea_output");
const inputJson = document.getElementById("jsonInput")

logo.addEventListener("click", () => {
    inputJson.value = "";
    resultEl.innerHTML = "";
    copyBtn.style.display = "none";

  });

const prettifyJson = () => {
    let jsonInput = document.getElementById("jsonInput").value.trim();

    let success = true;
    let output = "";

    //Check if the input JSON string is empty
    if (jsonInput === "") {
        const popupMessage = document.getElementById("popupMessage");
        popupMessage.innerText = "Please enter some JSON data.";
        resultEl.innerHTML = "";
        copyBtn.style.display = "none";
        popupMessage.style.display = "block";
        setTimeout(() => {
          popupMessage.style.display = "none";
        }, 3000);
        return;
    }
  
    try {
        var jsonObject = JSON5.parse(jsonInput);
        output = JSON.stringify(jsonObject, null, 2);      
    } 
    catch (error) {
        success = false;
        output = "Error: Invalid JSON string";
    }

    return { success, output }
}

const updateResult = () => {
    const { success, output } = prettifyJson();
    resultEl.innerHTML = "";

    const outputEl = document.createElement("textarea");
    outputEl.id = "jsonOutput";
    outputEl.value = output;
    outputEl.readOnly = true;
    resultEl.appendChild(outputEl);

    if (success) {
        outputEl.style.height = "130px";
        copyBtn.style.display = "block";
    } else {
        copyBtn.style.display = "none";
    }
}

function copyToClipboard() {
    const outputEl = document.getElementById("jsonOutput");
    outputEl.select();
    document.execCommand("copy");
    copyBtn.classList.add('clicked')

    setTimeout(() => {copyBtn.classList.remove('clicked')}, 1200)
}

prettifyBtn.addEventListener("click", updateResult);
copyBtn.addEventListener("click", copyToClipboard);

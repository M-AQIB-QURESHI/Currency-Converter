let baseUrl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let button=document.querySelector("Button");
let options=document.querySelectorAll(".options");
let FROM="USD";
let TO="PKR";
let answer=document.querySelector("#answer");

for(let option of options){
    for(let code in countryList){
        let newOption=document.createElement("option");
       newOption.innerText=code;
       newOption.value=code;
       if(option.name==="from" && code==="USD"){
        newOption.selected=true;
       }else if(option.name==="to" && code==="PKR"){
        newOption.selected=true;
       }
        option.append(newOption);
    }
    option.addEventListener("change",(EVENT)=>{
        if(option.name==="from"){
            FROM=updateFlag(EVENT.target);
        }else if(option.name==="to"){
            TO=updateFlag(EVENT.target);
        }
    })
}


function updateFlag(element){
    let CODE=element.value;
    let COUNTRY=countryList[CODE];
    let newCode=`https://flagsapi.com/${COUNTRY}/flat/64.png`;
    let IMG=element.parentElement.querySelector("img");
    IMG.src=newCode;
    return CODE;
}

button.addEventListener("click",async ()=>{
    let amount=document.querySelector("input");
    if(amount.value<1){
        amount.value=1;
    }
    let URL="https://open.er-api.com/v6/latest";
    let response=await fetch(URL);
    let data=await response.json();
    answer.innerText=`${amount.value}${FROM}=${(amount.value*data.rates[TO])/data.rates[FROM]}${TO}`;
    for(code in countryList){
        console.log(code,data.rates[code],"\n");
    }
})




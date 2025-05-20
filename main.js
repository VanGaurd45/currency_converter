let URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_i0RqAK8JjVrLJf68wWARQ1ZUbJVBFjxjmpJ4p9Qr";


const dropdowns = document.querySelectorAll(".countryNames");
const flags=document.querySelectorAll("img");
const btn=document.querySelector(".button");
const amount=document.querySelector(".amount input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg")

//fetch API(for conversion values)
getValue=async(currCode)=>{
    let response=await fetch(URL);
    let data=await response.json();
    return (data.data[currCode].value); //returns conversion values for specific country code
}

//appending all country options in the dropdown select
dropdowns.forEach(dropdown => {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        // initial from-to is INR-USD
        if(dropdown.name==="countryFrom" && currCode==="INR"){
            newOption.selected=true;
        }else if(dropdown.name==="countryTo" && currCode==="USD"){
            newOption.selected=true;
        }
        //appends the options
        dropdown.append(newOption);
        
    }
    //whenever there is change in country,change the flag accordingly
    dropdown.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
});

const updateFlag = (element) => {
    let currencyCode = element.value;
    let country=countryList[currencyCode]
    if(element.name==="countryFrom"){   //flag[0]= "from" dropdown and flag[1]= "to" dropdown
        flags[0].src=`https://flagsapi.com/${country}/flat/64.png`
    }else{
        flags[1].src=`https://flagsapi.com/${country}/flat/64.png`
    }

}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    currencyConversion();
}
)

const currencyConversion=async()=>{
    let amount=document.querySelector(".amount input");
    if(amount.value<1 || amount.vale===""){
        amount.value="0";
    }
    let amtVal=(Number)(amount.value);
    //as getValue() is asynchronus... we need async await
    let fromVal=await getValue(fromCurr.value);
    let toVal=await getValue(toCurr.value)
    let finalValue=(amtVal/fromVal)*toVal;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalValue} ${toCurr.value}`
}
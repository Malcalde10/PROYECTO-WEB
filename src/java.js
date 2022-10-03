let content=document.getElementById("content");

let componentsPriceText=document.getElementById("componentsPrice");
let beginnerComponentsPrice=document.getElementById("beginner-components-price");

let possibleCheckoutItems=[];
let next = document.getElementById("nextButton");
let startRecommend=document.getElementById("startRecommend");
let beginnerRecommendedComponents=document.getElementById("beginner-components-grid");

let optionButton=document.querySelectorAll(".optionButton");
let optionRecommended=null;

let buyNum=0;
let graphicItems=[{
    
   
},{
    "name":"Memoria: 24GB GDDR6X ",
    
    
},{
    
},{
   
}];
let processorItems=[ {
    
},{
    
},{
   
},{
    "name":"Motor Gráfico: GA102 Nvidia Ampere",
    
    
}];
let memoryItems=[{
    
},{
 
},{
    "name":"Frecuencias base: 1400 MHz",
    
   
}];
let storageItems=[{
    "name":"Velocidad de la memoria: 19.5Gbps",
    
},{
    
},{
    
},{
    
}];
let coolerItems=[{
   
},{
    "name":"Dimensiones: 323 x 140 x 56mm, 1565 gramos",
   
},{
    
},{
    
}];
let windowsItems=[{
    
},{
    "name":"Soporte HDCP: 2.2 ",
    
},{
   
},{
    
}];
let powersupplyItems=[{
    "name":"Conectividad: DisplayPort x 3 (v1.4a) / HDMI 2.1 x 1",
    
},{

}];

let gamingComponents = [
    1,3,2,0,1,1,0
];
let designComponents = [
    2,3,3,0,1,1,1
];
let codingComponentes = [
    3,3,3,3,1,1,1
];
let renderingComponents = [
    3,2,2,3,1,1,1
];
let officeComponents = [
    0,1,1,3,1,0,0
];
  let otherComponents = [
    0,1,1,3,1,0,0
];

let allItems=[
    graphicItems,processorItems,memoryItems,storageItems,coolerItems,windowsItems,powersupplyItems
]
optionButton.forEach(
    function(button){
        button.addEventListener("click",()=>{
            document.getElementById(button.id).style.border="3px solid";
            optionRecommended=button.id;
            localStorage.setItem("recommendType",optionRecommended);
            startRecommend.setAttribute("href","beginner-recommendation.html");
            optionButton.forEach(
                function(button){
                    if(button.id!=optionRecommended){
                        document.getElementById(button.id).style.border="3px ";
                    }
                }
            );
        });
    }
);
function addToPossibleCheckout(name,order){
    let item = {}
    item.name=name;
    
   
    item.id=order;
    possibleCheckoutItems.push(item);
}
function createComponentCard(imgSrc,component,price){
    let componentCardCol=document.createElement("div");
    componentCardCol.setAttribute("id","content-beginner-recommendation-components-col");
    componentCardCol.setAttribute("class","col");
    let componentCardImg=document.createElement("img");
    
    let componentCardTitle=document.createElement("p");
    componentCardTitle.innerHTML=component
    let componentCardPrice=document.createElement("p");
    
    
    componentCardCol.appendChild(componentCardTitle);
    
    return componentCardCol;
}

function beginnerRecommendationGeneration(){
    let rowNum=0;
    let tempPrice=0;
    let componentCardRow;
    let recommendType=localStorage.getItem("recommendType");
    if(recommendType==null){
        recommendType="gaming";
    }
    let recommendTypeComponents;
    switch(recommendType){
        case "gaming":
            recommendTypeComponents=gamingComponents;
            break;
        case "design":
            recommendTypeComponents=designComponents;
            break;
        case "coding":
            recommendTypeComponents=codingComponentes;
            break;
        case "rendering":
            recommendTypeComponents=gamingComponents;
            break;
        case "office":
            recommendTypeComponents=officeComponents;
            break;
        case "other":
            recommendTypeComponents=otherComponents;
            break;
    }
    for(let i=0;i<7;i++){
        buyNum++;
        if(rowNum==0){
            componentCardRow=document.createElement("div");
            componentCardRow.setAttribute("class","row");
        }
        rowNum++;
        let tempcol = createComponentCard(allItems[i][recommendTypeComponents[i]].img,allItems[i][recommendTypeComponents[i]].name,allItems[i][recommendTypeComponents[i]].price);
        addToPossibleCheckout(allItems[i][recommendTypeComponents[i]].name,allItems[i][recommendTypeComponents[i]].price,allItems[i][recommendTypeComponents[i]].img,buyNum);
        tempPrice+=Number(allItems[i][recommendTypeComponents[i]].price);
        componentCardRow.appendChild(tempcol);
        if(rowNum==2){
            beginnerRecommendedComponents.appendChild(componentCardRow);
            rowNum=0;
        }
        if(i==6){
            let tempcol = createComponentCard("","","");
            componentCardRow.appendChild(tempcol);
            beginnerRecommendedComponents.appendChild(componentCardRow);
            rowNum=0;
        }
    }
    beginnerComponentsPrice.innerHTML=`<b>$ ${tempPrice}</b>`;
    console.log(possibleCheckoutItems);
}
beginnerRecommendationGeneration();
next.href="pre-checkout.html";
next.addEventListener("click",()=>{
    localStorage.setItem("checkoutItems",JSON.stringify(possibleCheckoutItems));
});

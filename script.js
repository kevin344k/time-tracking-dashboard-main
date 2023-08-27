let timeframe = 'weekly'
const menu = document.querySelectorAll(".menu-link")
const container = document.querySelector(".container")
let regularCards;
menu.forEach(element => {
    element.addEventListener('click', menuOnClick)
})

console.log(menu);

let data={};

fetch("./data.json")
    .then(resp => resp.json())
    .then(jsonData => {
 //create cards

        jsonData.forEach(element => {
            
          console.log(element);
          container.insertAdjacentHTML('beforeend',
          createCards(element,timeframe))
            

        })
       
        //convert array to dict
        jsonData.forEach(element => {
            data[element.title] = element.timeframes;
        });
regularCards=document.querySelectorAll('.regular-card')
console.log(regularCards);      
    })



function menuOnClick(event) {
    menu.forEach(element => {
        element.classList.remove('menu-active')
    })
    event.target.classList.add('menu-active')
    timeframe = event.target.innerText.toLowerCase()
    console.log(timeframe);

    updateCards(timeframe)

}

function updateCards(timeframe) {
    regularCards.forEach(card=>{
        
        updateCard(card,timeframe)
    })
}

function updateCard(card,timeframe) {
    const title=card.querySelector('.title').innerText;
    const current=data[title][timeframe]['current']
    const previous=data[title][timeframe]['previous'] 
console.log(data);
    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    const hoursElement=card.querySelector('.hours')
    hoursElement.innerText=`${current}hrs`

    const descElement=card.querySelector('.last--time')
    descElement.innerText=`${timeframeMsg[timeframe]} - ${previous}hrs`



}
function createCards(element,timeframe) {
    let title = element['title']
    let current = element['timeframes'][timeframe]['current']
    let previous = element['timeframes'][timeframe]['previous']

    const timeframeMsg = {
        'daily': 'Yerterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    }




    return ` 
    <div class="regular-card card--${title.toLowerCase().replace(/\s/g, '')}-header">
    <span class="${title.toLowerCase().replace(/\s/g, '')}-ico"></span>
    <div class="card--work-body">
        <div>
            <p class="title">${title}</p><span class="ico--elipsis"></span>
        </div>
        <div>
            <p class="hours">${current}hrs</p>
            <p class="last--time">${timeframeMsg[timeframe]} - ${previous}</p>
        </div>
    </div>
</div>`
}
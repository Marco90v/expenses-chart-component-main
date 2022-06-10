const li = document.querySelectorAll('main > section > ul > li');
const data = [];
let mayor;

function loadData() {
    li.forEach(item=>{
        const {day, amount} = data.find(ele=>ele.day===item.id) || {day:item.id,amount:0};
        const porcentaje = (amount / mayor) * 100;
        const alto = (porcentaje / 100) * 10;
        if(amount >= mayor) item.className = "max";
        item.insertAdjacentHTML("beforeend",`<span>${day}</span>`);
        item.insertAdjacentHTML("beforeend",`<span>$${amount}</span>`);
        item.style.height = `${alto.toFixed(2)}rem`;
    });
}

async function getData () {
    const dataTemp = await fetch('./data.json',{cache:'no-cache'}).then(e=>e.json());
    mayor = Math.max(...dataTemp.map(item=>item.amount));
    data.push(...dataTemp);
    loadData();
}

getData();
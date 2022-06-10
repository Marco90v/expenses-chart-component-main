const ul = document.querySelector('main > section > ul');
const data = [];
let mayor;

function card({day, amount}) {
    const porcentaje = (amount / mayor) * 100;
    const alto = (porcentaje / 100) * 10;
    const element = `<li class="${amount >= mayor && "max"}" style="height: ${alto.toFixed(2)}rem; " ><span>${day}</span><span>$${amount}</span></li>`;
    return element;
}

function loadData() {
    data.forEach(element => {
        ul.insertAdjacentHTML("beforeend",card(element))
    });
}

async function getData () {
    const dataTemp = await fetch('./data.json',{cache:'no-cache'}).then(e=>e.json());
    mayor = Math.max(...dataTemp.map(item=>item.amount));
    data.push(...dataTemp);
    loadData();
}

getData();
{/*  */}
const tbody = document.querySelector("table").tBodies[0];
const input = document.querySelector("input");

let datas = [];

const fetchData = async ()=>{
    try{
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        const resjson = await response.json();
        datas = [...resjson];
        renderData(datas);
    }catch(err){
        console.log(err);
    }
}

function renderData(datas){
    tbody.innerHTML = "";
    datas.map(data => {
        tbody.innerHTML += `
        <tr> 
        <td class="col1"><img src='${data.image}'>${data.name}</td>
        <td class="col2">${data.symbol.toUpperCase()}</td>
        <td class="col3">${data.current_price}</td>
        <td class="col4">${data.circulating_supply}</td>
        <td class="col5">${data.price_change_percentage_24h.toFixed(2)}%</td>
        <td class="col6">Mkr Cap: ${data.market_cap}</td>
        </tr>
        `;
    });
}

fetchData();

input.addEventListener('input', (event)=>{
    const query = event.target.value.toLowerCase();
    const filteredArray = datas.filter(data => {
        return data.name.toLowerCase().includes(query) || data.symbol.toLowerCase().includes(query);
    })
    renderData(filteredArray);
})

function sort(type){
    switch(type){
        case "sort-mkt-cap":
            datas.sort((a, b)=>{
                return a.market_cap - b.market_cap;
            })
            renderData(datas);
            break;
        case "sort-percent":
            datas.sort((a, b)=>{
                return a.circulating_supply - b.circulating_supply;
            })
            renderData(datas);
            break;
        default:
            return datas;
    }
}
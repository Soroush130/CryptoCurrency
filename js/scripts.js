var coin_list = document.querySelectorAll("table tbody tr");
var box_detail = document.querySelector('.box-detail'),
    icon_close_box_detail = document.querySelector('.fa-align-justify'),
    box_navbar = document.querySelector('.box-navbar-deactive'),
    box_content = document.querySelector('.box-content-deactive');


icon_close_box_detail.addEventListener('click', function(){
    icon_close_box_detail.classList.remove('fa-align-justify-rotate');
    if(box_detail.classList.contains('box-detail-active')){
        box_detail.classList.remove('box-detail-active');
        box_detail.classList.remove('box-detail');
        box_detail.classList.add('box-detail-deactive');

        
        setTimeout(()=>{
            box_navbar.classList.add('box-navbar-deactive');
            box_content.classList.add('box-content-deactive');
            box_navbar.classList.remove('box-navbar');
            box_content.classList.remove('box-content');
        }, 600)
    };
});

function ShowBox(e){
    var type = e.getAttribute('data-type');
    var childrens = document.querySelector('.box-content').children;
    for(let item of childrens){
        if(item.getAttribute('data-type')===type){
            item.style.display = 'flex'
 
        }else{
            item.style.display = 'none'
 
        };
    };
};

function ShowDetail(coin){  
    var coin_name = coin.getAttribute('id');  // bitcoin or tether or USD coin or ...

    // open box detail
    OpenBoxDetail();

    // send request and get data for show detail coin
    GetDataCoin(coin_name);

    // send request and get data for make chart change price
    ChartPrice(coin_name);
};

// Get List Coins
async function GetListCoin(){
    //{id: '01coin', symbol: 'zoc', name: '01coin'}
    const api_url = 'https://api.coingecko.com/api/v3/coins/list';
    const response = await fetch(api_url);
    const data = await response.json();
    var coins = document.querySelector('#coins');
    var index=0;
    for(let coin of data){
        if(index<11){
            var coin_name = coin['name'],
            coin_symbol = coin['symbol'],
            coin_id = coin['id'];
            coins.innerHTML += `
                <tr id="COINID" onclick="ShowDetail(this)">
                    <td>
                        <img src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579" alt="">
                        <p>COINNAME</p>
                        <span>COINSYMBOL</span>
                    </td>
                    <td>
                        $21,335.44
                    </td>
                    <td>
                        -0.3%
                    </td>
                    <td>
                        -0.1%
                    </td>
                    <td>
                        -10.8%
                    </td>
                </tr> 
            `.replace('COINID', coin_id).replace('COINNAME',coin_name).replace('COINSYMBOL',coin_symbol)
        };
        index += 1;
    };
    
}
// GetListCoin()

// Getting the information of a coin
async function GetDataCoin(coin_name){
    const api_url = "https://api.coingecko.com/api/v3/coins/" + coin_name;
    const response = await fetch(api_url);
    const data = await response.json();

    var path_image = data.image['large'];
    var name = data.name;
    var symbol = data.symbol;
    var category = data.category;
    var circulating_supply = data.market_data['circulating_supply'];
    var total_supply = data.market_data['total_supply'];
    var max_supply = data.market_data['max_supply'];
    var fully_diluted_valuation = data.market_data['fully_diluted_valuation']['usd'];
    var current_price = data.market_data['current_price']['usd'];
    var high_24h_price = data.market_data['high_24h']['usd'];
    var low_24h_price = data.market_data['low_24h']['usd'];
    var market_cap = data.market_data['market_cap']['usd'];
    var price_change_percent_1h = data.market_data['price_change_percentage_1h_in_currency']['usd'];
    var price_change_percent_24h = data.market_data['price_change_percentage_24h'];
    var price_change_percent_7d = data.market_data['price_change_percentage_7d'];
    var price_change_percent_14d = data.market_data['price_change_percentage_14d'];
    var price_change_percent_30d = data.market_data['price_change_percentage_30d'];
    var price_change_percent_1y = data.market_data['price_change_percentage_1y'];
    ///////

    var img_coin = document.querySelector('.info-coin img');
    var title_coin = document.querySelector('.info-coin .title-coin');
    var current_price_coin = document.querySelector('.price-coin p');
    var status_price_coin = document.querySelector('.price-coin .status-price-coin');
    var status_1h_coin = document.querySelector('._1h h5');
    var status_24h_coin = document.querySelector('._24h h5');
    var status_7d_coin = document.querySelector('._7d h5');
    var status_14d_coin = document.querySelector('._14d h5');
    var status_30d_coin = document.querySelector('._30d h5');
    var status_1y_coin = document.querySelector('._1y h5');

    var market_cap_coin = document.querySelector('.info-Market-Cap h5');
    var info_24_Hour_Trading_Vol_coin = document.querySelector('.info-24-Hour-Trading-Vol h5');
    var info_Fully_Diluted_Valuation_coin = document.querySelector('.info-Fully-Diluted-Valuation h5');
    var info_Circulating_Supply_coin = document.querySelector('.info-Circulating-Supply h5');
    var info_Total_Supply_coin = document.querySelector('.info-Total-Supply h5');
    var info_Max_Supply_coin = document.querySelector('.info-Max-Supply h5');
    //////


    img_coin.src = path_image;
    title_coin.innerHTML = name + " ( " + symbol.toUpperCase() + " )";
    current_price_coin.innerHTML = "$ "+ current_price.toLocaleString('en-US');
    
    if(price_change_percent_24h<0){
        status_price_coin.innerHTML = '';
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-down';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_24h)) + " %")
        status_price_coin.appendChild(icon);
        status_price_coin.appendChild(price_percent)
    }else{
        status_price_coin.innerHTML = '';
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-up';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_24h)) + " %")
        status_price_coin.appendChild(icon);
        status_price_coin.appendChild(price_percent)
    };

    status_1h_coin.innerHTML = "";
    if(price_change_percent_1h<0){
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-down';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_1h)) + " %");
        status_1h_coin.appendChild(icon);
        status_1h_coin.appendChild(price_percent);
    }else{
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-up';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_1h)) + " %");
        status_1h_coin.appendChild(icon);
        status_1h_coin.appendChild(price_percent);
    };

    status_24h_coin.innerHTML = "";
    if(price_change_percent_24h<0){
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-down';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_24h)) + " %");
        status_24h_coin.appendChild(icon);
        status_24h_coin.appendChild(price_percent);
    }else{
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-up';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_24h)) + " %");
        status_24h_coin.appendChild(icon);
        status_24h_coin.appendChild(price_percent);
    };


    status_7d_coin.innerHTML = "";
    if(price_change_percent_7d<0){
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-down';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_7d)) + " %");
        status_7d_coin.appendChild(icon);
        status_7d_coin.appendChild(price_percent);
    }else{
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-up';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_7d)) + " %");
        status_7d_coin.appendChild(icon);
        status_7d_coin.appendChild(price_percent);
    };

    status_14d_coin.innerHTML = "";
    if(price_change_percent_14d<0){
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-down';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_14d)) + " %");
        status_14d_coin.appendChild(icon);
        status_14d_coin.appendChild(price_percent);
    }else{
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-up';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_14d)) + " %");
        status_14d_coin.appendChild(icon);
        status_14d_coin.appendChild(price_percent);
    };

    status_30d_coin.innerHTML = "";
    if(price_change_percent_30d<0){
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-down';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_30d)) + " %");
        status_30d_coin.appendChild(icon);
        status_30d_coin.appendChild(price_percent);
    }else{
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-up';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_30d)) + " %");
        status_30d_coin.appendChild(icon);
        status_30d_coin.appendChild(price_percent);
    };

    status_1y_coin.innerHTML = "";
    if(price_change_percent_1y<0){
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-down';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_1y)) + " %");
        status_1y_coin.appendChild(icon);
        status_1y_coin.appendChild(price_percent);
    }else{
        var icon = document.createElement('i');
        icon.className = 'fa fa-arrow-up';
        var price_percent = document.createTextNode(String(Math.abs(price_change_percent_1y)) + " %");
        status_1y_coin.appendChild(icon);
        status_1y_coin.appendChild(price_percent);
    };


    market_cap_coin.innerHTML = "$"+ market_cap.toLocaleString('en-US');

    if(fully_diluted_valuation !== undefined){
        info_Fully_Diluted_Valuation_coin.innerHTML = "$"+fully_diluted_valuation.toLocaleString('en-US');
    }else{
        info_Fully_Diluted_Valuation_coin.innerHTML = "-";
    };

    info_Circulating_Supply_coin.innerHTML = circulating_supply.toLocaleString('en-US');

    info_Total_Supply_coin.innerHTML = total_supply.toLocaleString('en-US');

    if(max_supply !== null){
        info_Max_Supply_coin.innerHTML = max_supply.toLocaleString('en-US');
    }else{
        info_Max_Supply_coin.innerHTML = "∞";
    };
    
}


///////////////////////////////  Start section Chart  ///////////////////////////////////
function ChartPrice(coin){
    var content_chat = document.querySelector('.content-chart');
    content_chat.innerHTML = '';
    var canvasTag = document.createElement('canvas');
    canvasTag.setAttribute('id', 'myChart');
    content_chat.appendChild(canvasTag)

    
    setTimeout(()=>{
        GetDataPriceChart(coin).then(function(result){
            var label_date = result[0];
            var price_date = result[1];
    
            const ctx = document.getElementById('myChart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: label_date,
                    datasets: [{
                        label: 'Price',
                        data: price_date,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1
                    }]
                },
            });
    
    
        }).catch(error=>{
            console.log(error);
        });
    }, 50)

};

// get data price coin 
async function GetDataPriceChart(coin_name){
    const api_url = "https://api.coingecko.com/api/v3/coins/" + coin_name + "/market_chart?vs_currency=usd&days=1";
    // Making an API call (request)
    // and getting the response back
    const response = await fetch(api_url);
 
    // Parsing it to JSON format
    const data = await response.json();
    // console.log(data);
    const prices = data.prices;
    const total_volumes = data.total_volumes;

    const labels_data = NewFormatDate(prices); // outuput : for labels chart
    // console.log(labels_data);
    const price_data = GetPrice(prices);
    // console.log(price_data);
    return [labels_data, price_data]
}

function NewFormatDate(date_list){
    var new_labels = [];
    for(let date of date_list){
        var newDate = new Date(date[0]);
        // console.log(newDate);
        var new_format_date = newDate.getMonth() + '/' + newDate.getDay() + '/' + newDate.getFullYear() + " " + newDate.getHours() + ':' + newDate.getMinutes() + ":" + newDate.getSeconds();
        // console.log(new_format_date);
        new_labels.push(new_format_date)
    }
    return new_labels
};

function GetPrice(data_list){
    var prices = []
    for(let price of data_list){
        prices = prices.concat([price[1]])
    }
    return prices
};
/////////////////////////////// Finish section Chart //////////////////////////////////////


function OpenBoxDetail(){
    if(!box_detail.classList.contains('box-detail-active')){
        box_detail.classList.remove('box-detail-deactive');
        box_detail.classList.add('box-detail');
        box_detail.classList.add('box-detail-active');
        icon_close_box_detail.classList.add('fa-align-justify-rotate');

        box_navbar.classList.remove('box-navbar-deactive');
        box_content.classList.remove('box-content-deactive');
        box_navbar.classList.add('box-navbar');
        box_content.classList.add('box-content');
    };
};
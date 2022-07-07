const graph=document.getElementById('chart')

 

function makeGraph(priceData){

    var dates=Object.keys(priceData[Object.keys(priceData)[1]]).slice(0,30)
    const finalDates=[]
    const closePrices=[]
    const ohlc=[]
    for (i of dates){
        finalDates.push(i.slice(5,10))
        closePrices.push(priceData[Object.keys(priceData)[1]][i]['4. close'])
        let obj={}
        obj['x']=i.slice(5,10)
        obj['y']=[priceData[Object.keys(priceData)[1]][i]['1. open'], priceData[Object.keys(priceData)[1]][i]['2. high'], priceData[Object.keys(priceData)[1]][i]['3. low'], priceData[Object.keys(priceData)[1]][i]['4. close']]
        ohlc.push(obj)
    }
    console.log(finalDates)
    console.log(closePrices)
    document.getElementById("price").innerHTML='₹'+closePrices[0].toString()
    const change=((closePrices[0]-closePrices[closePrices.length-1])*100/closePrices[0]).toFixed(2)+'%'
    document.getElementById('updown').innerHTML=change
    if (change[0]=='-'){
        document.getElementById('updown').style.color='#e74c3c'
    }else{
        var newCh='+'+document.getElementById('updown').innerHTML
        document.getElementById('updown').innerHTML=newCh
        document.getElementById('updown').style.color='#4cd137'
    }

    var optionsSingleLine={
        chart:{
            type:'line'
        },
        series:[{
            name:'closePrices',
            data:closePrices.reverse()
        }],
        xaxis:{
            categories:finalDates.reverse()
        }
    }

    var optionsCandle={
        chart:{
            type:'candlestick',
            height:350
        },
        series:[{
            name:'candle',
            // data:ohlc.reverse()
            data:ohlc.reverse()
        }],
        xaxis:{
            categories:finalDates.reverse()
        }
    }
    console.log(ohlc)
    
    graph.innerHTML=''
    let chart1=new ApexCharts(graph, optionsSingleLine)
    let chart2=new ApexCharts(graph, optionsCandle)
    if (document.getElementById('switch').checked==true){
        chart2.render()
    }else if(document.getElementById('switch').checked==false){
        chart1.render()
    }

}


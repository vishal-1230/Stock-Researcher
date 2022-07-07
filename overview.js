async function setOverview(comp='IBM'){
    const response=await fetch(`https://alpha-vantage.p.rapidapi.com/query?function=OVERVIEW&symbol=${comp}`, options)
    const data=await response.json()
    console.log(data)
    const desc=data['Description']
    const yrHigh=data['52WeekHigh']
    const yrLow=data['52WeekLow']
    const eps=data['EPS']
    const pe=data['PERatio']
    const fwdpe=data['ForwardPE']
    const trailpe=data['TrailingPE']
    const divYield=data['DividendYield']
    const exch=data['Exchange']
    const quartEarnYOY=data['QuarterlyEarningsGrowthYOY']
    const quartRevYOY=data['QuarterlyRevenueGrowthYOY']
    const overArray=[yrHigh, yrLow, eps, trailpe, pe, fwdpe, divYield, quartEarnYOY, quartRevYOY]
    const overTitles=['52 Week High', '52 Week Low', 'EPS', 'Trailing PE', 'PE Ratio', 'Forward PE', 'Dividend Yield', 'Quart Earnings YOY', 'Quart Revenue YOY']
    
    const table=document.getElementById('table')
    table.innerHTML=''
    document.getElementById('desc').innerHTML=desc

    const tr2=document.createElement('tr')
    const th2=document.createElement('th')
    th2.appendChild(document.createTextNode('OVERVIEW'))
    th2.style.textAlign='center'
    th2.colSpan=3
    tr2.appendChild(th2)
    table.appendChild(tr2)
    for (i=0; i<3; i++){
        const tr=document.createElement('tr')
        table.appendChild(tr)
        for (i2=0; i2<3; i2++){
            const td=document.createElement('td')
            td.appendChild(document.createTextNode(overTitles[(i*3+i2)]+': '+overArray[(i*3+i2)].toString()))
            tr.append(td)
        }
    }
}

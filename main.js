const apiPath='C:/Users/Vishal/Desktop/Mern/apiKeys.json'
const searchInp=document.getElementById('search')
const searchList=document.getElementById('searchList')
const ul=document.getElementById('ul')
const intrabtn=document.getElementById('intra')
const dailybtn=document.getElementById('daily')
const weeklybtn=document.getElementById('weekly')
const monthlybtn=document.getElementById('monthly')


// BASIC PARAMETERS FOR ALPHA-VANTAGE API THROUGH RAPID-API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key':'288d4fa6f1msh340b04a3ab0076ap1d923bjsn6b1789362fe1',
		'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
	}
}


// SEARCH BAR LIST, AND PROCEDURE OF DATA AND GRAPH UPDATION AFTER SELECTING AN OPTION
function updateList(){
	searchList.style.display='block'
	ul.innerHTML=''
	var list=[]
	async function searchSymb(){
		const resp=await fetch(`https://alpha-vantage.p.rapidapi.com/query?function=SYMBOL_SEARCH&keywords=${searchInp.value}`, options)
		const data=await resp.json()
		for (i=0; i<Object.keys(data.bestMatches).length; i++){
			if (data.bestMatches[i]['3. type']=='Equity'){
				list.push(data.bestMatches[i]['1. symbol']+" "+" "+" "+data.bestMatches[i]['2. name'])
				console.log(data.bestMatches[i]['1. symbol']+" "+" "+" "+data.bestMatches[i]['2. name'])
			}
		}
	
		for (i=0; i<list.length; i++){
			const li=document.createElement('li')
			const btn=document.createElement('button')

			btn.appendChild(document.createTextNode(list[i]))
			btn.style.fontFamily='Quicksand'
			btn.style.fontWeight=400
			li.appendChild(btn)
			ul.appendChild(li)

			let symb=list[i].slice(0, list[i].indexOf(" "))
			let baakiname=list[i].slice(list[i].indexOf(" "), list[i].length)
			btn.onclick=() => {
				getPrice(symb)
				document.getElementById('symbol').innerHTML=symb+":"+" "+baakiname
			
			}
			btn.style.backgroundColor='transparent'
			btn.style.border='none'
			btn.style.borderBottomStyle='solid'
			btn.style.borderWidth='0.5px'
			ul.style.padding='0'
			ul.style.marginBottom='0'
			li.style.listStyle='none'
			li.style.marginLeft='0'
			li.style.left='0'
			btn.style.width='500px'
			btn.style.height='40px'
		}
	}
	searchSymb()

	// DISAPPEARING OF SEARCH LIST
	searchInp.onblur=() => {
		searchList.onpointerleave=() => {
			searchList.style.display='none'
		}
	}
}


searchInp.onkeyup=updateList


// GETTING PRICE INFO AND UPADTING GRAPH & DATA
async function getPrice(comp, timeInt='TIME_SERIES_DAILY'){
	const response=await fetch(`https://alpha-vantage.p.rapidapi.com/query?interval=5min&function=${timeInt}&symbol=${comp}&datatype=json&output_size=compact`, options)
	const data=await response.json()
	console.log(data)
	makeGraph(data)
	document.getElementById('switch').onchange=() => {
		makeGraph(data)
	}
	setOverview(comp)
}



// TIME INTERVAL SELECTION
// 
intrabtn.onclick=() => {
	if (document.getElementById('symbol').innerHTML!=''){
		if (symb1.innerHTML.includes('BSE')){
			alert("Sorry, Intraday Prices Not Available For BSE Stocks")
		}else{
			const symb1=document.getElementById('symbol').innerHTML.slice(0, document.getElementById('symbol').innerHTML.indexOf(':'))
			getPrice(symb1, 'TIME_SERIES_INTRADAY')
			console.log(symb1+"-_-_-_-_-")

		}
	}else{
		alert('No Stock Selected')
	}
}
dailybtn.onclick=() => {
	if (document.getElementById('symbol').innerHTML!=''){
		const symb1=document.getElementById('symbol').innerHTML.slice(0, document.getElementById('symbol').innerHTML.indexOf(':'))
		getPrice(symb1, 'TIME_SERIES_DAILY')
		console.log(symb1+"-_-_-_-_-")

	}else{
		alert('No Stock Selected')
	}
}
weeklybtn.onclick=() => {
	if (document.getElementById('symbol').innerHTML!=''){
		const symb1=document.getElementById('symbol').innerHTML.slice(0, document.getElementById('symbol').innerHTML.indexOf(':'))
		getPrice(symb1, 'TIME_SERIES_WEEKLY')
		console.log(symb1+"-_-_-_-_-")
	}else{
		alert('No Stock Selected')
	}
}
monthlybtn.onclick=() => {
	if (document.getElementById('symbol').innerHTML!=''){
		const symb1=document.getElementById('symbol').innerHTML.slice(0, document.getElementById('symbol').innerHTML.indexOf(':'))
		getPrice(symb1, 'TIME_SERIES_MONTHLY')
		console.log(symb1+"-_-_-_-_-")
	}else{
		alert('No Stock Selected')
	}
}

// 
// 
// UPDATING SENSEX, NIFTY && BASIC INFO LIKE PE RATION, EPS ETC. && NEWS+SENTIMENTS
// 
// 

if (document.getElementById('symbol').innerHTML==''){
	const img=document.getElementById('graphImg')
	img.style.width='900px'
	img.style.height='559px'
	img.src='noGraph.jpg'
}

//
//
//
//
// NEWS AND SENTIMENTS

async function news(){
	const response=await fetch('https://alpha-vantage.p.rapidapi.com/query?function=NEWS_SENTIMENT', options)
	const data = await response.json()
	console.log(data)
	let news={}
	for (i=0; i<data['feed'].length; i++){
		news[data['feed'][i]['title']]=data['feed'][i]['url']
	}
	console.log(news)
	const newsBox=document.getElementById('news')
	const ul2=document.createElement('ul')
	newsBox.appendChild(ul2)
	for (i=0; i<Object.keys(news).length; i++){
		const li=document.createElement('li')
		const link=document.createElement('a')
		link.appendChild(document.createTextNode(Object.keys(news)[i]))
		link.href=news[Object.keys(news)[i]]
		link.target='_blank'
		li.appendChild(link)
		ul2.appendChild(li)
	}
}

news()
![2022-07-07 (4)](https://user-images.githubusercontent.com/45381049/180635850-77fa0771-d3ad-4e41-873c-64f3a14a1152.png)
![2022-07-07 (3)](https://user-images.githubusercontent.com/45381049/180635853-352bb450-6237-4f2b-926b-76b1b50b8428.png)


This is a Stock Researcher Website. I've mainly worked on frontend (not responsive) with JS only i.e no library or framework.
For rendering the graph, I've used Apex Graphs API, which I found very useful and easy to use.
For getting the stock data, I've used Alpha-Vantage API. I just had the free subscription of the API, so I'm restricted to 5 API calls per minute. That's why you've to wait for a minute before searching for another stock.
(Each letter typed in search box, calls the api. One call is made for getting the news & sentiments and two calls are made when you search for the stock to get price data & overview of company)

LEARNINGS:
I learnt to work with public APIs, how to fetch them, how to extract the json data, how async await works. Also learnt about get and post requests a little bit.

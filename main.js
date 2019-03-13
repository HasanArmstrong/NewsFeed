"use strict";

let resulted;
let sourceName;

let news = [];
let pageNumber = 1;
let onlyBBC = false;

function incrementPageNumber() {
    pageNumber+=1;
    fetchNews();
}

async function fetchNews(){
    let url= 'https://newsapi.org/v2/top-headlines?country=us&apiKey=7c655dd2f55140f289bfc6a9ef8fd83b&pageSize=10&page=' + pageNumber;
    let results = await fetch(url);
    let data = await results.json();
  
    news = news.concat(data.articles);
    resulted= data.totalResults;

    // let bbcArticles = news.filter(a => a.source.id == "bbc-news");
    // let cnnArticles = news.filter(a => a.source.id == "cnn");
    // let spiegel = news.filter(a => a.source.id == "spiegel-de");

 

 
    // sourceName= data.articles.name;

    render();
}

// The user can see a checkbox for every unique source of the articles loaded. For example, if the user loads four stories, 
// and two stories are from bbc-news, one from cnn, and one from spiegel-de, the user would see three checkboxes: bbc-news, cnn, spiegel-de. 

function render() {
    let numberOfArticles = news.length;
    document.getElementById("totalNumberOfStories").innerHTML= `<b>Total Results:</b> ${resulted}`;
    document.getElementById("numberOfStoriesShowing").innerHTML= `<b>Number of Stories Displayed:</b> ${numberOfArticles}`;

    let articles;

    if(onlyBBC) {
        articles = news.filter(a => a.source.name == "Politico");
    } else {
        articles = news;
    }

    document.getElementById("news-stories").innerHTML= articles.map( article => `
    <div class="row">
    
            <h3>${article.title}</h3>
            
        </div>
            <div class="custom-text">
            <p>${article.source.name}</p>
            <div class="row">
            <img src="${article.urlToImage}">
            <p class="desc">${article.description}</p>
            </div>
            <p>${moment(article.publishedAt).fromNow()}</p>
        </div>`).join(" ")

    document.getElementById("load-more").innerHTML=`<p style="text-align:center" onclick="incrementPageNumber()">Load More</a></p>`

}

fetchNews();

let checkbox = document.getElementById("check");

checkbox.addEventListener( 'change', () => {
    if(checkbox.checked == true) {
        onlyBBC = true;
    } else if (checkbox.checked == false) {
        onlyBBC = false;
    }
    render();
});

checkbox.addEventListener( 'change', () => onlyBBC = checkbox.checked);
 
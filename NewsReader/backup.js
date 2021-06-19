// Zastarjele funkcije i sl. koje služe kao backup ukoliko nešto zeznem pa ne znam vratit kako je bilo
const allFeed = function () {
  if (
    document.getElementById("klix").checked === true &&
    klixTurnedOn === false
  ) {
    klixTurnedOn = true;
    const RSS_URL = `https://www.klix.ba/rss`;
    fetch(RSS_URL)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("item");
        let html = ``;
        /*html += `<h2>${data.querySelector("title").innerHTML}</h2>`;
          html += `<p>${data.querySelector("description").innerHTML}</p>`;*/
        html += `<div class ="feeds">`;
        items.forEach((el) => {
          html += `
              <klixArticle>
                <h3>
                <img src="ico/klix.ico" width="16" height="16">
                  <a href="${
                    el.querySelector("link").innerHTML
                  }" target="_blank" rel="noopener"> ${
            el.querySelector("title").innerHTML
          }</a>
                </h3>
              </klixArticle>`;
        });
        html += `</div>`;
        document.body.insertAdjacentHTML("beforeend", html);
      });
  } else if (
    document.getElementById("klix").checked === false &&
    klixTurnedOn === true
  ) {
    klixTurnedOn = false;
    const articles = document.querySelectorAll("klixArticle");
    articles.forEach((e) => e.parentNode.removeChild(e));
  }

  if (
    document.getElementById("cnbc").checked === true &&
    cnbcTurnedOn === false
  ) {
    cnbcTurnedOn = true;
    const RSS_URL = `https://www.cnbc.com/id/100003114/device/rss/rss.html`;
    fetch(RSS_URL)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("item");
        let html = ``;
        /*html += `<h2>${data.querySelector("title").innerHTML}</h2>`;
          html += `<p>${data.querySelector("description").innerHTML}</p>`;*/
        html += `<div class ="feeds">`;
        items.forEach((el) => {
          html += `
              <cnbcArticle>
                <h3>
                <img src="ico/cnbc.ico" width="20" height="20">
                  <a href="${
                    el.querySelector("link").innerHTML
                  }" target="_blank" rel="noopener"> ${
            el.querySelector("title").innerHTML
          }</a>
                </h3>
              </cnbcArticle>`;
        });
        html += `</div>`;
        document.body.insertAdjacentHTML("beforeend", html);
      });
  } else if (
    document.getElementById("cnbc").checked === false &&
    cnbcTurnedOn === true
  ) {
    cnbcTurnedOn = false;
    const articles = document.querySelectorAll("cnbcArticle");
    articles.forEach((e) => e.parentNode.removeChild(e));
  }
};



// Fetch feed backup zbog darkmoda

const fetchFeed = function (url,source,heading){
  let brojVijesti = document.getElementById("brojVijesti").value;

  // Oslobođenje ima najviše 10 artikala u svom RSS Feedu, zbog čega za oslobođenje broj vijesti smanjimo na 10 ukoliko je unešena vrijednost veća
  if((source === "osloKat1" || source === "osloKat2") && brojVijesti > 10){
    brojVijesti = 10;
  }
  
  const RSS_URL = url;
    fetch(RSS_URL)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((data) => {
        const items = data.querySelectorAll("item");
        console.log(items);
        let html = ``;
        html += `<div class ="feeds" id="feeds">`;
        html += `<h2>${heading}</h2>`
        // Listanje vijesti - Urađeno u for petlji, a prije je bilo u forEach. For petlja radi mogucnosti modifikovanja broja vijesti
        for(i=0;i<brojVijesti;i++){
            html += `
              <article id="article">
                <img src="ico/${source}.ico" width="16" height="16">
                  <a href="${items[i].querySelector("link").innerHTML}" target="_blank" rel="noopener">${items[i].querySelector("title").innerHTML}</a>
                  <p>${items[i].querySelector("pubDate").innerHTML}</p>
              </article>`;
        }
        html += `</div>`;
        document.body.insertAdjacentHTML("beforeend", html);
      });
}

// Allfeed backup zbog uklanjanja TurnedOn varijabli
let klixTurnedOn = false;
let cnbcTurnedOn = false;
let osloKat1TurnedOn=false;
let osloKat2TurnedOn=false;
let tuzlanskiTurnedOn=false;
let nytTurnedOn=false;
let nytSportTurnedOn=false;
let nytBizTurnedOn=false;
let cnbcBizTurnedOn=false;
let yahooTurnedOn = false;
let yahooSportTurnedOn = false;
let yahooBizTurnedOn = false;
const allFeed = function () {
  /*RESET Artikala - Prije rađeno kao else if, ali bolja funkcionalnost ovako, jer se svaki put resetuje stranica i može se modifikovati broj
    i izvor vijesti on the fly */
  /*
  /* Novi RESET - Umjesto artikala preko funkcije uklanjamo citav feeds div kako ne bi ostajali tragovi stilizovanog div-a na stranici
      Prije rađeno preko querySelectorAll i forEach petlje, i posebno za sve artikle, što bi zahtijevalo da za svaki izvor dodamo dvije linije koda*/
  
  removeElementsByClass("feeds");
  klixTurnedOn=false;
  cnbcTurnedOn=false;
  osloKat1TurnedOn=false;
  osloKat2TurnedOn=false;
  tuzlanskiTurnedOn=false;
  nytTurnedOn=false;
  nytSportTurnedOn=false;
  nytBizTurnedOn=false;
  cnbcBizTurnedOn=false;
  yahooTurnedOn = false;
  yahooSportTurnedOn = false;
  yahooBizTurnedOn = false;
  // KLIX
  if (document.getElementById("klix").checked === true && klixTurnedOn === false) {
    klixTurnedOn = true;
    fetchFeed('https://www.klix.ba/rss','klix', 'KLIX');
  } 
  // CNBC 
  if (document.getElementById("cnbc").checked === true && cnbcTurnedOn === false) {
    cnbcTurnedOn = true;
    fetchFeed('https://www.cnbc.com/id/100727362/device/rss/rss.html','cnbc', 'CNBC');
  } 
  // Oslobođenje Vijesti Kategorija 1
  if (document.getElementById("osloKat1").checked === true && osloKat1TurnedOn === false) {
    osloKat1TurnedOn = true;
    fetchFeed('https://www.oslobodjenje.ba/feed/category/1','osloKat1', 'Oslobođenje VIJESTI');
  } 
  // Oslobođenje Vijesti Kategorija 2 - Sport
  if (document.getElementById("osloKat2").checked === true && osloKat2TurnedOn === false) {
    osloKat2TurnedOn = true;
    fetchFeed('https://sport1.oslobodjenje.ba/s1/feed/category/300000','osloKat2', 'Oslobođenje SPORT');
  } 
  // Tuzlanski.ba
  if (document.getElementById("tuzlanski").checked === true && tuzlanskiTurnedOn === false) {
    tuzlanskiTurnedOn = true;
    fetchFeed('http://tuzlanski.ba/feed/','tuzlanski', 'Tuzlanski.ba');
  } 
  // NYTimes Pocetna stranica Vijesti
  if (document.getElementById("nyt").checked === true && nytTurnedOn === false) {
    nytTurnedOn = true;
    fetchFeed('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml','nyt', 'NYTimes');
  } 
  // NYTimes sport: https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml
  if (document.getElementById("nytSport").checked === true && nytSportTurnedOn === false) {
    nytSportTurnedOn = true;
    fetchFeed('https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml','nytSport', 'NYTimes Sport');
  } 
  // NYTimes Business
  if (document.getElementById("nytBiz").checked === true && nytBizTurnedOn === false) {
    nytBizTurnedOn = true;
    fetchFeed('https://rss.nytimes.com/services/xml/rss/nyt/Business.xml','nytBiz', 'NYTimes Business');
  } 
  //CNBC Business
  if (document.getElementById("cnbcBiz").checked === true && cnbcBizTurnedOn === false) {
    cnbcBizTurnedOn = true;
    fetchFeed('https://www.cnbc.com/id/10001147/device/rss/rss.html','cnbcBiz', 'CNBC Business');
  } 

  // Yahoo News: https://news.yahoo.com/rss
  if (document.getElementById("yahoo").checked === true && yahooTurnedOn === false) {
    yahooTurnedOn = true;
    fetchFeed('https://news.yahoo.com/rss','yahoo', 'Yahoo!');
  } 

  // Yahoo Sport: https://sports.yahoo.com/rss/
  if (document.getElementById("yahooSport").checked === true && yahooSportTurnedOn === false) {
    yahooSportTurnedOn = true;
    fetchFeed('https://sports.yahoo.com/rss/','yahooSport', 'Yahoo! Sport');
  } 

  // Yahoo Finance: https://finance.yahoo.com/news/rssindex
  if (document.getElementById("yahooBiz").checked === true && yahooBizTurnedOn === false) {
    yahooBizTurnedOn = true;
    fetchFeed('https://finance.yahoo.com/news/rssindex','yahooBiz', 'Yahoo! Business');
  } 
};
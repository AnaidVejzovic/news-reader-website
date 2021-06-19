// Funkcija koja sprema odabrane izvore, broj artikala i da li je ukljucen darkmode. 
// Funkciju poziva dugme "Feed", a funkcija poziva allFeed funkciju
const saveAndFeed = function (){
  // Postavlja true ili false vrijednosti na Checked varijable u memoriji
    localStorage.setItem("klixChecked", document.getElementById("klix").checked);
    localStorage.setItem("cnbcChecked", document.getElementById("cnbc").checked);
    localStorage.setItem("osloKat1Checked", document.getElementById("osloKat1").checked);
    localStorage.setItem("osloKat2Checked", document.getElementById("osloKat2").checked);
    localStorage.setItem("tuzlanskiChecked", document.getElementById("tuzlanski").checked);
    localStorage.setItem("nytChecked", document.getElementById("nyt").checked);
    localStorage.setItem("nytSportChecked", document.getElementById("nytSport").checked);
    localStorage.setItem("nytBizChecked", document.getElementById("nytBiz").checked);
    localStorage.setItem("cnbcBizChecked", document.getElementById("cnbcBiz").checked);
    localStorage.setItem("yahooChecked", document.getElementById("yahoo").checked);
    localStorage.setItem("yahooSportChecked", document.getElementById("yahooSport").checked);
    localStorage.setItem("yahooBizChecked", document.getElementById("yahooBiz").checked);

    // Postavlja broj vijesti u memoriji na osnovu number inputa na stranici
    localStorage.setItem("articleNumber",document.getElementById("brojVijesti").value);

    // Postavlja true ili false vrijednost na darkModeOn varijablu u memoriji
    if(document.getElementById("body").classList.contains("dark")){
      localStorage.setItem("darkModeOn", "true");
    }
    else{
      localStorage.setItem("darkModeOn", "false")
    }
    // Nakon spremanja preferenci poziva allFeed funkciju
    allFeed();
    closeNav();
}

// Učitava spremljene preference iz memorije. Poziva se sa allFeed funkcijom, tj. svaki put kad se pritisne "Feed" ili refresh
const load = function (){
  // Klix load
  if (localStorage.getItem('klixChecked') === "true") {
    document.getElementById("klix").checked=true;
  }
  else{
    document.getElementById("klix").checked=false;
  }
  // cnbc load
  if (localStorage.getItem('cnbcChecked') === "true") {
    document.getElementById("cnbc").checked=true;
  }
  else{
    document.getElementById("cnbc").checked=false;
  }
  // Oslobodjenje Vijesti load
  if (localStorage.getItem('osloKat1Checked') === "true") {
    document.getElementById("osloKat1").checked=true;
  }
  else{
    document.getElementById("osloKat1").checked=false;
  }
  // Oslobodjenje Sport load
  if (localStorage.getItem('osloKat2Checked') === "true") {
    document.getElementById("osloKat2").checked=true;
  }
  else{
    document.getElementById("osloKat2").checked=false;
  }
  // Tuzlanski load
  if (localStorage.getItem('tuzlanskiChecked') === "true") {
    document.getElementById("tuzlanski").checked=true;
  }
  else{
    document.getElementById("tuzlanski").checked=false;
  }
  // NYTimes load
  if (localStorage.getItem('nytChecked') === "true") {
    document.getElementById("nyt").checked=true;
  }
  else{
    document.getElementById("nyt").checked=false;
  }
  // NYTimes Sport Load
  if (localStorage.getItem('nytSportChecked') === "true") {
    document.getElementById("nytSport").checked=true;
  }
  else{
    document.getElementById("nytSport").checked=false;
  }
  // NYTimes Business load
  if (localStorage.getItem('nytBizChecked') === "true") {
    document.getElementById("nytBiz").checked=true;
  }
  else{
    document.getElementById("nytBiz").checked=false;
  }
  // CNBC Business load
  if (localStorage.getItem('cnbcBizChecked') === "true") {
    document.getElementById("cnbcBiz").checked=true;
  }
  else{
    document.getElementById("cnbcBiz").checked=false;
  }
  // Yahoo Load
  if (localStorage.getItem('yahooChecked') === "true") {
    document.getElementById("yahoo").checked=true;
  }
  else{
    document.getElementById("yahoo").checked=false;
  }
  // Yahoo Sport Load
  if (localStorage.getItem('yahooSportChecked') === "true") {
    document.getElementById("yahooSport").checked=true;
  }
  else{
    document.getElementById("yahooSport").checked=false;
  }
  // Yahoo Business Load
  if (localStorage.getItem('yahooBizChecked') === "true") {
    document.getElementById("yahooBiz").checked=true;
  }
  else{
    document.getElementById("yahooBiz").checked=false;
  }
  // Loadanje Broja vijesti iz memorije
  document.getElementById("brojVijesti").value = localStorage.getItem('articleNumber');

  // Pali se darkmode ukoliko je ukljucen u memoriji
  // Kako bi se izbjeglo gasenje DarkModea, ubacen je drugi uslov koji osigurava da se darkMode funkcija ne pokrene ukoliko je darkmode vec upaljen
  if(localStorage.getItem("darkModeOn") === "true" && !document.getElementById("body").classList.contains("dark")){
    darkMode();
  }
}



// Glavna funkcija stranice koja se poziva kada se pritisne "FEED" dugme. Preko ove funkcije vučemo RSS feedove za sve potrebne izvore
const allFeed = function () {
  /*RESET Artikala - Prije rađeno kao else if, ali bolja funkcionalnost ovako, jer se svaki put resetuje stranica i može se modifikovati broj
    i izvor vijesti on the fly */
  /*
  /* Novi RESET - Umjesto artikala preko funkcije uklanjamo citav feeds div kako ne bi ostajali tragovi stilizovanog div-a na stranici
      Prije rađeno preko querySelectorAll i forEach petlje, i posebno za sve artikle, što bi zahtijevalo da za svaki izvor dodamo dvije linije koda*/
  
  removeElementsByClass("feeds");

  // Load
  load();

  // KLIX
  if (document.getElementById("klix").checked === true) {
    //fetchFeed('https://www.klix.ba/rss','klix', 'KLIX');
    // Zbog CORS problema sa određenim portalima kao što je klix, fetch moramo uraditi preko servera, tj. preko apache servera sa PHP skriptom
    fetchFeed('http://localhost/CORS/klix.php','klix', 'KLIX');
  } 

  // CNBC 
  if (document.getElementById("cnbc").checked === true) {
    fetchFeed('https://www.cnbc.com/id/100727362/device/rss/rss.html','cnbc', 'CNBC');
  } 
  // Oslobođenje Vijesti Kategorija 1
  // CORS
  if (document.getElementById("osloKat1").checked === true) {
    //fetchFeed('https://www.oslobodjenje.ba/feed/category/1','osloKat1', 'Oslobođenje VIJESTI');
    fetchFeed('http://localhost/CORS/oslo.php','osloKat1', 'Oslobođenje VIJESTI');
  } 
  // Oslobođenje Vijesti Kategorija 2 - Sport
  // CORS
  if (document.getElementById("osloKat2").checked === true) {
    //fetchFeed('https://sport1.oslobodjenje.ba/s1/feed/category/300000','osloKat2', 'Oslobođenje SPORT');
    fetchFeed('http://localhost/CORS/osloSport.php','osloKat2', 'Oslobođenje SPORT');
  } 
  // Tuzlanski.ba
  // CORS
  if (document.getElementById("tuzlanski").checked === true) {
    //fetchFeed('http://tuzlanski.ba/feed/','tuzlanski', 'Tuzlanski.ba');
    fetchFeed('http://localhost/CORS/tuzlanski.php','tuzlanski', 'Tuzlanski.ba');
  } 
  // NYTimes Pocetna stranica Vijesti
  if (document.getElementById("nyt").checked === true) {
    fetchFeed('https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml','nyt', 'NYTimes');
  } 
  // NYTimes sport: https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml
  if (document.getElementById("nytSport").checked === true) {
    fetchFeed('https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml','nytSport', 'NYTimes Sport');
  } 
  // NYTimes Business
  if (document.getElementById("nytBiz").checked === true) {
    fetchFeed('https://rss.nytimes.com/services/xml/rss/nyt/Business.xml','nytBiz', 'NYTimes Business');
  } 
  //CNBC Business
  if (document.getElementById("cnbcBiz").checked === true) {
    fetchFeed('https://www.cnbc.com/id/10001147/device/rss/rss.html','cnbcBiz', 'CNBC Business');
  } 
  // Yahoo News: https://news.yahoo.com/rss
  // CORS
  if (document.getElementById("yahoo").checked === true) {
    //fetchFeed('https://news.yahoo.com/rss','yahoo', 'Yahoo!');
    fetchFeed('http://localhost/CORS/yahoo.php','yahoo', 'Yahoo!');
  } 
  // Yahoo Sport: https://sports.yahoo.com/rss/
  // CORS
  if (document.getElementById("yahooSport").checked === true) {
    //fetchFeed('https://sports.yahoo.com/rss/','yahooSport', 'Yahoo! Sport');
    fetchFeed('http://localhost/CORS/yahooSport.php','yahooSport', 'Yahoo! Sport');
  } 
  // Yahoo Finance: https://finance.yahoo.com/news/rssindex
  // CORS
  if (document.getElementById("yahooBiz").checked === true) {
    //fetchFeed('https://finance.yahoo.com/news/rssindex','yahooBiz', 'Yahoo! Business');
    fetchFeed('http://localhost/CORS/yahooBiz.php','yahooBiz', 'Yahoo! Business');
  } 
};


// Dark mode funkcija - Radi toggle "dark" klase na potrebnim elementima
const darkMode = function () {
  document.getElementById("body").classList.toggle("dark");
  /*document.getElementById("feed").classList.toggle("dark");*/
  
  let articles = document.querySelectorAll("article");
  articles.forEach((e) => e.classList.toggle("dark"));
  const pubDates = document.getElementsByTagName("p");
  for(i=0;i<pubDates.length;i++){
    pubDates[i].classList.toggle("dark");
  }
  console.log("Called");
};

// Fetchfeed funkcija koja se poozove u allfeed funkciji. Napravljena kako bi se smanjila količina koda koja se mora ponavljati za svaki izvor vijesti
//Eg. fetchFeed(https://www.klix.ba/rss, klix);
const fetchFeed = function (url,source,heading){
  let brojVijesti = document.getElementById("brojVijesti").value;

  // RSS Feedovi u većini slučajeva imaju po 30 artikala. Iako neki imaju više, radi izbjegavanja mogućih problema, naš maksimum će biti 30
  if(brojVijesti > 30){
    brojVijesti=30;
  }
  // Oslobođenje ima najviše 10 artikala u svom RSS Feedu, zbog čega za oslobođenje broj vijesti smanjimo na 10 ukoliko je unešena vrijednost veća
  if((source === "osloKat1" || source === "osloKat2") && brojVijesti > 10){
    brojVijesti = 10;
  }
  //NYTimes sport ima najviše 20 artikala u svom RSS Feedu, zbog čega moramo postaviti maksimum od 20 artikala
  if(source === "nytSport" && brojVijesti > 20){
    brojVijesti = 20;
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
        html += `<div class="heading"><img src="ico/${source}.ico" width="16" height="16" id="icon">${heading}</div><br><br>`
        // Listanje vijesti - Urađeno u for petlji, a prije je bilo u forEach. For petlja radi mogucnosti modifikovanja broja vijesti
        // Dodan IF Zbog dark moda - Pri novom feedu, dok je dark mode ukljucen, bi novi feed artikli bili u "light" modeu
        if(document.getElementById("body").classList.contains("dark")){
          for(i=0;i<brojVijesti;i++){
            html += `
              <article id="article" class="dark">
                  <a href="${items[i].querySelector("link").innerHTML}" target="_blank" rel="noopener" class="dark">${items[i].querySelector("title").innerHTML}</a>
                  <p class="dark">${items[i].querySelector("pubDate").innerHTML}</p>
              </article>`;
          }
        }
        else{
          for(i=0;i<brojVijesti;i++){
            html += `
              <article id="article">
                  <a href="${items[i].querySelector("link").innerHTML}" target="_blank" rel="noopener">${items[i].querySelector("title").innerHTML}</a>
                  <p>${items[i].querySelector("pubDate").innerHTML}</p>
              </article>`;
          }
        }
        html += `</div>`;
        document.body.insertAdjacentHTML("beforeend", html);
      });
}


// Uklanjanje elemenata po imenu klase - Koristi se kao reset za sve artikle na stranici
function removeElementsByClass(className){
  var elements = document.getElementsByClassName(className);
  while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
  }
}
//http://localhost/CORS/fetch.php


function openNav() {
  document.getElementById("menu").style.width = "200px";
  document.getElementById("menu").style.padding = "20px";
  //document.getElementById("feeds").style.filter= "blur(3px)";
  const elements = document.getElementsByClassName("feeds");
  for(i=0;i<elements.length;i++){
    elements[i].style.filter = "blur(3px)";
  }
}
function closeNav() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("menu").style.padding = "0px";
  //document.getElementById("feeds").style.filter= "none";
  const elements = document.getElementsByClassName("feeds");
  for(i=0;i<elements.length;i++){
    elements[i].style.filter = "none";
  }
}
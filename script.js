const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
 function loading() {
     loader.hidden = false;
     quoteContainer.hidden = true;
 }

//  hide loading
function complete() {
    loader.hidden = true;
    if (loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    loading();
    const proxyUrl = 'https://serene-waters-10694.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        complete()
        const data = await response.json();
        // throw new Error
        if (data.quoteAuthor) {
            authorText.innerText = data.quoteAuthor;
        } else {
            authorText.innerText = 'unknown';
        }
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // stop loader , show quote
    } catch (error) {
        const times = solve();
        if (times <= 10) {
            getQuote();
        } else {
            quoteText.innerText = 'Sorry, unable to load Quotes';
            authorText.innerText = '';
        }
    }
}

// error solving
var count = 0; 

function solve() {
    count += 1;
    return count;
}

// Twitter function
const twittertweet = () => {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twittertweet);

loading()


getQuote()
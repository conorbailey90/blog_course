const contentContainer = document.querySelector('.content__container');
const title = document.querySelector('.title');
const date = document.querySelector('.date');

async function fetchArticle(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = +urlParams.get('id');
    const request = await fetch('./api/projects.json');
    const articles = await request.json();
    const article = articles.filter(article => article.id === id)[0];

    title.innerText = article.title;
    date.innerText = article.date;

    for(let i = 0; i < article.content.length; i++){
        console.log(article.content[i])
        appendContent(article.content[i])
    }
    
}

function appendContent(content){
    if(content['paragraph']){
        let paragraph = document.createElement('p');
        paragraph.innerText = content.paragraph;
        contentContainer.appendChild(paragraph)
    }
    if(content['image']){
        let imageContainer = document.createElement('div');
        imageContainer.classList.add('img__container');
        let imageInner = document.createElement('div');
        imageInner.classList.add('img__inner');
        imageInner.style.backgroundImage = `url(${content.image})`;
        imageContainer.appendChild(imageInner)
        contentContainer.appendChild(imageContainer)

    }
}





fetchArticle()
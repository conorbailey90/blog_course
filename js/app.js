import { debounce } from "./debounce.js";

const container = document.querySelector('.projects__container');
const searchInput = document.querySelector('.search__input');
const search = document.querySelector('.fa-magnifying-glass')

searchInput.addEventListener('input', (e) => {
    console.log(e.target.value);
    let searchString = e.target.value.toLowerCase();
    updateDebounceText(searchString);
})


const updateDebounceText = debounce((text) => {
    fetchProjects(text);
}) 

let previousScreenSize = window.innerWidth;

let projects;

function generateMasonryGrid(columns, posts){

    container.innerHTML = '';
    
    let columnWrappers = {};

    for(let i = 0; i < columns; i++){
        columnWrappers[`column${i}`] = [];
    }

    for(let i = 0; i < posts.length; i++){
        const column = i % columns;
        columnWrappers[`column${column}`].push(posts[i]);
    }

    for(let i = 0; i < columns; i++){
        let columnProjects = columnWrappers[`column${i}`];
        let columnDiv = document.createElement('div');
        columnDiv.classList.add('column');

        columnProjects.forEach(project => {

            let projectLink = document.createElement('a');
            projectLink.setAttribute('href', `./article.html?id=${project.id}`);

            let projectDiv = document.createElement('div');
            projectDiv.classList.add('project__tile');
            let image = document.createElement('img');
            image.src = project.image;
    
            let title = document.createElement('h3');
            title.classList.add('pt__title');
            let date = new Date(project.date);
            console.log(date.getDate());
            title.innerText = `${project.title} - ${date.getFullYear()} / ${date.getMonth() + 1} / ${date.getDate()}`;
       
            projectDiv.append(image, title);
            projectLink.appendChild(projectDiv);
            columnDiv.appendChild(projectLink); 
        });
        container.appendChild(columnDiv);
    }
}



window.addEventListener('resize', () => {
    // imageIndex = 0;
    if(window.innerWidth < 600 && previousScreenSize >= 600){
        generateMasonryGrid(1, projects);
    }else if(window.innerWidth >= 600 && window.innerWidth < 1000 && (previousScreenSize < 600 || previousScreenSize >= 1000)){
        generateMasonryGrid(2, projects);

    }else if(window.innerWidth >= 1000 && previousScreenSize < 1000){
        generateMasonryGrid(4, projects)
    }
    previousScreenSize = window.innerWidth;

})

async function fetchProjects(title){

    try{
        let data = await fetch('./api/projects.json');
        
        projects = await data.json();

        if(title){
            
            projects = projects.filter(project => project.title.toLowerCase().indexOf(title) !== -1)
        }
       
        console.log(projects)
        if(previousScreenSize < 600){
            generateMasonryGrid(1, projects)
        }else if(previousScreenSize >= 600 && previousScreenSize < 1000){
            generateMasonryGrid(2, projects)
        }else{
            generateMasonryGrid(4, projects)
        }
        
        
    }catch(err){
        console.log(err);
    }
}

fetchProjects();
const urlAPI = "http://localhost:5678/api/works";

const projects = document.querySelector(".gallery");

const portfolio = document.getElementById("portfolio");

const portfolioFilters = document.querySelector(".portfolio-filters");

const btnFilterAll = document.querySelector(".btn-filter-all");
const btnFilterObjects = document.querySelector(".btn-filter-objects");
const btnFilterAppartements = document.querySelector(".btn-filter-appartements");
const btnFilterHR = document.querySelector(".btn-filter-hr");


//****** GET API FILES ******//

let data;

let filteredData;

async function getData() {
    const response = await myFetch(urlAPI);
    data = await response.json();
}

async function createGallery(categoryId) {

    await getData();

    // GALLERY CREATION //

    projects.innerHTML = "";

    if (categoryId !== undefined) {

        filteredData = data.filter(item => item.categoryId === categoryId);

    } else {

        filteredData = data;
    }

    for (let i = 0; i < filteredData.length; i++) {
        projects.innerHTML += `
        <figure>
            <img src="${filteredData[i].imageUrl}" alt="${filteredData[i].title}">
            <figcaption>${filteredData[i].title}</figcaption>
        </figure>
        `
    }

}

createGallery();

//****** FILTERS ******//

function activeButtonFilters(activeButton) {

    const listButtonsFilters = [btnFilterAll, btnFilterObjects, btnFilterAppartements, btnFilterHR];

    for (let i = 0; i < listButtonsFilters.length; i++) {

        listButtonsFilters[i].classList.remove("btn--active");
    }

    activeButton.classList.add("btn--active");

}


function filteredProjects(categoryId) {

    // FILTER GALLERY //

    if (categoryId === undefined) {
        activeButtonFilters(btnFilterAll);
        createGallery();
    } else if (categoryId === 1) {
        activeButtonFilters(btnFilterObjects);
        createGallery(1);
    } else if (categoryId === 2) {
        activeButtonFilters(btnFilterAppartements);
        createGallery(2);
    } else if (categoryId === 3) {
        activeButtonFilters(btnFilterHR);
        createGallery(3);
    }

}

// BUTTONS FILTERS //

btnFilterAll.addEventListener("click", () => filteredProjects());
btnFilterObjects.addEventListener("click", () => filteredProjects(1));
btnFilterAppartements.addEventListener("click", () => filteredProjects(2));
btnFilterHR.addEventListener("click", () => filteredProjects(3));


//****** FILTERS END ******//

//****** USER CONNECTION ******//

const userToken = localStorage.getItem("token");

function userConnected() {
    const bannerEdit = document.querySelector(".edit");
    const loginLogout = document.getElementById("login-logout");
    const headerAdmin = document.querySelector(".main-header");
    const projectsEdit = document.querySelector(".portfolio-projects");


    if (userToken !== null) {

        headerAdmin.classList.add("main-header--edit");
        bannerEdit.style.display = null;


        loginLogout.innerHTML = "logout";
        loginLogout.href = "index.html";
        loginLogout.addEventListener("click", userDisconnected);


        projectsEdit.classList.add("portfolio-projects-edit");
        projectsEdit.innerHTML += `
            <i class="fa-regular fa-pen-to-square portfolio-projects-edit__icon"></i>
            <a href="#modal1" class="js-modal cta cta--black">modifier</a>
            `
    }
}

userConnected();

//****** USER DECONNECTION ******//

function userDisconnected() {

    window.localStorage.clear();

    window.location.reload();

    loginLogout.removeEventListener("click", userDisconnected);

}





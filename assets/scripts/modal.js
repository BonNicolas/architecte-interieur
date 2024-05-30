
let modal = null;

//****** MODALS ******//

//** Modal 1 **//

//** Open **//

const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute("href"));
    target.style.display = null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
    modal.querySelector(".js-btn-modal-add").addEventListener("click", modalAddPhotos);
    modal.querySelector(".js-modal-return").addEventListener("click", modalReturn);

}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
})


//*** Close **//

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.setAttribute("aria-hidden", "true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal.querySelector(".js-btn-modal-add").removeEventListener("click", modalAddPhotos);
    modal.querySelector(".js-modal-return").addEventListener("click", modalReturn);

    const hideModal = function () {
        modal.style.display = "none";
        modal.removeEventListener("animationend", hideModal);
        modal = null;
    }

    modal.addEventListener("animationend", hideModal);

}

//** ESC Close **//

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc")
        closeModal(e);

})

//** Zone propagation **//

const stopPropagation = function (e) {
    e.stopPropagation();
}

//** Modal 2 **//

const sectionAddPhoto = document.querySelector(".section-add-photo");

const modal2Email = document.querySelector(".e-mail-modal2");

const modalLine = document.querySelector(".modal__line");

const modalArrowReturn = document.querySelector(".js-modal-return");

const modalTitle = document.querySelector(".modal__title");

const btnModalAddPhoto = document.querySelector(".js-btn-modal-add");

const btnModalValidation = document.querySelector(".js-btn-modal-validation");

const btnAddPhoto = document.querySelector(".btn--add-photo");



function modalAddPhotos() {

    modalProjects.style.display = "none";

    sectionAddPhoto.style.display = null;

    modal2Email.style.display = null;

    modalArrowReturn.style.display = null;

    modalTitle.innerHTML = "Ajout photo";

    modalLine.classList.add("modal__line--edit");

    btnModalAddPhoto.style.display = "none";
    btnModalValidation.style.display = null;

}

function modalReturn() {

    modalProjects.style.display = null;

    sectionAddPhoto.style.display = "none";

    addPhotoContainerIcon.style.display = null;

    previewImg.style.display = "none";
    previewImg.src = "#";
    btnModalePreviewImg.value = "";

    modal2Email.style.display = "none";

    modalArrowReturn.style.display = "none";

    modalTitle.innerHTML = "Galerie photo";

    modalLine.classList.remove("modal__line--edit");

    btnModalAddPhoto.style.display = null;
    btnModalValidation.style.display = "none";

    modal2Email.reset();

}


//****** PROJECTS GENERATION IN MODAL ******//


const modalProjects = document.querySelector(".modal__projects");

async function getEditProjects() {

    await getData();

    //** Gallery Creation **//

    modalProjects.innerHTML = "";

    for (let i = 0; i < data.length; i++) {

        const figures = document.createElement("figure");
        const img = document.createElement("img");
        img.src = data[i].imageUrl;
        img.alt = data[i].title;
        const btnDeleteProjects = document.createElement("div");
        btnDeleteProjects.id = data[i].id;
        btnDeleteProjects.classList.add("trash-button");
        const icons = document.createElement("i");
        icons.classList.add("fa-solid");
        icons.classList.add("fa-trash-can");
        icons.classList.add("fa-xs");
        modalProjects.appendChild(figures);
        figures.appendChild(btnDeleteProjects);
        figures.appendChild(img);
        btnDeleteProjects.appendChild(icons);

        btnDeleteProjects.addEventListener("click", (event) => {
            event.preventDefault();
            deleteProjects(data[i].id);
        })

    }

}

getEditProjects()

//****** DELETE PROJECTS IN MODAL ******//

async function deleteProjects(id) {

    const response = await myFetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${userToken}` },
    })

    alert("Le projet a bien été supprimé");
    getEditProjects();
    filteredProjects();

}



//****** ADD PHOTO PREVIEW IN MODAL ******//


const btnModalePreviewImg = document.getElementById("image");
const previewImg = document.querySelector(".section-add-photo__preview");
const addPhotoContainerIcon = document.querySelector(".section-add-photo__container_icon");

btnModalePreviewImg.addEventListener("change", (event) => {
    const imageFiles = event.target.files;
    const imageFilesLength = imageFiles.length;

    if (imageFilesLength > 4000) {

        alert("La taille de l'imagine ne doit pas dépasser 4 mo");

    } else {

        const imageSrc = URL.createObjectURL(imageFiles[0]);
        addPhotoContainerIcon.style.display = "none";
        previewImg.src = imageSrc;
        previewImg.style.display = null;

    }


})


//****** ADD PROJECTS IN MODAL ******//


async function addProjects(event) {
    event.preventDefault();

    const projectTitle = document.getElementById("title").value;
    const projectCategoryId = document.getElementById("category").value;
    const projectImage = btnModalePreviewImg.files[0];

    if (!projectTitle || projectCategoryId === "0" || !projectImage) {
        alert("Merci de remplir tous les champs");
    } else {
        const payload = {
            method: 'post',
            body: {
                title: projectTitle,
                categoryId: parseInt(projectCategoryId),
                imageUrl: URL.createObjectURL(projectImage)
            }
        };

        const newProject = await myFetch('http://localhost:5678/api/works', payload);
        alert("Le projet a bien été ajouté");
        addPhotoContainerIcon.style.display = null;
        previewImg.style.display = "none";
        previewImg.src = "#";
        btnModalePreviewImg.value = "";
        modal2Email.reset();
        getEditProjects();
        filteredProjects();
    }
}


btnModalValidation.addEventListener("click", addProjects);











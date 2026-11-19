/* ======================================
   ELEMENTS
====================================== */

const projectShow = document.getElementById("projectShow");
const projectList = document.getElementById("projectList");
const projectLi = document.getElementById("projectLi");
const filterTable = document.getElementById("filterTable");

const languageSelect = document.getElementById("languageSelect");
const languageLabel = document.getElementById("languageLabel");


/* ======================================
   STATE
====================================== */

const PROJECT_TYPES = ["video", "live"];

let currentLanguage = "ca";
let activeFilter = null;
let currentProjectId = null;


/* ======================================
   TRANSLATIONS
====================================== */

const translations = {
    en: {
        languageLabel: "Language",
        selectProject: "Select a project",
        projectNotFound: "Project not found",
        gallery: "Gallery",
        visitProject: "Visit project",
        backToProjects: "Back to projects",

        introTitle: "Welcome to my portfolio",
        introText: "A selection of creative projects, ideas and experiences. Explore my work and discover the stories behind each project.",
        introGallery: "A glimpse of my work",
        introVideo: "Featured video",

        categories: {
            live: "Live",
            video: "Video"
        }
    },

    ca: {
        languageLabel: "Idioma",
        selectProject: "Selecciona un projecte",
        projectNotFound: "Projecte no trobat",
        gallery: "Galeria",
        visitProject: "Visita el projecte",
        backToProjects: "Torna als projectes",

        introTitle: "Benvingut al meu portafoli",
        introText: "Una selecció de projectes creatius, idees i experiències. Explora el meu treball i descobreix les històries que hi ha darrere de cada projecte.",
        introGallery: "Una mostra del meu treball",
        introVideo: "Vídeo destacat",

        categories: {
            live: "Directe",
            video: "Vídeo"
        }
    }
};

/* ======================================
   INTRODUCTION
====================================== */

function renderIntroduction() {

    return `
        <article class="introduction">

            <p class="intro-eyebrow">
                PORTFOLIO
            </p>

            <h1>
                ${escapeHTML(t("introTitle"))}
            </h1>

            <p class="intro-description">
                ${escapeHTML(t("introText"))}
            </p>


            <!-- SAMPLE IMAGES -->

            <section class="intro-gallery">

                <h2>
                    ${escapeHTML(t("introGallery"))}
                </h2>

                <div class="intro-images">

                    <figure>
                        <img
                            src="https://picsum.photos/seed/portfolio-01/1200/900"
                            alt="Portfolio sample image 1"
                            loading="lazy"
                        >
                    </figure>

                    <figure>
                        <img
                            src="https://picsum.photos/seed/portfolio-02/1200/900"
                            alt="Portfolio sample image 2"
                            loading="lazy"
                        >
                    </figure>

                    <figure>
                        <img
                            src="https://picsum.photos/seed/portfolio-03/1200/900"
                            alt="Portfolio sample image 3"
                            loading="lazy"
                        >
                    </figure>

                </div>

            </section>


            <!-- YOUTUBE VIDEO -->

            <section class="intro-video">

                <h2>
                    ${escapeHTML(t("introVideo"))}
                </h2>

                <div class="youtube-container">

                    <iframe
                        src="https://www.youtube-nocookie.com/embed/M7lc1UVf-VE"
                        title="YouTube video player"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>

                </div>

            </section>

        </article>
    `;
}

/* ======================================
   HELPERS
====================================== */

function escapeHTML(value) {

    return String(value ?? "").replace(/[&<>"']/g, character => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

    })[character]);

}


function getText(value) {

    if (typeof value === "string") {
        return value;
    }

    if (value && typeof value === "object") {

        return value[currentLanguage]
            || value.en
            || Object.values(value)[0]
            || "";

    }

    return "";

}


function t(key) {

    return translations[currentLanguage][key]
        || translations.en[key]
        || key;

}


function safeUrl(value) {

    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    try {

        const url = new URL(value.trim(), window.location.href);

        if (
            url.protocol === "http:" ||
            url.protocol === "https:"
        ) {
            return value.trim();
        }

        return null;

    } catch {

        return null;

    }

}


/* ======================================
   MOBILE VIEW MANAGEMENT
====================================== */

function updateMobileView() {

    const hasProject =
        currentProjectId !== null &&
        currentProjectId !== undefined &&
        currentProjectId !== "";

    document.body.classList.toggle(
        "project-open",
        hasProject
    );

}


/* ======================================
   PROJECT LIST
====================================== */

function renderProjectList() {

    projectLi.innerHTML = projects.map(project => {

        const title = getText(project.title)
            || `Project ${project.id}`;

        return `

            <li data-type="${escapeHTML(project.type)}">

                <a
                    href="?project=${encodeURIComponent(project.id)}"
                    data-project="${escapeHTML(project.id)}"
                >
                    ${escapeHTML(title)}
                </a>

            </li>

        `;

    }).join("");

    updateActiveProject(currentProjectId);

}


function updateActiveProject(id) {

    projectLi.querySelectorAll("[data-project]").forEach(link => {

        link.classList.toggle(
            "active",
            String(link.dataset.project) === String(id)
        );

    });

}


/* ======================================
   FILTERS
====================================== */

function renderFilters() {

    filterTable.innerHTML = `

        <tbody>

            <tr>

                ${PROJECT_TYPES.map(type => `

                    <td data-filter="${type}">

                        ${escapeHTML(
                            translations[currentLanguage].categories[type]
                        )}

                    </td>

                `).join("")}

            </tr>

        </tbody>

    `;

    updateActiveFilter(activeFilter);

}


function filterProjects(type = null) {

    const projectItems = projectLi.querySelectorAll("li");

    projectItems.forEach(item => {

        const matches = !type || item.dataset.type === type;

        item.style.display = matches ? "" : "none";

    });

    updateActiveFilter(type);

}


function updateActiveFilter(type) {

    filterTable.querySelectorAll("[data-filter]").forEach(element => {

        element.classList.toggle(
            "active",
            element.dataset.filter === type
        );

    });

}


/* ======================================
   PROJECT SECTIONS
====================================== */

function renderSection(section = {}) {

    const title = getText(section.title);
    const text = getText(section.text);
    const imageAlt = getText(section.imageAlt);

    const image = safeUrl(section.image);
    const video = safeUrl(section.video);

    return `

        <section class="project-section">

            ${title ? `

                <h2>
                    ${escapeHTML(title)}
                </h2>

            ` : ""}


            ${text ? `

                <p>
                    ${escapeHTML(text)}
                </p>

            ` : ""}


            ${image ? `

                <img
                    class="section-image"
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(imageAlt || title || "")}"
                    loading="lazy"
                >

            ` : ""}


            ${video ? `

                <video controls preload="metadata">

                    <source src="${escapeHTML(video)}">

                    Your browser does not support video.

                </video>

            ` : ""}

        </section>

    `;

}


/* ======================================
   PROJECT GALLERY
====================================== */

function renderGallery(images) {

    if (!Array.isArray(images) || images.length === 0) {
        return "";
    }

    const galleryItems = images.map((item, index) => {

        const image = typeof item === "string"
            ? { src: item }
            : item;

        if (!image || typeof image !== "object") {
            return "";
        }

        const src = safeUrl(image.src);

        if (!src) {
            return "";
        }

        const alt = getText(image.alt)
            || `Project image ${index + 1}`;

        const caption = getText(image.caption);

        return `

            <figure class="gallery-item">

                <img
                    src="${escapeHTML(src)}"
                    alt="${escapeHTML(alt)}"
                    loading="lazy"
                >

                ${caption ? `

                    <figcaption>
                        ${escapeHTML(caption)}
                    </figcaption>

                ` : ""}

            </figure>

        `;

    }).join("");

    if (!galleryItems.trim()) {
        return "";
    }

    return `

        <section class="project-gallery">

            <h2>
                ${escapeHTML(t("gallery"))}
            </h2>

            <div class="gallery-grid">

                ${galleryItems}

            </div>

        </section>

    `;

}


/* ======================================
   PROJECT RENDERING
====================================== */

function renderProject(id) {

    const project = projects.find(item =>
        String(item.id) === String(id)
    );

    const closeButton = `

        <button
            type="button"
            class="close-project"
            id="closeProject"
            aria-label="${escapeHTML(t("backToProjects"))}"
            title="${escapeHTML(t("backToProjects"))}"
        >
            &times;
        </button>

    `;


    if (!project) {

        projectShow.innerHTML = `

            ${closeButton}

            <h2>
                ${escapeHTML(t("projectNotFound"))}
            </h2>

        `;

        currentProjectId = id;

        updateActiveProject(null);
        updateMobileView();

        return;

    }


    const title = getText(project.title);
    const description = getText(project.description);

    const projectUrl = safeUrl(project.url);


    projectShow.innerHTML = `

        ${closeButton}

        <article class="project-content">


            ${title ? `

                <h1>
                    ${escapeHTML(title)}
                </h1>

            ` : ""}


            ${description ? `

                <p class="project-description">
                    ${escapeHTML(description)}
                </p>

            ` : ""}


            ${Array.isArray(project.sections)

                ? project.sections.map(section =>
                    renderSection(section)
                ).join("")

                : ""

            }


            ${renderGallery(project.gallery)}


            ${projectUrl ? `

                <a
                    href="${escapeHTML(projectUrl)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    ${escapeHTML(t("visitProject"))}

                </a>

            ` : ""}


        </article>

    `;


    currentProjectId = id;

    updateActiveProject(id);
    updateMobileView();

}


/* ======================================
   EMPTY PROJECT VIEW
====================================== */

function renderEmptyProject() {

    projectShow.innerHTML = renderIntroduction();

    currentProjectId = null;

    updateActiveProject(null);
    updateMobileView();

}


/* ======================================
   URL MANAGEMENT
====================================== */

function updateURL(projectId = null, filter = null) {

    const url = new URL(window.location.href);


    if (projectId !== null && projectId !== undefined) {

        url.searchParams.set("project", projectId);

    } else {

        url.searchParams.delete("project");

    }


    if (filter) {

        url.searchParams.set("filter", filter);

    } else {

        url.searchParams.delete("filter");

    }


    const newURL =
        url.pathname +
        url.search +
        url.hash;

    const currentURL =
        window.location.pathname +
        window.location.search +
        window.location.hash;


    if (newURL === currentURL) {
        return;
    }


    history.pushState(

        {
            project: projectId,
            filter: filter
        },

        "",

        newURL

    );

}


/* ======================================
   NAVIGATION
====================================== */

function navigate(projectId = null, filter = activeFilter) {

    const hasProject =
        projectId !== null &&
        projectId !== undefined &&
        projectId !== "";

    const nextProjectId = hasProject
        ? String(projectId)
        : null;

    const projectChanged =
        String(currentProjectId ?? "") !== String(nextProjectId ?? "");


    activeFilter = filter || null;


    if (hasProject) {

        renderProject(nextProjectId);

    } else {

        renderEmptyProject();

    }


    // Reset detail scroll only when changing project
    if (projectChanged) {

        projectShow.scrollTop = 0;

    }


    filterProjects(activeFilter);

    updateURL(nextProjectId, activeFilter);

}


/* ======================================
   PROJECT LINKS
====================================== */

projectLi.addEventListener("click", event => {

    const link = event.target.closest("[data-project]");

    if (!link) {
        return;
    }

    event.preventDefault();

    navigate(link.dataset.project, activeFilter);

});


/* ======================================
   CLOSE PROJECT
====================================== */

projectShow.addEventListener("click", event => {

    const closeButton = event.target.closest("#closeProject");

    if (!closeButton) {
        return;
    }

    navigate(null, activeFilter);

});


/* ======================================
   FILTER EVENTS
====================================== */

filterTable.addEventListener("click", event => {

    const filterElement = event.target.closest("[data-filter]");

    if (!filterElement) {
        return;
    }

    const clickedFilter = filterElement.dataset.filter;

    const nextFilter = activeFilter === clickedFilter
        ? null
        : clickedFilter;

    const params = new URLSearchParams(window.location.search);

    const projectId = params.get("project");

    navigate(projectId, nextFilter);

});


/* ======================================
   LANGUAGE MANAGEMENT
====================================== */

function setLanguage(language) {

    if (!translations[language]) {
        return;
    }


    const listScroll = projectList.scrollTop;
    const detailScroll = projectShow.scrollTop;


    currentLanguage = language;


    try {

        localStorage.setItem("siteLanguage", language);

    } catch (error) {

        console.warn("Could not save language preference.", error);

    }


    document.documentElement.lang = language;

    languageSelect.value = language;

    languageLabel.textContent = t("languageLabel");


    renderProjectList();
    renderFilters();

    initPage();


    // Restore scroll positions
    projectList.scrollTop = listScroll;
    projectShow.scrollTop = detailScroll;

}


languageSelect.addEventListener("change", event => {

    setLanguage(event.target.value);

});




/* ======================================
   INITIAL PAGE / BROWSER HISTORY
====================================== */

function initPage() {

    const params = new URLSearchParams(window.location.search);

    const projectId = params.get("project");
    const filter = params.get("filter");


    const validFilter = PROJECT_TYPES.includes(filter)
        ? filter
        : null;


    const projectChanged =
        String(currentProjectId ?? "") !== String(projectId ?? "");


    activeFilter = validFilter;


    if (projectId) {

        renderProject(projectId);

    } else {

        renderEmptyProject();

    }


    if (projectChanged) {

        projectShow.scrollTop = 0;

    }


    filterProjects(activeFilter);

    updateMobileView();

}


// Browser back and forward
window.addEventListener("popstate", initPage);


/* ======================================
   INITIALIZATION
====================================== */

try {

    const savedLanguage = localStorage.getItem("siteLanguage");

    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }

} catch (error) {

    console.warn("Could not read saved language preference.", error);

}


languageSelect.value = currentLanguage;

languageLabel.textContent = t("languageLabel");

document.documentElement.lang = currentLanguage;


renderProjectList();

renderFilters();

initPage();
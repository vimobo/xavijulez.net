/* ======================================
   ELEMENTS
====================================== */

const projectShow = document.getElementById("projectShow");
const projectList = document.getElementById("projectList");
const projectLi = document.getElementById("projectLi");
const filterTable = document.getElementById("filterTable");
const languageButtons = document.querySelectorAll("[data-language]");

// The site title belongs in the navigation, not above the project filters.
let navBrand = document.querySelector(".nav-brand");

if (!navBrand) {
    const navContent = document.querySelector(".nav-content");

    if (navContent) {
        navBrand = document.createElement("button");
        navBrand.className = "nav-brand";
        navBrand.type = "button";
        navContent.prepend(navBrand);
    }
}

/* ======================================
   CONFIGURATION AND STATE
====================================== */

const PROJECT_TYPES = ["video", "live"];

let currentLanguage = "ca";
let activeFilter = null;
let currentProjectId = null;
let mobileView = "intro";

const translations = {
    en: {
        introTitle: "Xavi Julez",
        introRole: "DOP / COLOR GRADING",
        introText: "Xavi Julez works across cinematography and colour grading, developing visual work for commercial campaigns, music videos and film productions.",
        introFeatured: "Featured work",
        introGallery: "Selected frames",
        introAboutTitle: "About",
        introAboutText: "Working with image, light, colour and visual storytelling, Xavi develops cinematic approaches across different audiovisual formats, from commercial productions to independent film.",
        introContact: "More information & contact",
        backToProjects: "Back",
        projectNotFound: "Project not found",
        gallery: "Gallery",
        visitProject: "Visit project"
    },

    ca: {
        introTitle: "Xavi Julez",
        introRole: "DIRECCIÓ DE FOTOGRAFIA / COLOR GRADING",
        introText: "Xavi Julez treballa en l'àmbit de la direcció de fotografia i l'etalonatge, desenvolupant projectes visuals per a campanyes comercials, videoclips i produccions cinematogràfiques.",
        introFeatured: "Treball destacat",
        introGallery: "Fotogrames seleccionats",
        introAboutTitle: "Sobre",
        introAboutText: "Treballant amb la imatge, la llum, el color i la narrativa visual, Xavi desenvolupa enfocaments cinematogràfics en diferents formats audiovisuals, des de produccions comercials fins al cinema independent.",
        introContact: "Més informació i contacte",
        backToProjects: "Tornar",
        projectNotFound: "No s'ha trobat el projecte",
        gallery: "Galeria",
        visitProject: "Veure projecte"
    }
};

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

    if (value && typeof value === "object" && !Array.isArray(value)) {
        return value[currentLanguage] || value.en || "";
    }

    return "";
}

// Return an empty string for missing translations instead of showing the key.
function t(key) {
    return translations[currentLanguage]?.[key]
        || translations.en?.[key]
        || "";
}

function safeUrl(value) {
    if (typeof value !== "string" || !value.trim()) {
        return null;
    }

    try {
        const url = new URL(value.trim(), window.location.href);

        if (url.protocol === "http:" || url.protocol === "https:") {
            return value.trim();
        }
    } catch (error) {
        return null;
    }

    return null;
}

function isMobile() {
    return window.matchMedia("(max-width: 700px)").matches;
}

/* ======================================
   INTRODUCTION PROJECT PREVIEWS
====================================== */

function getImageSource(imageValue) {
    const src = typeof imageValue === "string"
        ? imageValue
        : imageValue?.src;

    return safeUrl(src);
}

function getProjectPreview(project) {
    if (!project || typeof project !== "object") {
        return null;
    }

    // Prefer an explicitly configured cover/thumbnail.
    const directCandidates = [project.thumbnail, project.cover, project.image];

    for (const candidate of directCandidates) {
        const src = getImageSource(candidate);
        if (src) {
            return {
                src,
                alt: getText(candidate?.alt).trim() || getText(project.title).trim()
            };
        }
    }

    // Otherwise use the first image in the project's gallery.
    if (Array.isArray(project.gallery)) {
        for (const candidate of project.gallery) {
            const src = getImageSource(candidate);
            if (src) {
                return {
                    src,
                    alt: getText(candidate?.alt).trim() || getText(project.title).trim()
                };
            }
        }
    }

    // Finally, look for the first image in the project's sections.
    if (Array.isArray(project.sections)) {
        for (const section of project.sections) {
            const src = getImageSource(section?.image);
            if (src) {
                return {
                    src,
                    alt: getText(section?.imageAlt).trim() || getText(project.title).trim()
                };
            }
        }
    }

    return null;
}

/* ======================================
   INTRODUCTION
====================================== */

function renderIntroduction() {
    const introTitle = t("introTitle").trim();
    const introRole = t("introRole").trim();
    const introText = t("introText").trim();
    const featuredTitle = t("introFeatured").trim();
    const galleryTitle = t("introGallery").trim();
    const aboutTitle = t("introAboutTitle").trim();
    const aboutText = t("introAboutText").trim();
    const contactText = t("introContact").trim();

    // Build a 3 x 3 visual index from the first nine projects that have images.
    // Each image opens the matching project article through the existing SPA navigation.
    const introProjects = projects
        .map(project => ({
            project,
            preview: getProjectPreview(project)
        }))
        .filter(item => item.preview)
        .slice(0, 9);

    const introGrid = introProjects.length
        ? `
            <section class="intro-project-gallery">
                ${galleryTitle ? `<h2>${escapeHTML(galleryTitle)}</h2>` : ""}
                <div class="intro-project-grid">
                    ${introProjects.map(({ project, preview }) => {
                        const title = getText(project.title).trim() || `Project ${project.id}`;
                        const alt = preview.alt || title;

                        return `
                            <a
                                class="intro-project-card"
                                href="?project=${encodeURIComponent(project.id)}"
                                data-intro-project="${escapeHTML(project.id)}"
                                aria-label="${escapeHTML(title)}"
                            >
                                <img
                                    src="${escapeHTML(preview.src)}"
                                    alt="${escapeHTML(alt)}"
                                    loading="lazy"
                                    referrerpolicy="no-referrer"
                                >
                            </a>
                        `;
                    }).join("")}
                </div>
            </section>
        `
        : "";

    const introContent = [
        introTitle ? `<h1>${escapeHTML(introTitle)}</h1>` : "",
        introRole ? `<h2>${escapeHTML(introRole)}</h2>` : "",
        introText ? `<p class="project-description">${escapeHTML(introText)}</p>` : "",

        featuredTitle ? `
            <section class="project-section">
                <h2>${escapeHTML(featuredTitle)}</h2>
                <div class="video-container">
                    <iframe
                        src="https://player.vimeo.com/video/1125343378"
                        title="Sitges Film Festival 2025"
                        loading="lazy"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </div>
            </section>
        ` : "",

        introGrid,

        (aboutTitle || aboutText) ? `
            <section class="project-section">
                ${aboutTitle ? `<h2>${escapeHTML(aboutTitle)}</h2>` : ""}
                ${aboutText ? `<p>${escapeHTML(aboutText)}</p>` : ""}
            </section>
        ` : "",

        contactText ? `
            <section class="project-section">
                <a href="https://linktr.ee/xavijulez" target="_blank" rel="noopener noreferrer">
                    ${escapeHTML(contactText)} ↗
                </a>
            </section>
        ` : ""
    ].filter(Boolean).join("");

    return `
        <button
            type="button"
            class="close-intro"
            id="closeIntro"
            aria-label="${escapeHTML(t("backToProjects"))}"
            title="${escapeHTML(t("backToProjects"))}"
        >&times;</button>

        <article class="project-content introduction">
            ${introContent}
        </article>
    `;
}

/* ======================================
   MOBILE VIEW MANAGEMENT
====================================== */

function updateMobileView() {
    document.body.classList.toggle("mobile-intro-open", mobileView === "intro");
    document.body.classList.toggle("mobile-list-open", mobileView === "list");
    document.body.classList.toggle("project-open", mobileView === "project");
}

/* ======================================
   NAVIGATION TITLE AND PROJECT LIST
====================================== */

function updateNavBrand() {
    if (!navBrand) {
        return;
    }

    navBrand.textContent = t("introTitle") || "Xavi Julez";
    navBrand.setAttribute("aria-label", "Go to introduction");

    // Make an existing div/span behave like a keyboard-accessible home control.
    if (navBrand.tagName !== "BUTTON" && navBrand.tagName !== "A") {
        navBrand.setAttribute("role", "button");
        navBrand.setAttribute("tabindex", "0");
    }
}

function renderProjectList() {

    const projectItems = projects.map(project => {
        const title = getText(project.title).trim() || `Project ${project.id}`;
        const type = PROJECT_TYPES.includes(project.type) ? project.type : "";

        return `
            <li ${type ? `data-type="${escapeHTML(type)}"` : ""}>
                <a href="?project=${encodeURIComponent(project.id)}" data-project="${escapeHTML(project.id)}">
                    ${escapeHTML(title)}
                </a>
            </li>
        `;
    }).join("");

    // There is no Introduction list item. Xavi Julez is the list's H1.
    projectLi.innerHTML = projectItems;
    updateActiveProject(currentProjectId);
}

function updateActiveProject(id) {
    projectLi.querySelectorAll("[data-project]").forEach(link => {
        link.classList.toggle("active", String(link.dataset.project) === String(id));
    });
}

/* ======================================
   FILTERS
====================================== */

function renderFilters() {
    // Filter labels deliberately stay the same in both languages.
    const filterLabels = {
        video: "Video",
        live: "Live"
    };

    filterTable.innerHTML = `
        <tbody>
            <tr>
                ${PROJECT_TYPES.map(type => `
                    <td data-filter="${type}">${filterLabels[type]}</td>
                `).join("")}
            </tr>
        </tbody>
    `;

    updateActiveFilter(activeFilter);
}

function filterProjects(type = null) {
    projectLi.querySelectorAll("li[data-type]").forEach(item => {
        const matches = !type || item.dataset.type === type;
        item.style.display = matches ? "" : "none";
    });

    updateActiveFilter(type);
}

function updateActiveFilter(type) {
    filterTable.querySelectorAll("[data-filter]").forEach(element => {
        element.classList.toggle("active", element.dataset.filter === type);
    });
}

/* ======================================
   PROJECT SECTIONS
====================================== */

function renderSection(section = {}) {
    if (!section || typeof section !== "object") {
        return "";
    }

    const title = getText(section.title).trim();
    const text = getText(section.text).trim();
    const imageAlt = getText(section.imageAlt).trim();
    const image = safeUrl(section.image);
    const video = safeUrl(section.video);

    // Do not create a section if every optional field is empty or invalid.
    if (!title && !text && !image && !video) {
        return "";
    }

    return `
        <section class="project-section">
            ${title ? `<h2>${escapeHTML(title)}</h2>` : ""}
            ${text ? `<p>${escapeHTML(text)}</p>` : ""}
            ${image ? `
                <img
                    class="section-image"
                    src="${escapeHTML(image)}"
                    alt="${escapeHTML(imageAlt || title)}"
                    loading="lazy"
                    referrerpolicy="no-referrer"
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
   PHOTO GALLERY
====================================== */

function renderGallery(images, heading = t("gallery")) {
    if (!Array.isArray(images) || images.length === 0) {
        return "";
    }

    const items = images.map((item, index) => {
        const image = typeof item === "string" ? { src: item } : item;

        if (!image || typeof image !== "object") {
            return "";
        }

        const src = safeUrl(image.src);
        if (!src) {
            return "";
        }

        const alt = getText(image.alt).trim() || `Project image ${index + 1}`;
        const caption = getText(image.caption).trim();

        return `
            <figure class="gallery-item">
                <img
                    src="${escapeHTML(src)}"
                    alt="${escapeHTML(alt)}"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                >
                ${caption ? `<figcaption>${escapeHTML(caption)}</figcaption>` : ""}
            </figure>
        `;
    }).filter(Boolean).join("");

    if (!items) {
        return "";
    }

    const cleanHeading = getText(heading).trim();

    return `
        <section class="project-gallery">
            ${cleanHeading ? `<h2>${escapeHTML(cleanHeading)}</h2>` : ""}
            <div class="gallery-grid">${items}</div>
        </section>
    `;
}

// Remove failed images instead of leaving broken-image icons or alt text on screen.
projectShow.addEventListener("error", event => {
    const target = event.target;

    if (!target || target.tagName !== "IMG") {
        return;
    }

    const introCard = target.closest(".intro-project-card");
    const introGallery = target.closest(".intro-project-gallery");

    if (introCard) {
        introCard.remove();

        if (introGallery && !introGallery.querySelector(".intro-project-card")) {
            introGallery.remove();
        }

        return;
    }

    const figure = target.closest(".gallery-item");
    const gallery = target.closest(".project-gallery");

    if (figure) {
        figure.remove();

        if (gallery && !gallery.querySelector(".gallery-item")) {
            gallery.remove();
        }
    } else if (target.classList.contains("section-image")) {
        const section = target.closest(".project-section");
        target.remove();

        if (section && !section.querySelector("h2, p, video, iframe, a, img")) {
            section.remove();
        }
    }
}, true);

/* ======================================
   PROJECT RENDERING
====================================== */

function renderProject(id) {
    const project = projects.find(item => String(item.id) === String(id));

    if (!project) {
        projectShow.innerHTML = `
            ${renderCloseProjectButton()}
            <p>${escapeHTML(t("projectNotFound"))}</p>
        `;
        currentProjectId = null;
        updateActiveProject(null);
        return;
    }

    const title = getText(project.title).trim();
    const description = getText(project.description).trim();
    const sectionsHTML = Array.isArray(project.sections)
        ? project.sections.map(renderSection).filter(Boolean).join("")
        : "";
    const galleryHTML = renderGallery(project.gallery);
    const projectUrl = safeUrl(project.url);

    const content = [
        title ? `<h1>${escapeHTML(title)}</h1>` : "",
        description ? `<p class="project-description">${escapeHTML(description)}</p>` : "",
        sectionsHTML,
        galleryHTML,
        projectUrl ? `
            <a href="${escapeHTML(projectUrl)}" target="_blank" rel="noopener noreferrer">
                ${escapeHTML(t("visitProject"))}
            </a>
        ` : ""
    ].filter(Boolean).join("");

    projectShow.innerHTML = `
        ${renderCloseProjectButton()}
        ${content ? `<article class="project-content">${content}</article>` : ""}
    `;

    currentProjectId = String(id);
    updateActiveProject(currentProjectId);
}

function renderCloseProjectButton() {
    return `
        <button
            type="button"
            class="close-project"
            id="closeProject"
            aria-label="${escapeHTML(t("backToProjects"))}"
            title="${escapeHTML(t("backToProjects"))}"
        >&times;</button>
    `;
}

/* ======================================
   INTRODUCTION VIEW
====================================== */

function renderEmptyProject() {
    projectShow.innerHTML = renderIntroduction();
    currentProjectId = null;
    updateActiveProject(null);
}

/* ======================================
   URL AND HISTORY
====================================== */

function updateURL(projectId = null, filter = null, view = mobileView, replace = false) {
    const url = new URL(window.location.href);

    if (projectId !== null && projectId !== undefined && projectId !== "") {
        url.searchParams.set("project", projectId);
    } else {
        url.searchParams.delete("project");
    }

    if (filter) {
        url.searchParams.set("filter", filter);
    } else {
        url.searchParams.delete("filter");
    }

    const state = {
        project: projectId || null,
        filter: filter || null,
        view
    };

    const newURL = url.pathname + url.search + url.hash;
    const currentURL = window.location.pathname + window.location.search + window.location.hash;
    const oldState = history.state || {};

    const sameState = oldState.project === state.project
        && oldState.filter === state.filter
        && oldState.view === state.view;

    if (newURL === currentURL && sameState) {
        return;
    }

    if (replace) {
        history.replaceState(state, "", newURL);
    } else {
        history.pushState(state, "", newURL);
    }
}

/* ======================================
   VIEW NAVIGATION
====================================== */

function showIntroduction() {
    renderEmptyProject();
    mobileView = "intro";
    filterProjects(activeFilter);
    updateMobileView();
    updateURL(null, activeFilter, "intro");
}

function showProjectList() {
    // Keep the introduction rendered behind the list for desktop layout.
    renderEmptyProject();
    mobileView = "list";
    filterProjects(activeFilter);
    updateMobileView();
    updateURL(null, activeFilter, "list");
}

function openProject(id) {
    const previousProjectId = currentProjectId;
    renderProject(id);
    mobileView = "project";

    if (String(previousProjectId) !== String(id)) {
        projectShow.scrollTop = 0;
    }

    filterProjects(activeFilter);
    updateMobileView();
    updateURL(id, activeFilter, "project");
}

function closeProject() {
    if (isMobile()) {
        showProjectList();
    } else {
        showIntroduction();
    }
}

/* ======================================
   FILTER EVENTS
====================================== */

filterTable.addEventListener("click", event => {
    const filterElement = event.target.closest("[data-filter]");

    if (!filterElement) {
        return;
    }

    const clickedFilter = filterElement.dataset.filter;
    activeFilter = activeFilter === clickedFilter ? null : clickedFilter;

    filterProjects(activeFilter);
    updateURL(currentProjectId, activeFilter, mobileView);
});

/* ======================================
   NAVIGATION TITLE / PROJECT LIST EVENTS
====================================== */

if (navBrand) {
    navBrand.addEventListener("click", showIntroduction);

    navBrand.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showIntroduction();
        }
    });
}

projectLi.addEventListener("click", event => {
    const projectLink = event.target.closest("[data-project]");

    if (!projectLink) {
        return;
    }

    event.preventDefault();
    openProject(projectLink.dataset.project);
});

/* ======================================
   DETAIL CLOSE EVENTS
====================================== */

projectShow.addEventListener("click", event => {
    const introProjectLink = event.target.closest("[data-intro-project]");

    if (introProjectLink) {
        event.preventDefault();
        openProject(introProjectLink.dataset.introProject);
        return;
    }

    if (event.target.closest("#closeIntro")) {
        showProjectList();
        return;
    }

    if (event.target.closest("#closeProject")) {
        closeProject();
    }
});

/* ======================================
   LANGUAGE MANAGEMENT
====================================== */

function updateLanguageSelector() {
    languageButtons.forEach(button => {
        const selected = button.dataset.language === currentLanguage;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
}

function setLanguage(language) {
    if (!translations[language] || language === currentLanguage) {
        return;
    }

    const listScroll = projectList.scrollTop;
    const detailScroll = projectShow.scrollTop;
    const previousView = mobileView;
    const previousProjectId = currentProjectId;

    currentLanguage = language;

    try {
        localStorage.setItem("siteLanguage", language);
    } catch (error) {
        console.warn("Could not save language preference.", error);
    }

    document.documentElement.lang = language;
    updateLanguageSelector();
    updateNavBrand();
    renderProjectList();
    renderFilters();

    if (previousProjectId) {
        renderProject(previousProjectId);
    } else {
        renderEmptyProject();
    }

    mobileView = previousView;
    filterProjects(activeFilter);
    updateMobileView();
    updateURL(previousProjectId, activeFilter, previousView, true);

    projectList.scrollTop = listScroll;
    projectShow.scrollTop = detailScroll;
}

languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.language);
    });
});

/* ======================================
   INITIALIZATION / BROWSER HISTORY
====================================== */

function initPage(fromHistory = false) {
    const params = new URLSearchParams(window.location.search);
    const requestedProjectId = params.get("project");
    const requestedFilter = params.get("filter");

    activeFilter = PROJECT_TYPES.includes(requestedFilter)
        ? requestedFilter
        : null;

    const projectExists = requestedProjectId
        && projects.some(project => String(project.id) === String(requestedProjectId));

    if (projectExists) {
        renderProject(requestedProjectId);
        mobileView = "project";
    } else {
        renderEmptyProject();
        mobileView = fromHistory && history.state?.view === "list"
            ? "list"
            : "intro";
    }

    filterProjects(activeFilter);
    updateMobileView();

    // Remove an invalid project parameter, if there is one.
    if (requestedProjectId && !projectExists) {
        updateURL(null, activeFilter, mobileView, true);
    } else if (!fromHistory) {
        updateURL(projectExists ? requestedProjectId : null, activeFilter, mobileView, true);
    }
}

window.addEventListener("popstate", () => {
    initPage(true);
});

/* ======================================
   STARTUP
====================================== */

try {
    const savedLanguage = localStorage.getItem("siteLanguage");
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    }
} catch (error) {
    console.warn("Could not read saved language preference.", error);
}

document.documentElement.lang = currentLanguage;
updateLanguageSelector();
updateNavBrand();
renderProjectList();
renderFilters();
initPage();

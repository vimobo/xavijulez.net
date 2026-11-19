# Portfolio – Project Editing Guide

This guide explains how to add, edit and organise projects on the portfolio website.

## 1. Where to edit projects

All project information is stored in:

`js/projects.js`

The website automatically generates the project list, category filters and project content using this file.

**You do not need to edit `index.html`, `style.css` or `main.js` to add a project.**

## 2. Project structure

Each project is an object inside the `projects` array.

| Field | Required | Description |
|---|---|---|
| `id` | Yes | Unique project identifier |
| `title` | No | Project title |
| `type` | Yes | Category used by the filters |
| `categoryLabel` | No | Custom translated category name |
| `description` | No | Short project description |
| `sections` | No | Content blocks containing text, images or videos |
| `gallery` | No | Collection of photographs |
| `url` | No | External project link |

## 3. Adding a project

1. Open `js/projects.js`.
2. Find the `projects` array.
3. Copy an existing project object.
4. Paste it before the closing `];`.
5. Change its ID, title, category and content.
6. Add the correct image and video paths.
7. Save the file and refresh the website.

Every project must have a different ID.

## 4. Categories and filters

The `type` field defines the category of a project.

Examples:

- `live`
- `video`

Projects with the same type appear under the same filter.

New filters are created automatically when a new category is added.

You can also define a translated category label:

```javascript
categoryLabel: {
    en: "Photography",
    es: "Fotografía"
}
```

## 5. Languages and translations

The website supports English and Spanish.

For text that should change with the selected language, use an object:

```javascript
title: {
    en: "Music Festival",
    es: "Festival de Música"
}
```

For text that should be the same in both languages, use a normal string:

```javascript
type: "live"
```

The same translation structure can be used for titles, descriptions, section text, image descriptions and captions.

If a translation is missing, the website uses the English version when available.

## 6. Content sections

The `sections` field is an array of content blocks.

Each section can contain:

| Field | Description |
|---|---|
| `title` | Section heading |
| `text` | Paragraph |
| `image` | Image path |
| `imageAlt` | Image description for accessibility |
| `video` | Video path |

All section fields are optional.

### Text-only section

```javascript
{
    text: {
        en: "Project description.",
        es: "Descripción del proyecto."
    }
}
```

### Section with title and image

```javascript
{
    title: {
        en: "The process",
        es: "El proceso"
    },
    image: "./img/project/process.jpg"
}
```

### Section with video

```javascript
{
    title: {
        en: "Final result",
        es: "Resultado final"
    },
    video: "./video/project/final.mp4"
}
```

You can add as many sections as you need.

## 7. Photo gallery

The `gallery` field contains the photographs displayed in the project collage.

You can use a simple image path:

```javascript
"./img/project/photo1.jpg"
```

Or an object with additional information:

```javascript
{
    src: "./img/project/photo1.jpg",

    alt: {
        en: "Main stage",
        es: "Escenario principal"
    },

    caption: {
        en: "Main stage",
        es: "Escenario principal"
    }
}
```

The gallery supports portrait, landscape and square photographs.

Images keep their original proportions. They are not automatically cropped or stretched.

You do not need to specify the aspect ratio.

## 8. External project links

Use the optional `url` field to add a link to the project website:

```javascript
url: "https://example.com"
```

The website automatically displays a "Visit project" link.

Leave this field out if the project does not have an external link.

## 9. Example of a complete project

```javascript
{
    id: 4,

    title: {
        en: "Photography Project",
        es: "Proyecto Fotográfico"
    },

    type: "photography",

    categoryLabel: {
        en: "Photography",
        es: "Fotografía"
    },

    description: {
        en: "A photography project.",
        es: "Un proyecto de fotografía."
    },

    sections: [
        {
            title: {
                en: "About",
                es: "Información"
            },

            text: {
                en: "Information about the project.",
                es: "Información sobre el proyecto."
            }
        },

        {
            title: {
                en: "Final result",
                es: "Resultado final"
            },

            image: "./img/photography/result.jpg",

            imageAlt: {
                en: "Final photograph",
                es: "Fotografía final"
            }
        }
    ],

    gallery: [
        "./img/photography/photo1.jpg",

        {
            src: "./img/photography/photo2.jpg",

            alt: {
                en: "Behind the scenes",
                es: "Detrás de las cámaras"
            }
        },

        "./img/photography/photo3.jpg"
    ],

    url: "https://example.com"
}
```

## 10. File organisation

Keep project images and videos organised in folders.

Example:

```text
img/
    photography/
        result.jpg
        photo1.jpg
        photo2.jpg
        photo3.jpg

video/
    photography/
        presentation.mp4
```

Always check that the paths in `projects.js` match the actual file locations.

## 11. Important rules

- Never repeat a project ID.
- Always define a project type.
- Use the same type for projects in the same category.
- Use commas between projects and array items.
- Use relative paths for local images and videos.
- Keep image and video files inside the corresponding folders.
- Do not edit `main.js` or `index.html` to add new projects or categories.
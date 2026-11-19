/* ======================================
   PROJECT DATA

   Add new projects inside this array.
====================================== */


const projects = [

    /* ======================================
       PROJECT 1
    ======================================= */

    {
        id: 1,

        title: {
            en: "Music Festival",
            ca: "Festival de Música"
        },

        type: "live",

        categoryLabel: {
            en: "Live",
            ca: "Directo"
        },

        description: {
            en: "A music festival project focused on live performances and cultural experiences.",
            ca: "Un proyecto de festival de música centrado en actuaciones en directo y experiencias culturales."
        },

        sections: [

            {
                title: {
                    en: "Introduction",
                    ca: "Introducción"
                },

                text: {
                    en: "This project brings together music, culture and people.",
                    ca: "Este proyecto reúne música, cultura y personas."
                },

                image: "https://picsum.photos/1920/1080",

                imageAlt: {
                    en: "Festival audience",
                    ca: "Público del festival"
                }
            },

            {
                title: {
                    en: "The process",
                    ca: "El proceso"
                },

                text: {
                    en: "The festival is designed and organised by a team.",
                    ca: "El festival está diseñado y organizado por un equipo."
                },

                image: "./img/festival/https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHj0r68jZH4eo3fYSF4w2kuacrnLWu69OP644HsnhNkw&s=10"
            }

        ],

        gallery: [

            {
                src: "https://picsum.photos/1920/1080",

                alt: {
                    en: "Main stage",
                    ca: "Escenario principal"
                },

                caption: {
                    en: "Main stage",
                    ca: "Escenario principal"
                }
            },

            "https://picsum.photos/1920/1080",

            {
                src: "https://picsum.photos/1920/1080",

                alt: {
                    en: "Festival details",
                    ca: "Detalles del festival"
                }
            },

            "https://picsum.photos/1920/1080"

        ],

        url: "https://example.com"
    },


    /* ======================================
       PROJECT 2
    ======================================= */

    {
        id: 2,

        title: {
            en: "Video Production",
            ca: "Producción Audiovisual"
        },

        type: "video",

        categoryLabel: {
            en: "Video",
            ca: "Vídeo"
        },

        description: {
            en: "A video production project.",
            ca: "Un proyecto de producción audiovisual."
        },

        sections: [

            {
                title: {
                    en: "About the project",
                    ca: "Sobre el proyecto"
                },

                text: {
                    en: "This project explores different audiovisual techniques.",
                    ca: "Este proyecto explora diferentes técnicas audiovisuales."
                }
            },

            {
                title: {
                    en: "Final result",
                    ca: "Resultado final"
                },

                video: "./video/production/final.mp4"
            }

        ],

        gallery: [

            "./img/production/photo1.jpg",
            "./img/production/photo2.jpg"

        ]

    },


    /* ======================================
       PROJECT 3
    ======================================= */

    {
        id: 3,

        title: {
            en: "Web Development",
            ca: "Desarrollo Web"
        },

        type: "video",

        categoryLabel: {
            en: "Web",
            ca: "Web"
        },

        description: {
            en: "A web development project.",
            ca: "Un proyecto de desarrollo web."
        },

        sections: [

            {
                title: {
                    en: "About",
                    ca: "Información"
                },

                text: {
                    en: "A website created using HTML, CSS and JavaScript.",
                    ca: "Una página web creada utilizando HTML, CSS y JavaScript."
                },

                image: "./img/web/website.jpg"
            }

        ],

        gallery: [

            "./img/web/screenshot1.jpg",
            "./img/web/screenshot2.jpg",
            "./img/web/screenshot3.jpg"

        ],

        url: "https://example.com"

    }

];
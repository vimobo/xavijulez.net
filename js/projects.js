/* ======================================
   PROJECT DATA
   15 SAMPLE PROJECTS
====================================== */

// Sample video for testing.
// Replace with your own MP4 files when available.
const sampleVideo =
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";


const projects = [

    // ======================================
    // VIDEO PROJECTS
    // ======================================

    {
        id: 1,

        title: {
            en: "18.10.2025 — Fragments in Motion",
            ca: "18.10.2025 — Fragments en moviment"
        },

        type: "video",

        description: {
            en: "An audiovisual exploration of movement, light and fragmented memories.",
            ca: "Una exploració audiovisual del moviment, la llum i els records fragmentats."
        },

        sections: [
            {
                title: {
                    en: "About the project",
                    ca: "Sobre el projecte"
                },
                text: {
                    en: "A visual composition combining experimental filming and digital editing.",
                    ca: "Una composició visual que combina enregistrament experimental i edició digital."
                }
            },
            {
                title: {
                    en: "Video preview",
                    ca: "Previsualització del vídeo"
                },
                video: sampleVideo
            }
        ],

        gallery: [
            "https://picsum.photos/seed/fragments01/1200/800",
            "https://picsum.photos/seed/fragments02/1200/800",
            "https://picsum.photos/seed/fragments03/1200/800",
            "https://picsum.photos/seed/fragments04/1200/800"
        ]
    },


    {
        id: 2,

        title: {
            en: "04.07.2025 — A Place Between",
            ca: "04.07.2025 — Un lloc entremig"
        },

        type: "video",

        description: {
            en: "A short film about spaces, transitions and the relationship between people and their surroundings.",
            ca: "Un curtmetratge sobre els espais, les transicions i la relació entre les persones i el seu entorn."
        },

        sections: [
            {
                title: {
                    en: "Concept",
                    ca: "Concepte"
                },
                text: {
                    en: "Exploring the visual language of everyday spaces.",
                    ca: "Exploració del llenguatge visual dels espais quotidians."
                },
                image: "https://picsum.photos/seed/placebetween01/1200/800"
            }
        ],

        gallery: [
            "https://picsum.photos/seed/placebetween02/1200/800",
            "https://picsum.photos/seed/placebetween03/1200/800",
            "https://picsum.photos/seed/placebetween04/1200/800",
            "https://picsum.photos/seed/placebetween05/1200/800"
        ]
    },


    {
        id: 3,

        title: {
            en: "21.03.2025 — Echoes of the City",
            ca: "21.03.2025 — Ecos de la ciutat"
        },

        type: "video",

        description: {
            en: "An urban documentary exploring architecture, movement and sound.",
            ca: "Un documental urbà que explora l'arquitectura, el moviment i el so."
        },

        sections: [
            {
                title: {
                    en: "The film",
                    ca: "El film"
                },
                text: {
                    en: "A visual journey through different urban environments.",
                    ca: "Un recorregut visual per diferents entorns urbans."
                },
                video: sampleVideo
            }
        ],

        // Portrait gallery: 2:3
        gallery: [
            "https://picsum.photos/seed/echoes01/800/1200",
            "https://picsum.photos/seed/echoes02/800/1200",
            "https://picsum.photos/seed/echoes03/800/1200",
            "https://picsum.photos/seed/echoes04/800/1200"
        ]
    },


    {
        id: 4,

        title: {
            en: "12.12.2024 — Light Leaks",
            ca: "12.12.2024 — Fuites de llum"
        },

        type: "video",

        description: {
            en: "An experimental video project using light, shadows and analogue textures.",
            ca: "Un projecte de vídeo experimental que utilitza la llum, les ombres i les textures analògiques."
        },

        sections: [
            {
                title: {
                    en: "Visual research",
                    ca: "Recerca visual"
                },
                text: {
                    en: "A collection of visual experiments developed during production."
                }
            },
            {
                title: {
                    en: "Motion study",
                    ca: "Estudi del moviment"
                },
                video: sampleVideo
            }
        ],

        // Square gallery: 1:1
        gallery: [
            "https://picsum.photos/seed/lightleaks01/1000/1000",
            "https://picsum.photos/seed/lightleaks02/1000/1000",
            "https://picsum.photos/seed/lightleaks03/1000/1000",
            "https://picsum.photos/seed/lightleaks04/1000/1000"
        ]
    },


    {
        id: 5,

        title: {
            en: "06.09.2024 — The Shape of Sound",
            ca: "06.09.2024 — La forma del so"
        },

        type: "video",

        description: {
            en: "A music video experimenting with rhythm, image and visual repetition.",
            ca: "Un videoclip que experimenta amb el ritme, la imatge i la repetició visual."
        },

        sections: [
            {
                title: {
                    en: "Music video",
                    ca: "Videoclip"
                },
                video: sampleVideo
            }
        ],

        gallery: [
            "https://picsum.photos/seed/shapeofsound01/1600/900",
            "https://picsum.photos/seed/shapeofsound02/1600/900",
            "https://picsum.photos/seed/shapeofsound03/1600/900"
        ]
    },


    {
        id: 6,

        title: {
            en: "15.05.2024 — Moving Silence",
            ca: "15.05.2024 — Silenci en moviment"
        },

        type: "video",

        description: {
            en: "A slow audiovisual piece focused on nature, atmosphere and stillness.",
            ca: "Una peça audiovisual pausada centrada en la natura, l'atmosfera i la quietud."
        },

        sections: [
            {
                title: {
                    en: "Introduction",
                    ca: "Introducció"
                },
                text: {
                    en: "A study of rhythm through static images and subtle movement.",
                    ca: "Un estudi del ritme a través d'imatges estàtiques i moviments subtils."
                },
                image: "https://picsum.photos/seed/movingsilence01/1200/800"
            }
        ],

        gallery: [
            "https://picsum.photos/seed/movingsilence02/1200/800",
            "https://picsum.photos/seed/movingsilence03/1200/800",
            "https://picsum.photos/seed/movingsilence04/1200/800",
            "https://picsum.photos/seed/movingsilence05/1200/800"
        ]
    },


    {
        id: 7,

        title: {
            en: "22.11.2023 — Afterimage",
            ca: "22.11.2023 — Imatge persistent"
        },

        type: "video",

        description: {
            en: "An experimental visual project exploring memory and image persistence.",
            ca: "Un projecte visual experimental que explora la memòria i la persistència de la imatge."
        },

        sections: [
            {
                title: {
                    en: "Final piece",
                    ca: "Peça final"
                },
                video: sampleVideo
            }
        ],

        // Portrait gallery
        gallery: [
            "https://picsum.photos/seed/afterimage01/900/1350",
            "https://picsum.photos/seed/afterimage02/900/1350",
            "https://picsum.photos/seed/afterimage03/900/1350",
            "https://picsum.photos/seed/afterimage04/900/1350"
        ]
    },


    {
        id: 8,

        title: {
            en: "08.06.2023 — Notes from Somewhere",
            ca: "08.06.2023 — Notes d'algun lloc"
        },

        type: "video",

        description: {
            en: "A collection of audiovisual fragments documenting different places and moments.",
            ca: "Una col·lecció de fragments audiovisuals que documenten diferents llocs i moments."
        },

        sections: [
            {
                title: {
                    en: "Project notes",
                    ca: "Notes del projecte"
                },
                text: {
                    en: "A collection of recordings, photographs and visual references.",
                    ca: "Una col·lecció d'enregistraments, fotografies i referències visuals."
                }
            }
        ],

        // 4:3 gallery
        gallery: [
            "https://picsum.photos/seed/notes01/1200/900",
            "https://picsum.photos/seed/notes02/1200/900",
            "https://picsum.photos/seed/notes03/1200/900",
            "https://picsum.photos/seed/notes04/1200/900"
        ]
    },


    // ======================================
    // LIVE INSTALLATIONS
    // ======================================

    {
        id: 9,

        title: {
            en: "14.09.2025 — Resonant Space",
            ca: "14.09.2025 — Espai ressonant"
        },

        type: "live",

        description: {
            en: "An immersive installation combining sound, architecture and spatial interaction.",
            ca: "Una instal·lació immersiva que combina so, arquitectura i interacció espacial."
        },

        sections: [
            {
                title: {
                    en: "Installation",
                    ca: "Instal·lació"
                },
                text: {
                    en: "The audience experiences sound as part of the physical environment.",
                    ca: "El públic experimenta el so com a part de l'entorn físic."
                },
                image: "https://picsum.photos/seed/resonant01/1200/800"
            },
            {
                title: {
                    en: "Documentation",
                    ca: "Documentació"
                },
                video: sampleVideo
            }
        ],

        gallery: [
            "https://picsum.photos/seed/resonant02/1200/800",
            "https://picsum.photos/seed/resonant03/1200/800",
            "https://picsum.photos/seed/resonant04/1200/800",
            "https://picsum.photos/seed/resonant05/1200/800"
        ]
    },


    {
        id: 10,

        title: {
            en: "30.05.2025 — Light as Matter",
            ca: "30.05.2025 — La llum com a matèria"
        },

        type: "live",

        description: {
            en: "A spatial installation using light as its main material.",
            ca: "Una instal·lació espacial que utilitza la llum com a material principal."
        },

        sections: [
            {
                title: {
                    en: "The installation",
                    ca: "La instal·lació"
                },
                text: {
                    en: "A site-specific work designed to transform the perception of space.",
                    ca: "Una obra específica per a l'espai, dissenyada per transformar-ne la percepció."
                }
            }
        ],

        // Portrait images
        gallery: [
            "https://picsum.photos/seed/lightmatter01/800/1200",
            "https://picsum.photos/seed/lightmatter02/800/1200",
            "https://picsum.photos/seed/lightmatter03/800/1200",
            "https://picsum.photos/seed/lightmatter04/800/1200"
        ]
    },


    {
        id: 11,

        title: {
            en: "16.11.2024 — Temporary Frequencies",
            ca: "16.11.2024 — Freqüències temporals"
        },

        type: "live",

        description: {
            en: "A live sound installation exploring temporary connections between space and audience.",
            ca: "Una instal·lació sonora en directe que explora les connexions temporals entre l'espai i el públic."
        },

        sections: [
            {
                title: {
                    en: "Sound environment",
                    ca: "Entorn sonor"
                },
                image: "https://picsum.photos/seed/frequencies01/1200/900"
            },
            {
                title: {
                    en: "Live documentation",
                    ca: "Documentació en directe"
                },
                video: sampleVideo
            }
        ],

        // Square gallery
        gallery: [
            "https://picsum.photos/seed/frequencies02/1000/1000",
            "https://picsum.photos/seed/frequencies03/1000/1000",
            "https://picsum.photos/seed/frequencies04/1000/1000",
            "https://picsum.photos/seed/frequencies05/1000/1000"
        ]
    },


    {
        id: 12,

        title: {
            en: "20.07.2024 — Room for Echoes",
            ca: "20.07.2024 — Espai per als ecos"
        },

        type: "live",

        description: {
            en: "An audiovisual installation created for an enclosed architectural environment.",
            ca: "Una instal·lació audiovisual creada per a un espai arquitectònic tancat."
        },

        sections: [
            {
                title: {
                    en: "The space",
                    ca: "L'espai"
                },
                text: {
                    en: "The project transforms the room through projected images and spatial sound.",
                    ca: "El projecte transforma la sala mitjançant imatges projectades i so espacial."
                },
                image: "https://picsum.photos/seed/roomechoes01/1600/900"
            }
        ],

        gallery: [
            "https://picsum.photos/seed/roomechoes02/1600/900",
            "https://picsum.photos/seed/roomechoes03/1600/900",
            "https://picsum.photos/seed/roomechoes04/1600/900"
        ]
    },


    {
        id: 13,

        title: {
            en: "02.03.2024 — Pulse Field",
            ca: "02.03.2024 — Camp de pols"
        },

        type: "live",

        description: {
            en: "An interactive installation connecting sound pulses, movement and audience participation.",
            ca: "Una instal·lació interactiva que connecta polsos sonors, moviment i participació del públic."
        },

        sections: [
            {
                title: {
                    en: "Interaction",
                    ca: "Interacció"
                },
                text: {
                    en: "The installation responds to the movement of visitors.",
                    ca: "La instal·lació respon al moviment dels visitants."
                },
                video: sampleVideo
            }
        ],

        // 4:3 gallery
        gallery: [
            "https://picsum.photos/seed/pulsefield01/1200/900",
            "https://picsum.photos/seed/pulsefield02/1200/900",
            "https://picsum.photos/seed/pulsefield03/1200/900",
            "https://picsum.photos/seed/pulsefield04/1200/900"
        ]
    },


    {
        id: 14,

        title: {
            en: "18.08.2023 — Sound Garden",
            ca: "18.08.2023 — Jardí sonor"
        },

        type: "live",

        description: {
            en: "An outdoor sound installation combining environmental audio and natural surroundings.",
            ca: "Una instal·lació sonora a l'aire lliure que combina àudio ambiental i entorn natural."
        },

        sections: [
            {
                title: {
                    en: "Outdoor installation",
                    ca: "Instal·lació exterior"
                },
                image: "https://picsum.photos/seed/soundgarden01/1200/800"
            }
        ],

        gallery: [
            "https://picsum.photos/seed/soundgarden02/1200/800",
            "https://picsum.photos/seed/soundgarden03/1200/800",
            "https://picsum.photos/seed/soundgarden04/1200/800",
            "https://picsum.photos/seed/soundgarden05/1200/800"
        ]
    },


    {
        id: 15,

        title: {
            en: "11.02.2023 — Between Us",
            ca: "11.02.2023 — Entre nosaltres"
        },

        type: "live",

        description: {
            en: "A participatory live installation exploring the relationship between sound and collective experience.",
            ca: "Una instal·lació participativa en directe que explora la relació entre el so i l'experiència col·lectiva."
        },

        sections: [
            {
                title: {
                    en: "Live experience",
                    ca: "Experiència en directe"
                },
                text: {
                    en: "A shared experience created through sound, space and interaction.",
                    ca: "Una experiència compartida creada a través del so, l'espai i la interacció."
                },
                video: sampleVideo
            }
        ],

        // Square gallery
        gallery: [
            "https://picsum.photos/seed/betweenus01/1000/1000",
            "https://picsum.photos/seed/betweenus02/1000/1000",
            "https://picsum.photos/seed/betweenus03/1000/1000",
            "https://picsum.photos/seed/betweenus04/1000/1000"
        ]
    }

];
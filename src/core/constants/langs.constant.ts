import { arrayToSelectable } from "../../shared/helpers/selectable.helper";

export const langs = [
  "Abjasio",
  "Acehnés",
  "Acholi",
  "Acoli",
  "Adygeo",
  "Afar",
  "Ainu",
  "Akan",
  "Amárico",
  "Árabe",
  "Armenio",
  "Asamés",
  "Asu",
  "Avestano",
  "Aymará",
  "Azerbaiyano",
  "Bakho",
  "Baluchi",
  "Bambara",
  "Bengalí",
  "Bielorruso",
  "Bislama",
  "Bosnio",
  "Bretón",
  "Búlgaro",
  "Burjat",
  "Cafundo",
  "Camboyano",
  "Catalán",
  "Checheno",
  "Chichewa",
  "Chinanteco",
  "Chino mandarín",
  "Chino Wu",
  "Cingalés",
  "Coreano",
  "Corso",
  "Cree",
  "Croata",
  "Curdo",
  "Daca",
  "Danés",
  "Dari",
  "Divehi",
  "Dzongkha",
  "Efik",
  "Egeo",
  "Español",
  "Estonio",
  "Ewe",
  "Feroés",
  "Fijiano",
  "Filipino",
  "Finlandés",
  "Francés",
  "Frisono",
  "Fula",
  "Gaélico escocés",
  "Gaélico irlandés",
  "Galés",
  "Gallego",
  "Georgiano",
  "Griego",
  "Guaraní",
  "Gujarati",
  "Gwich’in",
  "Haida",
  "Hausa",
  "Hawaiano",
  "Hebreo",
  "Herero",
  "Hiligaynon",
  "Hindi",
  "Hiri motu",
  "Holandés",
  "Húngaro",
  "Indonesio",
  "Inglés",
  "Interlingua",
  "Inuktitut",
  "Inupiak",
  "Inuvialuktun",
  "Irlandés",
  "Italiano",
  "Japonés",
  "Javanés",
  "Kalaallisut",
  "Kamba",
  "Kannada",
  "Kashubian",
  "Kazajo",
  "Keble",
  "Khmer",
  "Kikuyu",
  "Kinyarwanda",
  "Kirghizo",
  "Komi",
  "Kongo",
  "Koreano",
  "Kurdish",
  "Lao",
  "Latín",
  "Letón",
  "Lituano",
  "Low German",
  "Macedonio",
  "Malagasy",
  "Malayalam",
  "Malayo",
  "Maldivo",
  "Maori",
  "Marathi",
  "Maya",
  "Mende",
  "Micmac",
  "Minangkabau",
  "Mirandés",
  "Mohawk",
  "Mongol",
  "Navajo",
  "Ndonga",
  "Neerlandés",
  "Nepalí",
  "Noruego",
  "Occitan",
  "Ojibwa",
  "Oriya",
  "Osseto",
  "Otomí",
  "Pashto",
  "Persa",
  "Polaco",
  "Portugués",
  "Quiché",
  "Romanche",
  "Rumano",
  "Rundi",
  "Ruso",
  "Samoano",
  "Sango",
  "Sánscrito",
  "Sardo",
  "Serbio",
  "Shona",
  "Sichuan Yi",
  "Sidamo",
  "Sindhi",
  "Singalés",
  "Siu",
  "Slovaco",
  "Sloveno",
  "Somali",
  "Sotho",
  "Suajili",
  "Sueco",
  "Sumero",
  "Swazi",
  "Sycamore",
  "Tagalog",
  "Tahitiano",
  "Tailandés",
  "Tamil",
  "Tatar",
  "Telugu",
  "Timne",
  "Tonga",
  "Tswana",
  "Turkish",
  "Turkmeno",
  "Tuvaluano",
  "Twi",
  "Uighur",
  "Ukrainiano",
  "Urdu",
  "Uzbeko",
  "Vietnamita",
  "Walloon",
  "Wolof",
  "Xhosa",
  "Yakuto",
  "Yao",
  "Yapese",
  "Yoruba",
  "Zhuang",
  "Zulú",
] as const;

export const {
  listSelectables: langsListSelectables,
  objectSelectables: langsSelectables,
} = arrayToSelectable(langs);

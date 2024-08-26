import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import {FaWrench, }from "react-icons/fa";
import { MdOutlineIcecream , MdDesignServices} from "react-icons/md";
import {FaFish} from "react-icons/fa";

export const Categories = [
    {
        id: 1,
        name: "Mechanics",
        urlParam: 'Mechanics',
        icon:<FaWrench />,
    },
    {
        id: 2,
        name: "Constructor",
        urlParam: 'Constructor',
        icon:<MdDesignServices />,
    },
    {
        id: 3,
        name: "Electricals",
        urlParam: 'Bakers',
        icon: <GiBeerBottle />,
    },
    {
        id: 4,
        name: "Welders",
        urlParam: 'dWelders',

    },
    {
        id: 5,
        name: "Painters",
        urlParam: 'Painters',
        icon: <MdOutlineIcecream />,
    },
    {
        id: 6,
        name: "Weavers",
        urlParam: 'Weavers',
        icon: <FaFish />,
    },
    {
        id: 7,
        name: "Carpenters",
        urlParam: 'Carpenters',
        icon: <GiBowlOfRice />,
    },
    {
        id: 8,
        name: "Plumbers",
        urlParam: 'Plumbers',

    }
]
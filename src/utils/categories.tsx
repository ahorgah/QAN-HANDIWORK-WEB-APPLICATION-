import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import {FaWrench, }from "react-icons/fa";
import { MdOutlineIcecream } from "react-icons/md";
import {FaFish} from "react-icons/fa";

export const Categories = [
    {
        id: 1,
        name: "Mechanics",
        urlParam: 'chicken',
        icon:<FaWrench />,
    },
    {
        id: 2,
        name: "Constructor",
        urlParam: 'fruits',
        icon:< GiFruitTree />,
    },
    {
        id: 3,
        name: "Bakers",
        urlParam: 'drinks',
        icon: <GiBeerBottle />,
    },
    {
        id: 4,
        name: "Welders",
        urlParam: 'desserts',

    },
    {
        id: 5,
        name: "Painters",
        urlParam: 'icecreams',
        icon: <MdOutlineIcecream />,
    },
    {
        id: 6,
        name: "Weavers",
        urlParam: 'fish',
        icon: <FaFish />,
    },
    {
        id: 7,
        name: "Carpenters",
        urlParam: 'rice',
        icon: <GiBowlOfRice />,
    },
    {
        id: 8,
        name: "Plumbers",
        urlParam: 'curry',

    }
]
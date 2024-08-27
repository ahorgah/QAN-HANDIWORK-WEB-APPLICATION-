import { GiFruitTree, GiChickenOven, GiBeerBottle, GiDominoTiles, GiSewingMachine, GiBowlOfRice, GiLightningSpanner } from "react-icons/gi";
import {FaWrench, }from "react-icons/fa";
import {MdElectricalServices, MdConstruction ,MdPlumbing , MdOutlineBakeryDining, MdCarpenter} from "react-icons/md";
import {FaFish} from "react-icons/fa";
import { AiFillFormatPainter } from "react-icons/ai";

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
        icon:<MdConstruction />,
    },
    {
        id: 3,
        name: "Bakers",
        urlParam: 'Bakers',
        icon: <MdOutlineBakeryDining />,
    },
    {
        id: 4,
        name: "Welders",
        urlParam: 'dWelders',
        icon: <GiLightningSpanner />

    },
    {
        id: 5,
        name: "Painters",
        urlParam: 'Painters',
        icon: <AiFillFormatPainter />,
    },
    {
        id: 6,
        name: "Sewing",
        urlParam: 'Sewing',
        icon: <GiSewingMachine />,
    },
    {
        id: 7,
        name: "Carpenters",
        urlParam: 'Carpenters',
        icon: <MdCarpenter />,
    },
    {
        id: 8,
        name: "Plumbers",
        urlParam: 'Plumbers',
        icon: <MdPlumbing />

    },
    {
        id: 9,
        name: "Electricals",
        urlParam: 'Electricals',
        icon: <MdElectricalServices />

    },
    {
    id: 10,
    name: "Tile Work",
    urlParam: 'Tile Work',
    icon: <GiDominoTiles />

    }
]
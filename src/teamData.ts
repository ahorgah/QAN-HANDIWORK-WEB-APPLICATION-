// src/teamData.ts
import bobo from './img/bobo.jpg';
import kenny from './img/kenny.jpg';
import nene from './img/nene1.jpg';

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    image: string;
  }
  
  const teamData: TeamMember[] = [
    {
      id: 1,
      name: "ELIHU NENE ADDO",
      role: "Project Leader",
      image: nene,
    },
    {
      id: 2,
      name: "KENNETH AHORGAH",
      role: "Lead Developer",
      image: kenny,
    },
    {
        id: 3,
        name: "QAADIRI SURAJUDEEN",
        role: "Assisting Developer",
        image: bobo,
      },
   
  ];
  
  export default teamData;
  
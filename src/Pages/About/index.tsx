import React from 'react';
import teamData from '../../teamData'; // Correct relative path to teamData.ts
import TeamMember from '../../components/TeamMember';
import './AboutUs.css';
const About: React.FC = () => {
  return (
    <div className="text-base text-textColor  mt-5 text-center md:text-left md:w-[90%]">
      <span className="text-orange-600 space-y-5 text-[2.5rem] lg:text-[1.6rem] "><b> ABOUT US - QAN HANDIWORK</b> <div className="space-y-5"></div></span>
      <h1>The handy works industry in Accra, Ghana and other regions of the country faces several
challenges that hinder the efficient connection between freelancers and customers. These
challenges include limited visibility for freelancers, difficulties in finding qualified
professionals for customers, lack of trust and reliability, pricing transparency issues, and
limited feedback mechanisms. These challenges are further exacerbated by the absence of a
centralized platform that addresses the specific needs of the local market.</h1>

  <p>While these challenges are particularly prevalent in Accra, similar issues persist in other
regions of Ghana. As the proposed platform extends its reach beyond Accra to other
regions and eventually the entire country, it is essential to address these problems
effectively to ensure the success and scalability of the platform.</p>


<p> Therefore, there is a pressing need to develop an online website for freelancers in handy
works centered in Accra, Ghana, that can later expand to other regions and eventually cover the entire country. This platform should provide a centralized hub that addresses the
challenges faced by freelancers and customers, including limited visibility, inefficient
customer search, trust and reliability concerns, pricing transparency issues, and limited
feedback mechanisms. By doing so, the platform will revolutionize the way freelancers and
customers in the handy works industry connect, collaborate, and thrive in Accra, Ghana, and beyond.</p>

 <div className="about-us">
 <span className="text-orange-600 space-y-5  text-[2.5rem] lg:text-[1.6rem] "><b> THE TEAM</b> <div className="space-y-5 "></div></span>
      <p>We are final year students of Ghana Communication Technology University, all from the BIT class who have great interet in providing services 
        that will be able to bridge the technological barrier and help make living easier for all.
        <p>What motivates us the most is the sense of unity and the eagerness to provide simple yet effective services for all our customers</p>
      </p>
      <p>Welcome to our company. We are a team of dedicated professionals...</p>  
<div className="team">
        {teamData.map((member) => (
          <TeamMember 
            key={member.id}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </div>
   </div> 
  );
}

export default About;

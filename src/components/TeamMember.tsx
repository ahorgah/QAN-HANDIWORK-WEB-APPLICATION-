// src/components/TeamMember.tsx
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image }) => {
  return (
    <div className="team-member">
      <img src={image} alt={`${name}'s profile`} className="profile-image" />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

export default TeamMember;

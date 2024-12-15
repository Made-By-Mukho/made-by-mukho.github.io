import React from "react";
import styled from "styled-components";

const GithubCard = () => {
  return (
    <Card>
      <CardContent>
        <GithubImage
          src="https://avatars.githubusercontent.com/u/67003627?s=400&u=a65577955bf17a61acbc66022113889d24967c6b&v=4"
          alt="Github Profile"
          loading="lazy"
        />
        <ProfileInfo>
          <Name>Mukho</Name>
          <Role>Software Engineer</Role>
          <Skills>Spring Boot(Java), React(TypeScript)</Skills>
          <GithubLink
            href="https://github.com/mukhoplus"
            target="_blank"
            rel="noopener noreferrer"
          >
            [Github] MukhoPlus
          </GithubLink>
        </ProfileInfo>
      </CardContent>
    </Card>
  );
};

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }
`;

const GithubImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Name = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Role = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Skills = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const GithubLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default GithubCard;

import React from "react";
import styled from "styled-components";
import { projects } from "../data/Projects.ts";

const ProjectSection = () => {
  return (
    <Section>
      <SectionTitle>주요 프로젝트</SectionTitle>
      <ProjectGrid>
        {projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectImage
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
            />
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <LinkContainer>
                <ProjectLink
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  프로젝트 보기
                </ProjectLink>
                <ProjectLink
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </ProjectLink>
              </LinkContainer>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </Section>
  );
};

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 0.5rem 0;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProjectInfo = styled.div`
  padding: 1rem;
`;

const ProjectTitle = styled.h3`
  margin: 0 0 0.5rem 0;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 1rem 0;
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default ProjectSection;

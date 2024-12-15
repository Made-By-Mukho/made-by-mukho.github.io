import React from "react";
import styled from "styled-components";
import { experiences } from "../data/Experiences.ts";

const ExperienceSection = () => {
  return (
    <Section>
      <SectionTitle>경력</SectionTitle>
      <ExperienceGrid>
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id}>
            <CardHeader>
              <CompanyName>{experience.company}</CompanyName>
              <Period>{experience.period}</Period>
            </CardHeader>
            <Role>{experience.role}</Role>
            <Description>
              {experience.description.map((item, index) => (
                <DescriptionItem key={index}>{item}</DescriptionItem>
              ))}
            </Description>
          </ExperienceCard>
        ))}
      </ExperienceGrid>
    </Section>
  );
};

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ExperienceGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ExperienceCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
`;

const CompanyName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Period = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 0.9rem;
`;

const Role = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const Description = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
`;

const DescriptionItem = styled.li`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.5rem;
  line-height: 1.5;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default ExperienceSection;

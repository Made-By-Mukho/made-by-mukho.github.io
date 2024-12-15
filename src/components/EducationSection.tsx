import React from "react";
import styled from "styled-components";
import { educations } from "../data/Educations.ts";

const EducationSection = () => {
  return (
    <Section>
      <SectionTitle>참여 교육</SectionTitle>
      <EducationGrid>
        {educations.map((education) => (
          <EducationCard key={education.id}>
            <CardHeader>
              <Title>{education.title}</Title>
              <Institution>{education.institution}</Institution>
            </CardHeader>
            <Period>{education.period}</Period>
            <Description>{education.description}</Description>
          </EducationCard>
        ))}
      </EducationGrid>
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

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EducationCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
`;

const Institution = styled.div`
  color: #666;
  font-weight: 500;
`;

const Period = styled.div`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin: 0;
  color: #444;
  line-height: 1.5;
`;

export default EducationSection;

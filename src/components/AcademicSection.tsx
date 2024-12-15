import React from "react";
import styled from "styled-components";
import { academics } from "../data/Academics.ts";

const AcademicSection = () => {
  return (
    <Section>
      <SectionTitle>학력</SectionTitle>
      <AcademicGrid>
        {academics.map((academic) => (
          <AcademicCard key={academic.id}>
            <CardContent>
              <LogoWrapper>
                <UniversityLogo
                  src={academic.logoUrl}
                  alt={`${academic.university} logo`}
                />
              </LogoWrapper>
              <AcademicInfo>
                <CardHeader>
                  <UniversityName>{academic.university}</UniversityName>
                  <Period>{academic.period}</Period>
                </CardHeader>
                <Major>{academic.major}</Major>
                <Description>{academic.description}</Description>
              </AcademicInfo>
            </CardContent>
          </AcademicCard>
        ))}
      </AcademicGrid>
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

const AcademicGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AcademicCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const CardContent = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const LogoWrapper = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 80px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const UniversityLogo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const AcademicInfo = styled.div`
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
`;

const UniversityName = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const Period = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 0.9rem;
`;

const Major = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text.secondary};

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export default AcademicSection;

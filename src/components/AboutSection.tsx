import React from "react";
import styled from "styled-components";

const AboutSection = () => {
  return (
    <Section>
      <SectionTitle>소개</SectionTitle>
      <AboutCard>
        <AboutContent>
          <Paragraph>
            다양한 서비스의 백엔드와 프론트엔드를 모두 경험하며, 실행력 중심의
            개발과 빠른 문제 해결에 강점을 가진 개발자입니다.
            <br />
            Java와 TypeScript 기반의 개발에 익숙하며, AI 도구와 DevOps 환경을
            적극 활용하여 생산성과 코드 품질을 함께 향상시켜 나갑니다.
            <br />
            서비스의 기획 의도부터 사용자 경험까지 고려하며, 제품 전체 흐름을
            이해하고 주도적으로 구현하는 데 강점을 지닙니다.
          </Paragraph>
        </AboutContent>
      </AboutCard>
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

const AboutCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};

  &:first-child {
    margin-bottom: 0.5rem;
  }
`;

export default AboutSection;

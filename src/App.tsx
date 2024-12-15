import React from "react";
import styled from "styled-components";
import Header from "./components/Header.tsx";
import GithubCard from "./components/GithubCard.tsx";
import ExperienceSection from "./components/ExperienceSection.tsx";
import AcademicSection from "./components/AcademicSection.tsx";
import ProjectSection from "./components/ProjectSection.tsx";
import EducationSection from "./components/EducationSection.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <Container>
      <Header />
      <Main>
        <ContentWrapper>
          <GithubCard />
          <ExperienceSection />
          <AcademicSection />
          <ProjectSection />
          <EducationSection />
        </ContentWrapper>
      </Main>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  min-width: 380px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;

  @media (max-width: 1240px) {
    max-width: 100%;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    padding: 0;
    gap: 1.5rem;
  }
`;

export default App;

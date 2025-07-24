import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import GithubCard from "./components/GithubCard";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import AcademicSection from "./components/AcademicSection";
import ProjectSection from "./components/ProjectSection";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";

function App() {
  return (
    <Container>
      <Header />
      <Main>
        <ContentWrapper>
          <GithubCard />
          <AboutSection />
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
  width: 100%;
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
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    padding: 0;
    gap: 1.5rem;
    max-width: 100%;
  }
`;

export default App;

import React, { useRef, useState } from "react";
import styled, { ThemeProvider, createGlobalStyle, css } from "styled-components";
import { discographyTheme } from "../styles/theme";
import {
  discographyProjects,
  discographyEraLabel,
  activeEraLabel,
  discographyExperiences,
  discographyEducations,
  currentMainExperience,
  groupReleasesByYear,
  compareDiscographyLatestFirst,
  RELEASE_GRADE_COLORS,
  formatTwoDigits,
} from "../data/Discography";
import { DiscographyProject, ReleaseGrade } from "../interfaces/Discography";
import {
  GITHUB_PROFILE,
  GithubImage,
  GithubName,
  GithubSkills,
  GithubLink,
} from "./GithubCard";
import AboutSection, {
  AboutSectionTitle,
  AboutCard,
  AboutParagraph,
} from "./AboutSection";
import ExperienceSection, {
  ExperienceSectionTitle,
  ExperienceGrid,
  ExperienceCard,
  ExperienceCardHeader,
  CompanyLogo,
  CompanyName,
  ExperiencePeriod,
  ExperienceRole,
  ExperienceDescription,
  ExperienceDescriptionItem,
} from "./ExperienceSection";
import AcademicSection, {
  AcademicSectionTitle,
  AcademicCard,
  LogoWrapper,
  UniversityName,
  AcademicPeriod,
  Major,
  AcademicDescription,
} from "./AcademicSection";
import {
  ProjectSectionTitle,
  ProjectGrid,
  ProjectCard,
  ProjectImage,
  ProjectInfo,
  ProjectTitle,
  ProjectDescription,
  LinkContainer,
  ProjectLink,
} from "./ProjectSection";
import EducationSection, {
  EducationSectionTitle,
  EducationGrid,
  EducationCard,
  EducationCardHeader,
  EducationTitle,
  Institution,
  EducationPeriod,
  EducationDescription,
} from "./EducationSection";
import Footer, { FooterText } from "./Footer";

type DiscographyViewMode = "combined" | "albums" | "tracklist";
type GradeFilter = "ALL" | ReleaseGrade;

const RELEASE_GRADES: ReleaseGrade[] = ["Full Album", "EP", "Single"];

const DiscographyView: React.FC = () => {
  const latestRelease = discographyProjects[0];

  const [viewMode, setViewMode] = useState<DiscographyViewMode>("combined");
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>("ALL");
  const [activeProject, setActiveProject] =
    useState<DiscographyProject>(latestRelease);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const discographySectionRef = useRef<HTMLElement | null>(null);
  const labelsSectionRef = useRef<HTMLDivElement | null>(null);
  const sessionsSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = (target: HTMLElement | null) => {
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const currentLabel = currentMainExperience;

  const filteredProjects = discographyProjects.filter((project) => {
    if (gradeFilter !== "ALL" && project.releaseGrade !== gradeFilter) {
      return false;
    }
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      String(project.releaseYear).includes(query) ||
      project.releaseGrade.toLowerCase().includes(query)
    );
  });

  const yearGroups = groupReleasesByYear(filteredProjects);
  const descendingFilteredProjects = [...filteredProjects].sort(
    compareDiscographyLatestFirst,
  );

  const countByGrade = (grade: ReleaseGrade): number =>
    discographyProjects.filter((p) => p.releaseGrade === grade).length;

  const activeTrackIndex = discographyProjects.findIndex(
    (p) => p.id === activeProject.id,
  );

  const handleSelectPrevTrack = () => {
    if (discographyProjects.length === 0) return;
    const nextIdx =
      activeTrackIndex <= 0
        ? discographyProjects.length - 1
        : activeTrackIndex - 1;
    setActiveProject(discographyProjects[nextIdx]);
  };

  const handleSelectNextTrack = () => {
    if (discographyProjects.length === 0) return;
    const nextIdx =
      activeTrackIndex >= discographyProjects.length - 1
        ? 0
        : activeTrackIndex + 1;
    setActiveProject(discographyProjects[nextIdx]);
  };

  const handleShuffleTrack = () => {
    if (discographyProjects.length <= 1) return;
    const candidates = discographyProjects.filter(
      (p) => p.id !== activeProject.id,
    );
    const randomProject =
      candidates[Math.floor(Math.random() * candidates.length)];
    if (randomProject) {
      setActiveProject(randomProject);
    }
  };

  return (
    <ThemeProvider theme={discographyTheme}>
      <DiscographyScrollbarStyle />
      <PageWrapper>
        <ScrollableBody>
          {/* ARTIST HERO (Extends GithubCard primitives & GITHUB_PROFILE) */}
        <ArtistHero>
          <HeroBackdrop />
          <HeroInner>
            <ArtworkColumn>
              <VinylSleeve onClick={handleShuffleTrack} title="트랙 셔플">
                <VinylDisc>
                  <VinylGroove />
                  <VinylCenterLabel />
                </VinylDisc>
                <ArtistAvatar
                  src={GITHUB_PROFILE.avatarUrl}
                  alt="Github Profile"
                  loading="lazy"
                />
              </VinylSleeve>
            </ArtworkColumn>

            <HeroMetaColumn>
              <BadgeRow>
                <VerifiedBadge>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 12L11 14L15 10M12 3L14.5 5.2L17.8 4.8L18.8 8L21.7 9.7L20.8 12.9L22.2 15.9L19.6 18L19.1 21.3L15.8 21.4L13.5 23.8L10.5 22.3L7.2 22.8L5.6 19.9L2.4 19L3 15.7L1.2 12.9L3.4 10.4L3.4 7.1L6.6 6.1L8.5 3.4L12 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>
                    VERIFIED ARTIST · {GITHUB_PROFILE.role.toUpperCase()}
                  </span>
                </VerifiedBadge>
                {currentLabel && (
                  <LabelTag>
                    <LiveDot />
                    <span>{currentLabel.company}</span>
                  </LabelTag>
                )}
              </BadgeRow>

              <ArtistTitle title={GITHUB_PROFILE.name}>
                {GITHUB_PROFILE.name}
              </ArtistTitle>
              <ArtistHeadline title={GITHUB_PROFILE.skills}>
                {GITHUB_PROFILE.skills}
              </ArtistHeadline>

              <StatsBar>
                <StatItem>
                  <StatValue>{activeEraLabel}</StatValue>
                  <StatLabel>ACTIVE ERA</StatLabel>
                </StatItem>
                <StatDivider />
                <StatButton
                  type="button"
                  onClick={() => scrollToSection(discographySectionRef.current)}
                  title="디스코그래피로 이동"
                >
                  <StatValue>{discographyProjects.length}</StatValue>
                  <StatLabel>RELEASES</StatLabel>
                </StatButton>
                <StatDivider />
                <StatButton
                  type="button"
                  onClick={() => scrollToSection(labelsSectionRef.current)}
                  title="경력으로 이동"
                >
                  <StatValue>{discographyExperiences.length}</StatValue>
                  <StatLabel>LABELS</StatLabel>
                </StatButton>
                <StatDivider />
                <StatButton
                  type="button"
                  onClick={() => scrollToSection(sessionsSectionRef.current)}
                  title="참여 교육으로 이동"
                >
                  <StatValue>{discographyEducations.length}</StatValue>
                  <StatLabel>SESSIONS</StatLabel>
                </StatButton>
              </StatsBar>

              <HeroActionRow>
                <PrimaryPlayButton
                  href={activeProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Play · ${activeProject.title}`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                  <PlayButtonText>
                    Play · {activeProject.title}
                  </PlayButtonText>
                </PrimaryPlayButton>

                <SecondaryButton type="button" onClick={handleShuffleTrack}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="16 3 21 3 21 8" />
                    <line x1="4" y1="20" x2="21" y2="3" />
                    <polyline points="21 16 21 21 16 21" />
                    <line x1="15" y1="15" x2="21" y2="21" />
                    <line x1="4" y1="4" x2="9" y2="9" />
                  </svg>
                  <span>Shuffle Track</span>
                </SecondaryButton>

                <ExternalProfileLink
                  href={GITHUB_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={GITHUB_PROFILE.githubLabel}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0.3C5.37 0.3 0 5.67 0 12.3c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.83.58C20.56 22.1 24 17.6 24 12.3 24 5.67 18.63 0.3 12 0.3z" />
                  </svg>
                  <span>{GITHUB_PROFILE.githubLabel}</span>
                </ExternalProfileLink>
              </HeroActionRow>
            </HeroMetaColumn>
          </HeroInner>
        </ArtistHero>

        <ContentContainer>
          {/* 1. DISCOGRAPHY SECTION (Extends ProjectSection primitives & DiscographyProject data) */}
          <SectionBlock ref={discographySectionRef}>
            <SectionHeaderBar>
              <SectionTitleGroup>
                <SectionHeading>
                  디스코그래피{" "}
                  <SectionSubCount>
                    {discographyEraLabel} · {discographyProjects.length} Releases
                  </SectionSubCount>
                </SectionHeading>
              </SectionTitleGroup>

              <ControlsToolbar>
                <SearchInputWrapper>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <SearchInput
                    id="discography-search"
                    name="discographySearch"
                    type="text"
                    placeholder="연도, 제목, 설명 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="디스코그래피 트랙 검색"
                  />
                  {searchQuery && (
                    <ClearSearchBtn
                      type="button"
                      onClick={() => setSearchQuery("")}
                      aria-label="검색어 지우기"
                    >
                      ×
                    </ClearSearchBtn>
                  )}
                </SearchInputWrapper>

                <ViewSwitcher role="tablist" aria-label="디스코그래피 보기 방식">
                  <ViewTab
                    type="button"
                    role="tab"
                    aria-selected={viewMode === "combined"}
                    $active={viewMode === "combined"}
                    onClick={() => setViewMode("combined")}
                  >
                    통합 뷰
                  </ViewTab>
                  <ViewTab
                    type="button"
                    role="tab"
                    aria-selected={viewMode === "albums"}
                    $active={viewMode === "albums"}
                    onClick={() => setViewMode("albums")}
                  >
                    연도별 앨범
                  </ViewTab>
                  <ViewTab
                    type="button"
                    role="tab"
                    aria-selected={viewMode === "tracklist"}
                    $active={viewMode === "tracklist"}
                    onClick={() => setViewMode("tracklist")}
                  >
                    트랙리스트
                  </ViewTab>
                </ViewSwitcher>
              </ControlsToolbar>
            </SectionHeaderBar>

            {/* RELEASE GRADE FILTER BAR: Full Album(#8A7E80), EP(#FF890A), Single(#9370DB) */}
            <GradeFilterRow aria-label="발매 등급 필터">
              <GradeFilterChip
                type="button"
                $active={gradeFilter === "ALL"}
                onClick={() => setGradeFilter("ALL")}
              >
                <span>All Releases</span>
                <GradeCount>{discographyProjects.length}</GradeCount>
              </GradeFilterChip>

              {RELEASE_GRADES.map((grade) => {
                const color = RELEASE_GRADE_COLORS[grade];
                const isActive = gradeFilter === grade;
                return (
                  <GradeFilterChip
                    key={grade}
                    type="button"
                    $active={isActive}
                    $accentColor={color}
                    onClick={() =>
                      setGradeFilter((prev) => (prev === grade ? "ALL" : grade))
                    }
                  >
                    <GradeColorDot $color={color} />
                    <span>{grade}</span>
                    <GradeCount>{countByGrade(grade)}</GradeCount>
                  </GradeFilterChip>
                );
              })}
            </GradeFilterRow>

            {filteredProjects.length === 0 ? (
              <EmptyState>검색 조건에 일치하는 릴리즈가 없습니다.</EmptyState>
            ) : (
              <>
                {(viewMode === "combined" || viewMode === "albums") && (
                  <YearTimelineStack>
                    {yearGroups.map((group) => (
                      <YearGroupSection key={group.year}>
                        <YearGroupHeader>
                          <YearBadgeTitle>{group.year}</YearBadgeTitle>
                          <YearReleaseLine />
                          <YearReleaseSummary>
                            {group.year}년 발매: {group.releases.length}개
                          </YearReleaseSummary>
                        </YearGroupHeader>

                        <AlbumGrid>
                          {group.releases.map((project) => {
                            const isSelected = activeProject.id === project.id;
                            const gradeColor =
                              RELEASE_GRADE_COLORS[project.releaseGrade];

                            return (
                              <AlbumCard
                                key={project.id}
                                $selected={isSelected}
                                $accentColor={gradeColor}
                                onClick={() => setActiveProject(project)}
                              >
                                <SleeveFrame>
                                  <SleeveImage
                                    src={project.imageUrl}
                                    alt={project.title}
                                    loading="lazy"
                                  />
                                  <SleeveOverlay $selected={isSelected}>
                                    <SleevePlayLink
                                      href={project.projectUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      title={`${project.title} 프로젝트 보기`}
                                    >
                                      <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path d="M8 5.14v14l11-7-11-7z" />
                                      </svg>
                                    </SleevePlayLink>
                                  </SleeveOverlay>
                                </SleeveFrame>

                                <AlbumMeta>
                                  <AlbumMetaHeader>
                                    <ReleaseGradeInlineTag
                                      $gradeColor={gradeColor}
                                    >
                                      {project.releaseGrade}
                                    </ReleaseGradeInlineTag>
                                    <ReleaseYearText>
                                      {project.releaseYear}
                                    </ReleaseYearText>
                                  </AlbumMetaHeader>
                                  <TitleBadgeRow>
                                    {project.isTitle && (
                                      <TitleBadge>TITLE</TitleBadge>
                                    )}
                                    <AlbumTitle title={project.title}>
                                      {project.title}
                                    </AlbumTitle>
                                    {project.isHot && <HotBadge>HOT</HotBadge>}
                                  </TitleBadgeRow>
                                  <AlbumDesc title={project.description}>
                                    {project.description}
                                  </AlbumDesc>
                                  <AlbumActionLinks
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ActionLinkPill
                                      href={project.projectUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      프로젝트 보기
                                    </ActionLinkPill>
                                    <ActionLinkGhost
                                      href={project.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      GitHub
                                    </ActionLinkGhost>
                                  </AlbumActionLinks>
                                </AlbumMeta>
                              </AlbumCard>
                            );
                          })}
                        </AlbumGrid>
                      </YearGroupSection>
                    ))}
                  </YearTimelineStack>
                )}

                {(viewMode === "combined" || viewMode === "tracklist") && (
                  <SubSectionBlock>
                    <SubSectionHeader>
                      <SubSectionTitle>
                        Complete Tracklist · 전체 릴리즈 트랙리스트 (
                        {descendingFilteredProjects.length})
                      </SubSectionTitle>
                    </SubSectionHeader>

                    <TracklistSurface>
                      <TrackTableHeader>
                        <ColNum>#</ColNum>
                        <ColTitle>RELEASE TITLE</ColTitle>
                        <ColGrade>GRADE</ColGrade>
                        <ColYear>YEAR</ColYear>
                        <ColNotes>DESCRIPTION</ColNotes>
                        <ColActions>LINKS</ColActions>
                      </TrackTableHeader>

                      <TrackRowsContainer>
                        {descendingFilteredProjects.map((project) => {
                          const isSelected = activeProject.id === project.id;
                          const gradeColor =
                            RELEASE_GRADE_COLORS[project.releaseGrade];

                          return (
                            <TrackRow
                              key={project.id}
                              $selected={isSelected}
                              onClick={() => setActiveProject(project)}
                            >
                              <ColNum>
                                {isSelected ? (
                                  <PlayingIndicator aria-label="선택된 트랙">
                                    <span />
                                    <span />
                                    <span />
                                  </PlayingIndicator>
                                ) : (
                                  <TrackIndexText>
                                    {project.releaseNumber}.
                                  </TrackIndexText>
                                )}
                              </ColNum>

                              <ColTitle>
                                <TrackThumb
                                  src={project.imageUrl}
                                  alt={project.title}
                                  loading="lazy"
                                />
                                <TrackTitleBox>
                                  <TitleBadgeRow>
                                    {project.isTitle && (
                                      <TitleBadge>TITLE</TitleBadge>
                                    )}
                                    <TrackName
                                      $selected={isSelected}
                                      title={project.title}
                                    >
                                      {project.title}
                                    </TrackName>
                                    {project.isHot && <HotBadge>HOT</HotBadge>}
                                  </TitleBadgeRow>
                                  <MobileTrackMeta
                                    title={`${project.releaseGrade} · ${project.releaseYear} · ${project.description}`}
                                  >
                                    <MobileOnlyGradeTag
                                      $gradeColor={gradeColor}
                                    >
                                      {project.releaseGrade}
                                    </MobileOnlyGradeTag>
                                    <MobileTrackMetaText>
                                      {project.releaseYear} ·{" "}
                                      {project.description}
                                    </MobileTrackMetaText>
                                  </MobileTrackMeta>
                                </TrackTitleBox>
                              </ColTitle>

                              <ColGrade>
                                <ReleaseGradeTag $gradeColor={gradeColor}>
                                  {project.releaseGrade}
                                </ReleaseGradeTag>
                              </ColGrade>

                              <ColYear>
                                <YearMonoText>
                                  {project.releaseYear}
                                </YearMonoText>
                              </ColYear>

                              <ColNotes>
                                <TrackNoteText title={project.description}>
                                  {project.description}
                                </TrackNoteText>
                              </ColNotes>

                              <ColActions onClick={(e) => e.stopPropagation()}>
                                <TrackLinkButton
                                  href={project.projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  프로젝트 보기
                                </TrackLinkButton>
                                <TrackGithubLink
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  GitHub
                                </TrackGithubLink>
                              </ColActions>
                            </TrackRow>
                          );
                        })}
                      </TrackRowsContainer>
                    </TracklistSurface>
                  </SubSectionBlock>
                )}
              </>
            )}
          </SectionBlock>

          {/* 2. ARTIST BIO (Directly inherits and reuses <AboutSection />) */}
          <BioLayout>
            <InheritedAboutSection />
            <SpecSheetCard>
              <SpecSheetTitle>ARTIST PRESS KIT</SpecSheetTitle>
              <SpecList>
                <SpecRow>
                  <SpecKey>ARTIST</SpecKey>
                  <SpecVal>{GITHUB_PROFILE.name} (@mukhoplus)</SpecVal>
                </SpecRow>
                <SpecRow>
                  <SpecKey>ROLE</SpecKey>
                  <SpecVal>{GITHUB_PROFILE.role}</SpecVal>
                </SpecRow>
                <SpecRow>
                  <SpecKey>MAIN INSTRUMENTS</SpecKey>
                  <SpecVal>{GITHUB_PROFILE.skills}</SpecVal>
                </SpecRow>
                <SpecRow>
                  <SpecKey>DISCOGRAPHY</SpecKey>
                  <SpecVal>
                    {discographyEraLabel} · {discographyProjects.length} Releases
                  </SpecVal>
                </SpecRow>
              </SpecList>
            </SpecSheetCard>
          </BioLayout>

          {/* 3. LABEL HISTORY & CREDITS (Directly inherits and reuses <ExperienceSection />) */}
          <ScrollAnchor ref={labelsSectionRef}>
            <InheritedExperienceSection />
          </ScrollAnchor>

          {/* 4. ALMA MATER & STUDIO SESSIONS (Directly inherits and reuses <AcademicSection /> & <EducationSection />) */}
          <DualColumnGrid>
            <InheritedAcademicSection />
            <ScrollAnchor ref={sessionsSectionRef}>
              <InheritedEducationSection />
            </ScrollAnchor>
          </DualColumnGrid>
        </ContentContainer>

        {/* FOOTER (Directly inherits and reuses <Footer />) */}
        <InheritedFooter />
        </ScrollableBody>

        {/* NOW PLAYING DOCK */}
        <NowPlayingDock aria-label="현재 선택된 프로젝트 플레이어">
          <NowPlayingInner>
            <DockTrackInfo>
              <DockArtwork
                src={activeProject.imageUrl}
                alt={activeProject.title}
              />
              <DockTextGroup>
                <DockStatusRow>
                  <ReleaseGradeInlineTag
                    $gradeColor={
                      RELEASE_GRADE_COLORS[activeProject.releaseGrade]
                    }
                  >
                    {activeProject.releaseGrade}
                  </ReleaseGradeInlineTag>
                  <DockCatalogTag>
                    {activeProject.releaseYear} · #{activeProject.releaseNumber}
                  </DockCatalogTag>
                </DockStatusRow>
                <DockTitle title={activeProject.title}>
                  {activeProject.title}
                </DockTitle>
                <DockDescription title={activeProject.description}>
                  {activeProject.description}
                </DockDescription>
              </DockTextGroup>
            </DockTrackInfo>

            <DockTransportControls>
              <TransportIconBtn
                type="button"
                onClick={handleSelectPrevTrack}
                aria-label="이전 트랙"
                title="이전 프로젝트"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
                </svg>
              </TransportIconBtn>

              <DockMainOpenLink
                href={activeProject.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
                <span>프로젝트 보기</span>
              </DockMainOpenLink>

              <TransportIconBtn
                type="button"
                onClick={handleSelectNextTrack}
                aria-label="다음 트랙"
                title="다음 프로젝트"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </TransportIconBtn>
            </DockTransportControls>

            <DockRightActions>
              <DockGithubBtn
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </DockGithubBtn>
              <DockCounter>
                {activeProject.trackNumber} /{" "}
                {formatTwoDigits(discographyProjects.length)}
              </DockCounter>
            </DockRightActions>
          </NowPlayingInner>
        </NowPlayingDock>
      </PageWrapper>
    </ThemeProvider>
  );
};

/* ============================================================================
 * 1. DIRECT COMPONENT INHERITANCE (styled(ExistingSectionComponent))
 * ============================================================================ */

const sectionEyebrowMixin = (label: string) => css`
  &::before {
    content: "${label}";
    display: block;
    font-size: 0.7rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      monospace;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: #a88beb;
    margin-bottom: 0.25rem;
  }
`;

const InheritedAboutSection = styled(AboutSection)`
  margin-bottom: 0;
  display: flex;
  flex-direction: column;

  ${AboutSectionTitle} {
    margin: 0 0 1rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 1.45rem;
    font-weight: 800;
    color: #ffffff;
    ${sectionEyebrowMixin("LINER NOTES · ARTIST BIOGRAPHY")}
  }

  ${AboutCard} {
    flex: 1;
    background: #15151d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1.75rem;
    box-shadow: none;
  }

  ${AboutParagraph} {
    font-size: 0.98rem;
    line-height: 1.75;
    color: #d6d6e2;
  }
`;

const InheritedExperienceSection = styled(ExperienceSection)`
  margin-bottom: 0;

  ${ExperienceSectionTitle} {
    margin: 0 0 1.25rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 1.45rem;
    font-weight: 800;
    color: #ffffff;
    ${sectionEyebrowMixin("RECORD LABELS · CAREER CREDITS")}
  }

  ${ExperienceGrid} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1.25rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  ${ExperienceCard} {
    background: #15151d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: none;

    &:first-child {
      border-color: rgba(147, 112, 219, 0.48);
    }
  }

  ${ExperienceCardHeader} {
    margin-bottom: 0.4rem;

    @media (max-width: 768px) {
      gap: 0.4rem;
    }
  }

  ${CompanyLogo} {
    width: 36px;
    height: 36px;
    border-radius: 6px;
  }

  ${CompanyName} {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 700;
  }

  ${ExperiencePeriod} {
    font-size: 0.78rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      monospace;
    color: #d8c9ff;
    background: rgba(147, 112, 219, 0.18);
    border: 1px solid rgba(147, 112, 219, 0.38);
    padding: 0.22rem 0.55rem;
    border-radius: 4px;
  }

  ${ExperienceRole} {
    color: #bdbdd0;
    font-size: 0.95rem;
    font-weight: 600;
    margin-bottom: 0.85rem;
    padding-bottom: 0.65rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  ${ExperienceDescription} {
    padding-left: 1.1rem;
  }

  ${ExperienceDescriptionItem} {
    color: #cfcfe0;
    font-size: 0.88rem;
    line-height: 1.55;
  }
`;

const InheritedAcademicSection = styled(AcademicSection)`
  margin-bottom: 0;

  ${AcademicSectionTitle} {
    margin: 0 0 1.25rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 1.45rem;
    font-weight: 800;
    color: #ffffff;
    ${sectionEyebrowMixin("ORIGIN & ALMA MATER")}
  }

  ${AcademicCard} {
    background: #15151d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1.4rem;
    box-shadow: none;
  }

  ${LogoWrapper} {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    background: #ffffff;
    padding: 4px;
    box-sizing: border-box;
    overflow: hidden;
  }

  ${UniversityName} {
    color: #ffffff;
    font-size: 1.15rem;
    font-weight: 700;
  }

  ${AcademicPeriod} {
    font-size: 0.78rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      monospace;
    color: #8a8a9e;
  }

  ${Major} {
    color: #bdbdd0;
    font-size: 0.92rem;
    margin-bottom: 0.75rem;
  }

  ${AcademicDescription} {
    margin: 0;
    background: rgba(147, 112, 219, 0.12);
    border: 1px solid rgba(147, 112, 219, 0.3);
    border-radius: 6px;
    padding: 0.65rem 0.85rem;
    font-size: 0.86rem;
    color: #ececf4;

    &::before {
      content: "HONOR / AWARD";
      display: block;
      font-size: 0.64rem;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
        monospace;
      letter-spacing: 0.08em;
      color: #c1a8fa;
      margin-bottom: 0.2rem;
    }
  }
`;

const InheritedEducationSection = styled(EducationSection)`
  margin-bottom: 0;

  ${EducationSectionTitle} {
    margin: 0 0 1.25rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 1.45rem;
    font-weight: 800;
    color: #ffffff;
    ${sectionEyebrowMixin("STUDIO SESSIONS & TRAINING")}
  }

  ${EducationGrid} {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  ${EducationCard} {
    background: #15151d;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 1.15rem 1.3rem;
    box-shadow: none;
  }

  ${EducationCardHeader} {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    column-gap: 0.5rem;
    row-gap: 0.25rem;
    margin-bottom: 0.25rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  ${EducationTitle} {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
  }

  ${Institution} {
    font-size: 0.8rem;
    color: #b79cf7;
    font-weight: 600;
  }

  ${EducationPeriod} {
    font-size: 0.76rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      monospace;
    color: #8a8a9e;
    margin-bottom: 0.5rem;
  }

  ${EducationDescription} {
    font-size: 0.86rem;
    color: #b4b4c6;
    line-height: 1.5;
  }
`;

const InheritedFooter = styled(Footer)`
  flex-shrink: 0;
  margin-top: auto;
  padding: 2rem 1.5rem;
  background-color: #09090c;
  border-top: 1px solid rgba(255, 255, 255, 0.07);

  ${FooterText} {
    font-size: 0.86rem;
    color: #8a8a9e;
  }
`;

/* ============================================================================
 * 2. STYLED PRIMITIVE INHERITANCE (Extends GithubCard & ProjectSection blocks)
 * ============================================================================ */

const ArtistAvatar = styled(GithubImage)`
  position: relative;
  z-index: 2;
  width: 190px;
  height: 190px;
  border-radius: 8px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.16);
  background-color: #18181f;

  @media (max-width: 768px) {
    width: 156px;
    height: 156px;
  }
`;

const ArtistTitle = styled(GithubName)`
  font-size: clamp(2.25rem, 4.5vw, 3.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const ArtistHeadline = styled(GithubSkills)`
  font-size: 1.02rem;
  color: #b7b7c8;
  font-weight: 500;
`;

const ExternalProfileLink = styled(GithubLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0;
  color: #cfcfe0;
  font-size: 0.86rem;
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AlbumGrid = styled(ProjectGrid)`
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 1.25rem;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const AlbumCard = styled(ProjectCard)<{
  $selected: boolean;
  $accentColor: string;
}>`
  background: ${({ $selected }) => ($selected ? "#1e1b2e" : "#15151c")};
  border: 1px solid
    ${({ $selected, $accentColor }) =>
      $selected ? $accentColor : "rgba(255, 255, 255, 0.08)"};
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  box-shadow: none;

  &:hover {
    transform: translateY(-3px);
    background: #1b1a27;
    border-color: ${({ $accentColor }) => $accentColor};
    box-shadow: none;
  }
`;

const SleeveImage = styled(ProjectImage)`
  height: 100%;
  display: block;
`;

const AlbumMeta = styled(ProjectInfo)`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
`;

const AlbumTitle = styled(ProjectTitle)`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.3;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TitleBadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
`;

const TitleBadge = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: #ffb81c;
  border: 1px solid #ffb81c;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 1px 7px;
  border-radius: 999px;
  line-height: 1.3;
`;

const HotBadge = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #a50034;
  color: #ffffff;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 2px 7px;
  border-radius: 999px;
  line-height: 1.3;
`;

const AlbumDesc = styled(ProjectDescription)`
  margin: 0;
  font-size: 0.84rem;
  color: #a6a6ba;
  line-height: 1.45;
  flex: 1;
`;

const AlbumActionLinks = styled(LinkContainer)`
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.45rem;
`;

const ActionLinkPill = styled(ProjectLink)`
  flex: 1;
  text-align: center;
  font-size: 0.76rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(147, 112, 219, 0.24);
  border: 1px solid rgba(147, 112, 219, 0.48);
  padding: 0.36rem 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }
`;

const ActionLinkGhost = styled(ProjectLink)`
  font-size: 0.76rem;
  font-weight: 600;
  color: #b8b8ca;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.36rem 0.6rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const SectionHeading = styled(ProjectSectionTitle)`
  margin: 0;
  font-size: 1.45rem;
  font-weight: 800;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

/* ============================================================================
 * 3. DISCOGRAPHY LAYOUT, YEAR TIMELINE & RELEASE GRADE BADGES
 * ============================================================================ */

const DiscographyScrollbarStyle = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    overflow: hidden;
  }

  #root > div {
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }
`;

const PageWrapper = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollableBody = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;

  scrollbar-width: auto;
  scrollbar-color: rgba(147, 112, 219, 0.45) #0d0d11;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #0d0d11;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(147, 112, 219, 0.35);
    border-radius: 999px;
    border: 2px solid #0d0d11;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(147, 112, 219, 0.72);
  }
`;

const ArtistHero = styled.section`
  flex-shrink: 0;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(165deg, #271b42 0%, #14121e 55%, #0d0d11 100%);
`;

const HeroBackdrop = styled.div`
  position: absolute;
  inset: 0;
  background-image: radial-gradient(
      circle at 18% 25%,
      rgba(147, 112, 219, 0.28) 0%,
      transparent 48%
    ),
    radial-gradient(
      circle at 82% 10%,
      rgba(112, 119, 161, 0.16) 0%,
      transparent 42%
    );
  pointer-events: none;
`;

const HeroInner = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.75rem 20px 2.5rem;
  display: flex;
  align-items: flex-end;
  gap: 2.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem 16px 1.75rem;
    gap: 1.5rem;
  }
`;

const ArtworkColumn = styled.div`
  flex-shrink: 0;
`;

const VinylSleeve = styled.div`
  position: relative;
  width: 190px;
  height: 190px;
  padding-right: 26px;
  cursor: pointer;
  user-select: none;

  &:hover > div:first-child {
    transform: translateX(18px) rotate(25deg);
  }

  @media (max-width: 768px) {
    width: 156px;
    height: 156px;
    padding-right: 20px;
  }
`;

const VinylDisc = styled.div`
  position: absolute;
  top: 7px;
  right: 0;
  width: 176px;
  height: 176px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    #1e1e26 0%,
    #0f0f13 38%,
    #1b1b22 40%,
    #0c0c10 70%,
    #1c1c24 72%,
    #0a0a0d 100%
  );
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  @media (max-width: 768px) {
    width: 142px;
    height: 142px;
  }
`;

const VinylGroove = styled.div`
  position: absolute;
  inset: 16px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.08);
`;

const VinylCenterLabel = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: radial-gradient(circle, #0d0d11 22%, #9370db 24%, #6a4cad 100%);
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const HeroMetaColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;

  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
  }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const VerifiedBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  color: #c6b4f7;
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`;

const LabelTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.74rem;
  color: #e2e2ec;
`;

const LiveDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #34d399;
  box-shadow: 0 0 8px rgba(52, 211, 153, 0.8);
`;

const StatsBar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.25rem;
  padding: 0.55rem 0;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.75rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
`;

const StatButton = styled.button`
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  background: transparent;
  border: none;
  padding: 0.15rem 0.35rem;
  margin: -0.15rem -0.35rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: rgba(147, 112, 219, 0.18);
  }
`;

const ScrollAnchor = styled.div`
  scroll-margin-top: 16px;
`;

const StatValue = styled.span`
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
`;

const StatLabel = styled.span`
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  color: #8e8ea0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
`;

const StatDivider = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.25);
`;

const HeroActionRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.4rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryPlayButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 240px;
  height: 40px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.88rem;
  line-height: 1;
  padding: 0 1.1rem;
  border-radius: 999px;
  transition: background-color 0.2s ease, transform 0.15s ease;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background-color: #a383e8;
    transform: translateY(-1px);
  }
`;

const PlayButtonText = styled.span`
  line-height: 20px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255, 255, 255, 0.08);
  color: #f3f3f7;
  border: 1px solid rgba(255, 255, 255, 0.16);
  font-weight: 600;
  font-size: 0.86rem;
  padding: 0.62rem 1.05rem;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const ContentContainer = styled.main`
  flex-shrink: 0;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 2.25rem 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem 16px;
    gap: 2.25rem;
  }
`;

const SectionBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  scroll-margin-top: 16px;
`;

const SectionHeaderBar = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const SectionTitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const SectionEyebrow = styled.span`
  font-size: 0.7rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.12em;
  color: #a88beb;
`;

const SectionSubCount = styled.span`
  font-size: 0.92rem;
  font-weight: 600;
  color: #9e9eb2;
  font-variant-numeric: tabular-nums;
`;

const ControlsToolbar = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.65rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: #17171f;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 0 0.65rem;
  color: #8e8ea0;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }

  @media (max-width: 600px) {
    flex: 1;
  }
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #f3f3f7;
  font-size: 0.82rem;
  padding: 0.45rem 0.45rem;
  width: 165px;
  outline: none;

  &::placeholder {
    color: #6f6f82;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ClearSearchBtn = styled.button`
  background: none;
  border: none;
  color: #9a9aa8;
  font-size: 1rem;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;

  &:hover {
    color: #ffffff;
  }
`;

const ViewSwitcher = styled.div`
  display: inline-flex;
  background: #16161d;
  padding: 3px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ViewTab = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#a0a0b2")};
  border: none;
  padding: 0.35rem 0.7rem;
  font-size: 0.78rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    color: #ffffff;
  }
`;

const GradeFilterRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.55rem;
`;

const GradeFilterChip = styled.button<{
  $active: boolean;
  $accentColor?: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.38rem 0.8rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  color: ${({ $active }) => ($active ? "#ffffff" : "#bdbdd0")};
  background-color: ${({ $active, $accentColor }) =>
    $active ? $accentColor ?? "#322b4d" : "rgba(255, 255, 255, 0.05)"};
  border: 1px solid
    ${({ $active, $accentColor }) =>
      $active
        ? $accentColor ?? "rgba(147, 112, 219, 0.7)"
        : "rgba(255, 255, 255, 0.12)"};
  transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease;

  &:hover {
    color: #ffffff;
    border-color: ${({ $accentColor }) =>
      $accentColor ?? "rgba(255, 255, 255, 0.35)"};
  }
`;

const GradeColorDot = styled.span<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  box-shadow: 0 0 6px ${({ $color }) => $color};
`;

const GradeCount = styled.span`
  font-size: 0.72rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  opacity: 0.85;
`;

const YearTimelineStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
`;

const YearGroupSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const YearGroupHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const YearBadgeTitle = styled.h3`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
  color: #ffffff;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
`;

const YearReleaseLine = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(147, 112, 219, 0.38) 0%,
    rgba(255, 255, 255, 0.06) 100%
  );
`;

const YearReleaseSummary = styled.span`
  font-size: 0.78rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #9e9eb2;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.22rem 0.6rem;
  border-radius: 999px;
`;

const ReleaseGradeTag = styled.span<{ $gradeColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $gradeColor }) => $gradeColor};
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
  white-space: nowrap;
`;

const ReleaseGradeInlineTag = styled.span<{ $gradeColor: string }>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ $gradeColor }) => $gradeColor};
  color: #ffffff;
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
`;

const AlbumMetaHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const ReleaseYearText = styled.span`
  font-size: 0.74rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #8a8a9e;
  font-variant-numeric: tabular-nums;
`;

const EmptyState = styled.div`
  padding: 2.5rem;
  text-align: center;
  background: #15151c;
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  color: #9a9aa8;
  font-size: 0.92rem;
`;

const SubSectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-top: 0.75rem;
`;

const SubSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SubSectionTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #dcdce6;
`;

const TracklistHint = styled.span`
  font-size: 0.76rem;
  color: #7d7d90;
`;

const SleeveFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  background: #0f0f14;
  border: 1px solid rgba(255, 255, 255, 0.07);
`;

const SleeveOverlay = styled.div<{ $selected: boolean }>`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 55%,
    rgba(10, 10, 14, 0.72) 100%
  );
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  opacity: ${({ $selected }) => ($selected ? 1 : 0.94)};
`;

const SleevePlayLink = styled.a`
  align-self: flex-end;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
  transition: transform 0.15s ease, background-color 0.15s ease;

  &:hover {
    transform: scale(1.07);
    background-color: #a686ed;
  }
`;

const TracklistSurface = styled.div`
  background: #14141b;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
`;

const trackGridTemplate = css`
  display: grid;
  grid-template-columns: 44px minmax(175px, 1.4fr) 104px 68px minmax(170px, 1.6fr) 175px;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 960px) {
    grid-template-columns: 38px minmax(160px, 1fr) 96px 160px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 38px minmax(160px, 1fr) 96px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 32px 1fr;
    gap: 0.5rem;
  }
`;

const TrackTableHeader = styled.div`
  ${trackGridTemplate}
  padding: 0.65rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.7rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.08em;
  color: #7e7e92;
`;

const TrackRowsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackRow = styled.div<{ $selected: boolean }>`
  ${trackGridTemplate}
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  background: ${({ $selected }) =>
    $selected ? "rgba(147, 112, 219, 0.15)" : "transparent"};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $selected }) =>
      $selected ? "rgba(147, 112, 219, 0.22)" : "rgba(255, 255, 255, 0.04)"};
  }
`;

const ColNum = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-variant-numeric: tabular-nums;
`;

const TrackIndexText = styled.span`
  font-size: 0.82rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 700;
  color: #9696aa;
`;

const PlayingIndicator = styled.div`
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  height: 13px;

  span {
    width: 3px;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 1px;
  }

  span:nth-child(1) {
    height: 60%;
  }
  span:nth-child(2) {
    height: 100%;
  }
  span:nth-child(3) {
    height: 75%;
  }
`;

const ColTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const TrackThumb = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const TrackTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  min-width: 0;
`;

const TrackName = styled.span<{ $selected: boolean }>`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ $selected }) => ($selected ? "#cbb6ff" : "#f3f3f7")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MobileTrackMeta = styled.div`
  display: none;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  color: #9292a6;
  min-width: 0;

  @media (max-width: 960px) {
    display: flex;
  }
`;

const MobileOnlyGradeTag = styled(ReleaseGradeInlineTag)`
  display: none;
  flex-shrink: 0;

  @media (max-width: 600px) {
    display: inline-flex;
  }
`;

const MobileTrackMetaText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ColGrade = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ColYear = styled.div`
  @media (max-width: 960px) {
    display: none;
  }
`;

const YearMonoText = styled.span`
  font-size: 0.8rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #9e9eb2;
  font-variant-numeric: tabular-nums;
`;

const ColNotes = styled.div`
  min-width: 0;

  @media (max-width: 960px) {
    display: none;
  }
`;

const TrackNoteText = styled.span`
  font-size: 0.85rem;
  color: #a5a5b8;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ColActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.45rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TrackLinkButton = styled(ProjectLink)`
  font-size: 0.75rem;
  font-weight: 600;
  color: #ffffff;
  background: rgba(147, 112, 219, 0.26);
  border: 1px solid rgba(147, 112, 219, 0.5);
  padding: 0.32rem 0.6rem;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }
`;

const TrackGithubLink = styled(ProjectLink)`
  font-size: 0.75rem;
  font-weight: 600;
  color: #b4b4c6;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.32rem 0.55rem;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const BioLayout = styled.div`
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 1.25rem;
  align-items: stretch;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const SpecSheetCard = styled.div`
  background: #13131a;
  border: 1px solid rgba(147, 112, 219, 0.25);
  border-radius: 8px;
  padding: 1.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.85rem;
  margin-top: 3.35rem;

  @media (max-width: 860px) {
    margin-top: 0;
  }
`;

const SpecSheetTitle = styled.div`
  font-size: 0.72rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  letter-spacing: 0.12em;
  color: #b79cf7;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.5rem;
`;

const SpecList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const SpecRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

const SpecKey = styled.span`
  font-size: 0.68rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #7f7f92;
`;

const SpecVal = styled.span`
  font-size: 0.88rem;
  font-weight: 600;
  color: #ededf4;
`;

const DualColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 1.75rem;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const NowPlayingDock = styled.aside`
  flex-shrink: 0;
  width: 100%;
  z-index: 95;
  background: rgba(18, 18, 24, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(147, 112, 219, 0.35);
  box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.5);
`;

const NowPlayingInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.65rem 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0.55rem 12px;
    gap: 0.65rem;
  }
`;

const DockTrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  flex: 1;
`;

const DockArtwork = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 5px;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.14);
  flex-shrink: 0;

  @media (max-width: 560px) {
    width: 40px;
    height: 40px;
  }
`;

const DockTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  min-width: 0;
`;

const DockStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const DockCatalogTag = styled.span`
  font-size: 0.66rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #9696aa;

  @media (max-width: 560px) {
    display: none;
  }
`;

const DockTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 20px;
  height: 20px;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DockDescription = styled.div`
  font-size: 0.76rem;
  line-height: 18px;
  height: 18px;
  color: #9d9db0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 680px) {
    display: none;
  }
`;

const DockTransportControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const TransportIconBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #e2e2ec;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.16);
    color: #ffffff;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

const DockMainOpenLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  white-space: nowrap;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #a686ed;
  }
`;

const DockRightActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-shrink: 0;

  @media (max-width: 680px) {
    display: none;
  }
`;

const DockGithubBtn = styled(ProjectLink)`
  font-size: 0.78rem;
  font-weight: 600;
  color: #cfcfe0;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 0.38rem 0.75rem;
  border-radius: 6px;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.32);
  }
`;

const DockCounter = styled.span`
  font-size: 0.74rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  color: #828296;
  font-variant-numeric: tabular-nums;
`;

export default DiscographyView;

import { Project } from "../interfaces/Project";
import rdc from "../assets/images/rdc.png";
import scrank from "../assets/images/scrank.png";
import underworld from "../assets/images/underworld.png";
import mlock from "../assets/images/mlock.png";
import umbrella from "../assets/images/umbrella.png";
import questionbank from "../assets/images/questionbank.png";
import edubox from "../assets/images/edubox.png";

export const projects: Project[] = [
  {
    id: 1,
    title: "철벽레스텔 예약 일자 계산기",
    description: "복지회관 유틸리티 프로그램",
    imageUrl: rdc,
    projectUrl: "https://github.com/mukhoplus",
    githubUrl: "https://github.com/mukhoplus",
  },
  {
    id: 2,
    title: "ESPers Starcraft Ranking System",
    description: "동아리 스타크래프트 랭킹 서비스",
    imageUrl: scrank,
    projectUrl: "https://scrank.mukho.r-e.kr/",
    githubUrl: "https://github.com/mukhoplus/rank-system",
  },
  {
    id: 3,
    title: "Underworld LINE+",
    description: "1:1 웹/앱 채팅 서비스",
    imageUrl: underworld,
    projectUrl: "https://underworld-line.mukho.r-e.kr/",
    githubUrl: "https://github.com/mukhoplus/Underworld-LINE-Plus",
  },
  {
    id: 4,
    title: "Mlock",
    description: "네이버 시계 클론 코딩",
    imageUrl: mlock,
    projectUrl: "https://mukho-clock.github.io/",
    githubUrl: "https://github.com/mukhoplus/Mlock",
  },
  {
    id: 5,
    title: "아 맞다 우산",
    description: "우산 알림 애플리케이션",
    imageUrl: umbrella,
    projectUrl: "https://github.com/Mukho-I-O",
    githubUrl: "https://github.com/Mukho-I-O",
  },
  {
    id: 6,
    title: "모의고사 생성기",
    description: "From xlsx to docx",
    imageUrl: questionbank,
    projectUrl: "https://github.com/mukhoplus/questionbank",
    githubUrl: "https://github.com/mukhoplus/questionbank",
  },
  {
    id: 7,
    title: "EduBox",
    description: "FE Engineer",
    imageUrl: edubox,
    projectUrl: "https://github.com/SSAFY-Escape-from-backend-potato",
    githubUrl:
      "https://github.com/SSAFY-Escape-from-backend-potato/edubox_front_team1",
  },
];

import { Project } from "../interfaces/Project";
import rdc from "../assets/images/rdc.png";
import scrank from "../assets/images/scrank.png";
import underworld from "../assets/images/underworld.png";
import mlock from "../assets/images/mlock.png";
import ssammu from "../assets/images/ssammu.png";
import umbrella from "../assets/images/umbrella.png";
import questionbank from "../assets/images/questionbank.png";
// import edubox from "../assets/images/edubox.png";
import mbm from "../assets/images/mbm.png";
import linepro from "../assets/images/linepro.png";
// import espers from "../assets/images/espers.png";
import smbot from "../assets/images/smb.png";

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
    title: "쌈무톡",
    description: "MapleStory API 기반 오픈 채팅 서비스",
    imageUrl: ssammu,
    projectUrl: "https://ssammutalk.mukho.r-e.kr/",
    githubUrl: "https://github.com/mukhoplus/SsamMuTalk_docs",
  },
  {
    id: 6,
    title: "아 맞다 우산",
    description: "우산 알림 애플리케이션",
    imageUrl: umbrella,
    projectUrl: "https://github.com/Mukho-I-O",
    githubUrl: "https://github.com/Mukho-I-O/Oh-My-Umbrella-Prototype",
  },
  {
    id: 7,
    title: "모의고사 생성기",
    description: "From xlsx to docx",
    imageUrl: questionbank,
    projectUrl: "https://github.com/mukhoplus/questionbank",
    githubUrl: "https://github.com/mukhoplus/questionbank",
  },
  // {
  //   id: 8,
  //   title: "EduBox",
  //   description: "FE Engineer",
  //   imageUrl: edubox,
  //   projectUrl: "https://github.com/SSAFY-Escape-from-backend-potato",
  //   githubUrl:
  //     "https://github.com/SSAFY-Escape-from-backend-potato/edubox_front_team1",
  // },
  {
    id: 9,
    title: "Made By Mukho",
    description: "묵호 갤러리",
    imageUrl: mbm,
    projectUrl: "https://made-by-mukho.github.io/",
    githubUrl: "https://github.com/Made-By-Mukho/made-by-mukho.github.io",
  },
  {
    id: 10,
    title: "Underworld LINE Pro",
    description: "채팅 서비스 3.0",
    imageUrl: linepro,
    projectUrl: "https://linepro.mukho.r-e.kr/",
    githubUrl: "https://github.com/mukhoplus/Underworld-LINE-Pro",
  },
  // {
  //   id: 11,
  //   title: "ESPers Data Arena",
  //   description: "동아리 통계 포털",
  //   imageUrl: espers,
  //   projectUrl: "https://github.com/mukhoplus/ESPers-Data-Arena",
  //   githubUrl: "https://github.com/mukhoplus/ESPers-Data-Arena",
  // },
  {
    id: 12,
    title: "쌈무봇",
    description: "메이플스토리 API를 이용한 카카오톡 오픈채팅 봇",
    imageUrl: smbot,
    projectUrl: "https://github.com/mukhoplus/ssammubot",
    githubUrl: "https://github.com/mukhoplus/ssammubot",
  },
];

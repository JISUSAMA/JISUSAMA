// ------------------------------------------------------------
// README.md 자동 갱신 스크립트 (CommonJS)
// ------------------------------------------------------------
const { writeFileSync } = require("node:fs");
const Parser = require("rss-parser");

// ───────────────────── 설정값 ─────────────────────
const BLOG_RSS_URL = "https://j2su0218.tistory.com/rss";
const BLOG_POST_LIMIT = 5;
const GITHUB_USERNAME = "BUGISU";

// ───────────── 고정 템플릿: 헤더 + Tech + Portfolio ─────────────
const fixedHeader = `![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=One%20Code%20at%20a%20Time%20%7C%20One%20Step%20Forward&fontSize=35)

<p align="center">
  <a href="https://github.com/BUGISU/BUGISU/blob/main/포트폴리오-박지수.pdf">
    <img src="https://img.shields.io/badge/Portfolio-FF6F61?style=for-the-badge&logo=Micro.blog&logoColor=white" />
  </a>
  <a href="https://j2su0218.tistory.com">
    <img src="https://img.shields.io/badge/Blog-FF9800?style=for-the-badge&logo=Blogger&logoColor=white" />
  </a>
  <a href="mailto:admin@j2su0218@gmail.com">
    <img src="https://img.shields.io/badge/Email-30B980?style=for-the-badge&logo=Gmail&logoColor=white" />
  </a>
</p>

---

## 🧠 Tech Stack & Tools

### 💻 Languages & Frameworks
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Spring&nbsp;Boot](https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)

### 🛠 Tools
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github)
![Unity](https://img.shields.io/badge/Unity-000000?style=for-the-badge&logo=unity)
![VS&nbsp;Code](https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=visualstudiocode)
![IntelliJ](https://img.shields.io/badge/IntelliJ-ED2761?style=for-the-badge&logo=intellijidea)
![Rider](https://img.shields.io/badge/Rider-632CA6?style=for-the-badge&logo=rider)
![PyCharm](https://img.shields.io/badge/PyCharm-000000?style=for-the-badge&logo=pycharm)

---
## 💻 Full Stack Projects

### 🧭 SnapTide (CSR)

> 여행지 이미지 기반 SNS 플랫폼. CSR SPA 구조로 빠른 라우팅 경험 제공

- **Links:** [Frontend](https://github.com/BUGISU/SnapTide) ｜ [Backend](https://github.com/BUGISU/SnapTideAPI)
- **Stack:** React, Spring Boot

### 🎬 FilmCritiq (SSR)

> 영화 리뷰 아카이브 플랫폼. SSR 방식으로 SEO 최적화

- **Links:** [Spring Boot](https://github.com/BUGISU/FilmCritiq)
- **Stack:** Spring Boot

### 🍹 Team_ShakePot (CSR)

> 팀 기반 칵테일 레시피 공유 웹앱. 간편한 레시피 편집과 태그 필터링 지원

- **Links:** [React + Spring Boot](https://github.com/BUGISU/Team_ShakePot)
- **Stack:** React, Spring Boot

---

## 🎮 Unity Series

### 🎮 보자마자 PLAY

> 직관적 상호작용을 중시하는 Unity 기반 인터랙티브 시리즈

- **Projects:** [모바일](https://github.com/BUGISU/BojamajaPlay2_mobile) ｜ [리얼모션](https://github.com/BUGISU/BojamajaPlay2_realmotion)
- **Platform:** Unity

### 🏃 보자마자 피트니스

> 운동 습관 형성을 위한 게임형 콘텐츠

- **Projects:**  
  [런 투더 문](https://github.com/BUGISU/BMF-Run.to.the.Moon) ｜  
  [사이클링 투어](https://github.com/BUGISU/BMF-CyclingTour) ｜  
  [시티투어 부산](https://github.com/BUGISU/BMF-CityTourBusan) ｜  
  [어메이징코어](https://github.com/BUGISU/BMF-AmazingCore)
- **Platform:** Unity

### 🧠 보자마자 케어

> 인지 학습 및 건강 증진을 위한 시니어 케어 콘텐츠

- **Projects:** [케어](https://github.com/BUGISU/BMF-BojamajaCare) ｜ [브레인](https://github.com/BUGISU/BMF-BojamajaBrain)
- **Platform:** Unity

---

## 🛠 외주 프로젝트

### 🏛 복천박물관

> 지역 역사 유물을 3D 전시 콘텐츠로 구현한 전시관 전용 콘텐츠

- **Project:** [복천박물관](https://github.com/BUGISU/Bokcheon-dong)
- **Platform:** Unity

### 🎧 JB Listen
> 전북 지역의 명소, 문화, 콘텐츠를 소개하는 지역 홍보 모바일 애플리케이션  
- **Project:** [JB Listen](https://github.com/BUGISU/JBListen)  
- **Platform:** Unity



## ✍️ Latest Blog Posts`;

// ───────────────────── RSS → 최신 글 리스트 생성 ─────────────────────
async function buildBlogSection() {
  const parser = new Parser({
    headers: {
      "User-Agent": "Mozilla/5.0 (GitHubActionsBot)",
      Accept: "application/rss+xml, application/xml, text/xml; q=0.9",
    },
  });

  try {
    const feed = await parser.parseURL(BLOG_RSS_URL);

    if (!feed || !Array.isArray(feed.items) || feed.items.length === 0) {
      return "- (최근 글이 없습니다)";
    }

    return feed.items
      .slice(0, BLOG_POST_LIMIT)
      .map(({ title, link, pubDate }) => {
        const date = new Date(pubDate || Date.now()).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }
        );
        return `- ${date} · [${title}](${link})`;
      })
      .join("\n");
  } catch (err) {
    console.error("RSS 파싱 실패:", err);
    return "- (최근 글을 불러오지 못했습니다)";
  }
}

// ───────────────────── GitHub Stats HTML ─────────────────────
const githubStats = `

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true" height="150" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact" height="150" />
</p>
`;

// ───────────────────── 실행 ─────────────────────
(async () => {
  try {
    const blogSection = await buildBlogSection();
    const readme = `${fixedHeader}\n${blogSection}\n${githubStats}`;

    writeFileSync("README.md", readme, "utf8");
    console.log("✅ README.md 업데이트 완료!");
  } catch (err) {
    console.error("❌ README 업데이트 중 오류:", err);
    process.exit(1);
  }
})();

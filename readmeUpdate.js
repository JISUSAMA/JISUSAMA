// update-readme.js
// ------------------------------------------------------------
// README.md 자동 갱신 스크립트 (Node.js 순수 JavaScript 버전)
// ------------------------------------------------------------
import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

/* ───────────── 설정값 ───────────── */
const BLOG_RSS_URL   = "https://j2su0218.tistory.com/rss";
const BLOG_POST_LIMIT = 5;            // 최신 글 개수
const GITHUB_USERNAME = "BUGISU";     // GitHub Stats용

/* ───────────── 고정 템플릿: 헤더 + Tech + Portfolio ───────────── */
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

## 🚀 Portfolio Projects

### 💻 Full Stack Projects

| **Project** | **Links** | **Stack** |
|:--:|:--|:--:|
| 🧭 SnapTide (CSR) | [Frontend](https://github.com/BUGISU/SnapTide) ｜ [Backend](https://github.com/BUGISU/SnapTideAPI) | React, Spring Boot |
| 🎬 FilmCritiq (SSR) | [Spring Boot](https://github.com/BUGISU/FilmCritiq) | Spring Boot |
| 🍹 Team_ShakePot (CSR) | [React + Spring Boot](https://github.com/BUGISU/Team_ShakePot) | React, Spring Boot |

---

### 🎮 Unity Series

| **Category** | **Projects** |
|:--:|:--|
| 🎮 보자마자 PLAY | [모바일](https://github.com/BUGISU/BojamajaPlay2_mobile) ｜ [리얼모션](https://github.com/BUGISU/BojamajaPlay2_realmotion) |
| 🏃 보자마자 피트니스 | [런 투더 문](https://github.com/BUGISU/BMF-Run.to.the.Moon) ｜ [사이클링 투어](https://github.com/BUGISU/BMF-CyclingTour)<br>[시티투어 부산](https://github.com/BUGISU/BMF-CityTourBusan) ｜ [어메이징코어](https://github.com/BUGISU/BMF-AmazingCore) |
| 🧠 보자마자 케어 | [케어](https://github.com/BUGISU/BMF-BojamajaCare) ｜ [브레인](https://github.com/BUGISU/BMF-BojamajaBrain) |
| 🛠 외주 프로젝트 | [복천박물관](https://github.com/BUGISU/Bokcheon-dong) ｜ [JB Listen](https://github.com/BUGISU/JBListen) |

---

## ✍️ Latest Blog Posts
`; // ↑ 블로그 섹션은 스크립트로 삽입

/* ───────────── RSS → 최신 글 리스트 생성 ───────────── */
async function buildBlogSection() {
  const parser = new Parser();
  const feed   = await parser.parseURL(BLOG_RSS_URL);

  return feed.items
    .slice(0, BLOG_POST_LIMIT)
    .map(({ title, link, pubDate }) => {
      const date = new Date(pubDate).toLocaleDateString("en-US", {
        year:  "numeric",
        month: "short",
        day:   "2-digit",
      });
      return `- ${date} · [${title}](${link})`;
    })
    .join("\n");
}

/* ───────────── GitHub Stats HTML ───────────── */
const githubStats = `

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true" height="150" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact" height="150" />
</p>
`;

/* ───────────── 메인 실행 ───────────── */
(async () => {
  try {
    const blogSection = await buildBlogSection();
    const readme      = `${fixedHeader}\n${blogSection}\n${githubStats}`;

    writeFileSync("README.md", readme, "utf8");
    console.log("✅ README.md 업데이트 완료!");
  } catch (err) {
    console.error("❌ README 업데이트 중 오류:", err);
    process.exit(1);
  }
})();

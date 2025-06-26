import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

/* -------------------------------------------------------------------------- */
/* 📄  README.md 고정 템플릿 (위·중간·아래 모두 포함)                           */
/* -------------------------------------------------------------------------- */
let text = `![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=One%20Code%20at%20a%20Time%20%7C%20One%20Step%20Forward&fontSize=35)

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

- 🧭 **SnapTide (CSR)**  
  &nbsp;&nbsp;&nbsp;&nbsp;🔹 [Frontend - React](https://github.com/BUGISU/SnapTide)  
  &nbsp;&nbsp;&nbsp;&nbsp;🔹 [Backend - Spring Boot](https://github.com/BUGISU/SnapTideAPI)

- 🎬 **FilmCritiq (SSR)**  
  &nbsp;&nbsp;&nbsp;&nbsp;🔹 [Spring Boot](https://github.com/BUGISU/FilmCritiq)

- 🍹 **Team_ShakePot (CSR)**  
  &nbsp;&nbsp;&nbsp;&nbsp;🔹 [React + Spring Boot](https://github.com/BUGISU/Team_ShakePot)

---

### 🎮 Unity Series

- 🎮 **보자마자 PLAY 시리즈**  
  &nbsp;&nbsp;&nbsp;&nbsp;🎲 [모바일](https://github.com/BUGISU/BojamajaPlay2_mobile) ｜ [리얼모션](https://github.com/BUGISU/BojamajaPlay2_realmotion)

- 🏃 **보자마자 피트니스 시리즈**  
  &nbsp;&nbsp;&nbsp;&nbsp;🚴‍♂️ [런 투더 문](https://github.com/BUGISU/BMF-Run.to.the.Moon) ｜ [사이클링 투어](https://github.com/BUGISU/BMF-CyclingTour)  
  &nbsp;&nbsp;&nbsp;&nbsp;🚏 [시티투어 부산](https://github.com/BUGISU/BMF-CityTourBusan) ｜ [어메이징코어](https://github.com/BUGISU/BMF-AmazingCore)

- 🧠 **보자마자 케어 시리즈**  
  &nbsp;&nbsp;&nbsp;&nbsp;🧬 [케어](https://github.com/BUGISU/BMF-BojamajaCare) ｜ [브레인](https://github.com/BUGISU/BMF-BojamajaBrain)

- 🛠 **외주 프로젝트**  
  &nbsp;&nbsp;&nbsp;&nbsp;📌 [복천박물관 - 복둥이의 시간여행](https://github.com/BUGISU/Bokcheon-dong) ｜ [JB Listen](https://github.com/BUGISU/JBListen)


---

## ✍️ Latest Blog Posts
`; // ← 블로그 자리 비워둠

/* -------------------------------------------------------------------------- */
/* 📰  RSS 파싱                                                                */
/* -------------------------------------------------------------------------- */
const parser = new Parser({
  headers: { Accept: "application/rss+xml, application/xml, text/xml;q=0.9" },
});

(async () => {
  const feed = await parser.parseURL("https://j2su0218.tistory.com/rss");

  feed.items.slice(0, 5).forEach(({ title, link, pubDate }) => {
    const formatted = new Date(pubDate!).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short", // e.g., Jun
      day: "2-digit",
    });
    text += `- ${formatted} · [${title}](${link})\n`;
  });

  /* GitHub Stats 섹션 이어붙이기 */
  text += `

---

## 📊 GitHub Stats

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=BUGISU&show_icons=true" height="150" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=BUGISU&layout=compact" height="150" />
</p>
`;

  /* README.md 저장 */
  writeFileSync("README.md", text, "utf8");
  console.log("✅ README.md 업데이트 완료!");
})();

import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `<div align=center>
<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=One%20Code%20at%20a%20Time,%20One%20Step%20Forward&fontSize=40" />	
</div>
</div>
<div align=center>
<h3>📚 Tech Stack 📚</h3>
<p>✨ Platforms & Languages ✨</p>
</div>
<div align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" /><br>
<img src="https://img.shields.io/badge/Python-006699?style=flat&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat&logo=springboot&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white" />
<br>
<div align=center>
<br>
<p>🛠 Tools 🛠</p>
</div>
<div align=center>
<img src="https://img.shields.io/badge/GitHub-8A2BE2?style=flat&logo=GitHub&logoColor=white" />
<img src="https://img.shields.io/badge/Unity%203D-181717?style=flat&logo=unity&logoColor=white" />
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" /><br>
<img src="https://img.shields.io/badge/IntelliJ-ED2761?style=flat&logo=intellijidea&logoColor=white" />
<img src="https://img.shields.io/badge/Rider-7360F2?style=flat&logo=rider&logoColor=white" />
<img src="https://img.shields.io/badge/Pycharm-13C100?style=flat&logo=pycharm&logoColor=white" /><br>

</div>
<br>
<div align=center>
<p>🎨 SNS & Portfolio 🎨</p>
</div>
<div align=center>
<a href="https://github.com/BUGISU/BUGISU/blob/main/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EB%B0%95%EC%A7%80%EC%88%98.pdf">
    <img src="https://img.shields.io/badge/Portfolio-FF3633?style=flat&logo=Micro.blog&logoColor=white" />
</a>
<a href="https://j2su0218.tistory.com">
    <img src="https://img.shields.io/badge/Blog-FF9800?style=flat&logo=Blogger&logoColor=white" />
</a>
<a href="mailto:admin@j2su0218@gmail.com">
    <img src="https://img.shields.io/badge/Mail-30B980?style=flat&logo=Gmail&logoColor=white" />
</a>
<br>
</div>
<div align=center>
<h3>📚 Portfolio Project Sources Link 📚</h3>
<h3>Front/Backend Projects</h3>
<h4>📁 SnapTide(CSR)</h4>
<a href="https://github.com/BUGISU/SnapTide">
  👉 SnapTide Frontend[React]
</a><br>
<a href="https://github.com/BUGISU/SnapTideAPI">
  👉 SnapTide API Backend[Springboot]
</a>
<h4>📁 FilmCritiq(SSR)</h4>
<a href="https://github.com/BUGISU/FilmCritiq">
  👉 FilmCritiq[Springboot]
</a><br>
<h4>📁 Team_ShakePot(CSR)</h4>
<a href="https://github.com/BUGISU/Team_ShakePot">
  👉 Team_ShakePot[Springboot/React]
</a>
<h3>Unity Projects</h3>
<h4>📁 보자마자 PLAY 시리즈</h4>
<a href="https://github.com/BUGISU/BojamajaPlay2_mobile">
  👉 보자마자 Play2 모바일 Portfolio
</a><br>
<a href="https://github.com/BUGISU/BojamajaPlay2_realmotion">
  👉 보자마자 Play2 리얼모션 Portfolio
</a>
<h4>📁 보자마자 피트니스 시리즈</h4>
<a href="https://github.com/BUGISU/BMF-Run.to.the.Moon">
  👉 보자마자 피트니스 - 런 투더 문 Portfolio
</a><br>
<a href="https://github.com/BUGISU/BMF-CyclingTour">
  👉 보자마자 피트니스 - 사이클링 투어 Portfolio
</a><br>
<a href="https://github.com/BUGISU/BMF-CityTourBusan">
  👉 보자마자 피트니스 - 시티투어 부산 Portfolio
</a><br>
<a href="https://github.com/BUGISU/BMF-AmazingCore">
  👉 보자마자 피트니스 - 어메이징코어 Portfolio
</a>
<h4>📁 보자마자 케어 시리즈</h4>
<a href="https://github.com/BUGISU/BMF-BojamajaCare">
  👉 보자마자 케어 Portfolio
</a><br>
<a href="https://github.com/BUGISU/BMF-BojamajaBrain">
  👉 보자마자 브레인 Portfolio
</a><br>
<h4>📁 외주 프로젝트</h4>
<a href="https://github.com/BUGISU/Bokcheon-dong">
  👉 복천 박물관 - 복둥이의 시간여행 Portfolio
</a><br>
<a href="https://github.com/BUGISU/JBListen">
  👉 전북 - JB Listen Portfolio
</a><br>
</div>

<div align=center>
<br>
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=BUGISU&layout=compact">
<img src="https://github-readme-stats.vercel.app/api?username=BUGISU&show_icons=true">

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://j2su0218.tistory.com/rss");

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<a href=${link}>${title}</a></br>`;
  }

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();

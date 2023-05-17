import { writeFileSync } from 'node:fs';
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = 
`<div align=center>
<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=JISUSAMA%20Github!&fontSize=90" />	
</div>
<div align=center>
<h3>📚 Tech Stack 📚</h3>
<p>✨ Platforms & Languages ✨</p>
</div>
<div align="center">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white" />
</div>
<br>
<div align=center>
<p>🛠 Tools 🛠</p>
</div>
<div align=center>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />
<img src="https://img.shields.io/badge/Unity%203D-2C2255?style=flat&logo=EclipseIDE&logoColor=white" />
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" />
<br>

</div>
<br>
<div align=center>
<p>🎨 SNS & Portfolio 🎨</p>
</div>
<div align=center>
<a href="https://j2su0218.tistory.com">
    <img src="https://img.shields.io/badge/Portfolio-FF3633?style=flat&logo=Micro.blog&logoColor=white" />
</a>
<a href="https://https://j2su0218.tistory.com">
    <img src="https://img.shields.io/badge/Blog-FF9800?style=flat&logo=Blogger&logoColor=white" />
</a>
<a href="mailto:admin@j2su0218@gmail.com">
    <img src="https://img.shields.io/badge/Mail-30B980?style=flat&logo=Gmail&logoColor=white" />
</a>
<br>
</div>
<div align=center>
<br>
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=JISUSAMA&layout=compact">
<img src="https://github-readme-stats.vercel.app/api?username=JISUSAMA&show_icons=true">

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    }});

(async () => {

    // 피드 목록
    const feed = await parser.parseURL('https://systorage.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 5; i++) {
        const {title, link} = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href=${link}>${title}</a></br>`;
    }

    // README.md 파일 작성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e)
    })

    console.log('업데이트 완료')
})();
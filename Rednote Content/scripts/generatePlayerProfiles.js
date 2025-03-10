const fs = require('fs');
const path = require('path');

// 创建球员资料目录
const playersDir = path.join(__dirname, '../src/assets/players');
if (!fs.existsSync(playersDir)) {
  fs.mkdirSync(playersDir, { recursive: true });
}

// 球员数据
const players = [
  {
    id: 'ben-johns',
    name: 'Ben Johns',
    gender: '男',
    country: '美国',
    bio: 'Ben Johns被公认为是匹克球历史上最伟大的球员之一。他在2019年首次登顶男子单打世界排名第一，并保持至今。Johns以其全面的技术、出色的战术意识和冷静的比赛风格著称。他在单打、男双和混双项目中均取得了显著成就，赢得了无数PPA巡回赛冠军。除了比赛，Johns还积极参与匹克球教学和推广活动，对这项运动的发展做出了重要贡献。'
  },
  {
    id: 'tyson-mcguffin',
    name: 'Tyson McGuffin',
    gender: '男',
    country: '美国',
    bio: 'Tyson McGuffin是匹克球界最具激情和竞争力的选手之一。作为前网球教练，McGuffin凭借其强大的正手击球和积极的比赛风格在匹克球界迅速崭露头角。他以高能量和场上魅力著称，拥有众多忠实粉丝。McGuffin曾多次在主要比赛中与Ben Johns展开激烈竞争，并创立了自己的匹克球教学系统，帮助新一代球员提高技术水平。'
  },
  {
    id: 'anna-leigh-waters',
    name: 'Anna Leigh Waters',
    gender: '女',
    country: '美国',
    bio: 'Anna Leigh Waters是匹克球历史上最年轻的顶尖选手之一，15岁时就已跻身世界顶级行列。她与母亲Leigh Waters组成的双打组合在专业赛场上取得了显著成就。Waters以其出色的速度、精准的击球和超越年龄的心理素质著称。尽管年轻，她已经在PPA巡回赛中多次击败经验丰富的对手，展现出非凡的天赋和潜力，被认为是匹克球运动的未来之星。'
  },
  {
    id: 'catherine-parenteau',
    name: 'Catherine Parenteau',
    gender: '女',
    country: '加拿大',
    bio: 'Catherine Parenteau是一位加拿大裔匹克球选手，前职业网球运动员。她凭借扎实的基本功和出色的网前技术在匹克球界迅速崭露头角。Parenteau在单打和双打比赛中均表现出色，是少数能在多个项目中与顶尖选手竞争的全能型选手。她冷静的比赛风格和战术智慧使她成为场上最难对付的对手之一，多次在主要比赛中取得优异成绩。'
  },
  {
    id: 'jw-johnson',
    name: 'JW Johnson',
    gender: '男',
    country: '美国',
    bio: 'JW Johnson是匹克球界迅速崛起的年轻才俊，以其爆发力和灵活的比赛风格著称。作为前网球选手，Johnson将其运动天赋完美转化到匹克球场上，展现出非凡的适应能力。他的反手击球被认为是职业巡回赛中最强的之一，特别是其反手传球经常让对手措手不及。尽管年轻，Johnson已经在多项重要比赛中取得了令人瞩目的成绩，被视为未来可能挑战Ben Johns统治地位的选手。'
  },
  {
    id: 'riley-newman',
    name: 'Riley Newman',
    gender: '男',
    country: '美国',
    bio: 'Riley Newman是当今匹克球界最出色的双打专家之一，以其精准的网前技术和战术意识著称。他与多位搭档合作取得了显著成就，特别是在男子双打项目中。Newman的发球和第三拍进攻被认为是职业巡回赛中最具威胁的武器之一。除了技术优势，他在场上展现的冷静和决断力也是其成功的关键因素，使他成为任何双打搭档都渴望合作的理想选手。'
  },
  {
    id: 'lea-jansen',
    name: 'Lea Jansen',
    gender: '女',
    country: '美国',
    bio: 'Lea Jansen是匹克球职业巡回赛中迅速崛起的新星，以其强大的进攻能力和顽强的意志力著称。作为一名相对较晚进入职业赛场的选手，Jansen展现出非凡的学习能力和适应性。她强有力的正手击球和积极的比赛风格使她成为场上最具威胁的对手之一。Jansen的职业生涯故事激励了许多中年开始接触匹克球的爱好者，证明只要有决心和毅力，在这项运动中取得成功永远不会太晚。'
  },
  {
    id: 'callie-smith',
    name: 'Callie Smith',
    gender: '女',
    country: '美国',
    bio: 'Callie Smith是匹克球职业巡回赛中最稳定的女子选手之一，以其全面的技术和出色的双打能力著称。Smith在网前的反应速度和精准的截击使她成为理想的双打搭档。她与多位顶尖选手合作，在女子双打和混合双打项目中取得了显著成就。除了技术优势，Smith在场上展现的冷静和战术智慧也是其成功的关键因素，使她能够在关键时刻做出正确决策。'
  },
  {
    id: 'federico-staksrud',
    name: 'Federico Staksrud',
    gender: '男',
    country: '阿根廷',
    bio: 'Federico Staksrud是少数在国际舞台上取得显著成就的非美国匹克球选手。这位阿根廷球员以其强大的身体素质和爆发力著称，给对手带来巨大压力。Staksrud的正手大力击球是其标志性武器，经常在关键分上发挥决定性作用。作为国际匹克球联合会的积极推动者，他为匹克球在南美和全球的推广做出了重要贡献，代表着这项运动日益增长的国际影响力。'
  },
  {
    id: 'parris-todd',
    name: 'Parris Todd',
    gender: '女',
    country: '美国',
    bio: 'Parris Todd是匹克球界最具爆发力的女子选手之一，以其强大的击球力量和积极的比赛风格著称。作为前网球选手，Todd将其运动天赋和比赛经验成功转化到匹克球场上。她在职业巡回赛中的迅速崛起震惊了匹克球界，短时间内就挑战并击败了多位排名靠前的选手。Todd独特的击球技术和无畏的比赛态度使她成为最具观赏性的选手之一，为女子匹克球比赛带来了新的活力。'
  }
];

// 为每个球员生成Markdown文件
players.forEach(player => {
  const content = `# ${player.name}

## 基本信息
- **姓名**: ${player.name}
- **性别**: ${player.gender}
- **国籍**: ${player.country}

## 个人简介
${player.bio}

## 主要成就
- 多次PPA巡回赛冠军
- 全国锦标赛获奖者
- 世界排名前十选手

*数据更新于2023年*
`;

  fs.writeFileSync(path.join(playersDir, `${player.id}.md`), content);
  console.log(`已创建 ${player.name} 的资料文件`);
});

console.log('所有球员资料生成完成！');
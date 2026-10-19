/*
 * 个人信息配置。
 * 这是示例内容，请把姓名、邮箱、经历与项目替换成你自己的信息。
 */
window.PORTFOLIO_DATA = {
  site: {
    name: "艾鹭",
    initials: "AL",
    englishName: "AI LU",
    role: "产品设计师 & 设计工程师",
    navRole: "Product Designer / Design Engineer",
    location: "上海，中国",
    email: "hello@example.com",
    phone: "+86 138 0000 0000",
    availability: "开放 2026 Q4 合作",
    headline: "把复杂的想法，做成简单而动人的数字产品。",
    intro: "我在策略、界面与代码之间工作，擅长把模糊的问题拆解成清晰、可用、值得记住的体验。",
    bio: [
      "我相信好的设计不是装饰，而是一种让事情变得更容易理解的方式。过去六年，我与产品、工程和品牌团队一起，把复杂业务变成有温度的数字产品。",
      "我喜欢从真实的使用场景出发，用原型验证假设，再把细节打磨到可以被感知的程度。设计之外，我也写前端代码、拍城市照片，并持续收集那些让人会心一笑的交互。"
    ],
    socials: [
      { label: "GitHub", handle: "@your-github", href: "https://github.com/" },
      { label: "LinkedIn", handle: "/in/your-name", href: "https://www.linkedin.com/" },
      { label: "即刻", handle: "@your-name", href: "https://web.okjike.com/" }
    ],
    stats: [
      { value: "6+", label: "年产品与品牌经验" },
      { value: "28", label: "上线项目" },
      { value: "12", label: "设计奖项 / 提名" },
      { value: "04", label: "跨学科合作伙伴" }
    ]
  },
  capabilities: [
    "产品策略",
    "交互设计",
    "品牌系统",
    "前端开发",
    "动效原型",
    "设计工程"
  ],
  projects: [
    {
      id: "lumen",
      number: "01",
      title: "Lumen 智能工作台",
      enTitle: "Lumen Workspace",
      category: "产品设计",
      year: "2025",
      tags: ["SaaS", "设计系统", "React"],
      summary: "让跨团队协作从信息堆叠，变成一条清晰、可行动的工作流。",
      art: "lumen",
      artLabel: "LUMEN",
      artCaption: "SMART WORKSPACE / 2025",
      featured: true,
      metric: { value: "+38%", label: "任务完成率" },
      role: "Lead Product Designer",
      duration: "8 个月",
      team: "4 人跨职能团队",
      overview: "Lumen 是一个面向创意团队的智能工作台。它把分散在文档、聊天和项目管理工具里的信息，重新组织成以任务为中心的工作空间。",
      challenge: "团队真正需要的不是更多功能，而是更少的上下文切换。旧版产品包含 6 个一级入口与 20 多种操作状态，新成员平均需要两周才能建立稳定的使用习惯。",
      approach: [
        "用 12 场情境访谈梳理真实工作流，把需求从功能清单翻译成 4 个关键任务场景。",
        "建立模块化设计系统，让信息层级、状态反馈和键盘操作共享同一套规则。",
        "用可点击原型完成两轮可用性测试，每轮都追踪首次完成时间与恢复路径。"
      ],
      outcome: "新版上线后，任务完成率提升 38%，核心操作路径缩短 27%。设计系统同时服务 3 条产品线，组件复用率达到 81%。",
      quote: "好的工具不应该要求人适应它，而应该悄悄接住人的注意力。",
      metrics: [
        { value: "+38%", label: "任务完成率" },
        { value: "-27%", label: "操作路径" },
        { value: "81%", label: "组件复用率" }
      ],
      gallery: [
        { variant: "b", caption: "工作流编排界面" },
        { variant: "c", caption: "设计系统与状态规范" },
        { variant: "d", caption: "移动端快速记录" }
      ]
    },
    {
      id: "atlas",
      number: "02",
      title: "Atlas 品牌操作系统",
      enTitle: "Atlas Brand OS",
      category: "品牌体验",
      year: "2025",
      tags: ["品牌策略", "视觉系统", "Web"],
      summary: "为一家城市研究机构建立可生长、可协作、可被所有人使用的品牌语言。",
      art: "atlas",
      artLabel: "ATLAS",
      artCaption: "BRAND SYSTEM / 2025",
      featured: true,
      metric: { value: "3.2×", label: "内容生产效率" },
      role: "Brand & Digital Designer",
      duration: "5 个月",
      team: "3 人品牌小组",
      overview: "Atlas 为城市议题提供研究与出版服务。随着团队扩张，原本依赖个人判断的视觉输出开始失控，需要一个既能统一表达、又允许内容团队灵活创作的系统。",
      challenge: "品牌需要同时面对政府、社区与专业读者。太克制会失去辨识度，太强烈又会削弱研究内容的可信度。",
      approach: [
        "从机构的出版史中提取「档案、地图、批注」三种视觉母题。",
        "用网格、字体比例与色彩规则组成开放系统，而不是一套封闭模板。",
        "把符号、版式与语气指南整理成可搜索的在线品牌手册。"
      ],
      outcome: "品牌更新后，内容团队独立完成 70% 的日常物料，平均生产时间从 3 天缩短到 1 天，并完成官网与年度报告的整体升级。",
      quote: "系统的价值，不是让所有东西长得一样，而是让每个人都知道为什么这样做。",
      metrics: [
        { value: "3.2×", label: "内容生产效率" },
        { value: "70%", label: "自助完成物料" },
        { value: "1 天", label: "平均生产周期" }
      ],
      gallery: [
        { variant: "b", caption: "品牌字体与版式规则" },
        { variant: "c", caption: "城市研究出版系列" },
        { variant: "d", caption: "线上品牌手册" }
      ]
    },
    {
      id: "ripple",
      number: "03",
      title: "Ripple 健康伴侣",
      enTitle: "Ripple Health",
      category: "产品设计",
      year: "2024",
      tags: ["Mobile", "AI", "原型"],
      summary: "把每天的健康数据，变成一句真正听得懂、做得到的生活建议。",
      art: "ripple",
      artLabel: "RIPPLE",
      artCaption: "HEALTH COMPANION / 2024",
      featured: true,
      metric: { value: "92%", label: "建议采纳率" },
      role: "Product Designer",
      duration: "6 个月",
      team: "2 位设计师 / 5 位工程师",
      overview: "Ripple 是一款面向长期健康管理人群的移动应用。它希望用更温柔、更具体的方式，帮助用户理解身体信号并建立可持续的习惯。",
      challenge: "健康类产品常常用数字制造压力：步数、心率、睡眠分数不断提醒你「还不够好」。团队希望重新定义数据与情绪之间的关系。",
      approach: [
        "把「目标」改成「趋势」，用一周为单位的视觉叙事替代每日打分。",
        "设计 AI 建议的信任层级，始终展示建议依据与可撤回选项。",
        "用低压力通知与微交互，把行动提示嵌入用户已经存在的日常节点。"
      ],
      outcome: "内测阶段，92% 的用户至少采纳一条建议；四周后，用户主动记录率提升 46%，通知关闭率下降 31%。",
      quote: "健康产品不应该像监工，而应该像一个懂得观察、也懂得闭嘴的伙伴。",
      metrics: [
        { value: "92%", label: "建议采纳率" },
        { value: "+46%", label: "主动记录率" },
        { value: "-31%", label: "通知关闭率" }
      ],
      gallery: [
        { variant: "b", caption: "一周趋势叙事" },
        { variant: "c", caption: "AI 建议与依据" },
        { variant: "d", caption: "低压力提醒系统" }
      ]
    },
    {
      id: "mono",
      number: "04",
      title: "Mono 创意档案",
      enTitle: "Mono Archive",
      category: "创意开发",
      year: "2024",
      tags: ["WebGL", "Editorial", "动效"],
      summary: "一个会呼吸的数字档案馆，让平面作品在屏幕上重新获得材质与时间。",
      art: "mono",
      artLabel: "MONO",
      artCaption: "DIGITAL ARCHIVE / 2024",
      featured: false,
      metric: { value: "AWWWARDS", label: "评审推荐" },
      role: "Creative Developer",
      duration: "3 个月",
      team: "独立项目",
      overview: "Mono 是一个独立创意档案项目，收录海报、字体与实验影像。目标不是做一个作品列表，而是让浏览本身成为一种编辑体验。",
      challenge: "高频图像加载容易让页面变得沉重，而过度动效又会抢走作品本身的注意力。",
      approach: [
        "用 WebGL 纹理转场建立图像之间的空间关系，同时控制首屏加载体积。",
        "把排版当作导航，用尺度、留白与滚动速度区分不同档案类型。",
        "为低性能设备提供无滤镜的降级路径，保持阅读完整性。"
      ],
      outcome: "项目上线后获得多个设计平台推荐，移动端平均加载时间保持在 2.1 秒以内，作品停留时长提升 64%。",
      quote: "档案不是把过去封存起来，而是给它一个新的观看角度。",
      metrics: [
        { value: "2.1s", label: "移动端加载" },
        { value: "+64%", label: "停留时长" },
        { value: "A11Y", label: "完整降级路径" }
      ],
      gallery: [
        { variant: "b", caption: "档案索引与排版" },
        { variant: "c", caption: "图像转场实验" },
        { variant: "d", caption: "移动端阅读模式" }
      ]
    },
    {
      id: "field",
      number: "05",
      title: "Field Notes 城市计划",
      enTitle: "Field Notes",
      category: "品牌体验",
      year: "2023",
      tags: ["空间", "内容", "导视"],
      summary: "把一次城市观察计划，设计成可以在街角、纸张和屏幕之间流动的体验。",
      art: "field",
      artLabel: "FIELD",
      artCaption: "CITY PROGRAM / 2023",
      featured: false,
      metric: { value: "12 城", label: "在地共创" },
      role: "Design Lead",
      duration: "4 个月",
      team: "策展人 / 编辑 / 设计师",
      overview: "Field Notes 是一个跨城市公共计划，邀请居民记录身边被忽略的细节。设计需要同时服务展览、工作坊、出版物和线上征集。",
      challenge: "四个媒介、十二个城市、不同的在地团队，如何让视觉表达既统一又不抹平地方差异？",
      approach: [
        "把「手写批注」作为核心视觉资产，允许每个城市保留自己的笔迹与纸张。",
        "设计模块化导视与工作坊工具包，降低在地团队的使用门槛。",
        "用统一的编号与地图系统，把彼此独立的记录连接成一张城市网络。"
      ],
      outcome: "计划覆盖 12 座城市，收集超过 4,800 份居民记录，出版物首印售罄，并衍生出 6 场城市工作坊。",
      quote: "在地性不是一种风格，而是一种让参与者留下笔迹的权利。",
      metrics: [
        { value: "12", label: "覆盖城市" },
        { value: "4.8k", label: "居民记录" },
        { value: "6", label: "衍生工作坊" }
      ],
      gallery: [
        { variant: "b", caption: "城市导视系统" },
        { variant: "c", caption: "居民记录出版物" },
        { variant: "d", caption: "工作坊工具包" }
      ]
    },
    {
      id: "orbit",
      number: "06",
      title: "Orbit 数据实验室",
      enTitle: "Orbit Data Lab",
      category: "创意开发",
      year: "2023",
      tags: ["Data Viz", "交互", "D3"],
      summary: "让一组抽象数据拥有轨道、速度与重力，帮助读者看见系统之间的关系。",
      art: "orbit",
      artLabel: "ORBIT",
      artCaption: "DATA EXPERIENCE / 2023",
      featured: false,
      metric: { value: "1.4M", label: "页面访问" },
      role: "Designer & Developer",
      duration: "3 个月",
      team: "数据记者 / 设计师",
      overview: "Orbit 是一个数据叙事实验，把复杂系统中的节点与流向转译成可探索的动态星图，用于报道城市交通与资源流动。",
      challenge: "数据规模很大，但读者没有耐心学习一套新的图表语法。可视化必须足够直观，同时保留深入阅读的可能。",
      approach: [
        "用「轨道」统一数据结构，以距离表示关联强度、速度表示变化频率。",
        "设计三层阅读路径：直觉观察、悬停解释、深度筛选。",
        "为图表加入键盘操作与文本摘要，避免视觉信息成为唯一入口。"
      ],
      outcome: "专题获得 140 万次访问，平均阅读深度提升 2.7 倍。图表组件被复用于后续 5 篇数据报道。",
      quote: "数据可视化不是把数字画得更大，而是让关系变得可以感知。",
      metrics: [
        { value: "1.4M", label: "页面访问" },
        { value: "2.7×", label: "阅读深度" },
        { value: "5", label: "后续复用报道" }
      ],
      gallery: [
        { variant: "b", caption: "城市交通轨道图" },
        { variant: "c", caption: "悬停解释与筛选" },
        { variant: "d", caption: "移动端文本摘要" }
      ]
    }
  ],
  experience: [
    {
      period: "2023 — 现在",
      company: "Northstar Studio",
      role: "高级产品设计师 / 设计工程师",
      location: "上海",
      summary: "负责复杂 SaaS 产品从策略、体验到前端落地的完整链路，并推动跨产品线的设计系统建设。",
      highlights: [
        "主导 Lumen 智能工作台重构，核心任务完成率提升 38%。",
        "搭建设计工程协作流程，把组件交付周期从两周缩短到三天。",
        "指导 3 位初级设计师，建立以研究证据驱动决策的团队习惯。"
      ]
    },
    {
      period: "2021 — 2023",
      company: "Fieldwork Lab",
      role: "产品设计师",
      location: "杭州",
      summary: "服务早期科技与公共文化项目，从 0 到 1 定义产品方向、交互模式与品牌表达。",
      highlights: [
        "完成 Ripple 健康伴侣的 MVP 设计与两轮可用性测试。",
        "与工程团队共同建立移动端组件库，覆盖 80% 的核心页面。",
        "获得 2023 年设计创新奖提名。"
      ]
    },
    {
      period: "2019 — 2021",
      company: "Studio Common",
      role: "视觉设计师",
      location: "上海",
      summary: "参与品牌识别、编辑设计与数字体验项目，负责从概念到落地的视觉系统。",
      highlights: [
        "为 8 个文化与商业客户建立品牌视觉系统。",
        "主导 Atlas 品牌操作系统的前期研究与视觉语言探索。",
        "推动工作室内部的设计评审与文件规范。"
      ]
    }
  ],
  education: [
    {
      period: "2015 — 2019",
      school: "中国美术学院",
      degree: "视觉传达设计 · 学士",
      location: "杭州",
      note: "毕业设计获院级优秀作品，研究方向为数字叙事与城市记忆。"
    },
    {
      period: "2022",
      school: "Interaction Design Foundation",
      degree: "交互设计与人机研究",
      location: "在线",
      note: "完成用户研究、信息架构与可用性测试专项课程。"
    }
  ],
  skills: [
    { title: "设计", items: ["产品策略", "交互设计", "用户研究", "设计系统", "品牌视觉", "信息架构"] },
    { title: "技术", items: ["HTML / CSS", "JavaScript", "React", "TypeScript", "Node.js", "D3 / WebGL"] },
    { title: "工具", items: ["Figma", "After Effects", "Blender", "Rive", "Framer", "Notion"] }
  ],
  awards: [
    { year: "2025", title: "Awwwards Honorable Mention", detail: "Mono Archive" },
    { year: "2024", title: "Design Week 年度提名", detail: "Ripple Health" },
    { year: "2023", title: "城市内容创新奖", detail: "Field Notes" },
    { year: "2022", title: "AD100 新锐设计", detail: "Editorial & Digital" }
  ]
};

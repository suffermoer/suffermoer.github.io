(function () {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const page = window.location.pathname.split("/").pop() || "index.html";
  const site = data.site;
  const projects = data.projects || [];

  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));

  const safeUrl = (value) => {
    const url = String(value ?? "").trim();
    return /^(https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(url) ? url : "#";
  };

  const currentYear = new Date().getFullYear();
  let revealObserver = null;
  let toastTimer = null;

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      // The site still works when storage is unavailable.
    }

    const toggle = $("[data-theme-toggle]");
    if (toggle) {
      const nextLabel = theme === "dark" ? "切换到浅色主题" : "切换到深色主题";
      toggle.setAttribute("aria-label", nextLabel);
      toggle.setAttribute("title", nextLabel);
    }

    const themeMeta = $('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#11110f" : "#f2efe8");
  }

  function initTheme() {
    applyTheme(document.documentElement.dataset.theme || "light");

    const toggle = $("[data-theme-toggle]");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });
  }

  function initMenu() {
    const toggle = $("[data-menu-toggle]");
    const nav = $("#site-nav");
    if (!toggle || !nav) return;

    const closeMenu = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "打开菜单");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
    });

    $$("a", nav).forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
      if (!nav.classList.contains("is-open")) return;
      if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  function initScrollUI() {
    const header = $("[data-header]");
    const progress = $("[data-scroll-progress]");

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;

      if (header) header.classList.toggle("is-scrolled", scrollTop > 8);
      if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initReveal() {
    const items = $$(".reveal:not([data-reveal-bound])");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!items.length) return;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => {
        item.dataset.revealBound = "true";
        item.classList.add("is-visible");
      });
      return;
    }

    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -36px" });
    }

    items.forEach((item, index) => {
      item.dataset.revealBound = "true";
      item.style.setProperty("--reveal-delay", `${(index % 4) * 55}ms`);
      revealObserver.observe(item);
    });
  }

  function renderFooter() {
    const footer = $("[data-footer]");
    if (!footer) return;

    footer.innerHTML = `
      <div class="container footer-inner">
        <div class="footer-brand">
          <span>${escapeHTML(site.initials)}</span>
          <span>${escapeHTML(site.name)} — ${escapeHTML(site.role)}</span>
        </div>
        <div class="footer-meta">
          <span>© ${currentYear} ${escapeHTML(site.name)}</span>
          <a href="projects.html">作品</a>
          <a href="resume.html">简历</a>
          <a href="#main">回到顶部 ↑</a>
        </div>
      </div>`;
  }

  function applySiteContent() {
    $$("[data-site]").forEach((element) => {
      const key = element.dataset.site;
      if (site[key] !== undefined) element.textContent = site[key];
    });

    $$("[data-email]").forEach((element) => {
      element.href = `mailto:${site.email}`;
      if (element.classList.contains("contact-email") || element.dataset.emailText === "true") {
        element.textContent = site.email;
      }
    });

    const description = $('meta[name="description"]');
    if (description && page === "index.html") description.setAttribute("content", site.intro);
  }

  function projectArt(project, variant = "") {
    const variantClass = variant ? ` variant-${escapeHTML(variant)}` : "";
    return `
      <div class="project-art${variantClass}" data-art="${escapeHTML(project.art)}" aria-hidden="true">
        <span class="art-index">${escapeHTML(project.number)}</span>
        <span class="art-mark">${escapeHTML(project.artLabel)}</span>
        <span class="art-sub">${escapeHTML(project.artCaption)}</span>
        <span class="project-arrow">↗</span>
        <div class="art-extra"><i></i><i></i><i></i></div>
      </div>`;
  }

  function projectCard(project, featured = false) {
    const tags = (project.tags || []).map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("");
    return `
      <a class="project-card${featured ? " featured" : ""} reveal" href="project.html?id=${encodeURIComponent(project.id)}" data-category="${escapeHTML(project.category)}">
        ${projectArt(project)}
        <div class="project-info">
          <div>
            <span class="project-category">${escapeHTML(project.category)}</span>
            <h3 class="project-title">${escapeHTML(project.title)}</h3>
          </div>
          <span class="project-year">${escapeHTML(project.year)}</span>
        </div>
        <p class="project-summary">${escapeHTML(project.summary)}</p>
        <div class="tag-row">${tags}</div>
      </a>`;
  }

  function renderHome() {
    document.title = `${site.name} — ${site.role}`;

    const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
    const featuredGrid = $("#featured-projects");
    if (featuredGrid) {
      featuredGrid.innerHTML = featuredProjects
        .map((project, index) => projectCard(project, index === 0))
        .join("");
    }

    const bio = $("#about-bio");
    if (bio) bio.innerHTML = (site.bio || []).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("");

    const stats = $("#stats");
    if (stats) {
      stats.innerHTML = (site.stats || []).map((stat) => `
        <div class="stat reveal">
          <strong>${escapeHTML(stat.value)}</strong>
          <span>${escapeHTML(stat.label)}</span>
        </div>`).join("");
    }

    const experienceList = $("#experience-list");
    if (experienceList) {
      experienceList.innerHTML = (data.experience || []).slice(0, 3).map((item) => `
        <article class="timeline-item reveal">
          <span class="timeline-period">${escapeHTML(item.period)}</span>
          <div>
            <h3 class="timeline-company">${escapeHTML(item.company)}</h3>
            <p class="timeline-role">${escapeHTML(item.role)}</p>
          </div>
          <p class="timeline-summary">
            ${escapeHTML(item.summary)}
            <span class="timeline-location">${escapeHTML(item.location)}</span>
          </p>
        </article>`).join("");
    }

    const skillGroups = $("#skill-groups");
    if (skillGroups) {
      skillGroups.innerHTML = (data.skills || []).map((group) => `
        <section class="skill-group">
          <h3>${escapeHTML(group.title)}</h3>
          <ul class="skill-list">${(group.items || []).map((skill) => `<li>${escapeHTML(skill)}</li>`).join("")}</ul>
        </section>`).join("");
    }

    const socials = $("#contact-socials");
    if (socials) {
      socials.innerHTML = (site.socials || []).map((social) => `
        <a href="${escapeHTML(safeUrl(social.href))}" target="_blank" rel="noopener noreferrer">${escapeHTML(social.label)} ↗</a>`).join("");
    }
  }

  function renderProjectsPage() {
    document.title = `${site.name} — 作品`;

    const grid = $("#projects-grid");
    if (!grid) return;

    const categories = ["全部", ...new Set(projects.map((project) => project.category))];
    const filterContainer = $("#project-filters");

    if (filterContainer) {
      filterContainer.innerHTML = categories.map((category, index) => {
        const count = category === "全部" ? projects.length : projects.filter((project) => project.category === category).length;
        return `<button type="button" class="filter-button${index === 0 ? " is-active" : ""}" data-filter="${escapeHTML(category)}" aria-pressed="${index === 0}">${escapeHTML(category)} <span>${String(count).padStart(2, "0")}</span></button>`;
      }).join("");
    }

    grid.innerHTML = projects.map((project) => projectCard(project)).join("");

    const cards = $$(".project-card", grid);
    const countLabel = $("#project-result-count");

    const applyFilter = (category) => {
      let visibleCount = 0;
      cards.forEach((card) => {
        const visible = category === "全部" || card.dataset.category === category;
        card.hidden = !visible;
        if (visible) visibleCount += 1;
      });

      if (countLabel) countLabel.textContent = `显示 ${visibleCount} 个作品`;
      $$("[data-filter]", filterContainer || document).forEach((button) => {
        const active = button.dataset.filter === category;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      initReveal();
    };

    if (filterContainer) {
      filterContainer.addEventListener("click", (event) => {
        const button = event.target.closest("[data-filter]");
        if (!button) return;
        applyFilter(button.dataset.filter);
      });
    }

    applyFilter("全部");
  }

  function renderProjectDetail() {
    const container = $("#project-detail");
    if (!container) return;

    const id = new URLSearchParams(window.location.search).get("id");
    const index = id ? projects.findIndex((item) => item.id === id) : 0;
    const project = projects[index];

    if (!project || index < 0) {
      document.title = `页面未找到 — ${site.name}`;
      container.innerHTML = `
        <section class="detail-missing container">
          <p class="eyebrow">Project not found</p>
          <h1>这个项目暂时<br><em>不在这里。</em></h1>
          <p>可能是链接有误，或者项目已经被移动。</p>
          <a class="btn btn-primary" href="projects.html">返回作品列表 <span aria-hidden="true">↗</span></a>
        </section>`;
      return;
    }

    document.title = `${project.title} — ${site.name}`;
    const description = $('meta[name="description"]');
    if (description) description.setAttribute("content", project.summary);

    const nextProject = projects[(index + 1) % projects.length];
    const tags = (project.tags || []).map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("");
    const approach = (project.approach || []).map((step) => `<li>${escapeHTML(step)}</li>`).join("");
    const metrics = (project.metrics || []).map((metric) => `
      <div class="metric">
        <strong>${escapeHTML(metric.value)}</strong>
        <span>${escapeHTML(metric.label)}</span>
      </div>`).join("");
    const gallery = (project.gallery || []).map((shot, shotIndex) => `
      <figure class="gallery-item${shotIndex === 0 ? " is-wide" : ""}">
        ${projectArt(project, shot.variant)}
        <figcaption>${escapeHTML(shot.caption)}</figcaption>
      </figure>`).join("");

    container.innerHTML = `
      <section class="detail-hero container">
        <nav class="breadcrumb reveal" aria-label="面包屑">
          <a href="projects.html">作品</a><span aria-hidden="true">/</span><span>${escapeHTML(project.category)}</span>
        </nav>
        <div class="detail-heading reveal">
          <p class="eyebrow">${escapeHTML(project.number)} / ${escapeHTML(project.category)} · ${escapeHTML(project.year)}</p>
          <h1>${escapeHTML(project.title)}</h1>
          <p class="detail-lead">${escapeHTML(project.summary)}</p>
        </div>
        <div class="detail-cover reveal">${projectArt(project)}</div>
        <div class="detail-meta reveal">
          <div><span>Role</span><strong>${escapeHTML(project.role)}</strong></div>
          <div><span>Timeline</span><strong>${escapeHTML(project.duration)}</strong></div>
          <div><span>Team</span><strong>${escapeHTML(project.team)}</strong></div>
          <div><span>Year</span><strong>${escapeHTML(project.year)}</strong></div>
        </div>
      </section>

      <section class="detail-content container">
        <aside class="detail-aside reveal">
          <div class="aside-block">
            <span>Project index</span>
            <strong>${escapeHTML(project.number)} / ${String(projects.length).padStart(2, "0")}</strong>
          </div>
          <div class="aside-block">
            <span>Services</span>
            <div class="tag-row">${tags}</div>
          </div>
          <a class="text-link" href="index.html#contact">聊聊类似项目 <span aria-hidden="true">↗</span></a>
        </aside>

        <article class="detail-article">
          <section class="detail-section reveal">
            <p class="detail-label">01 / Overview</p>
            <h2>项目概览</h2>
            <p>${escapeHTML(project.overview)}</p>
          </section>
          <section class="detail-section reveal">
            <p class="detail-label">02 / Challenge</p>
            <h2>真正的问题</h2>
            <p>${escapeHTML(project.challenge)}</p>
          </section>
          <section class="detail-section reveal">
            <p class="detail-label">03 / Approach</p>
            <h2>如何解决</h2>
            <ol class="detail-approach">${approach}</ol>
          </section>

          <blockquote class="detail-quote reveal">“${escapeHTML(project.quote)}”</blockquote>

          <section class="detail-section reveal">
            <p class="detail-label">04 / Outcome</p>
            <h2>结果</h2>
            <p>${escapeHTML(project.outcome)}</p>
          </section>

          <div class="metric-band reveal">${metrics}</div>

          <section class="detail-gallery-section reveal">
            <p class="detail-label">05 / Selected frames</p>
            <div class="detail-gallery">${gallery}</div>
          </section>
        </article>
      </section>

      <section class="next-project-section container">
        <a class="next-project reveal" href="project.html?id=${encodeURIComponent(nextProject.id)}">
          <span>Next project / ${escapeHTML(nextProject.number)}</span>
          <h2>${escapeHTML(nextProject.title)}</h2>
          <span class="next-project-arrow" aria-hidden="true">↗</span>
        </a>
      </section>`;
  }

  function renderResume() {
    document.title = `${site.name} — 简历`;

    const contact = $("#resume-contact");
    if (contact) {
      contact.innerHTML = `
        <a href="mailto:${escapeHTML(site.email)}">${escapeHTML(site.email)}</a>
        <a href="tel:${escapeHTML(site.phone.replace(/[^\d+]/g, ""))}">${escapeHTML(site.phone)}</a>
        <span>${escapeHTML(site.location)}</span>
        ${(site.socials || []).map((social) => `<a href="${escapeHTML(safeUrl(social.href))}" target="_blank" rel="noopener noreferrer">${escapeHTML(social.label)}</a>`).join("")}`;
    }

    const body = $("#resume-body");
    if (!body) return;

    const skillGroups = (data.skills || []).map((group) => `
      <div class="resume-skill-group">
        <h3>${escapeHTML(group.title)}</h3>
        <p>${(group.items || []).map((skill) => escapeHTML(skill)).join(" · ")}</p>
      </div>`).join("");

    const education = (data.education || []).map((item) => `
      <div class="resume-education-item">
        <div class="resume-item-head">
          <div><h3>${escapeHTML(item.school)}</h3><p>${escapeHTML(item.degree)}</p></div>
          <span>${escapeHTML(item.period)}</span>
        </div>
        <p>${escapeHTML(item.note)}</p>
      </div>`).join("");

    const awards = (data.awards || []).map((award) => `
      <li><span>${escapeHTML(award.year)}</span><strong>${escapeHTML(award.title)}</strong><small>${escapeHTML(award.detail)}</small></li>`).join("");

    const experience = (data.experience || []).map((item) => `
      <article class="resume-experience-item">
        <div class="resume-item-head">
          <div>
            <h3>${escapeHTML(item.company)}</h3>
            <p>${escapeHTML(item.role)} · ${escapeHTML(item.location)}</p>
          </div>
          <span>${escapeHTML(item.period)}</span>
        </div>
        <p class="resume-summary">${escapeHTML(item.summary)}</p>
        <ul class="resume-highlights">${(item.highlights || []).map((highlight) => `<li>${escapeHTML(highlight)}</li>`).join("")}</ul>
      </article>`).join("");

    const selectedProjects = projects.slice(0, 3).map((project) => `
      <a class="resume-project" href="project.html?id=${encodeURIComponent(project.id)}">
        <span>${escapeHTML(project.number)} / ${escapeHTML(project.category)}</span>
        <strong>${escapeHTML(project.title)}</strong>
        <small>${escapeHTML(project.metric.value)} · ${escapeHTML(project.metric.label)}</small>
      </a>`).join("");

    body.innerHTML = `
      <div class="resume-sheet">
        <aside class="resume-side">
          <section class="resume-block">
            <h2>联系方式</h2>
            <ul class="resume-contact-list">
              <li><span>Email</span><a href="mailto:${escapeHTML(site.email)}">${escapeHTML(site.email)}</a></li>
              <li><span>Phone</span><a href="tel:${escapeHTML(site.phone.replace(/[^\d+]/g, ""))}">${escapeHTML(site.phone)}</a></li>
              <li><span>Location</span><strong>${escapeHTML(site.location)}</strong></li>
            </ul>
          </section>
          <section class="resume-block">
            <h2>核心能力</h2>
            ${skillGroups}
          </section>
          <section class="resume-block">
            <h2>教育背景</h2>
            ${education}
          </section>
          <section class="resume-block">
            <h2>奖项 / 认可</h2>
            <ul class="resume-awards">${awards}</ul>
          </section>
          <section class="resume-block">
            <h2>社交主页</h2>
            <ul class="resume-socials">
              ${(site.socials || []).map((social) => `<li><a href="${escapeHTML(safeUrl(social.href))}" target="_blank" rel="noopener noreferrer">${escapeHTML(social.label)} <span>${escapeHTML(social.handle)}</span></a></li>`).join("")}
            </ul>
          </section>
        </aside>

        <div class="resume-main">
          <section class="resume-block resume-intro">
            <h2>个人简介</h2>
            ${(site.bio || []).map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
          </section>

          <section class="resume-block">
            <h2>工作经历</h2>
            <div class="resume-experience">${experience}</div>
          </section>

          <section class="resume-block">
            <h2>代表项目</h2>
            <div class="resume-projects">${selectedProjects}</div>
          </section>

          <p class="resume-note">更多项目与过程记录，请访问线上作品集或发送邮件至 ${escapeHTML(site.email)}。</p>
        </div>
      </div>`;
  }

  function showToast(message) {
    let toast = $("[data-toast]");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "toast";
      toast.dataset.toast = "";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("Copy failed");
  }

  function initActions() {
    $$("[data-copy-email]").forEach((button) => {
      button.addEventListener("click", async () => {
        try {
          await copyText(site.email);
          showToast("邮箱已复制");
        } catch {
          showToast(`邮箱：${site.email}`);
        }
      });
    });

    $$("[data-print]").forEach((button) => {
      button.addEventListener("click", () => window.print());
    });
  }

  function updateActiveNav() {
    const activeHref = page === "resume.html"
      ? "resume.html"
      : page === "projects.html" || page === "project.html"
        ? "projects.html"
        : "index.html";

    $$(".site-nav > a").forEach((link) => {
      const active = link.getAttribute("href") === activeHref;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  function init() {
    initTheme();
    initMenu();
    initScrollUI();
    applySiteContent();
    renderFooter();
    updateActiveNav();

    if (page === "index.html") renderHome();
    if (page === "projects.html") renderProjectsPage();
    if (page === "project.html") renderProjectDetail();
    if (page === "resume.html") renderResume();

    initActions();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

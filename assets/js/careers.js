document.addEventListener("DOMContentLoaded", () => {
  // Popup logic
  const popup = document.getElementById("careerPopup");
  const popupContent = document.getElementById("popupContent");
  const closeBtn = document.getElementById("closePopup");
  const careerData = {
    Development: [
      {
        title: "Angular Developer",
        desc: "Develop dynamic web applications using Angular framework.",
        details: `Angular Developer Responsibilities:\n\n- Knowledge of software development methodologies and be able to work on projects individually or as part of a team.\n- Should be able to work with AGILE methodology.\n- Participate in sprint planning meeting and estimate the stories based on features.\n- Write well-documented, clean code that passes unit tests and withstands an agile and test-driven development environment.\n- Must be responsible for development, support, maintenance and implementation of a complex project module.\n- Adhere to the process and coding standards and guidelines and develop features with minimal guidance.\n- Writing reusable code and libraries, optimizing applications for performance and scalability.\n- Contributing to team meetings, troubleshooting development and production problems across multiple environments and operating platforms.\n- Collaborate with back-end developers and web designers to improve usability.\n\nAngular Developer Requirements:\n\n- Solid understanding and development experience in Angular.\n- Understanding the nature of asynchronous programming and its quirks and workarounds.\n- Knowledge of testing tools and awareness of latest technologies and trends.\n- Excellent communication, interpersonal and presentation skills.\n- Experience with source control management tools (Git preferred).\n- Excellent knowledge on HTML5, CSS3, and cross-browser layout skills and responsive design knowledge.\n- Experience with Typescript and Excellent JavaScript knowledge and programming experience with ES5/ES6.\n- Experience designing, implementing and using RESTful Web Services.\n- Understanding of Project life cycle activities on development and maintenance projects.\n\nQualifications Required:\n\n- B.Tech, B.E, M.Tech, M.E, MCA, MSc Computer Science\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Microservices Developer (.Net)",
        desc: "Build scalable microservices with .Net technology.",
        details: `Microservices Developer (.Net) Responsibilities:\n\n- Design and develop microservices using .Net framework.\n- Ensure scalability and performance of microservices.\n- Collaborate with teams to integrate microservices into larger systems.\n\nMicroservices Developer (.Net) Requirements:\n\n- Strong experience with .Net and microservices architecture.\n- Knowledge of containerization (e.g., Docker).\n- Familiarity with CI/CD pipelines.\n\nQualifications Required:\n\n- B.Tech or equivalent in Computer Science.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Application Support Engineer",
        desc: "Provide technical support for application systems.",
        details: `Application Support Engineer Responsibilities:\n\n- Troubleshoot and resolve application issues.\n- Provide 24/7 support for critical systems.\n- Document support processes.\n\nApplication Support Engineer Requirements:\n\n- Experience with application support and troubleshooting.\n- Knowledge of ITIL frameworks.\n- Good communication skills.\n\nQualifications Required:\n\n- B.E or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Software Engineer (.Net)",
        desc: "Design and develop software solutions using .Net.",
        details: `Software Engineer (.Net) Responsibilities:\n\n- Develop and maintain .Net applications.\n- Write unit tests and ensure code quality.\n- Collaborate with stakeholders.\n\nSoftware Engineer (.Net) Requirements:\n\n- Proficient in .Net and C#.\n- Experience with SQL databases.\n- Agile development experience.\n\nQualifications Required:\n\n- B.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Microservice Lead",
        desc: "Lead microservices development projects.",
        details: `Microservice Lead Responsibilities:\n\n- Lead a team of developers on microservices projects.\n- Define architecture and best practices.\n- Ensure project delivery on time.\n\nMicroservice Lead Requirements:\n\n- Extensive experience with .Net and microservices.\n- Leadership and project management skills.\n- Knowledge of cloud platforms.\n\nQualifications Required:\n\n- M.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Microservice Architect",
        desc: "Design architecture for microservices-based systems.",
        details: `Microservice Architect Responsibilities:\n\n- Design scalable microservices architectures.\n- Provide technical guidance to teams.\n- Evaluate new technologies.\n\nMicroservice Architect Requirements:\n\n- Expert in microservices and .Net.\n- Experience with cloud and DevOps.\n- Strong problem-solving skills.\n\nQualifications Required:\n\n- M.E or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Lead/Senior DevOps Engineers",
        desc: "Manage DevOps processes and tools for deployment.",
        details: `Lead/Senior DevOps Engineers Responsibilities:\n\n- Automate deployment pipelines.\n- Monitor system performance.\n- Lead DevOps team.\n\nLead/Senior DevOps Engineers Requirements:\n\n- Expertise in CI/CD and Docker.\n- Knowledge of AWS or Azure.\n- Leadership experience.\n\nQualifications Required:\n\n- B.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Kubernetes Administrators",
        desc: "Administer and manage Kubernetes clusters.",
        details: `Kubernetes Administrators Responsibilities:\n\n- Manage Kubernetes clusters.\n- Ensure high availability.\n- Troubleshoot cluster issues.\n\nKubernetes Administrators Requirements:\n\n- Deep knowledge of Kubernetes.\n- Experience with container orchestration.\n- Scripting skills (e.g., Bash, Python).\n\nQualifications Required:\n\n- B.E or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
    ],
    Data: [
      {
        title: "DBA",
        desc: "Manage and maintain database systems.",
        details: `DBA Responsibilities:\n\n- Maintain and optimize database performance.\n- Ensure data security and backups.\n- Troubleshoot database issues.\n\nDBA Requirements:\n\n- Expertise in SQL and database administration.\n- Knowledge of Oracle or MySQL.\n- Experience with data modeling.\n\nQualifications Required:\n\n- B.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Power BI Support",
        desc: "Provide support for Power BI reporting tools.",
        details: `Power BI Support Responsibilities:\n\n- Assist users with Power BI reports.\n- Troubleshoot report issues.\n- Maintain report accuracy.\n\nPower BI Support Requirements:\n\n- Proficiency in Power BI.\n- Knowledge of DAX and data visualization.\n- Good analytical skills.\n\nQualifications Required:\n\n- B.E or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "AI/ML",
        desc: "Develop AI and machine learning models.",
        details: `AI/ML Responsibilities:\n\n- Design and train ML models.\n- Analyze data for insights.\n- Deploy AI solutions.\n\nAI/ML Requirements:\n\n- Experience with Python and TensorFlow.\n- Knowledge of machine learning algorithms.\n- Data science background.\n\nQualifications Required:\n\n- M.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "PostgreSQL RDBMS",
        desc: "Administer PostgreSQL relational database systems.",
        details: `PostgreSQL RDBMS Responsibilities:\n\n- Manage PostgreSQL databases.\n- Optimize queries and performance.\n- Ensure data integrity.\n\nPostgreSQL RDBMS Requirements:\n\n- Expertise in PostgreSQL.\n- Knowledge of SQL tuning.\n- Experience with backups and recovery.\n\nQualifications Required:\n\n- B.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "Analytics",
        desc: "Analyze data to provide actionable insights.",
        details: `Analytics Responsibilities:\n\n- Perform data analysis.\n- Create reports and dashboards.\n- Support business decisions.\n\nAnalytics Requirements:\n\n- Proficiency in analytics tools (e.g., Tableau).\n- Strong statistical skills.\n- Experience with big data.\n\nQualifications Required:\n\n- B.E or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
    ],
    Testing: [
      {
        title: "Test Automation Lead",
        desc: "Lead automation testing efforts for quality assurance.",
        details: `Test Automation Lead Responsibilities:\n\n- Lead automation testing team.\n- Design automated test cases.\n- Ensure test coverage.\n\nTest Automation Lead Requirements:\n\n- Experience with Selenium or similar tools.\n- Knowledge of test frameworks.\n- Leadership skills.\n\nQualifications Required:\n\n- B.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "SDET(Web Testing)",
        desc: "Develop and execute web testing solutions.",
        details: `SDET (Web Testing) Responsibilities:\n\n- Develop automated web tests.\n- Collaborate with developers.\n- Ensure web app quality.\n\nSDET (Web Testing) Requirements:\n\n- Proficiency in JavaScript and web testing.\n- Knowledge of browser compatibility.\n- Agile experience.\n\nQualifications Required:\n\n- B.E or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
      {
        title: "SDET(Mobile Testing)",
        desc: "Develop and execute mobile testing solutions.",
        details: `SDET (Mobile Testing) Responsibilities:\n\n- Create mobile test automation.\n- Test across devices.\n- Ensure mobile app quality.\n\nSDET (Mobile Testing) Requirements:\n\n- Experience with Appium or similar tools.\n- Knowledge of iOS/Android testing.\n- Debugging skills.\n\nQualifications Required:\n\n- B.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
    ],
    Infra: [
      {
        title:
          "Site Reliability Engineer - Linux, Devops, VMware and Cloud",
        desc: "Ensure site reliability across various platforms.",
        details: `Site Reliability Engineer Responsibilities:\n\n- Maintain system uptime.\n- Manage Linux and VMware environments.\n- Implement cloud solutions.\n\nSite Reliability Engineer Requirements:\n\n- Expertise in Linux and DevOps.\n- Knowledge of AWS or Azure.\n- Problem-solving skills.\n\nQualifications Required:\n\n- B.E or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
    ],
    "Business Analyst": [
      {
        title: "Senior Business Analyst",
        desc: "Analyze business needs and provide strategic solutions.",
        details: `Senior Business Analyst Responsibilities:\n\n- Gather business requirements.\n- Create process models.\n- Support project implementation.\n\nSenior Business Analyst Requirements:\n\n- Experience with business analysis tools.\n- Strong communication skills.\n- Knowledge of Agile methodologies.\n\nQualifications Required:\n\n- B.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
    ],
    Security: [
      {
        title: "Security Architect",
        desc: "Design and implement security architectures.",
        details: `Security Architect Responsibilities:\n\n- Design security frameworks.\n- Conduct risk assessments.\n- Implement security policies.\n\nSecurity Architect Requirements:\n\n- Expertise in cybersecurity.\n- Knowledge of encryption and firewalls.\n- Certification (e.g., CISSP) preferred.\n\nQualifications Required:\n\n- M.Tech or equivalent.\n\nPlease send your CV to jobs@emsyne.com.`,
      },
    ],
  };
  document.querySelectorAll(".special-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = link
        .closest(".service-card")
        .querySelector("h3").textContent;
      const careers = careerData[section] || [];
      popupContent.innerHTML = `<h3>${section} Careers</h3>`;
      if (careers.length > 0) {
        const ul = document.createElement("ul");
        careers.forEach((career, index) => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${career.title}</strong><p>${career.desc}</p><button class="toggle-btn" data-title="${career.title}"><i class="bi bi-plus"></i></button>`;
          li.dataset.details = career.details;
          li.classList.add("animate-stagger");
          li.style.setProperty("--i", index);
          ul.appendChild(li);
        });
        popupContent.appendChild(ul);
      } else {
        popupContent.innerHTML +=
          "<p>No careers available for this section.</p>";
      }
      popup.style.display = "flex";
    });
  });
  popupContent.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    const btn = e.target.closest(".toggle-btn");
    if (btn) {
      e.preventDefault();
      const title = btn.dataset.title;
      const parentLi = btn.closest("li");
      const isExpanded = parentLi.classList.contains("expanded");
      if (!isExpanded) {
        parentLi.classList.add("expanded");
        const icon = btn.querySelector("i");
        icon.classList.remove("bi-plus");
        icon.classList.add("bi-dash");
        parentLi.innerHTML = `<strong>${title}</strong><div>${parentLi.dataset.details.replace(
          /\n/g,
          "<br>"
        )}</div><button class="toggle-btn" data-title="${title}"><i class="bi bi-dash"></i></button>`;
      } else {
        parentLi.classList.remove("expanded");
        const icon = btn.querySelector("i");
        icon.classList.remove("bi-dash");
        icon.classList.add("bi-plus");
        parentLi.innerHTML = `<strong>${title}</strong> <button class="toggle-btn" data-title="${title}"><i class="bi bi-plus"></i></button>`;
      }
      e.stopPropagation();
    }
  });
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popupContent.innerHTML = "";
  });
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
      popupContent.innerHTML = "";
    }
  });
  // Hero animation
  const heroH1 = document.querySelector(".hero h1");
  setTimeout(() => {
    if (heroH1) {
      heroH1.classList.add("animate");
    }
  }, 200);
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    let currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    if (heroH1) {
      if (currentScroll > lastScrollTop) {
        heroH1.classList.add("scroll-up");
        heroH1.classList.remove("scroll-down");
      } else {
        heroH1.classList.add("scroll-down");
        heroH1.classList.remove("scroll-up");
      }
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});
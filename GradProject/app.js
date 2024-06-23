// ============= Scroll ==============
window.addEventListener("scroll", () => {
  if (window.scrollY > 300 && !skillsCounter) {
    skillsProgress();
    skillsCounter = true; // Set the flag to true so it won't trigger again

    // SCROLL NAVIGATION
  }
  scrollActive();
});

// ============= Navigation Bar  ==============
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.scrollY;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionBottom = sectionHeight + sectionTop;
    if (scrollY >= sectionTop && scrollY <= sectionBottom) {
      document
        .querySelector(`a[href*='${section.id}']`)
        .classList.add("active");
    } else {
      document
        .querySelector(`a[href*='${section.id}']`)
        .classList.remove("active");
    }
  });
}

// =============================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("scrip")) {
    personalCard();
    overview();
    bioSec();
    computerSystem();
    OperatingSystem();
    DriveTypes();
    DriveInfo();
  }
  if (document.getElementById("sec")) {
    malicious();
    login();
    lastProc();
  }
  if (document.getElementById("procManagement")) {
    lastActive();
  }
  if (document.getElementById("app")) {
    installApps();
    startApps();
    localUsers();
  }
});
// ================= Dashboard Category ========================
// PersonalCard Sec

function personalCard() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.computer_system_info;
      const content = `
      <div id="c2" class="card">
            <ul class="card-info">
              <li><strong>UserName:</strong> ${info.UserName}</li>
              <li><strong>Domain:</strong> ${info.Domain}</li>
              <li><strong>Description:</strong> ${info.Description}</li>
            </ul>
          </div>

          <div id="c3" class="card">
            <ul class="card-info">
              <li><strong>SystemType:</strong> ${info.SystemType}</li>
              <li><strong>Manufacturer:</strong> ${info.Manufacturer}</li>
              <li><strong>Model:</strong>${info.Model}</li>
              <li><strong>NumberOfProcessors:</strong> ${info.NumberOfProcessors}</li>
            </ul>
          </div>

          <div id="c1" class="card">
            <div class="card-info">
              <div class="card-avatar">
                <img src="../images/dashboard-img1.png" alt="" />
              </div>
              <div class="card-title">${info.Name}</div>
              <div class="card-subtitle">${info.PrimaryOwnerName}</div>
            </div>
          </div>
      `;
      document.getElementById("personal-card").innerHTML += content;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

// Overview Sec

function overview(callback) {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const batteryPer = data.device_info.battery_status[0].percentage;
      const batteryStatus = data.device_info.battery_status[0].status;

      const ramPercent = data.device_info.ram_info[0].used_percent;
      const total = data.device_info.ram_info[0].total_gb;
      const available = data.device_info.ram_info[0].available_gb;
      const used = data.device_info.ram_info[0].used_gb;
      const free = data.device_info.ram_info[0].free_gb;

      const caption = data.operating_system_info.Caption;
      const BuildNumber = data.operating_system_info.BuildNumber;
      const cpu = data.cpu_info.Name;
      const cpuSpeed = data.cpu_info.CurrentClockSpeed;
      const content = `
            <div class = 'overview__boxes'>
                <div class="circular__row-battery">
                    <h4 class="circle-title" style="color: #ff0060">BATTERY STATUS</h4>
                    <svg>
                        <circle class="track" cx="100" cy="100" r="75" stroke="#FFB1CE" />
                        <circle class="progress" style="stroke: #ff0060" cx="100" cy="100" r="75" fill="transparent" data-prog="${batteryPer}" />
                    </svg>
                    <span class="circle-inner" style="color: #ff0060; transform: translate(-34%, 39%)">0%</span>
                    <ul style="text-align: center">
                        <li><strong>percentage</strong>: ${batteryPer}%</li>
                        <li><strong>status</strong>: ${batteryStatus}</li>
                    </ul>
                </div>
                <div class="overview__box">
                <span class="material-icons-sharp icon"> grid_view </span>
                <div class="overview__title">
                  <span class="overview__title-small">Caption</span>
                  <h3 class="overview__title-large">${caption}</h3>
                  <h4><span class="num">${BuildNumber}</span> BuildNumber</h4>
                </div>
              </div>
            </div>
               <div class="circular__row">
           <div class="overview__box">
               <span class="material-icons-sharp icon"> memory </span>
               <div class="overview__title">
                 <span class="overview__title-small">cpu info</span>
                 <h3 class="overview__title-large">
                   ${cpu}
                 </h3>
                 <h4><span class="num">${cpuSpeed}</span> 
                 CurrentClockSpeed
                 </h4>
               </div>
             </div>
                 <div class="circular__row-battery"> 
               <h4 class="circle-title" style="color: #6b99ce">RAM INFO</h4>
               <svg>
                 <circle
                   class="track"
                   cx="100"
                   cy="100"
                   r="75"
                   stroke="#D0DFEF"
                 />
                 <circle
                   class="progress"
                   style="stroke: #6b99ce"
                   cx="100"
                   cy="100"
                   r="75"
                   fill="transparent"
                   data-prog="${ramPercent}"
                 />
               </svg>
               <span class="circle-inner" style="color: #6b99ce">0%</span>
               <ul style="text-align: center">
                 <li><strong>used_percent</strong>: ${ramPercent}</li>
                 <li><strong>total_gb</strong>: ${total}</li>
                 <li><strong>available_gb</strong>: ${available}</li>
                 <li><strong>used_gb</strong>: 1${used}</li>
                 <li><strong>free_gb</strong>: ${free}</li>
               </ul>
             </div>
         </div> 
          `;

      document.querySelector(".overview").innerHTML += content;
      if (callback && typeof callback === "function") {
        callback();
      }
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

// ============= SKILLS SECTION  ==============
let skillsCounter = false;

function skillsProgress() {
  const progressCircle = document.querySelectorAll(".progress");
  if (!progressCircle.length) return; // Check if progress circles exist

  progressCircle.forEach((circle) => {
    let radius = circle.r.baseVal.value;
    let circumFerence = radius * 2 * Math.PI;
    let percent = circle.dataset.prog;
    let duration = Math.floor(3000 / percent);
    circle.style.strokeDasharray = circumFerence;
    circle.style.strokeDashoffset =
      circumFerence - (percent / 100) * circumFerence;
  });
  updateCirclePercent();
}

function updateCirclePercent() {
  const progressCircle = document.querySelectorAll(".progress");
  let skillsCounter = false;

  if (!skillsCounter) {
    progressCircle.forEach((circle, index) => {
      let percent = circle.dataset.prog;
      let startNum = 0;
      let duration = Math.floor(3000 / percent);
      let counter = setInterval(() => {
        startNum += 1;
        document.querySelectorAll(".circle-inner")[index].innerHTML =
          startNum + "%";
        if (startNum == parseInt(percent)) {
          clearInterval(counter);
        }
      }, duration);
    });
    skillsCounter = true;
  }
}

// Bios Info

function bioSec() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.bios_info;
      const content = `
 <div class="window">
            <div class="bar">
              <span class="bar__circle"></span>
            </div>
            <div class="window__info">
              <p class="window__comment"># run this command:</p>
              <p class="window__prompt">
                $ Name
                <span class="command">${info.Name}</span>
              </p>
              <p class="window__prompt">
                $ Version
                <span class="command">${info.Version}</span>
              </p>
              <p class="window__prompt">
                $ SMBIOSBIOSVersion
                <span class="command">${info.SMBIOSBIOSVersion}</span>
                <span class="terminal_cursor"></span>
              </p>
            </div>
          </div>
      `;
      document.querySelector(".bio").innerHTML += content;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
// Computer System

function computerSystem() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.computer_system_info;
      const content = `
  <div class="window">
            <div class="bar">
              <span class="bar__circle"></span>
            </div>
            <div class="window__info">
              <p class="window__comment"># run this command:</p>
              <p class="window__prompt">
                $ Name
                <span class="command">${info.Name}</span>
              </p>
              <p class="window__prompt">
                $ Domain
                <span class="command">${info.Domain}</span>
              </p>
              <p class="window__prompt">
                $ Description
                <span class="command">${info.Description}</span>
              </p>
              <p class="window__prompt">
                $ Manufacturer
                <span class="command">${info.Manufacturer}</span>
              </p>
              <p class="window__prompt">
                $ Model
                <span class="command">${info.Model}/span>
              </p>
              <p class="window__prompt">
                $ NumberOfProcessors
                <span class="command">${info.NumberOfProcessors}</span>
              </p>
              <p class="window__prompt">
                $ TotalPhysicalMemory
                <span class="command">${info.TotalPhysicalMemory}</span>
              </p>
              <p class="window__prompt">
                $ SystemType
                <span class="command">${info.SystemType}</span>
              </p>
              <p class="window__prompt">
                $ PrimaryOwnerName
                <span class="command">${info.PrimaryOwnerName}</span>
              </p>
              <p class="window__prompt">
                $ UserName
                <span class="command">${info.UserName}</span>
                <span class="terminal_cursor"></span>
              </p>
            </div>
          </div>
      `;
      document.querySelector(".computer-system").innerHTML += content;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
// Operating System

function OperatingSystem() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.operating_system_info;
      const content = `
  <div class="window">
            <div class="bar">
              <span class="bar__circle"></span>
            </div>
            <div class="window__info">
              <p class="window__comment"># run this command:</p>
              <p class="window__prompt">
                $ Caption
                <span class="command">${info.Caption}</span>
              </p>
              <p class="window__prompt">
                $ BuildNumber
                <span class="command">${info.BuildNumber}</span>
              </p>
              <p class="window__prompt">
                $ Version
                <span class="command">${info.Version}</span>
              </p>
              <p class="window__prompt">
                $ SerialNumber
                <span class="command">${info.SerialNumber}</span>
              </p>
              <p class="window__prompt">
                $ ServicePackMajorVersion
                <span class="command">${info.ServicePackMajorVersion}</span>
              </p>
              <p class="window__prompt">
                $ InstallDate
                <span class="command">${info.InstallDate}</span>
                <span class="terminal_cursor"></span>
              </p>
            </div>
          </div>
      `;
      document.querySelector(".operating-system").innerHTML += content;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
// Drive Info

function DriveInfo() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const driveInfo = data.drive_info;
      const content = driveInfo
        .map((drive) => {
          const usedSpace =
            drive["C Used Space (GB)"] || drive["D Used Space (GB)"];
          const totalSpace =
            drive["C Total Space (GB)"] || drive["D Total Space (GB)"];
          const freeSpace =
            drive["C Free Space (GB)"] || drive["D Free Space (GB)"];
          const driveName = drive["Drive Name"];
          return `
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                <p class="title">Drive ${driveName}</p>
                <p>Hover Me</p>
              </div>
              <div class="flip-card-back">
                <p><strong>Total Space:</strong> ${totalSpace} GB</p>
                <p><strong>Used Space:</strong> ${usedSpace} GB</p>
                <p><strong>Free Space:</strong> ${freeSpace} GB</p>
              </div>
            </div>
          </div>`;
        })
        .join("");
      document.querySelector(".driveInfo").innerHTML += content;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
// Drive Types

function DriveTypes() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.drive_types;
      const drives = info
        .map((drive) => {
          return `  <div class="window">
            <div class="bar">
              <span class="bar__circle"></span>
            </div>
            <div class="window__info">
              <p class="window__comment"># run this command:</p>
              <p class="window__prompt">
                $ FriendlyName
                <span class="command">${drive.FriendlyName}</span>
              </p>
              <p class="window__prompt">
                $ SerialNumber
                <span class="command"
                  >${drive.SerialNumber}</span
                >
              </p>
              <p class="window__prompt">
                $ MediaType
                <span class="command">${drive.MediaType}</span>
                <span class="terminal_cursor"></span>
              </p>
            </div>
          </div>`;
        })
        .join("");
      document.querySelector(".drive-types").innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

// ================= Security Category ========================

//Malicious Processes

function malicious() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.malicious_processes.malicious_process;
      const drives = info
        .map((drive) => {
          return `     
              <tbody>
                <tr>
                  <td>${drive.name}</td>
                  <td>${drive.memory_usage}</td>
                  <td>${drive.pid}</td>
                </tr>
                <!-- Add more rows as needed -->
              </tbody>`;
        })
        .join("");
      document.querySelector(".malicious__table table").innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

//Login History

function login() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.login_history;

      const drives = info
        .slice(0, 7)
        .map((drive) => {
          return `     
                  <a class="card" href="#" />
              <h2>${drive.User.Name}</h2>
              <p><strong>Domain:</strong> ${drive.User.Domain}</p>
              <p><strong>Status:</strong> ${drive.User.CimClass}</p>
              <p style="overflow-wrap: anywhere;"><strong>Local Account:</strong> ${drive.User.CimSystemProperties}</p>
            </a>`;
        })
        .join("");
      document.querySelector(".login-history_cards").innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

//Last Added Processes

function lastProc() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.last_added_processes;

      const drives = info
        .slice(0, 10)
        .map((drive) => {
          return `  
            <div class="process-card">
                <p><strong>File:</strong> ${drive.File}</p>
                <p><strong>Created:</strong> ${drive.Created}</p>
            </div>   
                  `;
        })
        .join("");
      document.querySelector(".process-list").innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

// ================= Process Management ========================
//Last Active Process

function lastActive() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.last_active_process;

      console.log(info[0].StartTime.match(/\d+/)[0]);
      const drives = info
        .map((process) => {
          const name = process.Name;
          const timestamp = new Date(
            parseInt(process.StartTime.match(/\d+/)[0])
          ).toLocaleString("en-US");

          // Assuming the timestamp is a Date object, splitting it into date and time components
          const [date, time] = timestamp.split(", ");

          return `  
            <tr>
              <td>${name}</td>
              <td>${date}</td>
              <td>${time}</td>
            </tr>`;
        })
        .join("");
      document.querySelector(".last-proc table").innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
// ================= Apps ========================
//Intalled Apps

function installApps() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.installed_apps;

      const drives = info
        .map((drive) => {
          return `     
                <tr>
                  <td>${drive.Name}</td>
                  <td>${drive.Version}</td>
                  <td>${drive.Vendor}</td>
                </tr>
                `;
        })
        .join("");
      document.querySelector(".table-scroll table tbody").innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
//Startups Apps

function startApps() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.startup_apps;

      const drives = info
        .map((drive) => {
          return `     
                <tr>
                  <td>${drive.name}</td>
                  <td>
                  ${drive.path}
                  </td>
                </tr>
                `;
        })
        .join("");
      document.querySelector(
        ".app__startup .table-scroll table tbody"
      ).innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}
// Local Users

function localUsers() {
  fetch("../api/scripta.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const info = data.local_users;

      const drives = info
        .map((drive) => {
          return `     
              <div class="local-users__box">
                <img
                  class="box__image"
                  src="../images/image-1.jpg"
                  alt="Not-Found"
                />
                <div class="box__details">
                  <p class="box__name">${drive.Name}</p>
                  <p class="box__status">${drive.Disabled}</p>
                </div>
                <ul class="local-users__list">
                  <li class="local-users__item">
                    <span>Caption:</span> ${drive.Caption}
                  </li>
                  <li class="local-users__item">
                    <span>Caption:</span> ${drive.Caption}
                  </li>
                  <li class="local-users__item"><span> Domain:</span> ${drive.Domain}</li>
                </ul>
              </div>
                `;
        })
        .join("");
      document.querySelector(".local-users__content").innerHTML += drives;
    })
    .catch((error) => console.error("Unable to fetch data:", error));
}

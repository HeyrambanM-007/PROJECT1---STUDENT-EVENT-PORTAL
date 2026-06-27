// --- Default Data Initialization (using YYYY-MM-DD for dates) ---
const defaultEvents = [
    { title: "Innovation Sprint", date: "2026-07-12", location: "Tech Lab 3", desc: "Build creative ideas with your team in a fun challenge." },
    { title: "AI Leadership Seminar", date: "2026-07-18", location: "Auditorium A", desc: "Learn about technology, careers, and future opportunities." },
    { title: "Creative Showcase", date: "2026-07-24", location: "Gallery Hall", desc: "Enjoy student art, design, and short performances." }
];

if (!localStorage.getItem('events')) localStorage.setItem('events', JSON.stringify(defaultEvents));
if (!localStorage.getItem('registrations')) localStorage.setItem('registrations', JSON.stringify([]));

// --- Navigation & Theme ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    
    if(pageId === 'admin') loadAdminData();
    if(pageId === 'analytics') loadAnalytics();
    if(pageId === 'events' || pageId === 'register' || pageId === 'home') loadEvents();
}

const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggleBtn.addEventListener('click', () => {
    let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// --- Format Helper ---
function formatDateDisplay(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
}

// --- Event Management & Calendar ---
let currentDate = new Date(2026, 6, 1); // Starting calendar in July 2026 to match default data

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function renderCalendar() {
    const events = JSON.parse(localStorage.getItem('events'));
    const monthYearDisplay = document.getElementById('month-year-display');
    const calendarDays = document.getElementById('calendar-days');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    monthYearDisplay.innerText = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    calendarDays.innerHTML = '';
    
    // Empty slots for preceding days
    for (let i = 0; i < firstDay; i++) {
        calendarDays.innerHTML += `<div class="calendar-day empty"></div>`;
    }
    
    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
        // Construct YYYY-MM-DD string with padding
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // Check if event exists on this day
        const dayEvents = events.filter(e => e.date === dateString);
        const hasEventClass = dayEvents.length > 0 ? 'has-event' : '';
        const dotHtml = dayEvents.length > 0 ? `<div class="event-dot" title="${dayEvents.map(e=>e.title).join(', ')}"></div>` : '';
        
        calendarDays.innerHTML += `
            <div class="calendar-day ${hasEventClass}" onclick="if('${hasEventClass}') alert('Events on this date: \\n${dayEvents.map(e=>e.title).join('\\n')}')">
                ${day}
                ${dotHtml}
            </div>
        `;
    }
}

function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events'));
    const regs = JSON.parse(localStorage.getItem('registrations'));
    
    document.getElementById('stat-event-count').innerText = events.length;
    document.getElementById('stat-reg-count').innerText = regs.length;

    // Render Calendar
    if(document.getElementById('calendar-days')) renderCalendar();

    // Render Events List below calendar
    const eventsContainer = document.getElementById('events-container');
    if(eventsContainer) {
        eventsContainer.innerHTML = '';
        // Sort by date ascending
        events.sort((a,b) => new Date(a.date) - new Date(b.date)).forEach(ev => {
            eventsContainer.innerHTML += `
                <div class="card event-card glass-card">
                    <h3>${ev.title}</h3>
                    <p>${ev.desc}</p>
                    <small style="color: var(--accent-primary); font-weight: bold; margin-top:1rem; display:block;">
                        ${formatDateDisplay(ev.date)} • ${ev.location}
                    </small>
                </div>
            `;
        });
    }

    const eventSelect = document.getElementById('event');
    if(eventSelect) {
        eventSelect.innerHTML = '<option value="">Select an Event</option>';
        events.forEach(ev => {
            eventSelect.innerHTML += `<option value="${ev.title}">${ev.title}</option>`;
        });
    }
}

// Create New Event
document.getElementById('create-event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newEvent = {
        title: document.getElementById('new-event-title').value,
        date: document.getElementById('new-event-date').value,
        location: document.getElementById('new-event-location').value,
        desc: document.getElementById('new-event-desc').value
    };
    
    const events = JSON.parse(localStorage.getItem('events'));
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    
    alert('Event Created Successfully!');
    this.reset();
    loadEvents(); 
});

// --- Registration Handling ---
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault(); 
    const newRegistration = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        department: document.getElementById('dept').value,
        event: document.getElementById('event').value,
        timestamp: new Date().toISOString()
    };

    const registrations = JSON.parse(localStorage.getItem('registrations'));
    registrations.push(newRegistration);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    alert('Registration Successful!');
    this.reset();
    document.getElementById('stat-reg-count').innerText = registrations.length;
});

// --- Admin Dashboard ---
function loadAdminData() {
    const tableBody = document.getElementById('table-body');
    const registrations = JSON.parse(localStorage.getItem('registrations'));
    
    tableBody.innerHTML = ''; 
    if (registrations.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">No data found.</td></tr>';
        return;
    }

    registrations.reverse().forEach(reg => {
        tableBody.innerHTML += `
        <tr>
            <td>${reg.name}</td>
            <td>${reg.department}</td>
            <td><span style="background: rgba(99, 102, 241, 0.2); padding: 2px 8px; border-radius: 12px; font-size: 0.85rem;">${reg.event}</span></td>
        </tr>`;
    });
}

function clearData() {
    if(confirm("Delete all registrations AND custom events?")) {
        localStorage.removeItem('registrations');
        localStorage.removeItem('events');
        location.reload(); 
    }
}

function exportData() {
    const registrations = JSON.parse(localStorage.getItem('registrations'));
    if (registrations.length === 0) return alert("No data to export!");

    const headers = Object.keys(registrations[0]).join(',');
    const rows = registrations.map(reg => Object.values(reg).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "registrations.csv";
    link.click();
}

// --- Analytics & Pie Chart Logic ---
// Pie chart colors
const chartColors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

function loadAnalytics() {
    const regs = JSON.parse(localStorage.getItem('registrations'));
    document.getElementById('total-regs').innerText = regs.length;

    if (regs.length === 0) {
        document.getElementById('top-event').innerText = "-";
        document.getElementById('top-dept').innerText = "-";
        document.getElementById('dept-pie-chart').style.background = `conic-gradient(#4b5563 0deg 360deg)`;
        return;
    }

    const getTopItem = (arr, key) => {
        const counts = arr.reduce((acc, curr) => { acc[curr[key]] = (acc[curr[key]] || 0) + 1; return acc; }, {});
        return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    };

    document.getElementById('top-event').innerText = getTopItem(regs, 'event');
    document.getElementById('top-dept').innerText = getTopItem(regs, 'department');

    // Calculate Department Breakdown for Pie Chart
    const deptCounts = regs.reduce((acc, curr) => {
        acc[curr.department] = (acc[curr.department] || 0) + 1;
        return acc;
    }, {});

    const breakdownList = document.getElementById('dept-breakdown-list');
    const pieLegend = document.getElementById('pie-legend');
    breakdownList.innerHTML = '';
    pieLegend.innerHTML = '';
    
    let conicGradientStr = '';
    let startDegree = 0;
    let colorIndex = 0;

    for (const [dept, count] of Object.entries(deptCounts)) {
        // List Item
        breakdownList.innerHTML += `
            <li>
                <span>${dept}</span>
                <span style="font-weight: bold; color: var(--accent-primary);">${count} Students</span>
            </li>
        `;

        // Pie Chart Calculation
        const percentage = count / regs.length;
        const degree = percentage * 360;
        const endDegree = startDegree + degree;
        const color = chartColors[colorIndex % chartColors.length];
        
        conicGradientStr += `${color} ${startDegree}deg ${endDegree}deg, `;
        
        // Legend Item
        pieLegend.innerHTML += `
            <div class="legend-item">
                <div class="legend-color" style="background: ${color}"></div>
                <span>${dept} (${Math.round(percentage * 100)}%)</span>
            </div>
        `;

        startDegree = endDegree;
        colorIndex++;
    }

    // Apply CSS Pie Chart
    conicGradientStr = conicGradientStr.slice(0, -2); // Remove last comma
    document.getElementById('dept-pie-chart').style.background = `conic-gradient(${conicGradientStr})`;
}

// Initialize App
loadEvents();

document.getElementById('create-event-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    
    events.push({
        title: document.getElementById('new-event-title').value,
        date: document.getElementById('new-event-date').value,
        location: document.getElementById('new-event-location').value,
        desc: document.getElementById('new-event-desc').value,
        totalSlots: parseInt(document.getElementById('new-event-slots').value), // NEW
        registeredCount: 0 // Initialize count
    });
    
    localStorage.setItem('events', JSON.stringify(events));
    alert('Event Created!');
    this.reset();
    loadEvents();
});

const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const mainContent = document.querySelector('.main-content');
const navItems = document.querySelectorAll('.nav-item');
const chartTabs = document.querySelectorAll('.chart-actions .btn-outline');
const taskCheckboxes = document.querySelectorAll('.task-checkbox input[type="checkbox"]');


const WEATHER_API_KEY = 'fae174b556f43761bda96973552c1604'; 
const DEFAULT_LOCATION = 'Coimbatore,IN';


const salesData = {
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [12, 19, 15, 25, 22, 30, 35]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [35, 40, 35, 50, 49, 60, 70, 65, 75, 70, 80, 95]
    },
    yearly: {
        labels: ['2018', '2019', '2020', '2021', '2022', '2023', '2024'],
        data: [200, 300, 280, 350, 400, 500, 550]
    }
};


const cropPerformanceData = {
    weekly: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Wheat',
            data: [65, 68, 70, 72, 75, 73, 78],
            borderColor: '#4CAF50',
            tension: 0.4
        }, {
            label: 'Rice',
            data: [55, 58, 57, 60, 62, 65, 67],
            borderColor: '#2196F3',
            tension: 0.4
        }, {
            label: 'Corn',
            data: [45, 47, 48, 50, 52, 53, 55],
            borderColor: '#FFC107',
            tension: 0.4
        }]
    },
    monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Wheat',
            data: [60, 65, 70, 75, 80, 85, 88, 90, 87, 83, 80, 78],
            borderColor: '#4CAF50',
            tension: 0.4
        }, {
            label: 'Rice',
            data: [50, 55, 58, 62, 65, 70, 73, 75, 73, 70, 65, 60],
            borderColor: '#2196F3',
            tension: 0.4
        }, {
            label: 'Corn',
            data: [40, 45, 48, 52, 55, 58, 62, 65, 63, 60, 55, 50],
            borderColor: '#FFC107',
            tension: 0.4
        }]
    },
    yearly: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
            label: 'Wheat',
            data: [750, 800, 850, 900, 950, 1000],
            borderColor: '#4CAF50',
            tension: 0.4
        }, {
            label: 'Rice',
            data: [600, 650, 700, 750, 800, 850],
            borderColor: '#2196F3',
            tension: 0.4
        }, {
            label: 'Corn',
            data: [500, 550, 600, 650, 700, 750],
            borderColor: '#FFC107',
            tension: 0.4
        }]
    }
};


document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    setCurrentDate();
    initializeCharts();
    initializeEventListeners();
});


function setCurrentDate() {
    const dateDisplay = document.querySelector('.date-display');
    if (dateDisplay) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateDisplay.textContent = today.toLocaleDateString('en-US', options);
    }
}


function initializeDashboard() {
   
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (sidebarCollapsed) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('expanded');
    }
    
   
    const currentPath = window.location.pathname;
    navItems.forEach(item => {
        const link = item.querySelector('a').getAttribute('href');
        if (currentPath.includes(link)) {
            item.classList.add('active');
        }
    });
}


function initializeCharts() {
    const salesChart = document.getElementById('salesChart');
    
    if (salesChart) {
        const ctx = salesChart.getContext('2d');
        
        
        let gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(118, 210, 117, 0.6)');
        gradient.addColorStop(1, 'rgba(118, 210, 117, 0.1)');
        
        
        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: salesData.weekly.labels,
                datasets: [{
                    label: 'Sales',
                    data: salesData.weekly.data,
                    borderColor: '#43a047',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#43a047',
                    pointRadius: 4,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#333',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return 'Sales: $' + context.parsed.y;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            borderDash: [5, 5],
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }

    
    const cropChart = document.getElementById('cropPerformanceChart');
    if (cropChart) {
        window.cropChart = initializeCropChart();
        
        
        const periodButtons = document.querySelectorAll('.chart-actions .btn-outline');
        periodButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                
                periodButtons.forEach(btn => btn.classList.remove('active'));
               
                e.target.classList.add('active');
               
                const period = e.target.dataset.period;
                updateCropChart(window.cropChart, period);
            });
        });
    }
}


function initializeEventListeners() {
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
   
    chartTabs.forEach(tab => {
        tab.addEventListener('click', handleChartTabClick);
    });
    
    
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleTaskCheckboxChange);
    });
    
   
    const notificationButton = document.querySelector('.notification');
    if (notificationButton) {
        notificationButton.addEventListener('click', toggleNotificationDropdown);
    }
    
   
    const messageButton = document.querySelector('.message');
    if (messageButton) {
        messageButton.addEventListener('click', toggleMessageDropdown);
    }
    
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    
    document.addEventListener('click', handleOutsideClick);
    
    
    const communityLink = document.querySelector('a[href="community.html"]');
    communityLink?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'community.html';
    });
}


function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
    
   
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
}


function handleChartTabClick(e) {
    
    chartTabs.forEach(tab => tab.classList.remove('active'));
    
    
    e.target.classList.add('active');
    
    
    const period = e.target.getAttribute('data-period');
    updateChartData(period);
}


function updateChartData(period) {
    if (!window.myChart) return;
    
    window.myChart.data.labels = salesData[period].labels;
    window.myChart.data.datasets[0].data = salesData[period].data;
    window.myChart.update();
}


function handleTaskCheckboxChange(e) {
    const taskItem = e.target.closest('.task-item');
    const taskInfo = taskItem.querySelector('.task-info');
    
    if (e.target.checked) {
        taskInfo.classList.add('completed');
    } else {
        taskInfo.classList.remove('completed');
    }
    
    
    updateTaskStatus(e.target.dataset.taskId, e.target.checked);
}


function updateTaskStatus(taskId, isCompleted) {
    console.log(`Task ${taskId} completion status updated to: ${isCompleted}`);
   
}


function toggleNotificationDropdown(e) {
    e.stopPropagation();
    const dropdown = document.querySelector('.notification-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        
        
        const messageDropdown = document.querySelector('.message-dropdown');
        if (messageDropdown && messageDropdown.classList.contains('active')) {
            messageDropdown.classList.remove('active');
        }
    }
}


function toggleMessageDropdown(e) {
    e.stopPropagation();
    const dropdown = document.querySelector('.message-dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
        
        
        const notificationDropdown = document.querySelector('.notification-dropdown');
        if (notificationDropdown && notificationDropdown.classList.contains('active')) {
            notificationDropdown.classList.remove('active');
        }
    }
}


function toggleMobileMenu() {
    sidebar.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
}


function openModal(modalId) {
    const modalOverlay = document.getElementById(modalId);
    if (modalOverlay) {
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}


function closeModal() {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
        activeModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}


function handleOutsideClick(e) {
   
    const notificationDropdown = document.querySelector('.notification-dropdown');
    if (notificationDropdown && 
        notificationDropdown.classList.contains('active') && 
        !e.target.closest('.notification') && 
        !e.target.closest('.notification-dropdown')) {
        notificationDropdown.classList.remove('active');
    }
    
    
    const messageDropdown = document.querySelector('.message-dropdown');
    if (messageDropdown && 
        messageDropdown.classList.contains('active') && 
        !e.target.closest('.message') && 
        !e.target.closest('.message-dropdown')) {
        messageDropdown.classList.remove('active');
    }
    
  
    if (sidebar.classList.contains('active') && 
        !e.target.closest('.sidebar') && 
        !e.target.closest('.mobile-menu-btn')) {
        sidebar.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    }
}


function showToast(type, title, message, duration = 3000) {
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = '';
    switch(type) {
        case 'success':
            iconClass = 'fa-check-circle';
            break;
        case 'error':
            iconClass = 'fa-times-circle';
            break;
        case 'warning':
            iconClass = 'fa-exclamation-triangle';
            break;
        case 'info':
            iconClass = 'fa-info-circle';
            break;
    }
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <div class="toast-close">
            <i class="fas fa-times"></i>
        </div>
    `;
    
   
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }
    
  
    toastContainer.appendChild(toast);
    
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
   
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        removeToast(toast);
    });
    
    
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}


function removeToast(toast) {
    toast.classList.remove('show');
    
    setTimeout(() => {
        toast.remove();
        
        
        const toastContainer = document.querySelector('.toast-container');
        if (toastContainer && toastContainer.children.length === 0) {
            toastContainer.remove();
        }
    }, 300);
}


function showLoader() {
    let loader = document.querySelector('.loader-container');
    if (!loader) {
        loader = document.createElement('div');
        loader.className = 'loader-container';
        loader.innerHTML = '<div class="loader"></div>';
        document.body.appendChild(loader);
    }
    loader.style.display = 'flex';
}

function hideLoader() {
    const loader = document.querySelector('.loader-container');
    if (loader) {
        loader.style.display = 'none';
    }
}


function loadDashboardData() {
    showLoader();
    
    setTimeout(() => {
        hideLoader();
        showToast('success', 'Success', 'Dashboard data updated successfully!');
    }, 1500);
}


function addNewTask() {
    openModal('newTaskModal');
}


function submitNewTask(form) {
  
    const formData = new FormData(form);
    const taskData = {
        title: formData.get('taskTitle'),
        description: formData.get('taskDescription'),
        priority: formData.get('taskPriority'),
        dueDate: formData.get('taskDueDate')
    };
    
    
    if (!taskData.title) {
        showToast('error', 'Error', 'Task title is required');
        return false;
    }
    
    
    showLoader();
    
    
    setTimeout(() => {
        hideLoader();
        closeModal();
        showToast('success', 'Task Added', 'New task has been added successfully');
        
        
        addTaskToUI(taskData);
    }, 1000);
    
    return false; 
}


function addTaskToUI(taskData) {
    const tasksList = document.querySelector('.tasks-list');
    if (!tasksList) return;
    
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    
    const priorityClass = taskData.priority.toLowerCase();
    const today = new Date();
    const dueDate = new Date(taskData.dueDate);
    const formattedDate = dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    taskItem.innerHTML = `
        <div class="task-checkbox">
            <input type="checkbox" id="task-new" data-task-id="new">
            <label for="task-new"></label>
        </div>
        <div class="task-info">
            <h4>${taskData.title}</h4>
            <p>${taskData.description || 'No description'}</p>
        </div>
        <div class="task-meta">
            <span class="task-priority ${priorityClass}">${taskData.priority}</span>
            <span class="task-date">${formattedDate}</span>
        </div>
    `;
    
    
    tasksList.insertBefore(taskItem, tasksList.firstChild);
    
    
    const checkbox = taskItem.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', handleTaskCheckboxChange);
}


function updateCropChart(chart, period) {
    chart.data = cropPerformanceData[period];
    chart.update();
}


async function updateWeatherForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${DEFAULT_LOCATION}&units=metric&appid=${WEATHER_API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || !data.list) {
            throw new Error('Invalid weather data structure received');
        }
        
       
        const weatherContainer = document.getElementById('weather-forecast');
        weatherContainer.innerHTML = '';
        
        
        const dailyData = data.list.filter(reading => reading.dt_txt.includes('12:00:00'));
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        dailyData.slice(0, 7).forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = days[date.getDay()];
            const temp = Math.round(day.main.temp);
            const weatherIcon = getWeatherIcon(day.weather[0].main);
            
            const weatherDay = document.createElement('div');
            weatherDay.className = 'weather-day';
            weatherDay.innerHTML = `
                <p class="day">${dayName}</p>
                <i class="${weatherIcon}"></i>
                <p class="temp">${temp}°C</p>
            `;
            
            weatherContainer.appendChild(weatherDay);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const weatherContainer = document.getElementById('weather-forecast');
        if (weatherContainer) {
            weatherContainer.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Unable to load weather data: ${error.message}</p>
                </div>
            `;
        }
    }
}


function getWeatherIcon(condition) {
    const iconMap = {
        'Clear': 'fas fa-sun',
        'Clouds': 'fas fa-cloud',
        'Rain': 'fas fa-cloud-rain',
        'Snow': 'fas fa-snowflake',
        'Thunderstorm': 'fas fa-bolt',
        'Drizzle': 'fas fa-cloud-rain',
        'Mist': 'fas fa-smog',
        'Smoke': 'fas fa-smog',
        'Haze': 'fas fa-smog',
        'Dust': 'fas fa-smog',
        'Fog': 'fas fa-smog'
    };
    
    return iconMap[condition] || 'fas fa-cloud';
}


document.addEventListener('DOMContentLoaded', function() {
    const updateWeatherBtn = document.querySelector('.weather-forecast .btn-outline');
    if (updateWeatherBtn) {
        updateWeatherBtn.addEventListener('click', updateWeatherForecast);
    }
    
    
    updateWeatherForecast();
});


document.getElementById('timeRange').addEventListener('change', function(e) {
    const data = {
        month: [4.2, 9.5, 7.1, 3.8, 2.5],
        quarter: [4.5, 8.9, 6.8, 4.1, 2.7],
        year: [4.8, 9.2, 7.4, 3.9, 2.9]
    };
    
    cropPerformanceChart.data.datasets[0].data = data[e.target.value];
    cropPerformanceChart.update();
});

function initializeCropPerformanceChart() {
    const ctx = document.getElementById('cropPerformanceChart').getContext('2d');
    
    return new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [65, 35],
                backgroundColor: [
                    '#4CAF50',
                    '#E8F5E9'
                ],
                borderWidth: 0,
                circumference: 360,
                rotation: -90
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '80%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const chart = initializeCropPerformanceChart();
    
   
    const timeButtons = document.querySelectorAll('.time-button');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

function handleLogout(event) {
    event.preventDefault();
    
    // Clear any stored user data
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirect to login page
    window.location.href = 'login.html';
}

// Ensure the logout button is visible when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.style.display = 'flex';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Add click event listener for weather forecast link
    const weatherLink = document.querySelector('a[href="weather.html"]');
    weatherLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'weather.html';
    });
});

// Add this to your existing JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-item a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            this.parentElement.classList.add('active');
        });
    });
});
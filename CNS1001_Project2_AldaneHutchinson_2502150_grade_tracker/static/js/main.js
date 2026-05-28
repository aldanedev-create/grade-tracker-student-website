/**
 * Student Grade Tracker - Main JavaScript File
 * CNS1001 Introduction to Programming
 * Student: Aldane Hutchinson
 * ID: 2502150
 * Date: March 25 2026
 */

// ==================== PAGE LOADING ANIMATION ====================

(function () {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loader-container">
            <div class="loader"></div>
            <p>Loading Student Grade Tracker...</p>
        </div>
    `;

    document.addEventListener('DOMContentLoaded', function () {
        document.body.appendChild(loadingOverlay);

        // Fixed: reduced from 5000ms (5s) to 1500ms (1.5s) - much better UX
        setTimeout(function () {
            loadingOverlay.style.opacity = '0';
            setTimeout(function () {
                loadingOverlay.remove();
            }, 500);
        }, 1500);
    });
})();

// ==================== FORM VALIDATION ====================

/**
 * Validate grade input in real-time
 */
function validateGradeInput(inputElement) {
    const grade = parseFloat(inputElement.value);
    const errorElement = document.getElementById('grade-error');

    if (inputElement.value.trim() === '') {
        hideError(errorElement);
        return true;
    }

    if (isNaN(grade)) {
        showError(errorElement, 'Please enter a valid number');
        inputElement.classList.add('error');
        inputElement.classList.remove('valid');
        return false;
    } else if (grade < 0 || grade > 100) {
        showError(errorElement, 'Grade must be between 0 and 100');
        inputElement.classList.add('error');
        inputElement.classList.remove('valid');
        return false;
    } else {
        hideError(errorElement);
        inputElement.classList.remove('error');
        inputElement.classList.add('valid');
        return true;
    }
}

/**
 * Validate subject input in real-time
 */
function validateSubjectInput(inputElement) {
    const subject = inputElement.value.trim();
    const errorElement = document.getElementById('subject-error');

    if (subject === '') {
        hideError(errorElement);
        return true;
    }

    if (subject.length > 100) {
        showError(errorElement, 'Subject name is too long (max 100 characters)');
        inputElement.classList.add('error');
        inputElement.classList.remove('valid');
        return false;
    } else if (subject.includes(',')) {
        showError(errorElement, 'Subject name cannot contain a comma');
        inputElement.classList.add('error');
        inputElement.classList.remove('valid');
        return false;
    } else {
        hideError(errorElement);
        inputElement.classList.remove('error');
        inputElement.classList.add('valid');
        return true;
    }
}

/**
 * Show error message
 */
function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

/**
 * Hide error message
 */
function hideError(element) {
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

// ==================== FORM SUBMISSION HANDLER ====================

/**
 * Handle grade form submission - runs full validation before submit
 */
function handleGradeSubmit(event) {
    const gradeInput = document.getElementById('grade');
    const subjectInput = document.getElementById('subject');

    let isValid = true;

    if (subjectInput) {
        isValid = validateSubjectInput(subjectInput) && isValid;
        // Force show error on empty submit
        if (subjectInput.value.trim() === '') {
            showError(document.getElementById('subject-error'), 'Subject name cannot be empty');
            isValid = false;
        }
    }

    if (gradeInput) {
        isValid = validateGradeInput(gradeInput) && isValid;
        if (gradeInput.value.trim() === '') {
            showError(document.getElementById('grade-error'), 'Grade cannot be empty');
            isValid = false;
        }
    }

    if (!isValid && event) {
        event.preventDefault();
    }

    return isValid;
}

// ==================== DYNAMIC TABLE FEATURES ====================

/**
 * Sort table by column when header is clicked
 */
function sortTable(columnIndex) {
    const table = document.querySelector('.grades-table');
    if (!table) return;

    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = table.getAttribute('data-sort-order') === 'asc';

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex] ? a.cells[columnIndex].textContent.trim() : '';
        const bValue = b.cells[columnIndex] ? b.cells[columnIndex].textContent.trim() : '';

        if (!isNaN(parseFloat(aValue)) && !isNaN(parseFloat(bValue))) {
            return isAscending ?
                parseFloat(aValue) - parseFloat(bValue) :
                parseFloat(bValue) - parseFloat(aValue);
        }

        return isAscending ?
            aValue.localeCompare(bValue) :
            bValue.localeCompare(aValue);
    });

    table.setAttribute('data-sort-order', isAscending ? 'desc' : 'asc');
    rows.forEach(row => tbody.appendChild(row));
}

// ==================== GRADE COLOR CODING ====================

/**
 * Add color coding to grade table rows based on grade value
 */
function addGradeColorCoding() {
    const rows = document.querySelectorAll('.grades-table tbody tr');
    rows.forEach(row => {
        const gradeCell = row.cells[2];
        if (gradeCell) {
            const grade = parseFloat(gradeCell.textContent);
            if (grade >= 90) {
                row.style.backgroundColor = '#d4edda';
            } else if (grade >= 80) {
                row.style.backgroundColor = '#d1ecf1';
            } else if (grade >= 70) {
                row.style.backgroundColor = '#fff3cd';
            } else if (grade >= 60) {
                row.style.backgroundColor = '#ffe5b4';
            } else {
                row.style.backgroundColor = '#f8d7da';
            }
        }
    });
}

// ==================== TOAST NOTIFICATIONS ====================

/**
 * Show temporary toast notification
 */
function showToast(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;

    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        font-size: 15px;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==================== PROGRESS BAR ====================

/**
 * Create a progress bar for average grade on results page
 */
function createProgressBar(value, max = 100) {
    const percentage = Math.min((value / max) * 100, 100);
    const color = percentage >= 70 ? '#28a745' : percentage >= 50 ? '#ffc107' : '#dc3545';

    return `
        <div class="progress-bar-container" title="${percentage.toFixed(1)}% average">
            <div class="progress-bar-fill" style="width: ${percentage}%; background: ${color};">
                <span class="progress-text">${percentage.toFixed(1)}%</span>
            </div>
        </div>
    `;
}

// ==================== INITIALIZE ON PAGE LOAD ====================

document.addEventListener('DOMContentLoaded', function () {

    // Grade table features
    if (document.querySelector('.grades-table')) {
        addGradeColorCoding();

        const headers = document.querySelectorAll('.grades-table th');
        headers.forEach((header, index) => {
            header.style.cursor = 'pointer';
            header.title = 'Click to sort';
            header.addEventListener('click', () => sortTable(index));
        });
    }

    // Form validation on add/edit pages
    const gradeForm = document.querySelector('.grade-form');
    if (gradeForm) {
        gradeForm.addEventListener('submit', handleGradeSubmit);

        const gradeInput = document.getElementById('grade');
        const subjectInput = document.getElementById('subject');

        if (gradeInput) {
            gradeInput.addEventListener('input', () => validateGradeInput(gradeInput));
        }
        if (subjectInput) {
            subjectInput.addEventListener('input', () => validateSubjectInput(subjectInput));
        }
    }

    // Progress bar on results page
    const resultsPage = document.querySelector('.results-page');
    if (resultsPage) {
        const averageValueEl = document.querySelector('.result-card .result-value');
        if (averageValueEl) {
            const average = parseFloat(averageValueEl.textContent);
            if (!isNaN(average)) {
                const progressContainer = document.createElement('div');
                progressContainer.innerHTML = createProgressBar(average);
                averageValueEl.parentElement.appendChild(progressContainer);
            }
        }
    }

    // Auto-dismiss flash messages after 4 seconds
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.transition = 'opacity 0.5s ease';
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 500);
        }, 4000 + index * 500);
    });

    console.log('Student Grade Tracker initialized successfully! | Aldane Hutchinson | ID: 2502150');
});

// ==================== INJECTED STYLES ====================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to   { transform: translateX(0);   opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to   { opacity: 0; }
    }

    .progress-bar-container {
        width: 100%;
        height: 30px;
        background: rgba(255,255,255,0.3);
        border-radius: 15px;
        overflow: hidden;
        margin-top: 15px;
    }
    .progress-bar-fill {
        height: 100%;
        transition: width 0.8s ease;
        position: relative;
        border-radius: 15px;
    }
    .progress-text {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-weight: bold;
        font-size: 12px;
    }

    .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #667eea;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }
    @keyframes spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    #loading-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(255,255,255,0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }

    /* Error/valid input states - used by JS validation */
    .error-message {
        color: #dc3545;
        font-size: 0.85em;
        margin-top: 5px;
        display: none;
    }
    input.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220,53,69,0.15) !important;
    }
    input.valid {
        border-color: #28a745 !important;
        box-shadow: 0 0 0 3px rgba(40,167,69,0.15) !important;
    }
`;
document.head.appendChild(style);

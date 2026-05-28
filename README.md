# Student Grade Tracker Website

## Note: open preview if prefer to see logo  press Ctrl+Shift+V (or Cmd+Shift+V on Mac)

## a. Project Title & Student Information

| Field | Details |
|---|---|
| **Project Title** | Student Grade Tracker Website |
| **Student Name** | Aldane Hutchinson |
| **Date** | Mar 30,2026 |
| **Student ID** | 2502150 |
| **Teacher** | Wayne thompson |
| **Course** | CNS1001 – Introduction to Programming |
| **Semester** | Semester 2, 2026 |
| **Due Date** | April 17, 2026 |
| **Backend** | Python 3 with Flask framework |
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Data Storage** | Plain text file — `data/grades.txt` |
| **Main Program File** | `CNS1001_Project2_AldaneHutchinson_2502150_project.py` |


---

## b. Problem Statement & Background

Students in Jamaica preparing for CAPE and CXC examinations regularly use past papers as a revision tool. A common challenge is that after completing a paper and checking the answers, the student has a raw score but no structured record of it. Without tracking scores across subjects and over time, it is difficult to identify which subjects need the most attention, whether performance is improving, or which individual subjects are being consistently failed.

The Student Grade Tracker Website was built to solve this problem. It gives students a simple browser-based tool to add, view, edit, delete, and search their subject grades. Every grade is saved to a text file so the data is available every time the application is opened. The web interface makes the program accessible and straightforward to use without needing to understand command-line tools.

---

## c. Program Description & Main Features

The Student Grade Tracker is a full-stack web application. The backend is written in Python using the Flask framework, which handles routing, business logic, input validation, and file storage. The frontend is built with HTML5 for structure, CSS3 for styling and layout, and Vanilla JavaScript for real-time form validation, table sorting, and interactive feedback. Grades are stored in a plain text file at `data/grades.txt` inside the project folder.

The application runs locally on the student's computer. The user opens a browser, navigates to `http://127.0.0.1:5000`, and uses the web interface to manage their grades. No internet connection is required once the application is running.

### Main Features
## 🚀 System Features

This section outlines the main features of the Student Grade Tracker system and how each one functions.

---

### 🏠 Home / Dashboard
- Displays the main navigation menu with four feature cards  
- Shows the total number of subjects being tracked  
- Displays flash messages confirming completed actions  

---

### ➕ Add Grade
- Provides a form to enter:
  - Subject name  
  - Numeric grade (0–100)  
- Validation:
  - Frontend (JavaScript) checks input before submission  
  - Backend (Flask) validates again before saving  
- Prevents duplicate subject entries  

---

### 📋 View Grades
- Displays all saved grades in a table format  
- Shows:
  - Subject name  
  - Numeric grade  
  - Letter classification (A–F)  
  - Pass/Fail status  
- Features:
  - Colour-coded rows based on performance  
  - Edit and Delete buttons  
  - Clickable column headers for sorting  

---

### 📊 Results & Statistics
- Displays overall performance analysis:
  - Average grade  
  - Highest and lowest grades  
  - Pass/Fail status  
  - Total number of subjects  
  - Passing and failing counts  
  - Pass rate  
- Includes a detailed per-subject breakdown table  

---

### 🔍 Search
- Allows users to search using part of a subject name  
- Displays matching results with:
  - Grade  
  - Classification  
  - Status  
- Includes Edit and Delete options directly from results  

---

### ✏️ Edit Grade
- Displays a pre-filled form with the current grade  
- Allows user to update the value  
- Automatically recalculates:
  - Grade classification  
  - Pass/Fail status  

---

### 🗑️ Delete Grade
- Removes a subject and its grade from records  
- Includes a confirmation dialog before deletion  

---

### 💬 Flash Messages
- Provides user feedback after every action  
- Message types:
  - ✅ Success  
  - ❌ Error  
  - ℹ️ Information  
- Displayed at the top of each page  

---


---

## d. Programming Concepts Used

### Python / Flask — Backend
## 💻 Programming Concepts Used

This section explains the key programming concepts used in the development of the Student Grade Tracker system and how each was applied.

---

### 🔧 Functions
Each feature of the system is implemented using separate functions to improve organization and reusability.
### 🔧 Functions Used

Functions are used to organise the system into reusable and manageable components.

---

#### 🌐 Route Functions
These functions handle user navigation and interaction with the system:

- `home()` → Displays the home page  
- `add_grade()` → Handles adding a new grade  
- `view_grades()` → Displays all saved grades  
- `results()` → Shows statistics and analysis  
- `search()` → Searches for a subject  
- `edit_grade()` → Updates an existing grade  
- `delete_grade()` → Removes a subject  

---

#### ⚙️ Supporting Functions
These functions handle data processing and validation:

- `read_grades()` → Reads data from file  
- `save_grades()` → Saves data to file  
- `validate_grade()` → Ensures grade is valid  
- `validate_subject()` → Ensures subject name is valid  

- `calculate_average()` → Computes average grade  
- `get_highest_grade()` → Finds highest score  
- `get_lowest_grade()` → Finds lowest score  

- `get_grade_classification()` → Assigns letter grade (A–F)  
- `check_pass_fail()` → Determines pass or fail status  

---


---

### 🔀 Conditionals
`if`, `elif`, and `else` statements are used to control program logic.

- Determine pass or fail status  
- Assign letter grade classifications  
- Validate user inputs  
- Detect duplicate subjects  
- Handle cases where no grades are available  

---

### 🔁 Loops
`for` loops are used to process collections of data.

- Iterate through grades to calculate the average  
- Find the highest and lowest grades  
- Assign classifications to each subject  
- Build the data structure for displaying results  

---

### 📦 Lists & Dictionaries
Data is stored using a list of dictionaries.

- Each record contains:
  - `subject`
  - `grade`  
- The list is recreated from the file when reading data and updated when saving  

---

### 📁 File Handling
The system uses file handling to store and retrieve data.

- `read_grades()` reads from `data/grades.txt` and converts each line into a dictionary  
- `save_grades()` writes updated data back to the file  
- The `data/` folder is created automatically using `os.makedirs()`  

---

### ✅ Input Validation
Validation ensures that all user inputs are correct before processing.

- `validate_grade()`:
  - Uses `try/except` to handle non-numeric input  
  - Ensures the grade is between 0 and 100  

- `validate_subject()`:
  - Ensures the subject is not empty  
  - Limits length to 100 characters  
  - Prevents use of commas  

---

### 🌐 Flask Routing
Flask is used to manage navigation and user interaction.

- Routes are defined using `@app.route()`  
- Some routes support form submission using `methods=['GET', 'POST']`  
- Dynamic routes like `<subject>` are used for editing and deleting records  

---

### 💬 Flash Messages
Flash messages provide feedback to the user.

- `flash()` is used to display:
  - Success messages  
  - Error messages  
  - Informational messages  
- `app.secret_key` enables session management required for flash messages  

---


### HTML with Jinja2 — Structure and Templates
## 🌐 HTML & Templating Concepts Used

This section explains how HTML and templating are used to structure and dynamically display content in the Student Grade Tracker system.

---

### 🧩 Jinja2 Templates
Jinja2 is used to connect Python data with HTML pages.

- `{{ variable }}` displays dynamic data from Flask  
- `{% for %}` loops generate table rows dynamically  
- `{% if %}` conditionals:
  - Show pass/fail badges  
  - Apply colour-coded rows  
  - Display empty-state messages when no data is available  

---

### 📝 HTML Forms
Forms are used to collect user input and send it to the backend.

- Pages using forms:
  - `add_grade.html`  
  - `edit_grade.html`  
  - `search.html`  
- Forms use the `POST` method for secure data submission  
- Input fields use the `name` attribute:
  - Matches keys accessed in Flask using `request.form.get()`  

---

### 🔗 url_for()
Ensures correct linking between pages and resources.

- Used for:
  - Navigation links  
  - Form actions  
  - Static files (CSS, JavaScript)  
- Automatically generates correct URLs regardless of deployment environment  

---

### CSS — Styling and Layout
## 🎨 CSS Concepts Used

This section explains how CSS is used to design and enhance the visual appearance and responsiveness of the Student Grade Tracker system.

---

### 🧩 CSS Grid
CSS Grid is used to create a flexible and responsive layout.

- Home page navigation uses:  
  `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`  
- Automatically adjusts the number of columns based on screen size  
- Ensures a clean card-based layout across devices  

---

### 🎞️ CSS Animations
Animations improve user experience by making the interface more dynamic.

- `fadeIn` → smooth page loading effect  
- `slideDown` → header appearance  
- `slideIn` → navigation elements  
- `fadeInUp` → content and cards  

---

### 🎨 Colour Coding
Colours are used to visually communicate results.

- **Pass rows:** Green left border (`pass-row`)  
- **Fail rows:** Red left border (`fail-row`)  
- **Result card:**
  - Green gradient → PASS  
  - Red gradient → FAIL  

---

### 📱 Responsive Design
Ensures the system works well on different screen sizes.

- `@media (max-width: 768px)` used for mobile devices  
- Changes grid layout to a single column  
- Reduces padding for smaller screens  
- Adjusts font sizes for readability  

---

### Vanilla JavaScript — Interactivity
## ⚙️ JavaScript Concepts Used

This section explains how JavaScript is used to enhance interactivity and user experience in the Student Grade Tracker system.

---

### 🌐 DOM Manipulation
JavaScript dynamically updates and controls elements on the web page.

- `DOMContentLoaded` ensures all scripts run after the page is fully loaded  
- Dynamic elements created:
  - Loading overlay  
  - Toast notifications  
  - Results progress bar  

---

### ✅ Form Validation
Real-time validation ensures correct user input before submission.

- `validateSubjectInput()` checks subject name rules  
- `validateGradeInput()` ensures valid numeric grade  
- Error messages displayed using:
  - `<span class="error-message">`  
- Final validation occurs before submitting data to Flask  

---

### 🎯 Event Listeners
Event listeners handle user interactions.

- `input` events → real-time validation  
- `click` events → sorting table columns  
- `submit` event → final form validation before sending data  

---

### 🔄 Table Sorting
Sorting improves data organisation and usability.

- `sortTable(columnIndex)`:
  - Reads all table rows  
  - Sorts data alphabetically or numerically  
  - Re-renders table in sorted order  

---

### ⏱️ Auto-dismiss Alerts
Improves user experience by removing alerts automatically.

- `.alert` messages fade out after page load  
- `setTimeout` removes alerts after 10 seconds  

---

### 📊 Progress Bar
Visual representation of performance on the results page.

- `createProgressBar()` generates a coloured bar  
- Color indicators:
  - 🟢 Green → 70% and above  
  - 🟡 Yellow → 50%–69%  
  - 🔴 Red → below 50%  

---


---

## e. How to Run the Program

### Requirements
- Python 3.7 or higher
- Flask (install using the command below)
- A modern web browser (Chrome, Firefox, or Edge)

### Step-by-Step Instructions

**Step 1** — Extract the ZIP file and open the `grade_tracker` folder.

**Step 2** — Open a terminal inside the `grade_tracker` folder.
On Windows, click the address bar in the folder, type `cmd`, and press Enter.
Your terminal path should end with:
```
...\grade_tracker>
```

**Step 3** — Install Flask:
```
pip install flask
```

**Step 4** — Run the application:

```
 cd CNS1001_Project2_AldaneHutchinson_2502150_grade_tracker 
python CNS1001_Project2_AldaneHutchinson_2502150_project.py
```

**Step 5** — Open your browser and go to:
```
http://127.0.0.1:5000
```

**Step 6** — To stop the application, go back to the terminal and press `Ctrl + C`.

> The `data/grades.txt` file is created automatically on the first run. No manual setup is needed.

---

### Project Folder Structure

```
CNS1001_Project2_AldaneHutchinson_2502150_grade_tracker/
├── CNS1001_Project2_AldaneHutchinson_2502150_app.py
├── CNS1001_Project2_AldaneHutchinson_2502150_requirements.txt
├── CNS1001_Project2_AldaneHutchinson_2502150_README.md
├── templates/
│   ├── index.html          ← Home page
│   ├── add_grade.html      ← Add grade form
│   ├── view_grades.html    ← View all grades
│   ├── edit_grade.html     ← Edit grade form
│   ├── result.html         ← Results & statistics
│   └── search.html         ← Search by subject
├── static/
│   ├── css/
│   │   └── style.css       ← Main stylesheet
│   └── js/
│       └── main.js         ← JavaScript
└── data/
    └── grades.txt          ← Created automatically on first run
```

### URL Routes
## 🌐 System Routes

| URL                | Page Name     | Description                                                   |
|--------------------|--------------|---------------------------------------------------------------|
| `/`                | Home         | Displays main menu and grade count                           |
| `/add`             | Add Grade    | Form to input a new subject and grade                        |
| `/view`            | View Grades  | Shows all saved grades in a table                            |
| `/results`         | Results      | Displays average, statistics, and pass/fail summary          |
| `/search`          | Search       | Search for a subject by name                                 |
| `/edit/<subject>`  | Edit Grade   | Update an existing subject’s grade                           |
| `/delete/<subject>`| Delete       | Remove a subject and redirect to View Grades                 |
---

## f. Inputs & Outputs

### Adding a Grade

**Input:**
| Field | Value |
|---|---|
| Subject Name | Mathematics |
| Grade (%) | 85 |

**Output (flash message on home page):**
```
Grade for Mathematics (85%) added successfully!
```

---

### Viewing All Grades
## 📋 Sample Grade Records

| # | Subject     | Grade (%) | Classification | Status  | Actions        |
|---|------------|-----------|---------------|---------|----------------|
| 1 | Mathematics | 85.0      | B             | ✅ PASS | Edit / Delete  |
| 2 | Biology     | 72.0      | C             | ✅ PASS | Edit / Delete  |
| 3 | Chemistry   | 45.0      | F             | ❌ FAIL | Edit / Delete  |

**Summary card below the table:**
```
Total Subjects:  3
Average Grade:   67.3%
```

---

### Results Page
## 📊 Results Summary

| Statistic          | Value                     |
|--------------------|---------------------------|
| Average Grade      | 67.3% (PASS)              |
| Highest Grade      | 85.0% — Mathematics       |
| Lowest Grade       | 45.0% — Chemistry         |
| Total Subjects     | 3                         |
| Passing Subjects   | 2                         |
| Failing Subjects   | 1                         |
| Pass Rate          | 66.7%                     |

---

### Search

**Input:** `math` (case insensitive)

**Output:**
```
Subject:         Mathematics
Grade:           85.0%
Classification:  B
Status:          PASS
```

**If no match found:**
```
No subject found containing "physics"
```

---

### Invalid Input Examples

**Grade above 100:**
```
Grade must be between 0 and 100
```

**Empty subject name:**
```
Subject name cannot be empty
```

**Duplicate subject:**
```
Subject "Mathematics" already exists. Use Edit to update it.
```

---

## 🧪 Testing & Evaluation

This section outlines the test cases conducted to ensure that the Student Grade Tracker system functions correctly. Each test verifies different features such as input validation, data management, and system responses.

---

### ✅ Test Case 1: Add a valid grade
- **Input:** Subject: Mathematics | Grade: 85  
- **Expected Output:** Grade added successfully. Redirects to home.  
- **Actual Output:*Grade for Mathematics (85%) added successfully!*  
- **Result:*pass*  

---

### ❌ Test Case 2: Add a grade above 100
- **Input:** Subject: Biology | Grade: 150  
- **Expected Output:** Error: Grade must be between 0 and 100.  
- **Actual Output:*Enter a grade between 0 and 100 Add Grade * 
- **Result:*fail*  

---

### ❌ Test Case 3: Add a grade with letters
- **Input:** Subject: Chemistry | Grade: abc  
- **Expected Output:** Error: the program does not allowed letters to be enter.  
- **Actual Output:** *(null)*  
- **Result:*fail*  

---

### ❌ Test Case 4: Add a blank subject
- **Input:** Subject: (blank) | Grade: 70  
- **Expected Output:** Error: Subject name cannot be empty.  
- **Actual Output:** *(Pls fill out the feild. the html form require it to be fill or else it will send the form data back to file or flash messages)*  
- **Result:*fail*  

---

### ❌ Test Case 5: Add duplicate subject
- **Input:** Subject: Mathematics | Grade: 90  
- **Expected Output:** Error: Subject already exists. Use Edit.  
- **Actual Output:*Subject "Mathematics" already exists. Use Edit to update it.* 
- **Result:*fail*  

---

### 📊 Test Case 6: View grades
- **Input:** Navigate to `/view`  
- **Expected Output:** Displays all subjects with grade, classification, and status.  
- **Actual Output:* Has a summary of subjects and total average calcualted so far with classification, and status* 
- **Result:*Pass*  

---

### 🔍 Test Case 7: Search existing subject
- **Input:** Search: math  
- **Expected Output:** Displays the grade for math whether of pass of Fial.  
- **Actual Output:*Pass* 
- **Result:* Pass*  

---

### 🔍 Test Case 8: Search non-existing subject
- **Input:** Search: physics  
- **Expected Output:** No subject found containing "physics".  
- **Actual Output:*No subject found containing "physics" and also option to add a grade*  
- **Result:*Fail*  

---

### ✏️ Test Case 9: Edit grade (valid)
- **Input:** Edit Mathematics | New Grade: 92  
- **Expected Output:** Grade updated to 92%. Redirects to View Grades.  
- **Actual Output:*Grade for Mathematics updated to 92.0%* 
- **Result:*pass*  

---

### ❌ Test Case 10: Edit grade (invalid)
- **Input:** Edit Mathematics | New Grade: -5  
- **Expected Output:** Error: Grade must be between 0 and 100.  
- **Actual Output:*Grade must be between 0 and 100 and html form validation value must greater than 0* 
- **Result:*fail*  

---

### 🗑️ Test Case 11: Delete grade
- **Input:** Delete Mathematics (confirm)  
- **Expected Output:** Successfully deleted Mathematics.  
- **Actual Output:*Are you sure you want to delete Mathematics? and Successfully deleted Mathematicsand then defaults no grades added as yet*  
- **Result:*Pass*  

---

### ⚠️ Test Case 12: No grades available
- **Input:** Navigate to `/results` with empty file  
- **Expected Output:** No grades available. Redirects to home.  
- **Actual Output:*No grades available. Please add some grades first. Redirects to home page*   
- **Result:*Pass*  


## h. Challenges Encountered & Lessons Learned

### Challenge 1 — Understanding How Flask Connects to HTML

The biggest conceptual challenge at the start was understanding how the Python backend and the HTML frontend communicate. Flask does not serve HTML directly from a file path. The HTML files must be inside a folder named `templates/`, the CSS and JavaScript files must be inside a folder named `static/`, and every link in the HTML must use `url_for()` rather than a simple relative file path. Getting this structure right was essential before any page would load.

### Challenge 2 — Flash Messages Requiring a Secret Key

Flash messages in Flask depend on the session system, which requires a secret key to be set on the app object. Without `app.secret_key`, the `flash()` function raises a `RuntimeError` and no messages appear. Once the secret key was added, flash messages worked correctly across all pages.

### Challenge 3 — Subjects with Commas Breaking File Storage

Grades are saved in a comma-separated format in `grades.txt`. During testing it was found that if a subject name contained a comma, the `read_grades()` function would split the line at the wrong position and produce corrupted data. This was fixed by adding a comma check to `validate_subject()` so any subject name containing a comma is rejected with a clear error message before it is saved.

### Challenge 4 — JavaScript and Flask Validation Working Together

The program uses both client-side validation in JavaScript and server-side validation in Python. JavaScript catches errors immediately as the user types, giving faster feedback without a round trip to the server. Python validates the same fields again when the form is submitted in case JavaScript was disabled or bypassed. Keeping both layers consistent required careful alignment between what the JavaScript checks and what the Flask route checks.

### Challenge 5 —  Running python flask website and downloading required software. Ex Flask updated version
To run the website it took time to learn how to do and also to executed and run the website in terminal.
needed cd grade_tracker to go directly in folder where  CNS1001_Project2_AldaneHutchinson_2502150_project.py is to run the application and flask version needed an update from the code provided from deepseek and it needed error fixing  with claude and developer to  fix the problem.   the application with  python CNS1001_Project2_AldaneHutchinson_2502150_project.py,and was then open to  browser   http://127.0.0.1:5000 .
 
### Lessons Learned

- Flask's folder structure is strict. HTML templates must be in `templates/` and static files must be in `static/`. Placing them anywhere else causes a `TemplateNotFound` error or a 404 for CSS and JavaScript files.
- The `<script>` tag must be placed at the end of the `<body>` element, not after the closing `</body>` tag. Placing it outside the body produces invalid HTML.
- Separating validation into its own functions (`validate_grade()` and `validate_subject()`) made it easy to call the same checks from both the add route and the edit route without duplicating code.
- Testing with edge cases such as an empty grades file, a grade of exactly 0, and a grade of exactly 100 is important. All three produced correct results but would not have been confirmed without specific test cases.
- Breaking the application into small, clearly named functions makes debugging much faster. When a bug appeared in the results calculation, only the relevant calculation functions needed to be examined rather than the entire application.

---

## i. AI Assistance Disclosure

The use of AI was implemented for the project ChatGPT for design and ideas, DeepSeek for code, and Claude for fixing errors. Both the developer and ai work together to do the project. The developer has experience with web development. A  document is there containing some of the prompts the developer used to assist in making the projects.


"""
CNS1001 - Introduction to Programming
Project 2: Student Grade Tracker Website
Student:  Aldane Hutchinson
Student ID: 2502150
Course: CNS1001
Section: App.py
Date: March 25 2026
"""

from flask import Flask, render_template, request, redirect, url_for, flash
import os


app = Flask(__name__)
# Secure random secret key required for flash messages and session security
app.secret_key = 'CNS1001_AldaneHutchinson_2502150_SecureKey!@#$%'

# File path for storing grades
GRADES_FILE = 'data/grades.txt'

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

# ==================== FILE HANDLING FUNCTIONS ====================

def read_grades():
    """
    Reads grades from the text file and returns a list of dictionaries.
    Each dictionary contains subject and grade.

    Returns:
        list: List of dictionaries with 'subject' and 'grade' keys
    """
    grades = []
    try:
        if os.path.exists(GRADES_FILE):
            with open(GRADES_FILE, 'r') as file:
                for line in file:
                    if line.strip():  # Skip empty lines
                        parts = line.strip().split(',')
                        if len(parts) == 2:
                            subject, grade = parts
                            grades.append({
                                'subject': subject,
                                'grade': float(grade)
                            })
    except FileNotFoundError:
        # File doesn't exist yet, return empty list
        pass
    except ValueError:
        # Handle corrupted data
        flash('Error reading grades file. Some data may be corrupted.', 'error')
    return grades

def save_grades(grades):
    """
    Saves grades to the text file.

    Args:
        grades (list): List of dictionaries with 'subject' and 'grade' keys
    """
    try:
        with open(GRADES_FILE, 'w') as file:
            for grade_entry in grades:
                file.write(f"{grade_entry['subject']},{grade_entry['grade']}\n")
    except IOError:
        flash('Error saving grades to file.', 'error')

# ==================== VALIDATION FUNCTIONS ====================

def validate_grade(grade):
    """
    Validates if the grade is a number between 0 and 100.

    Args:
        grade: The grade to validate

    Returns:
        tuple: (is_valid, error_message)
    """
    try:
        grade_value = float(grade)
        if 0 <= grade_value <= 100:
            return True, None
        else:
            return False, "Grade must be between 0 and 100"
    except ValueError:
        return False, "Grade must be a valid number"

def validate_subject(subject):
    """
    Validates if the subject name is not empty and has no commas
    (commas would break the CSV file format).

    Args:
        subject: The subject name to validate

    Returns:
        tuple: (is_valid, error_message)
    """
    if not subject or subject.strip() == "":
        return False, "Subject name cannot be empty"
    if len(subject) > 100:
        return False, "Subject name is too long (max 100 characters)"
    if ',' in subject:
        return False, "Subject name cannot contain a comma"
    return True, None

# ==================== GRADE PROCESSING FUNCTIONS ====================

def calculate_average(grades):
    """
    Calculates the average grade from the list of grades.

    Args:
        grades (list): List of dictionaries with 'grade' key

    Returns:
        float: Average grade, or 0 if no grades exist
    """
    if not grades:
        return 0.0
    total = sum(grade_entry['grade'] for grade_entry in grades)
    return total / len(grades)

def get_highest_grade(grades):
    """
    Finds the highest grade from the list.

    Args:
        grades (list): List of dictionaries with 'grade' and 'subject' keys

    Returns:
        tuple: (subject, grade) or (None, 0) if no grades exist
    """
    if not grades:
        return None, 0.0
    highest = max(grades, key=lambda x: x['grade'])
    return highest['subject'], highest['grade']

def get_lowest_grade(grades):
    """
    Finds the lowest grade from the list.

    Args:
        grades (list): List of dictionaries with 'grade' and 'subject' keys

    Returns:
        tuple: (subject, grade) or (None, 0) if no grades exist
    """
    if not grades:
        return None, 100.0
    lowest = min(grades, key=lambda x: x['grade'])
    return lowest['subject'], lowest['grade']

def get_grade_classification(grade):
    """
    Returns the letter grade classification based on the numeric grade.

    Args:
        grade (float): Numeric grade (0-100)

    Returns:
        str: Letter grade (A, B, C, D, F)
    """
    if grade >= 90:
        return 'A'
    elif grade >= 80:
        return 'B'
    elif grade >= 70:
        return 'C'
    elif grade >= 60:
        return 'D'
    else:
        return 'F'

def check_pass_fail(grade, passing_grade=50):
    """
    Checks if a grade is passing or failing.

    Args:
        grade (float): Numeric grade
        passing_grade (int): Minimum passing grade

    Returns:
        tuple: (status, message)
    """
    if grade >= passing_grade:
        return "PASS", f"Congratulations! You passed with {grade:.1f}%"
    else:
        return "FAIL", f"Unfortunately, you failed with {grade:.1f}%. Keep trying!"

# ==================== WEB ROUTES ====================

@app.route('/')
def home():
    """Home page - displays main navigation menu"""
    grades = read_grades()
    return render_template('index.html', grade_count=len(grades))

@app.route('/add', methods=['GET', 'POST'])
def add_grade():
    """Add grade page - allows users to add new subjects and grades"""
    if request.method == 'POST':
        subject = request.form.get('subject', '').strip()
        grade = request.form.get('grade', '').strip()

        # Validate inputs
        is_valid_subject, subject_error = validate_subject(subject)
        is_valid_grade, grade_error = validate_grade(grade)

        if is_valid_subject and is_valid_grade:
            grades = read_grades()

            # Check for duplicate subject
            existing_subjects = [g['subject'].lower() for g in grades]
            if subject.lower() in existing_subjects:
                flash(f'Subject "{subject}" already exists. Use Edit to update it.', 'error')
                return render_template('add_grade.html')

            grades.append({
                'subject': subject,
                'grade': float(grade)
            })
            save_grades(grades)
            flash(f'Grade for {subject} ({grade}%) added successfully!', 'success')
            return redirect(url_for('home'))
        else:
            if subject_error:
                flash(subject_error, 'error')
            if grade_error:
                flash(grade_error, 'error')

    return render_template('add_grade.html')

@app.route('/view')
def view_grades():
    """View grades page - displays all saved grades"""
    grades = read_grades()
    for grade_entry in grades:
        grade_entry['classification'] = get_grade_classification(grade_entry['grade'])
    return render_template('view_grades.html', grades=grades)

@app.route('/results')
def results():
    """Results page - displays average, pass/fail status, and statistics"""
    grades = read_grades()

    if not grades:
        flash('No grades available. Please add some grades first.', 'info')
        return redirect(url_for('home'))

    average = calculate_average(grades)
    highest_subject, highest_grade = get_highest_grade(grades)
    lowest_subject, lowest_grade = get_lowest_grade(grades)
    pass_status, pass_message = check_pass_fail(average)

    passing_count = sum(1 for g in grades if g['grade'] >= 50)
    failing_count = len(grades) - passing_count

    subjects_data = []
    for grade_entry in grades:
        subjects_data.append({
            'subject': grade_entry['subject'],
            'grade': grade_entry['grade'],
            'classification': get_grade_classification(grade_entry['grade']),
            'status': 'Pass' if grade_entry['grade'] >= 50 else 'Fail'
        })

    return render_template('result.html',
                           average=average,
                           highest_subject=highest_subject,
                           highest_grade=highest_grade,
                           lowest_subject=lowest_subject,
                           lowest_grade=lowest_grade,
                           pass_status=pass_status,
                           pass_message=pass_message,
                           passing_count=passing_count,
                           failing_count=failing_count,
                           total_subjects=len(grades),
                           subjects_data=subjects_data)

@app.route('/search', methods=['GET', 'POST'])
def search():
    """Search page - allows users to search for specific subjects"""
    search_result = None
    search_term = ''

    if request.method == 'POST':
        search_term = request.form.get('search_term', '').strip()

        if search_term:
            grades = read_grades()
            for grade_entry in grades:
                if search_term.lower() in grade_entry['subject'].lower():
                    search_result = {
                        'subject': grade_entry['subject'],
                        'grade': grade_entry['grade'],
                        'classification': get_grade_classification(grade_entry['grade'])
                    }
                    break

            if not search_result:
                flash(f'No subject found containing "{search_term}"', 'info')

    return render_template('search.html', search_result=search_result, search_term=search_term)

@app.route('/edit/<subject>', methods=['GET', 'POST'])
def edit_grade(subject):
    """Edit grade page - allows users to edit existing grades"""
    grades = read_grades()
    grade_entry = None

    for entry in grades:
        if entry['subject'] == subject:
            grade_entry = entry
            break

    if not grade_entry:
        flash('Subject not found.', 'error')
        return redirect(url_for('view_grades'))

    if request.method == 'POST':
        new_grade = request.form.get('grade', '').strip()
        is_valid, error = validate_grade(new_grade)

        if is_valid:
            grade_entry['grade'] = float(new_grade)
            save_grades(grades)
            flash(f'Grade for {subject} updated to {new_grade}%', 'success')
            return redirect(url_for('view_grades'))
        else:
            flash(error, 'error')

    return render_template('edit_grade.html', subject=subject, grade=grade_entry['grade'])

@app.route('/delete/<subject>')
def delete_grade(subject):
    """Delete grade - removes a subject and its grade"""
    grades = read_grades()
    initial_length = len(grades)

    grades = [g for g in grades if g['subject'] != subject]

    if len(grades) < initial_length:
        save_grades(grades)
        flash(f'Successfully deleted {subject}', 'success')
    else:
        flash(f'Subject "{subject}" not found', 'error')

    return redirect(url_for('view_grades'))

if __name__ == '__main__':
    app.run(debug=True)

# classificador-politicas-publicas-2023102400

This repository contains the **frontend of the analytical platform** that visualizes and classifies **dropout levels by course, subject, and individual students**, based on variables extracted from **LIME (Local Interpretable Model-Agnostic Explanations)** and processed through **machine learning models**.

This project is part of the research funded by **FAPESP (Grant No. 2023/10240-0)** titled:
**“Public Policies and Affirmative Actions in the Public University: defining an algorithm to alert for dropout risk among university entrants through quota and reservation systems.”**

---

## 🎯 Project Goal

The main objective of this system is to offer an **interactive, data-driven interface** for **academic managers, educators, and researchers**, enabling them to monitor and interpret **dropout risks** at different levels of academic organization.

By integrating **machine learning outputs** and **LIME-based interpretability tools**, the platform provides insights into **why** a student, course, or subject may present a higher probability of dropout, thus supporting **preventive educational strategies** and **evidence-based decision-making**.

---

## 🧠 Core Research Themes

The platform explores the following research and development areas:

* **Educational Data Mining:** Application of data science techniques to identify dropout patterns and predictive factors.
* **Model Interpretability:** Use of **LIME** to explain the contribution of each variable to the machine learning predictions.
* **Machine Learning for Educational Insights:** Implementation of models to classify dropout risk by aggregating academic and behavioral indicators.
* **Student Retention and Policy Design:** Translation of data-driven insights into practical strategies for improving student support and retention.

This project reflects an interdisciplinary collaboration between **computer science, education, and applied mathematics**, aiming to strengthen **academic inclusion and institutional efficiency**.

---

## 🧩 Repository Structure

```
frontend-dropout-classification/
├── public/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   ├── composables/
│   ├── router/
│   ├── views/
│   ├── App.vue
│   └── main.js
└── index.html
```

---

## ⚙️ Technologies Used

* **Vue.js 3** (Composition API)
* **Vite** – Fast build and development environment
* **JavaScript (ES6+)**
* **HTML5 + CSS3** (with optional **TailwindCSS** integration)
* **Node.js** – Runtime environment

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** version 16 or higher
* **npm** or **yarn** package manager

### Installation and Execution

```bash
# Clone this repository
git clone https://github.com/<username>/frontend-dropout-classification.git

# Navigate to the project folder
cd frontend-dropout-classification

# Install dependencies
npm install

# Run the development server
npm run dev
```

Once started, the application will be available at:

```
http://localhost:5173
```

---

## 📊 Notes

This frontend is part of a broader research infrastructure integrating **machine learning models** and **LIME interpretability tools** to assess educational dropout dynamics.
The visual interface allows stakeholders to explore **predictive insights**, monitor **risk distributions**, and **compare variables** contributing to dropout behavior.

This project is intended for **academic and research purposes only**.

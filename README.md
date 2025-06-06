Forms — Form Builder & Analytics Platform

[Forms](https://drive.google.com/file/d/1wGafYl-BeK2nR6K6WfQ9blEKzATQAuPW/view?usp=sharing)
A powerful web application for creating, managing, and analyzing forms, inspired by Google Forms. Built with React and TypeScript, this project showcases my skills as a Frontend Developer, featuring drag-and-drop form building, real-time analytics, form timers, and secure authentication.

🔗 Live Demo: Forms App 
🔗 GitHub: github.com/JuliaSukharkova/forms

🚀 Features

🎯 Drag & Drop Form Builder: Create dynamic forms on FormEditorPage using @dnd-kit (text, dropdowns, checkboxes, multi-select, time pickers).
⏱️ Form Timer: Track and limit form completion time on FormSubmitPage with a custom Timer component and warnings.
📝 Form Submission: User-friendly forms with validation using React Hook Form on FormSubmitPage.
📊 Analytics & CSV Export: Visualize responses with Recharts (pie charts) on FormResponsesPage and export to CSV.
🔍 Search & Sort: Search forms by title and sort by date or alphabetically with SortMenu on MainPage.
🌓 Light/Dark Themes: Theme switching with Tailwind CSS, auto-adapting to prefers-color-scheme.
📱 Responsive Design: Optimized for desktops, tablets, and mobile devices.
👤 User Profile: Upload avatars, edit details, and change passwords on ProfilePage.
🔐 Authentication: Registration and login with validation on SignUpPage and SignInPage via React Hook Form and Firebase Authentication.
✅ Form Validation: Robust validation for required fields, emails, and custom rules.
☁️ Data Storage:
Firebase: User authentication and profile data.
Supabase: Form creation and responses in PostgreSQL.




🛠️ Tech Stack

Frontend: React, TypeScript, Vite
UI: Tailwind CSS, shadcn/ui, Radix UI
State Management: React Context, useState
Forms & Validation: React Hook Form
Analytics: Recharts
Authentication: Firebase Authentication
Database: Supabase (PostgreSQL)
Tools: Git, ESLint, Prettier
Deployment: Github Pages


📦 Installation & Setup

Clone the repository:
git clone https://github.com/JuliaSukharkova/forms.git
cd forms


Install dependencies:
npm install


Set up environment variables:

Create a .env file in the root directory.
Add Firebase and Supabase credentials (see .env.example).


Run the app locally:
npm run dev


Build for production:
npm run build




🧠 Lessons Learned

Drag-and-Drop: Mastered @dnd-kit for a flexible form builder on FormEditorPage.
Timer Implementation: Built a Timer component with useTimer hook to enhance UX on FormSubmitPage.
Analytics: Leveraged Recharts to create interactive pie charts on FormResponsesPage.
Performance: Optimized rendering with useMemo and lazy loading for large forms.
Integrations: Gained expertise in Firebase Authentication and Supabase for secure data management.


📸 Screenshots


Form Editor
Form Submission 
Analytics
User Profile 
Sign In/Sign Up 
Dark Mode (








🌟 Why This Project?
This project demonstrates my ability to:

Build scalable, type-safe React applications with TypeScript.
Create intuitive, responsive UIs with Tailwind CSS and modern libraries.
Implement advanced features like form timers, drag-and-drop, and analytics.
Integrate third-party APIs (Firebase, Supabase) for authentication and data storage.
Deliver optimized, production-ready code with clean architecture.


📫 Contact

Email: yulk.b53@gmail.com
LinkedIn: [Julia Sukharkova](https://www.linkedin.com/in/juliasukharkova/)
GitHub: github.com/JuliaSukharkova


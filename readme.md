ChatGPT Archive Manager (Desktop)

A privacy-focused, open-source desktop application to organize, filter, and export your ChatGPT history into separate Markdown files. Perfect for Obsidian, NotebookLM, or Logseq users.

<!-- screenshots (1).png -->
<!-- screenshots (2).png -->
<!-- screenshots (3).png -->
<!-- screenshots (4).png -->

🚀 Why this tool?

ChatGPT allows you to export your data, but it gives you a massive, unreadable conversations.json file.
This tool runs locally on your machine, parses that file, and lets you:

Auto-Categorize: Automatically sorts chats into categories (Coding, Cinema, Health, Finance, etc.) using smart keyword analysis.

Drag & Drop: Manually organize chats between categories.

Export to Markdown: The killer feature. Instead of one giant text file, it creates a folder for each category and saves every chat as an individual .md file.

100% Local: No data is sent to any server. Your privacy is paramount.

🛠️ How to Install

Option 1: Download the App (Easiest)

Go to the [şüpheli bağlantı kaldırıldı] page on the right and download the latest .exe file.

Option 2: Build it yourself (For Developers)

Since this deals with your personal data, you might want to build it from the source code to be sure nothing shady is going on.

Install Node.js.

Clone this repository or download the ZIP.

Open a terminal in the folder and run:

npm install
npm start


To create your own .exe file:

npm run dist


📖 How to Use

Get your Data: Go to ChatGPT -> Settings -> Data Controls -> Export Data. You will receive a zip file via email.

Open the App: Launch ChatGPT Archive Manager.

Drag & Drop: Drop the conversations.json file (extracted from the zip) into the app.

Organize: Let the auto-sorter do its job, or use the "Smart Rule" button to bulk-move chats based on keywords.

Export: Go to the "Export" tab and click the button for any category.

Done: You now have a folder on your Desktop with clean Markdown files ready for your second brain (Obsidian/NotebookLM).

🔒 Privacy

This app functions completely offline after installation.

It reads your JSON file locally and saves the output to your Desktop.

No analytics, no tracking, no API calls to external servers.

🤝 Contributing

Feel free to fork this project, submit PRs, or suggest new features!

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(app.getPath('userData'), 'archive-data.json');
const EXPORT_DIR = path.join(app.getPath('desktop'), 'ChatGPT_Export');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "ChatGPT Archive Manager",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });
    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('load-state', async () => {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf-8');
            return JSON.parse(data);
        }
    } catch (error) { console.error(error); }
    return null;
});

ipcMain.handle('save-state', async (event, appData) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(appData));
        return { success: true };
    } catch (error) { return { success: false, error: error.message }; }
});

ipcMain.handle('reset-app', async () => {
    try {
        if (fs.existsSync(DATA_FILE)) fs.unlinkSync(DATA_FILE);
        return true;
    } catch (e) { return false; }
});

ipcMain.handle('export-category', async (event, { category, items }) => {
    try {
        const cleanCatName = sanitizeFileName(category);
        const catDir = path.join(EXPORT_DIR, cleanCatName);

        if (!fs.existsSync(catDir)) {
            fs.mkdirSync(catDir, { recursive: true });
        }

        let savedCount = 0;

        for (const item of items) {
            let safeTitle = sanitizeFileName(item.title);
            if (safeTitle.length > 50) safeTitle = safeTitle.substring(0, 50);
            
            const uniqueSuffix = item.id.slice(-4);
            const fileName = `${safeTitle}_${uniqueSuffix}.md`;
            const filePath = path.join(catDir, fileName);

            // --- ENGLISH MARKDOWN CONTENT ---
            let content = `# ${item.title}\n\n`;
            content += `**Category:** ${category}\n`;
            content += `**Date:** ${new Date(item.timestamp * 1000).toLocaleString('en-US')}\n`;
            content += `----------------------------------------\n\n`;

            if(item.original && item.original.mapping) {
                let msgs = [];
                Object.values(item.original.mapping).forEach(node => {
                    const m = node.message;
                    if(m && m.content && m.content.parts && m.content.content_type === 'text' && m.author.role !== 'system') {
                        const text = m.content.parts.join('\n').trim();
                        if(text) {
                            msgs.push({ role: m.author.role, text: text, time: m.create_time });
                        }
                    }
                });
                msgs.sort((a,b) => a.time - b.time);
                
                msgs.forEach(m => {
                    const roleName = m.role === 'user' ? 'User' : 'ChatGPT';
                    content += `### ${roleName}:\n${m.text}\n\n`;
                });
            } else {
                content += "_Content unavailable or parse error._\n";
            }

            fs.writeFileSync(filePath, content);
            savedCount++;
        }
        
        shell.openPath(catDir);

        return { success: true, count: savedCount, path: catDir };

    } catch (error) {
        return { success: false, error: error.message };
    }
});

function sanitizeFileName(name) {
    return name.replace(/[<>:"/\\|?*]/g, '').trim();
}
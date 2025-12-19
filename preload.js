const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    loadState: () => ipcRenderer.invoke('load-state'),
    saveState: (data) => ipcRenderer.invoke('save-state', data),
    resetApp: () => ipcRenderer.invoke('reset-app'),
    exportCategory: (category, items) => ipcRenderer.invoke('export-category', { category, items }),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});
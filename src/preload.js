const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (formData) => ipcRenderer.invoke('set-title',formData),
  getPatients: () => ipcRenderer.invoke('get-patients')
})
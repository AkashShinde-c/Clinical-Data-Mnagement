const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (formData) => ipcRenderer.invoke('set-title',formData),
  getPatients: () => ipcRenderer.invoke('get-patients'),
  addVisit: (visitData)=> ipcRenderer.invoke('add-visit',visitData),
  getVisit: (regNo) => ipcRenderer.invoke('get-visit',regNo),
  convertToCsv: () => ipcRenderer.invoke('convert-csv'),
  getAllVisit: () => ipcRenderer.invoke('get-all-visit'),
  importCSV: () => ipcRenderer.invoke('import-csv'),
  updatePatient: (data)=> ipcRenderer.invoke('update-patient',data)
})
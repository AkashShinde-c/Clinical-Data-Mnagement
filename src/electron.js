const path = require("path");
const fs = require("fs");
const { Parser } = require("json2csv");
const xlsx = require("xlsx");
const { dialog } = require("electron");

const { app, BrowserWindow, ipcMain } = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("set-title", (event, formData) => {
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.log("No existing data found in file");
    }
    existingData.push(formData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    console.log("Data saved to file");
    return true;
  });

  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  //add visit of patient
  ipcMain.handle("add-visit", (e, visitData) => {
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      patients = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.log("No existing data found in file");
    }
    const patientToUpdate = patients.find(
      (patient) => patient.registrationNumber === visitData.regNo
    );
    let dob = patientToUpdate.dob;
    let newAge = calculateAge(dob);
    console.log(patientToUpdate['age'])
    patientToUpdate['age'] = newAge;
    console.log(patientToUpdate['age'])

    patientToUpdate.visits.push(visitData);
    const updatedData = JSON.stringify(patients);
    fs.writeFileSync(filePath, updatedData);
    return true;
  });

  //handling get patient data
  ipcMain.handle("get-patients", (e) => {
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.log("No existing data found in file");
    }
    return existingData;
  });

  //handle get visits
  ipcMain.handle("get-visit", (e, regNo) => {
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.log("No existing data found in file");
    }
    const patient = existingData.find((p) => p.registrationNumber === regNo);
    return patient.visits;
  });

  //handle pdf generation
  ipcMain.handle('generate-pdf-report', (e,data)=>{
    
  })

  //handle get all visit
  ipcMain.handle("get-all-visit", (e) => {
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.log("No existing data found in file");
    }

    return existingData;
  });
  //handle import xls
  ipcMain.handle("import-csv", (e) => {
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      existingData = JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      console.log("No existing data found in file");
    }
    dialog
      .showOpenDialog({
        filters: [{ name: "Excel Files", extensions: ["xls", "xlsx"] }],
        properties: ["openFile"],
      })
      .then((result) => {
        if (result.canceled) {
          return;
        }

        // Read file
        const buffer = fs.readFileSync(result.filePaths[0]);

        // Parse Excel file
        const workbook = xlsx.read(buffer, { type: "buffer" });

        // Get the first worksheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert worksheet to JSON object
        const data = xlsx.utils.sheet_to_json(worksheet);
        data.map((data) => {
          existingData.push({
            registrationNumber: data["REG. NO."],
            fullName:
              data["FIRST NAME"] +
              " " +
              data["MIDDLE NAME"] +
              " " +
              data["LAST NAME"],
            email: "",
            phoneNumber: "",
            address: data.ADDRESS,
            age: data.AGE,
            dob: "",
            illness: " ",
            gender: data.SEX,
            visits: [],
          });
        });

        const jsonString = JSON.stringify(existingData, null, 2);
        fs.writeFileSync(filePath, jsonString);
        // Do something with the JSON data
      });
  });

  //handle export to csv
  ipcMain.handle("convert-csv", async (e) => {
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      const fileData = await fs.promises.readFile(filePath, {
        encoding: "utf8",
      });
      existingData = JSON.parse(fileData);
    } catch (error) {
      console.log("No existing data found in file");
    }
    const fields = [
      "registrationNumber",
      "fullName",
      "email",
      "phoneNumber",
      "address",
      "dob",
      "illness",
      "gender",
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(existingData);

    const csvFilePath = path.join(__dirname, "data.csv");
    fs.writeFileSync(csvFilePath, csv);

    console.log("Data converted to CSV format and saved to data.csv");

    return true;
  });

  //update patient data
  ipcMain.handle("update-patient", (e,data) => {
    console.log(data)
    const filePath = path.join(__dirname, "data.json");
    let existingData = [];
    try {
      const fileData = fs.readFileSync(filePath, {
        encoding: "utf8",
      });
      existingData = JSON.parse(fileData);
    } catch (error) {
      console.log("No existing data found in file");
    }
    existingData[data.index] = data.formData;

    const jsonString = JSON.stringify(existingData, null, 2);
    fs.writeFileSync(filePath, jsonString);
    return data.index;
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

exports.BrowserWindow = BrowserWindow;
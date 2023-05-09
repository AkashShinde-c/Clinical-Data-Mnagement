// import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
// import fs from 'fs';

// Create a new PDF document
const pdfDoc = await PDFDocument.create();

// Set the font for the header text
const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

// Add a new page to the PDF document
const page = pdfDoc.addPage();

// Set the page size and margins
const { width, height } = page.getSize();
const margin = 50;

// Draw a horizontal line below the header
page.drawLine({
  start: { x: margin, y: height - margin - 10 },
  end: { x: width - margin, y: height - margin - 10 },
  color: rgb(0.5, 0.5, 0.5),
  thickness: 1,
});

// Add the header text to the page
const headerText = 'Sai Clinic';
const textSize = font.sizeOfTextAt(headerText, 72);
page.drawText(headerText, {
  x: (width - textSize.width) / 2,
  y: height - margin - 20,
  font,
  size: 24,
});

// Add the doctor name to the page
const doctorName = 'Dr. John Doe';
page.drawText(doctorName, {
  x: width - margin - font.sizeOfTextAt(doctorName, 12).width,
  y: height - margin - 20,
  font,
  size: 12,
});

// Save the PDF document to a file
const pdfBytes = await pdfDoc.save();
fs.writeFileSync('path/to/folder/report.pdf', pdfBytes);

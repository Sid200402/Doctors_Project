import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

const ITEMS_PER_PAGE = 10; // Maximum number of rows per page

export interface PrescriptionPdfData {
  patientName: string;
  serialNumber: string;
  dob: string;
  age: string;
  date: string;
  gender: string;
  doctorName: string;
  doctorSpecialization: string;
  doctorId: string;
  clinicName: string;
  clinicPhone: string;
  clinicEmail: string;
  clinicWebsite: string;
  clinicAddress: string;
  medicines: {
    disease: string;
    medicine: string;
    dosage: string;
    frequency: string;
    duration: string;
    note: string;
  }[];
}

export const generatePrescriptionPdf = (data: PrescriptionPdfData, outputPath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 40,
      });

      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }


      const writeStream = fs.createWriteStream(outputPath);
      doc.pipe(writeStream);

      let currentPage = 1;
      let medicineIndex = 0;

      const renderPage = () => {
        // Header
        doc
          .fontSize(20)
          .text(data.doctorName.toUpperCase(), { align: 'center' })
          .fontSize(12)
          .text(data.doctorSpecialization, { align: 'center' })
          .text(`ID No. ${data.doctorId}`, { align: 'center' })
          .moveDown(1);

        // Patient 
        doc
          .fontSize(14)
          .text(`Patient's Name: ${data.patientName}`, 40, 130)
          .text(`S. No.: ${data.serialNumber}`, 400, 130)
          .moveDown(0.2)
          .text(`Date of Birth: ${data.dob}`, 40, 150)
          .text(`Age: ${data.age}`, 400, 150)
          .moveDown(0.2)
          .text(`Date: ${data.date}`, 40, 170)
          .text(`Gender: ${data.gender}`, 400, 170)
          .moveDown(0.5);

        // Line Separator
        doc
          .moveTo(40, 190)
          .lineTo(550, 190)
          .strokeColor('#CCCCCC')
          .stroke()
          .moveDown(1);

        // Table Headers
        doc
          .fontSize(14)
          .font('Helvetica-Bold')
          .text('Diseases', 40, 210, { width: 150 })
          .text('Medicine Details', 210, 210, { width: 200 })
          .text('Notes', 420, 210, { width: 100 });

        // Line under headers
        doc
          .moveTo(40, 230)
          .lineTo(550, 230)
          .strokeColor('#CCCCCC')
          .stroke()
          .moveDown(0.5);

        // Render Rows for the Current Page
        let y = 240;
        for (let i = 0; i < ITEMS_PER_PAGE; i++) {
          if (medicineIndex >= data.medicines.length) break;

          const item = data.medicines[medicineIndex];

          doc
            .font('Helvetica')
            .fontSize(12)
            .text(item.disease, 40, y, { width: 150 })
            .text(
              `${item.medicine} (${item.dosage})\n${item.frequency} - ${item.duration}`,
              210,
              y,
              { width: 200 }
            )
            .text(item.note, 420, y, { width: 100 });

          y += 40;
          medicineIndex++;
        }

        // Footer always at the bottom
        const pageHeight = 842;
        const footerYPosition = pageHeight - 100;

        doc
          .moveTo(40, footerYPosition - 10)
          .lineTo(550, footerYPosition - 10)
          .strokeColor('#CCCCCC')
          .stroke();

        doc
          .fontSize(12)
          .text("Doctor's Signature:", 400, footerYPosition + 10, { align: 'right' })
          .moveDown(2)
          .font('Helvetica-Bold')
          .text(data.clinicName, 40, footerYPosition + 40, { align: 'center' })
          .font('Helvetica')
          .text(`Phone: ${data.clinicPhone}`, { align: 'center' })
          .text(`Email: ${data.clinicEmail}`, { align: 'center' })
          .text(`Website: ${data.clinicWebsite}`, { align: 'center' })
          .text(`Address: ${data.clinicAddress}`, { align: 'center' });

        // Pagination (if there are more pages)
        if (medicineIndex < data.medicines.length) {
          doc.addPage();
          currentPage++;
          renderPage();
        }
      };

      // Render the first page
      renderPage();

      // Finalize the PDF and end the stream
      doc.end();

      writeStream.on('finish', () => {
        resolve(outputPath);
      });

      writeStream.on('error', (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

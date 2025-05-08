import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';
import { Patient } from '../patient/entities/patient.entity';
import { MedicalHistory } from '../medical-history/entities/medical-history.entity';
import { Visit } from '../visit/entities/visit.entity';
import { Prescription } from '../prescription/entities/prescription.entity';


export interface PatientSummaryData {
  patient: Patient;
  medicalHistories: MedicalHistory[];
  recentVisits: Visit[];
  recentPrescriptions: Prescription[];
  allergies: string;
  chronicConditions: string;
}

export const generatePatientSummaryPdf = (data: PatientSummaryData, outputPath: string): Promise<string> => {
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

      // Header
      doc
        .fontSize(20)
        .text('PATIENT MEDICAL SUMMARY', { align: 'center' })
        .moveDown(1);

      // Patient
      doc
        .fontSize(16)
        .text('Patient Information', { underline: true })
        .moveDown(0.5);

      doc
        .fontSize(12)
        .text(`Name: ${data.patient.patientname || 'N/A'}`)
        .text(`Age: ${data.patient.age || 'N/A'}`)
        .text(`Gender: ${data.patient.gender || 'N/A'}`)
        .text(`Blood Group: ${data.patient.bloodGroup || 'N/A'}`)
        .text(`Contact: ${data.patient.callNumber || 'N/A'}`)
        .text(`Email: ${data.patient.id || 'N/A'}`)
        .text(`Address: ${data.patient.address || 'N/A'}`)
        .moveDown(1);

      // Allergies
      doc
        .fontSize(16)
        .text('Allergies', { underline: true })
        .moveDown(0.5);

      if (data.allergies && data.allergies.length > 0) {
        doc.fontSize(12).text(`• ${data.allergies}`);
      } else {
        doc.fontSize(12).text('No known allergies');
      }
      doc.moveDown(1);

      // Chronic Conditions
      doc
        .fontSize(16)
        .text('Chronic Conditions', { underline: true })
        .moveDown(0.5);

      if (data.chronicConditions && data.chronicConditions.length > 0) {
        doc.fontSize(12).text(`• ${data.chronicConditions}`);
      } else {
        doc.fontSize(12).text('No chronic conditions recorded');
      }
      doc.moveDown(1);


      // History
      doc
        .fontSize(16)
        .text('Medical History', { underline: true })
        .moveDown(0.5);

      if (data.medicalHistories && data.medicalHistories.length > 0) {
        data.medicalHistories.forEach(history => {
          doc
            .fontSize(12)
            .text(`${history.historyType}: ${history.condition}`)
            .text(`Date: ${history.diagnosisDate ? new Date(history.diagnosisDate).toLocaleDateString() : 'N/A'}`)
            .text(`Treatment: ${history.treatmentDetails || 'N/A'}`)
            .text(`Notes: ${history.notes || 'N/A'}`)
            .moveDown(0.5);
        });
      } else {
        doc.fontSize(12).text('No medical history recorded');
      }
      doc.moveDown(1);

      // Visits
      doc
        .fontSize(16)
        .text('Recent Visits', { underline: true })
        .moveDown(0.5);

      if (data.recentVisits && data.recentVisits.length > 0) {
        data.recentVisits.forEach(visit => {
          doc
            .fontSize(12)
            .text(`Date: ${new Date(visit.visitDateTime).toLocaleDateString()}`)
            .text(`Doctor: ${visit.doctor ? visit.doctor.name : 'N/A'}`)
            .text(`Reason: ${visit.reasonForVisit}`)
            .text(`Notes: ${visit.notes || 'N/A'}`)
            .moveDown(0.5);
        });
      } else {
        doc.fontSize(12).text('No recent visits recorded');
      }
      doc.moveDown(1);

      //  Prescriptions
      doc
        .fontSize(16)
        .text('Recent Prescriptions', { underline: true })
        .moveDown(0.5);

      if (data.recentPrescriptions && data.recentPrescriptions.length > 0) {
        data.recentPrescriptions.forEach(prescription => {
          doc
            .fontSize(12)
            .text(`Date: ${new Date(prescription.prescriptionDate).toLocaleDateString()}`)
            .text(`Doctor: ${prescription.doctor ? prescription.doctor.name : 'N/A'}`);

          if (prescription.prescribedMedicines && prescription.prescribedMedicines.length > 0) {
            doc.text('Medicines:');
            prescription.prescribedMedicines.forEach(med => {
              const medicineName = med.medicine ? med.medicine.name : 'Unknown Medicine';
              doc.text(`  • ${medicineName} - ${med.dosage}, ${med.frequency}, ${med.duration}`);
            });
          }

          doc.text(`Notes: ${prescription.notes || 'N/A'}`).moveDown(0.5);
        });
      } else {
        doc.fontSize(12).text('No recent prescriptions recorded');
      }

      // Footer
      const pageHeight = 842;
      const footerYPosition = pageHeight - 50;

      doc
        .fontSize(10)
        .text(
          `This report was generated on ${new Date().toLocaleDateString()} and is for informational purposes only.`,
          40,
          footerYPosition,
          { align: 'center' }
        );

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

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // In a real application, you would get these from environment variables
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.example.com',
      // port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER || 'user@example.com',
        pass: process.env.EMAIL_PASSWORD || 'password',
      },
    });
  }

  async sendPrescriptionEmail(
    to: string,
    subject: string,
    message: string,
    pdfPath: string,
  ): Promise<boolean> {
    try {
      // Get the absolute path
      const absolutePath = path.join(process.cwd(), pdfPath);

      // Check if file exists
      if (!fs.existsSync(absolutePath)) {
        throw new Error(`PDF file not found at ${absolutePath}`);
      }

      // Send email
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Medical Clinic" <clinic@example.com>',
        to,
        subject,
        text: message,
        html: `<p>${message}</p>`,
        attachments: [
          {
            filename: 'prescription.pdf',
            path: absolutePath,
            contentType: 'application/pdf',
          },
        ],
      });

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}

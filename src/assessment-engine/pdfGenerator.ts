import jsPDF from 'jspdf';
import { ComprehensiveAssessmentReport } from '../types/assessment';

/**
 * Client-Side PDF and Report Generator
 * Generates an official, unbranded, highly legible clinical screening summary.
 * 100% in-browser generation with zero server transmission.
 */

export function generateAssessmentPDF(report: ComprehensiveAssessmentReport): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(margin, y, contentWidth, 18, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('MINDPULSE CLINICAL SCREENING SUMMARY', margin + 6, y + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Client-Side Screening Report', pageWidth - margin - 50, y + 11);

  y += 26;

  // Metadata Box
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('REPORT DETAILS', margin, y);
  y += 5;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFont('helvetica', 'normal');
  doc.text(`Assessment Date: ${new Date(report.timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })}`, margin, y);

  const categoryDisplay = report.completedCategories.toUpperCase();
  doc.text(`Scope: ${categoryDisplay} ASSESSMENT`, margin + 95, y);
  y += 6;

  doc.text(`Age Group: ${report.demographics.ageGroup || 'Not specified'}`, margin, y);
  doc.text(`Country: ${report.demographics.country || 'Not specified'}`, margin + 95, y);
  y += 8;

  // Safety Flag Alert (if applicable)
  if (report.safetyFlags.isHighRisk) {
    doc.setFillColor(254, 242, 242); // red-50
    doc.setDrawColor(239, 68, 68); // red-500
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'FD');

    doc.setTextColor(185, 28, 28); // red-700
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SAFETY PRIORITY ALERT NOTED', margin + 6, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const safetyText = doc.splitTextToSize(
      'User indicated safety concerns or suicidal distress. While standardized instruments yield numerical screening scores, positive safety responses indicate need for immediate clinical care and emergency support.',
      contentWidth - 12
    );
    doc.text(safetyText, margin + 6, y + 12);
    y += 24;
  }

  // Instrument Results
  const resultEntries = Object.entries(report.results);

  resultEntries.forEach(([_cat, item]) => {
    if (!item) return;

    if (y > 230) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, contentWidth, 34, 2, 2, 'FD');

    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`${item.instrumentName.toUpperCase()}`, margin + 6, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Version: ${item.instrumentVersion}`, margin + 6, y + 13);

    // Score & Severity
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`Score: ${item.score} / ${item.maxScore}`, margin + 6, y + 21);

    doc.setTextColor(30, 41, 59);
    doc.text(`Severity Classification: ${item.severityLabel}`, margin + 50, y + 21);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    const clinicalMeaning = doc.splitTextToSize(item.clinicalMeaning, contentWidth - 12);
    doc.text(clinicalMeaning, margin + 6, y + 27);

    y += 38;

    // Reported Symptoms
    if (item.symptomSummary && item.symptomSummary.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('Key Reported Indicators:', margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);

      item.symptomSummary.forEach((symptom) => {
        doc.text(`- ${symptom}`, margin + 4, y);
        y += 4.5;
      });
      y += 3;
    }

    // Recommendations preview
    if (item.recommendations?.today?.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text('Immediate Recommended Actions (Today):', margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);

      item.recommendations.today.slice(0, 3).forEach((rec) => {
        const lines = doc.splitTextToSize(`* ${rec}`, contentWidth - 8);
        doc.text(lines, margin + 4, y);
        y += lines.length * 4.2;
      });
      y += 3;
    }

    // When to seek help
    if (item.recommendations?.whenToSeekProfessionalHelp?.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(185, 28, 28);
      doc.text('Clinical Thresholds for Seeking Professional Healthcare:', margin, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(51, 65, 85);

      item.recommendations.whenToSeekProfessionalHelp.forEach((criteria) => {
        const lines = doc.splitTextToSize(`* ${criteria}`, contentWidth - 8);
        doc.text(lines, margin + 4, y);
        y += lines.length * 4.2;
      });
      y += 5;
    }
  });

  // Footer Disclaimer
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  y = Math.max(y + 4, 255);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('MANDATORY CLINICAL DISCLAIMER & PRIVACY NOTICE', margin, y);
  y += 4;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  const disclaimer = doc.splitTextToSize(
    'This report was generated completely inside your web browser. MindPulse does not store or transmit your responses to any external server or artificial intelligence service. This assessment provides screening and educational information only. It is NOT a diagnostic medical device and does NOT constitute a medical or psychiatric diagnosis. If you are experiencing distress, please share this document with a qualified healthcare professional.',
    contentWidth
  );
  doc.text(disclaimer, margin, y);

  // Save the PDF
  const filename = `MindPulse_Assessment_${report.completedCategories}_${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

export function exportReportAsJSON(report: ComprehensiveAssessmentReport): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `MindPulse_Report_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

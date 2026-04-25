#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle,
} = require("docx");

const MONO = "Courier New";
const BODY = "Arial";

function code(text) {
  return new TextRun({ text, font: MONO, size: 20, color: "444444" });
}

function bullet(children) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    children,
  });
}

function link(label, url) {
  return new ExternalHyperlink({
    link: url,
    children: [new TextRun({ text: label, style: "Hyperlink", font: BODY, size: 22 })],
  });
}

function note(text) {
  return new Paragraph({
    children: [new TextRun({ text, font: BODY, size: 20, italics: true, color: "555555" })],
    spacing: { before: 80, after: 80 },
    indent: { left: 720 },
  });
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: BODY, size: 22 } },
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: BODY, color: "1F3864" },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0 },
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: BODY, color: "2E5DA6" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 },
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: BODY, color: "333333" },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 },
      },
    ],
  },
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } },
        }],
      },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
      },
    },
    children: [
      // Title
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "Taller Avanzado \u2014 Instrucciones de configuraci\u00F3n", font: BODY, size: 40, bold: true, color: "1F3864" })],
        spacing: { before: 0, after: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "2E5DA6", space: 6 } },
      }),

      // ── Requisitos previos ──────────────────────────────────────────────
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Requisitos previos")] }),
      new Paragraph({
        children: [new TextRun({ text: "Necesitas tener instalado uno de los siguientes:", font: BODY, size: 22 })],
        spacing: { before: 80, after: 80 },
      }),
      bullet([new TextRun({ text: "Node.js (recomendado): ", font: BODY, size: 22, bold: true }), link("https://nodejs.org", "https://nodejs.org")]),
      bullet([new TextRun({ text: "Python 3: ", font: BODY, size: 22, bold: true }), link("https://www.python.org/downloads", "https://www.python.org/downloads")]),

      // ── Ejecución ───────────────────────────────────────────────────────
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun("Ejecuci\u00F3n")], spacing: { before: 320, after: 120 } }),

      // Step 1
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Paso 1 \u2014 Clona el repositorio")] }),
      new Paragraph({ children: [code("git clone https://github.com/Todd-Workshop-Org/Taller-Avanzado-Seed.git")], spacing: { before: 80, after: 160 } }),

      // Step 2
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Paso 2 \u2014 Entra al directorio")] }),
      new Paragraph({ children: [code("cd Taller-Avanzado-Seed")], spacing: { before: 80, after: 160 } }),

      // Step 3
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Paso 3 \u2014 Ejecuta el script")] }),
      new Paragraph({ children: [new TextRun({ text: "Con Node.js:", font: BODY, size: 22, bold: true })], spacing: { before: 80, after: 40 } }),
      new Paragraph({ children: [code("node scripts/import-entities.js")], spacing: { before: 0, after: 120 } }),
      new Paragraph({ children: [new TextRun({ text: "Con Python 3:", font: BODY, size: 22, bold: true })], spacing: { before: 80, after: 40 } }),
      new Paragraph({ children: [code("python3 scripts/import-entities.py")], spacing: { before: 0, after: 120 } }),
      note("\u26A0\uFE0F  Nota para Windows con Python: puede que necesites usar \u201Cpython\u201D en lugar de \u201Cpython3\u201D."),

      // Step 4
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun("Paso 4 \u2014 Ingresa tus credenciales")], spacing: { before: 180, after: 80 } }),
      new Paragraph({
        children: [new TextRun({ text: "Si no existen variables de entorno, el script pedir\u00E1 credenciales de forma interactiva:", font: BODY, size: 22 })],
        spacing: { before: 80, after: 80 },
      }),
      bullet([code("PORT_CLIENT_ID")]),
      bullet([code("PORT_CLIENT_SECRET")]),
      new Paragraph({
        children: [
          new TextRun({ text: "Puedes encontrarlas en ", font: BODY, size: 22 }),
          new TextRun({ text: "Settings \u2192 Credentials", font: BODY, size: 22, bold: true }),
          new TextRun({ text: " dentro de tu organizaci\u00F3n en Port.", font: BODY, size: 22 }),
        ],
        spacing: { before: 120, after: 80 },
      }),
      new Paragraph({ children: [new TextRun({ text: "Opcional:", font: BODY, size: 22, bold: true })], spacing: { before: 120, after: 40 } }),
      bullet([code("PORT_BASE_URL"), new TextRun({ text: "  (valor por defecto: https://api.getport.io)", font: BODY, size: 22, color: "555555" })]),
    ],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  const out = path.join(__dirname, "..", "instrucciones.docx");
  fs.writeFileSync(out, buf);
  console.log("Created:", out);
});

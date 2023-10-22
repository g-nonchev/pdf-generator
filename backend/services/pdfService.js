const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
// interface Certificate {
//     name: string
//     subject: string;
//     level: string;
//     duration: number;
//     teacher: string;
// }

function formatDateToDDMMYYYY (inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

function generatePDF (data) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });

        // Create a unique filename using a timestamp
        const filePath = path.join(__dirname, '..', '..', 'downloads', `${data.regNumber}.pdf`);
        const fontAlger = path.join(__dirname, '..', 'fonts', 'ALGER.TTF');
        const backgroundImage = data.isKid ? path.join(__dirname, '..', 'img', 'backgr-kid.png') : path.join(__dirname, '..', 'img', 'backgr.png');

        doc.registerFont('fontAlger', fontAlger);

        // Ensure the 'downloads' directory exists
        if (!fs.existsSync(path.dirname(filePath))) {
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
        }

        const stream = fs.createWriteStream(filePath);

        stream.on('error', (err) => {
            reject(err);
        });

        stream.on('close', () => {
            resolve(filePath);
        });

        doc.pipe(stream);

        // Assuming 'backgr_en.svg' is located at the root of your project

        if (!fs.existsSync(backgroundImage)) {
            reject(new Error("Background image not found."));
            return;
        }

        doc.image(backgroundImage, 0, 0, {
            fit: [doc.page.width, doc.page.height],
            align: 'center',
            valign: 'center'
        });

        switch (data.subject) {
            case 'Spanish': {
                data.content = {
                    title: {
                        text: 'Certificado',
                        fontSize: 36,
                        down: 1
                    },
                    subtitle: 'Número de registro:',
                    duration: 'Ha realizado con éxito el curso de',
                    duration2: `${data.duration} horas`,
                    dates: `del ${formatDateToDDMMYYYY(data.fromDate)} al ${formatDateToDDMMYYYY(data.toDate)}`,
                    subject: `Lengua Española`,
                    level: `Nivel ${data.level}`,
                    frame: 'Según el Marco Común Europeo de Referencia para las Lenguas',
                    date: 'Fecha: ',
                    teacher: 'Profesor: '
                }
            } break;
            case 'Deutsch': {
                data.content = {
                    title: {
                        text: 'Teilnahmezertifikat',
                        fontSize: 30,
                        down: 1.4
                    },
                    subtitle: 'Nummer der Registrierung:',
                    duration: 'für erfolgreich abgeschlossenen Sprachkurs mit',
                    duration2: `${data.duration} Unterrichtsstunden`,
                    dates: `von ${formatDateToDDMMYYYY(data.fromDate)} bis zum ${formatDateToDDMMYYYY(data.toDate)}`,
                    subject: 'DEUTSCH',
                    level: `Niveaustufe ${data.level}`,
                    frame: 'nach dem gemeinsamen Europäischen Referenzrahmen',
                    date: 'Datum: ',
                    teacher: 'Lehrer: '
                }
            } break;
            case 'French': {
                data.content = {
                    title: {
                        text: 'Certificat',
                        fontSize: 36,
                        down: 1
                    },
                    subtitle: 'N° de registre:',
                    duration: 'a réussi un cours de',
                    duration2: `${data.duration} heures`,
                    dates: `du ${formatDateToDDMMYYYY(data.fromDate)} au ${formatDateToDDMMYYYY(data.toDate)}`,
                    subject: 'Français',
                    level: `Niveau ${data.level}`,
                    frame: 'Pour la référence européenne des langues',
                    date: 'Date: ',
                    teacher: 'Enseignant: '
                }
            } break;
            default: {
                data.content = {
                    title: {
                        text: 'Certificate',
                        fontSize: 36,
                        down: 1
                    },
                    subtitle: 'Registration number:',
                    duration: 'of successful completion of a course of',
                    duration2: `${data.duration} hours`,
                    dates: `from ${formatDateToDDMMYYYY(data.fromDate)} to ${formatDateToDDMMYYYY(data.toDate)} in`,
                    subject: `Language ENGLISH`,
                    level: `Level ${data.level}`,
                    frame: 'According to the European Language Reference Framework',
                    date: 'Date: ',
                    teacher: 'Teacher: '
                }
            }
        }


        doc.font('fontAlger').fontSize(data.content.title.fontSize).moveDown(data.content.title.down).text(data.content.title.text, { align: 'center' });
        doc.font('Times-Bold').fontSize(18).moveDown(2).text(data.content.subtitle + ' ' + data.regNumber, { align: 'center' });
        doc.font('Times-Bold').fontSize(24).moveDown(1).text(data.name, { align: 'center' });
        doc.font('Times-Bold').fontSize(12).moveDown(0.2).text(data.content.duration, { align: 'center' });
        doc.font('Times-Bold').fontSize(12).text(data.content.duration2, { align: 'center' });
        doc.font('Times-Bold').fontSize(12).text(data.content.dates, { align: 'center' });
        doc.font('Times-Bold').fontSize(24).moveDown(1).text(data.content.subject, { align: 'center' });
        doc.font('Times-Bold').fontSize(24).moveDown(0.2).text(data.content.level, { align: 'center' });
        doc.font('Times-Bold').fontSize(12).moveDown(0.8).text(data.content.frame, { align: 'center' });
        doc.font('Times-Roman').fontSize(12).moveDown(2).text(data.teacher, 300, 468);
        doc.font('Times-Bold').fontSize(12).moveDown(1).text(data.content.teacher, 300, 485);
        doc.font('Times-Roman').fontSize(12).moveDown(1).text(formatDateToDDMMYYYY(data.toDate), 100, 468);
        doc.font('Times-Bold').fontSize(12).moveDown(1).text(data.content.date, 100, 485);

        const rightEdge = 740;
        let textWidth = doc.font('fontAlger').fontSize(18).widthOfString("HOME");
        doc.text("HOME", rightEdge - textWidth, 95);

        // For "Language centre"
        textWidth = doc.font('Times-Bold').fontSize(10).widthOfString("Language centre");
        doc.text("Language centre", rightEdge - textWidth, 115);

        // For "ezikovdom.com"
        textWidth = doc.font('Times-Bold').fontSize(10).widthOfString("ezikovdom.com");
        doc.text("ezikovdom.com", rightEdge - textWidth, 135);

        // For "(+359).885.786.317"
        textWidth = doc.font('Times-Bold').fontSize(10).widthOfString("(+359).885.786.317");
        doc.text("(+359).885.786.317", rightEdge - textWidth, 150);

        doc.end();
    });
}

module.exports = {
    generatePDF
};

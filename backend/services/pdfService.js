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
        const timesRoman = path.join(__dirname, '..', 'fonts', 'times.ttf');
        const timesBold = path.join(__dirname, '..', 'fonts', 'times.ttf');
        const georgia = path.join(__dirname, '..', 'fonts', 'georgia.ttf');
        const georgiaB = path.join(__dirname, '..', 'fonts', 'georgiab.ttf');
        const backgroundImage = data.isKid ? path.join(__dirname, '..', 'img', 'backgr-kid.png') : path.join(__dirname, '..', 'img', 'backgr.png');

        doc.registerFont('fontAlger', fontAlger);
        doc.registerFont('Times-Roman', timesRoman);
        doc.registerFont('Times-Bold', timesBold);
        doc.registerFont('Georgia', georgia);
        doc.registerFont('Georgia-B', georgiaB);

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
                        font: 'fontAlger',
                        text: 'Certificado',
                        fontSize: 38,
                        down: 0.8
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
                        font: 'fontAlger',
                        text: 'Teilnahmezertifikat',
                        fontSize: 30,
                        down: 1.3
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
                        font: 'fontAlger',
                        text: 'Certificat',
                        fontSize: 38,
                        down: 0.8
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
            case 'Italian': {
                data.content = {
                    title: {
                        font: 'fontAlger',
                        text: 'Attestato',
                        fontSize: 38,
                        down: 0.8
                    },
                    subtitle: 'Registrazione:',
                    duration: 'ha completato il corso di',
                    duration2: `${data.duration} ore`,
                    dates: `dal ${formatDateToDDMMYYYY(data.fromDate)} al ${formatDateToDDMMYYYY(data.toDate)}`,
                    subject: 'Lingua ITALIANA',
                    level: `Livello ${data.level}`,
                    frame: 'In accordanza con il Quadro Comune Europeo',
                    date: 'Data: ',
                    teacher: 'Insegnante: '
                }
            } break;
            case 'Български': {
                data.content = {
                    title: {
                        font: 'Georgia-B',
                        text: 'СЕРТИФИКАТ',
                        fontSize: 36,
                        down: 1.2
                    },
                    subtitle: 'Регитрационен №:',
                    duration: 'за успешно покриване на езиков курс ',
                    duration2: `${data.duration} уч. ч.`,
                    dates: `от ${formatDateToDDMMYYYY(data.fromDate)} до ${formatDateToDDMMYYYY(data.toDate)}`,
                    subject: 'БЪЛГАРСКИ език',
                    level: `Ниво ${data.level}`,
                    frame: 'в съответствие с Европейска Езикова Рамка',
                    date: 'Дата: ',
                    teacher: 'Преподавател: '
                }
            } break;
            case 'Русский': {
                data.content = {
                    title: {
                        font: 'Georgia-B',
                        text: 'СЕРТИФИКАТ',
                        fontSize: 36,
                        down: 1.2
                    },
                    subtitle: 'Регистрационный номер:',
                    duration: 'успешно прослушал(а) ',
                    duration2: `${data.duration} часов`,
                    dates: `от ${formatDateToDDMMYYYY(data.fromDate)} до ${formatDateToDDMMYYYY(data.toDate)}`,
                    subject: 'Русский язык',
                    level: `Ниво ${data.level}`,
                    frame: 'в соответствии с Общеевропейской компетенцией владения иностранным языком',
                    date: 'Дата выдачи:',
                    teacher: 'Преподаватель: '
                }
            } break;
            default: {
                data.content = {
                    title: {
                        font: 'fontAlger',
                        text: 'Certificate',
                        fontSize: 38,
                        down: 0.8
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


        doc.font(data.content.title.font).fontSize(data.content.title.fontSize).moveDown(data.content.title.down).text(data.content.title.text, { align: 'center' });
        doc.font('Georgia').fontSize(18).moveDown(2).text(data.content.subtitle + ' ' + data.regNumber, { align: 'center' });
        doc.font('Georgia-B').fontSize(24).moveDown(1).text(data.name, { align: 'center' });
        doc.font('Georgia').fontSize(12).moveDown(0.2).text(data.content.duration, { align: 'center' });
        doc.font('Georgia').fontSize(12).text(data.content.duration2, { align: 'center' });
        doc.font('Georgia').fontSize(12).text(data.content.dates, { align: 'center' });
        doc.font('Georgia-B').fontSize(18).moveDown(1).text(data.content.subject, { align: 'center' });
        doc.font('Georgia-B').fontSize(18).moveDown(0.2).text(data.content.level, { align: 'center' });
        doc.font('Georgia').fontSize(12).moveDown(0.8).text(data.content.frame, { align: 'center' });
        doc.font('Georgia').fontSize(12).moveDown(2).text(data.teacher, 300, 465);
        doc.font('Georgia-B').fontSize(10).moveDown(1).text(data.content.teacher, 300, 482);
        doc.font('Georgia').fontSize(12).moveDown(1).text(formatDateToDDMMYYYY(data.toDate), 100, 465);
        doc.font('Georgia-B').fontSize(10).moveDown(1).text(data.content.date, 100, 482);

        const rightEdge = 740;
        let textWidth = doc.font('fontAlger').fontSize(18).widthOfString("HOME");
        doc.text("HOME", rightEdge - textWidth, 95);

        // For "Language centre"
        textWidth = doc.font('Georgia').fontSize(10).widthOfString("language centre");
        doc.text("language centre", rightEdge - textWidth, 115);

        // For "ezikovdom.com"
        textWidth = doc.font('Georgia').fontSize(10).widthOfString("ezikovdom.com");
        doc.text("ezikovdom.com", rightEdge - textWidth, 135);

        // For "(+359).885.786.317"
        textWidth = doc.font('Times-Bold').fontSize(10).widthOfString("(+359).885.786.317");
        doc.text("(+359).885.786.317", rightEdge - textWidth, 155);

        doc.end();
    });
}

module.exports = {
    generatePDF
};

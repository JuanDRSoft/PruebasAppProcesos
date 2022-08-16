const nodemailer = require('nodemailer');
const { template } = require('../html/template');

const sendEmail = async (emailTo, requestAccion, requestProceso) => {
  const { llaveProceso, fechaProceso } = requestProceso;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lawservices001',
      pass: 'hqlxhnfyizjlguqw'
    }
  });

  const mailOptions = {
    from: 'lawservices001@gmail.com',
    to: emailTo,
    subject: `Informe Procesos Solutio ${llaveProceso}  ${fechaProceso}`,
    html: template(requestProceso, requestAccion)
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
  sendEmail
};

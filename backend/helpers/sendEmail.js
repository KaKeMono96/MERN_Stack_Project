const nodemailer = require("nodemailer");
const ejs = require('ejs');

let sendEmail = ({view,data,from,to,subject}) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "82aef9e7ccada5",
          pass: "4b444da315a9b3"
        }
      });

      ejs.renderFile('./views/'+view+'.ejs',data,async(err,dataString) => {

          const info = await transport.sendMail({
            from, 
            to, 
            subject, 
            html: dataString, 
            });
    
      console.log("Message sent: %s", info.messageId);
     
      })
}


module.exports =sendEmail;
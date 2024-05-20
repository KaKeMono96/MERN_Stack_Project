const nodemailer = require("nodemailer");
const ejs = require('ejs');

let sendEmail = async({view,data,from,to,subject}) => {
    try {
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "82aef9e7ccada5",
          pass: "4b444da315a9b3"
        }
      });

      let dataString = await ejs.renderFile('./views/'+view+'.ejs',data);
      const info = await transport.sendMail({
        from, 
        to, 
        subject, 
        html: dataString, 
        });

        console.log("Message sent: %s", info.messageId);

    }catch(e) {
      throw new Error(e);

    }

          
     
      
}


module.exports =sendEmail;
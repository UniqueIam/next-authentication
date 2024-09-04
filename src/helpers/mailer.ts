import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email,emailType,userId}:any)=>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString,10)
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {verifyToken:hashedToken,verifyTokenExpiray:Date.now()+3600000}
            )
        }else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,
                {forgotPasswordToken:hashedToken,forgotPasswordTokenExpiray:Date.now()+3600000}
            )
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ea39f2c2a3e905",
              pass: "8630267ea1ef32"
            }
          });

        const mailOptions = {
            from: 'abhi@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY'? "Verify Your Email":"Reset Your Password", // Subject line
            // text: "Hello world?", // plain text body
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
                    ${emailType === "VERIFY" ?"verify your email":"reset your password"}
                    or copy and paste the link below in the browser.
                    <br>${process.env.DOMAIN}/verifiemail?token=${hashedToken}
                    </p>`, // html body
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}
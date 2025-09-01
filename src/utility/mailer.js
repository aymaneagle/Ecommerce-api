import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || "93a79b001@smtp-brevo.com",
        pass: process.env.SMTP_PASS || "VhCfY5yTb36tnkRZ",
    },
    tls: {
        rejectUnauthorized: false, // avoid self-signed certificate issues
    }
});

transporter.verify((error,success) => {
    if (error) {
        console.log("SMTP CONNECTION ERROR: ", error);
    } else {
        console.log("SMTP SERVER CONNECTED SUCCESSFULLY!");
    }
})

export const sendOTPtoEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "OTP VERIFICATION for LifeStage Tools registration",
        html: `<p>${otp}</p>`,
    }
    try{
        await transporter.sendMail(mailOptions);
        return true;
    }catch(error){
        const err = new Error('Failed to send OTP');
        err.statusCode = 500;
        throw err;
    }
}


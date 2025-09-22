import nodemailer from "nodemailer";
import HttpResponse from "../utils/HttpResponse.js";
import { regex_validation } from "../utils/constants.js";

export const contactUs = async (req, res) => {
    try {
        const { full_name, email, message } = req.body;

        if (!full_name || !email || !message) {
            return HttpResponse.validation(res, "All fields are required.");
        }
        if (!regex_validation.full_name.test(full_name)) {
            return HttpResponse.validation(res, "Full name must contain only letters and spaces.");
        }
        if (!regex_validation.email.test(email)) {
            return HttpResponse.validation(res, "Please provide a valid email.");
        }
        if (!regex_validation.message.test(message)) {
            return HttpResponse.validation(res, "Message must contain only letters, numbers and spaces.");
        }

        // Create a test account or replace with real credentials.
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'baby.weber@ethereal.email',
                pass: 'TxP8G9mm3aG3SMvUhb'
            }
        });

        // Mail options
        const mailOptions = {
            from: `"${full_name}" <${email}>`,
            to: "mernecommerce@example.com",
            subject: `Contact Us - ${process.env.APP_NAME}`,
            html: `
            <div style="background-color:#f9fafb; padding:20px; font-family:Arial, sans-serif;">
                <div style="background-color:#2563eb; color:#ffffff; text-align:center; padding:15px; border-radius:8px 8px 0 0;">
                    <h1 style="font-size:20px; margin:0;">${process.env.APP_NAME}</h1>
                </div>
                <div style="background-color:#ffffff; padding:20px; border:1px solid #e5e7eb; border-radius:0 0 8px 8px;">
                    <p style="margin:0 0 15px 0; font-size:14px;">You have received a new message:</p>
                    <div style="border:1px solid #e5e7eb; border-radius:6px; padding:12px; margin-bottom:15px;">
                        <p style="margin:5px 0;">${message}</p>
                    </div>
                    <p style="color:#6b7280; font-size:12px; margin-top:10px;">
                        This email was sent from your website's Contact Us form.
                    </p>
                </div>
                <div style="text-align:center; margin-top:15px; font-size:11px; color:#6b7280;">
                <p style="margin:0;">&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}. All rights reserved.</p>
                </div>
            </div>
            `,
        };


        // Send mail
        const info = await transporter.sendMail(mailOptions);

        return HttpResponse.success(
            res,
            "Message sent successfully.",
            { previewURL: nodemailer.getTestMessageUrl(info) }, // You can open this link to see email
            200
        );
    } catch (error) {
        return HttpResponse.error(res, error.message, 422);
    }
}
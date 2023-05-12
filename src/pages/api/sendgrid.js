import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
  try {
    let {fullname, email, message, email_to} = req.body
    let resSendgrid = await sendgrid.send({
      to: email_to,
      from: "noodus.medhaus@xentraly.com",
      subject: `Alquiler - Medhaus`,
      html: `<div>
        <div style="
          height: 10vh;
          width: 20%;
        ">
          <img style=style="
            width: 100%;
            height: 100%;
            object-fit: cover;
          " src='https://i0.wp.com/medhaus.com.mx/wp-content/uploads/2022/09/cropped-IMG_5684.jpg?fit=927%2C927&ssl=1'/>
        </div>
        <p style=""><b>Contacto:</b> ${fullname}</p>
        <p style=""><b>Correo electronico:</b> ${email}</p>
        <p style=""><b>Mensaje:</b> ${message}</p>
      </div>`,
    });
    res.status(200).json(resSendgrid);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
}
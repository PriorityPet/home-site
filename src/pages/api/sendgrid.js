import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY);

export default async function sendEmail(req, res) {
  console.log("llego aqui");
  try {
    let {
      fullnameOwner,
      fullnameUser,
      serviceName,
      date,
      hour,
      localityAddress,
      email_to,
    } = req.body;

    let resSendgrid = await sendgrid.send({
      to: email_to,
      from: "prioritypet.tech@gmail.com",
      subject: `Reservación confirmada - Priority Pet`,
      html: `<div>
        <div style="
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4% 12%;
            background-color: #57419B;
            font-family: Arial, ui-sans-serif;
        ">
          <img src="http://proveedores.prioritypet.club/_next/image?url=%2Flogo-white.png&w=256&q=75" width="350px" />

        </div>
        <div style="
            padding: 4% 12%;
            position: relative;
            display: block;
            color: #1C2C51;
            font-style: normal;
            font-weight: 500;
            font-size: 20px;
            line-height: 30px;
        ">
            <p>Estimado ${fullnameOwner}</p>
            <p>Enhorabuena tu cita de ${serviceName} con ${fullnameUser} esta confirmada.</p>
            <p>
              Fecha: ${date}<br/>
              Hora: ${hour}<br/>
              Dirección: ${localityAddress}
            </p>
            <br/>
            <p>Atentamente, el equipo de Priority Pet.</p>
        </div>
      </div>`,
    });
    return res.json({ message: resSendgrid }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message }, { status: 500 });
  }
}

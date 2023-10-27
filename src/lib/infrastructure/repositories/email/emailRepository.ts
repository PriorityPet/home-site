import { EmailFailure, emailFailuresEnum } from "@/lib/domain/core/failures/email/emailFailure";
import { getFullDate } from "@/lib/utils/dates/datesHelper";

export default interface IEmailRepository {
    sendAppointmentEmail(obj: { owner: any; user: any; date: string; hour: string; serviceName: string; address: string }): Promise<boolean | EmailFailure>;
}

export class EmailRepository implements IEmailRepository {
  async sendAppointmentEmail(obj: { owner: any; user: any; date: string; hour: string; serviceName: string; address: string }): Promise<boolean | EmailFailure > {
    try {
      console.log(obj)
        const raw =  JSON.stringify({
          fullnameOwner: obj.owner.names,
          fullnameUser: `${obj.user.provider ? obj.user.provider.name : `${obj.user.names} ${obj.user.firstName}`}`,
          serviceName: obj.serviceName,
          date: obj.date,
          hour: obj.hour,
          localityAddress: obj.address,
          email_to: obj.owner.email,
        })

      const res = await fetch(`${window.location.origin}/api/sendgrid`, {
        method: "POST",
        body: raw,
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(res)

      return true;
    } catch (error) {
      const exception = error as any;
      return new EmailFailure(emailFailuresEnum.serverError);
    }
  }  
}
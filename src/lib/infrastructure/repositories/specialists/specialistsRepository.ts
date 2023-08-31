import { GET_SPECIALISTS_ENDPOINT } from '../../config/api/dictionary';
import nookies from 'nookies';
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';
import { SpecialistsFailure, specialistsFailuresEnum } from '@/lib/domain/core/failures/specialists/specialistsFailure';
import { supabase } from '../../config/supabase/supabase-client';
import { specialistDBToMap } from '@/lib/domain/mappers/specialist/specialistDBToMap';
import moment from 'moment';

export default interface ISpecialistsRepository {
    getSpecialists(): Promise<Array<Specialist> | SpecialistsFailure>;
    getSpecialist(id:number): Promise<Specialist | SpecialistsFailure>;
    getSpecialistLocalities(id:number): Promise<any[] | SpecialistsFailure>;
    getSpecialistServices(id:number, localityId?:number): Promise<any[] | SpecialistsFailure>;
    getAttentionWindowsByService(id:number, date?:string): Promise<any[] | SpecialistsFailure>;
    createAppointment(obj:any): Promise<any | SpecialistsFailure>;
}

export class SpecialistsRepository implements ISpecialistsRepository {
  async getSpecialists(): Promise<Array<Specialist> | SpecialistsFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');
  
      var myHeaders = new Headers();
  
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);
  
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;
  
      let URL = GET_SPECIALISTS_ENDPOINT as RequestInfo
  
      const response = await fetch(URL, requestOptions)
      let data = await response.json()
  
      console.log("GET_SPECIALISTS_ENDPOINT", data["data"])
  
      return data["data"] as Array<Specialist> ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  async getSpecialist(id:number): Promise<Specialist | SpecialistsFailure> {
    try {
      const response = await supabase.from("Doctores").select(`
        *,
        EspecialidadesDoctores (*,
          Especialidades(
            nombre
          )
        )
      `).eq("id", id).single();

      if(response.error)throw new SpecialistsFailure(response.statusText)

      if(response.data["EspecialidadesDoctores"].length > 0){
        response.data["EspecialidadesDoctores"] = response.data["EspecialidadesDoctores"].map((elem:any)=>({
          ...elem,
          nombre: elem["Especialidades"]["nombre"]
        }))
      }

      console.log("GET_SPECIALIST_ENDPOINT", response.data)
  
      return specialistDBToMap(response.data) ?? {} as Specialist;
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  async getSpecialistLocalities(id:number): Promise<any[] | SpecialistsFailure> {
    try {
      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      } as RequestInit;

      let URL = process.env.NEXT_PUBLIC_API_URL + `/doctor/${id}/location` as RequestInfo

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      console.log("GET_USER_LOCALITIES_ENDPOINT", data["data"])

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  async getSpecialistServices(id:number, localityId?:number): Promise<any[] | SpecialistsFailure> {
    try {
      const response = await supabase.from("ServiciosDoctores").select(`
        *,
        Servicios (*)
      `).eq("doctorId", id);

      if(response.error)throw new SpecialistsFailure(response.statusText)
      
      let data = response.data.map((elem:any)=> ({
        ...elem,
        ...elem["Servicios"]
      }) )

      if(localityId) {
        console.log(data)
        data = data.filter(elem => elem["Servicios"]["localidadId"] === localityId)
      }

      console.log("GET_SPECIALIST_SERVICES_ENDPOINT", data)
  
      return data ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  async getSpecialistServiceWindow(id:number): Promise<any[] | SpecialistsFailure> {
    try {
      const response = await supabase.from("ServiciosDoctores").select(`
        *,
        Servicios (*)
      `).eq("doctorId", id);

      if(response.error)throw new SpecialistsFailure(response.statusText)
      
      let data = response.data.map((elem:any)=> ({
        ...elem,
        ...elem["Servicios"]
      }) )

      console.log("GET_SPECIALIST_SERVICES_ENDPOINT", data)
  
      return data ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  async getAttentionWindowsByService(id:number, date?:string): Promise<any[] | SpecialistsFailure> {
    try {
      
        let queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
        .select(`*, VentanasAtencionBase(*)`).eq("servicioId", id)

        let resServiciosEnVentanasAtencion = await queryServiciosEnVentanasAtencion

        if(resServiciosEnVentanasAtencion.data?.length === 0) return []


        date = moment(date).format('YYYY-MM-DD')
        let dateEnd = moment(date, "YYYY-MM-DD").add(5, 'days').format('YYYY-MM-DD')

        let windowAttentionId = resServiciosEnVentanasAtencion.data![0]["ventanaAtencionBaseId"].toString()
            let queryVentanasAtencion = supabase.from("VentanasAtencion")
            .select(`*`).eq("ventanaAtencionBaseId", windowAttentionId)
            .filter('fechaInicio', 'gte', date)
            .filter('fechaFin', 'lte', dateEnd)

        let resVentanasAtencion = await queryVentanasAtencion
        
        if(resVentanasAtencion.data?.length === 0) return []

        let queryCitas = supabase.from("Citas").select(`*`)
        .in("ventanaAtencionId", resVentanasAtencion.data!.map((elem:any)=> elem["id"] ))

        let resCitas = await queryCitas

        if(resCitas.error) throw new SpecialistsFailure(specialistsFailuresEnum.serverError)

        let initialDate = moment(date, "YYYY-MM-DD")
        let finalDate = moment(dateEnd, "YYYY-MM-DD")
        let list = []

        do {
          list.push(initialDate.format("YYYY-MM-DD"))
          initialDate = initialDate.add(1, "days")
        } while (initialDate.isBefore(finalDate));

        list = list.map((elem:any)=>{
          let dateOfWindow = resCitas.data!.filter((w:any)=> elem === moment(w["fechaReserva"]).format("YYYY-MM-DD") )
          let object = dateOfWindow ? 
            {
              fechaInicio: moment(elem, "YYYY-MM-DD").toDate(),
              Citas: dateOfWindow
            }
          : {
            fechaInicio: moment(elem, "YYYY-MM-DD").toDate(),
            Citas: []
          }
          return object
        })

        if(list.every((elem:any)=> elem["Citas"].length === 0 )) return []
        
        return list ?? [];
    } catch (error) {
        const exception = error as any;
        return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  
  async createAppointment(obj:any): Promise<any | SpecialistsFailure> {
    try {

      let appointment = {
        sujetoId: obj["pacienteId"],
        doctorId: obj["doctorId"],
        servicioId: obj["servicioId"],
        estado: 2
      }

      let query = supabase.from("Citas")
      .update(appointment)
      .eq('id', obj["id"])
      
      let res = await query
      if(res.error) throw new SpecialistsFailure(specialistsFailuresEnum.serverError)

      const resRelation = await supabase.from("PermisosSujetos").insert({
        sujetoId: obj["pacienteId"],
        doctorId: obj["doctorId"]
      }).select();

      if (resRelation.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);

      return res.data ?? {};
    } catch (error) {
        const exception = error as any;
        return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
}
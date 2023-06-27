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
    getSpecialistServices(id:number): Promise<any[] | SpecialistsFailure>;
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
      `).eq("usuarioId", id).single();

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
      const response = await supabase.from("LocalidadesDoctores").select(`
        *,
        Localidades (*)
      `).eq("doctorId", id);

      if(response.error)throw new SpecialistsFailure(response.statusText)
      
      let data = response.data.map((elem:any)=> elem["Localidades"] )

      console.log("GET_SPECIALIST_LOCALITIES_ENDPOINT", data)
  
      return data ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  async getSpecialistServices(id:number): Promise<any[] | SpecialistsFailure> {
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
      
      date = moment(date).format('YYYY-MM-DD')
      let dateEnd = moment(date, "YYYY-MM-DD").add(5, 'days').format('YYYY-MM-DD')

      let queryToGetSlotsTypeAttentionWindows = supabase.from("VentanasAtencion").select(`
      *,
      Citas (*),
      Servicios (
        nombre
      )
      `).eq("servicioId", id).eq("tipo", 2).filter('fechaInicio', 'gte', date).filter('fechaFin', 'lte', dateEnd)

      let resSlotsTypeAttentionWindows = await queryToGetSlotsTypeAttentionWindows
      
      if(resSlotsTypeAttentionWindows.error) throw new SpecialistsFailure(specialistsFailuresEnum.serverError)

      let initialDate = moment(date, "YYYY-MM-DD")
      let finalDate = moment(dateEnd, "YYYY-MM-DD")
      let list = []

      do {
        list.push(initialDate.format("YYYY-MM-DD"))
        initialDate = initialDate.add(1, "days")
      } while (initialDate.isBefore(finalDate));
      
      list = list.map((elem:any)=>{
        let dateOfWindow = resSlotsTypeAttentionWindows.data!.find((w:any)=> elem === moment(w["fechaInicio"]).format("YYYY-MM-DD") )
        let object = dateOfWindow ?? {
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
          estado: 9
      }
      
      let query = supabase.from("Citas")

      .update(appointment)
      .eq('id', obj["id"])
      
      let res = await query

      return res.data ?? {};
    } catch (error) {
        const exception = error as any;
        return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
}
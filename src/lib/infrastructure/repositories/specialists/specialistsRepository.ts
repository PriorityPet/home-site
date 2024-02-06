import { CREATE_ORDER_ENDPOINT, GET_SPECIALISTS_ENDPOINT } from '../../config/api/dictionary';
import nookies from 'nookies';
import { Specialist } from '@/lib/domain/core/entities/specialists/specialist';
import { SpecialistsFailure, specialistsFailuresEnum } from '@/lib/domain/core/failures/specialists/specialistsFailure';
import { supabase } from '../../config/supabase/supabase-client';
import { specialistDBToMap } from '@/lib/domain/mappers/specialist/specialistDBToMap';
import moment from 'moment';
import { ILocality } from '@/lib/domain/core/entities/localityEntity';
import { serviceDBToMap } from '@/lib/domain/mappers/service/serviceDBToMap';
import { SpecialistEnum } from '@/lib/enums/specialist/specialistEnum';
import { IService } from '@/lib/domain/core/entities/serviceEntity';
import { localityFromSupabaseToMap } from '@/lib/domain/mappers/localities/localitiesSupabaseMapper';
import { CountriesIntlApiEnum, CountriesIntlEnum } from '@/lib/enums/countries/countriesIntlEnum';
import { uuid } from 'uuidv4';
import { OriginOrderEnum, TypeService } from '@/lib/enums/orders/ordersEnum';

export default interface ISpecialistsRepository {
    getSpecialists(): Promise<Array<Specialist> | SpecialistsFailure>;
    getSpecialist(id:number, type: string | number): Promise<Specialist | SpecialistsFailure>;
    getSpecialistLocalities(id:number, type:number, country: string): Promise<ILocality[] | SpecialistsFailure>;
    getPQALocalities(id:number): Promise<ILocality[] | SpecialistsFailure>;
    getPQAServices(id:number, localityId:number): Promise<IService[] | SpecialistsFailure>;
    getSpecialistServices(id:number, localityId?:number): Promise<any[] | SpecialistsFailure>;
    getProviderServices(id:number, localityId: number): Promise<any[] | SpecialistsFailure>;
    getAttentionWindowsByService(id:number, date?:string): Promise<any[] | SpecialistsFailure>;
    getInitialDate(id:number, date?:string): Promise<any[] | SpecialistsFailure>;
    getInitialDatePQA(obj:{userId:number; serviceId:number; date:string; type: number}): Promise<any[] | SpecialistsFailure>;
    getAttentionWindowsByServicePQA(obj:{userId:number; serviceId:number; date:string; type: number}): Promise<any[] | SpecialistsFailure>;
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
  async getSpecialist(id:number, type: string | number): Promise<Specialist | SpecialistsFailure> {
    try {

      let data, provider;

        let response = await supabase.from("Doctores").select(`
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
        
        data = {...response.data, tipoPersona: type}

      if(type === SpecialistEnum.DOCTOR){

        let relation= await supabase.from("ProveedoresDoctores").select(`*`).eq("doctorId", id).eq("esCreador", true).single();
        
        if(relation.data) {
          let res= await supabase.from("Proveedores").select(`*`).eq("id", relation.data.proveedorId).single();

          if(res.error)throw new SpecialistsFailure(res.statusText)

          provider = res.data ? res.data : {};
        }

      }

      if(type === SpecialistEnum.PQA){

        let relation= await supabase.from("ProveedoresDoctores").select(`*`).eq("doctorId", id)
        
        if(relation.data && relation.data.length > 0) {
          let res= await supabase.from("Proveedores").select(`*`).eq("id", relation.data[0].proveedorId).single();

          if(res.error)throw new SpecialistsFailure(res.statusText)

          provider = res.data ? res.data : {};
        }

      }
  
      return specialistDBToMap(data, provider) ?? {} as Specialist;
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
  async getSpecialistLocalities(id:number, type:number, country: string): Promise<ILocality[] | SpecialistsFailure> {
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

      let URL:RequestInfo = "";
      if(type === SpecialistEnum.DOCTOR){
        URL = process.env.NEXT_PUBLIC_API_URL + 
          `/doctor/${id}/location/${country === CountriesIntlEnum.PERU ? CountriesIntlApiEnum.PERU : CountriesIntlApiEnum.MEXICO}` as RequestInfo;
      }
      /*if(type === SpecialistEnum.PROVIDER){
        URL = process.env.NEXT_PUBLIC_API_URL + 
          `/supplier/${id}/location/${country === CountriesIntlEnum.PERU ? CountriesIntlApiEnum.PERU : CountriesIntlApiEnum.MEXICO}` as RequestInfo;
      }*/

      const response = await fetch(URL, requestOptions)
      let data = await response.json()

      return data["data"] ?? [];
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }

  async getPQAServices(id:number, localityId:number): Promise<IService[] | SpecialistsFailure> {
    try {
      let queryOfAttentionWindows = supabase.from("DoctoresEnVentanasAtencion")
      .select(`*`).eq("doctorId", id);
      let resAttentionWindows = await queryOfAttentionWindows

      if(resAttentionWindows.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resAttentionWindows.data?.length === 0) return []

      let queryOfServices = supabase.from("ServiciosEnVentanasAtencion")
      .select(`*`).in("ventanaAtencionBaseId", resAttentionWindows.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))
      
      let resServices = await queryOfServices

      if(resServices.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resServices.data?.length === 0) return []

      let queryOfServicesWithLocalities = supabase.from("Servicios")
      .select(`*`).in("id", resServices.data!.map((elem:any)=> elem["servicioId"] )).filter("localidadId", "eq", localityId)

      let resServicesWithLocalities = await queryOfServicesWithLocalities
      
      if(resServicesWithLocalities.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resServicesWithLocalities.data?.length === 0) return []
      
      return resServicesWithLocalities.data.map((value:any)=> serviceDBToMap(value)) ?? []
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }

  async getPQALocalities(id:number): Promise<ILocality[] | SpecialistsFailure> {
    try {
      let queryOfAttentionWindows = supabase.from("DoctoresEnVentanasAtencion")
      .select(`*`).eq("doctorId", id);
      let resAttentionWindows = await queryOfAttentionWindows

      if(resAttentionWindows.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resAttentionWindows.data?.length === 0) return []

      let queryOfServices = supabase.from("ServiciosEnVentanasAtencion")
      .select(`*`).in("ventanaAtencionBaseId", resAttentionWindows.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))
      
      let resServices = await queryOfServices

      if(resServices.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resServices.data?.length === 0) return []

      let queryOfServicesWithLocalities = supabase.from("Servicios")
      .select(`*, Localidades(*)`).in("id", resServices.data!.map((elem:any)=> elem["servicioId"] ))

      let resServicesWithLocalities = await queryOfServicesWithLocalities
      
      if(resServicesWithLocalities.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resServicesWithLocalities.data?.length === 0) return []

      let localitiesToMapFromSupabase = resServicesWithLocalities.data.map((elem:any)=>({
        ...elem["Localidades"]
      }))

      let list:any[] = []

      await Promise.all(localitiesToMapFromSupabase.map((value:any)=>{
        if(list.filter(elem => elem["id"] === value["id"] ).length === 0) list.push(value)
      }))

      return list.map((value:any)=> localityFromSupabaseToMap(value)) ?? []
    } catch (error) {
      console.log("Error", error)
      const exception = error as any;
      return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }

  async getProviderServices(id:number, localityId:number): Promise<IService[] | SpecialistsFailure> {
    try {
      const response = await supabase.from("Servicios").select(`*`).eq("proveedorId", id);

      if(response.error)throw new SpecialistsFailure(response.statusText)
      
      let data = response.data

      if(localityId) data = data.filter(elem => elem["localidadId"] === localityId)

      return data.map((elem:any)=> serviceDBToMap(elem)) ?? [];
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

      if(localityId) data = data.filter(elem => elem["Servicios"]["localidadId"] === localityId)
  
      return data.map((elem:any)=> serviceDBToMap(elem)) ?? [];
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

  async getAttentionWindowsByServicePQA(obj:{userId:number; serviceId:number; date:string; type: number}): Promise<any[] | SpecialistsFailure> {
    try {

      let queryOfAttentionWindows = supabase.from("DoctoresEnVentanasAtencion")
      .select(`*`).eq("doctorId", obj.userId);

      let resAttentionWindows = await queryOfAttentionWindows

      if(resAttentionWindows.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resAttentionWindows.data?.length === 0) return []

      let queryOfServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
      .select(`*`).in("ventanaAtencionBaseId", resAttentionWindows.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))
      .filter("servicioId", "eq", obj.serviceId)
        
      let resServiciosEnVentanasAtencion = await queryOfServiciosEnVentanasAtencion

      if(resServiciosEnVentanasAtencion.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resServiciosEnVentanasAtencion.data?.length === 0) return []
      
      let date = moment(obj.date).format('YYYY-MM-DD')
      let dateEnd = moment(obj.date, "YYYY-MM-DD").add(5, 'days').format('YYYY-MM-DD')

      let queryVentanasAtencion = supabase.from("VentanasAtencion")
      .select(`*`).in("ventanaAtencionBaseId", resServiciosEnVentanasAtencion.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))
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

  async getInitialDatePQA(obj:{userId:number; serviceId:number; date:string; type: number}): Promise<any[] | SpecialistsFailure> {
    try {
      let queryOfAttentionWindows = supabase.from("DoctoresEnVentanasAtencion")
      .select(`*`).eq("doctorId", obj.userId);

      let resAttentionWindows = await queryOfAttentionWindows

      if(resAttentionWindows.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resAttentionWindows.data?.length === 0) return []

      let queryOfServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
      .select(`*`).in("ventanaAtencionBaseId", resAttentionWindows.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))
      .filter("servicioId", "eq", obj.serviceId)
        
      let resServiciosEnVentanasAtencion = await queryOfServiciosEnVentanasAtencion

      if(resServiciosEnVentanasAtencion.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);
      if(resServiciosEnVentanasAtencion.data?.length === 0) return []
      
      let date = moment(obj.date).format('YYYY-MM-DD')
      let dateEnd = moment(obj.date, "YYYY-MM-DD").add(5, 'days').format('YYYY-MM-DD')

      let queryVentanasAtencion = supabase.from("VentanasAtencion")
      .select(`*`).in("ventanaAtencionBaseId", resServiciosEnVentanasAtencion.data!.map((elem:any)=> elem["ventanaAtencionBaseId"] ))
      .gte('fechaInicio', date).order('fechaInicio', { ascending: true })
      .limit(1)

      let resVentanasAtencion = await queryVentanasAtencion

      if(resVentanasAtencion.data?.length === 0) return []

      let res = resVentanasAtencion.data !== null ? resVentanasAtencion.data : [];

      console.log(res)

      return res;
    } catch (error) {
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

        let queryVentanasAtencion = supabase.from("VentanasAtencion")
        .select(`*`).in("ventanaAtencionBaseId", resServiciosEnVentanasAtencion.data!.map((elem:any) => elem["ventanaAtencionBaseId"]))
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

        console.log(list)
        
        return list ?? [];
    } catch (error) {
        const exception = error as any;
        return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }

  async getInitialDate(id:number, date?:string): Promise<any[] | SpecialistsFailure> {
    try {
      let queryServiciosEnVentanasAtencion = supabase.from("ServiciosEnVentanasAtencion")
      .select(`*, VentanasAtencionBase(*)`).eq("servicioId", id)

      let resServiciosEnVentanasAtencion = await queryServiciosEnVentanasAtencion

      if(resServiciosEnVentanasAtencion.data?.length === 0) return []
      
      date = moment(date).format('YYYY-MM-DD')

      let windowAttentionId = resServiciosEnVentanasAtencion.data![0]["ventanaAtencionBaseId"].toString()

      let queryVentanasAtencion = supabase.from("VentanasAtencion")
      .select(`*`).eq("ventanaAtencionBaseId", windowAttentionId)
      .gte('fechaInicio', date).order('fechaInicio', { ascending: true })
      .limit(1)

      let resVentanasAtencion = await queryVentanasAtencion

      if(resVentanasAtencion.data?.length === 0) return []

      let res = resVentanasAtencion.data !== null ? resVentanasAtencion.data : [];

      return res;
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
        estado: 3
      }

      let cookies = nookies.get(undefined, 'access_token');

      var myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${cookies["access_token"]}`);

      const idGenerate = uuid();

      var raw = JSON.stringify({
          id: idGenerate,
          subject_id: obj.ownerId,
          supplier_id: obj.providerId,
          location_id: obj.localityId,
          origin: OriginOrderEnum.Marketplace,
          date: null,
          items: [
              {
                  service_id: obj.servicioId,
                  type_service: TypeService.Standar,
                  quantity: 1,
                  pqa_id: obj["doctorId"],
                  subject_id: obj["pacienteId"],
                  appointment_id: obj.id,
              }
          ]
      });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      } as RequestInit;

      let URL = CREATE_ORDER_ENDPOINT as RequestInfo

      const response = await fetch(URL, requestOptions)
      
      let responseApi = await response.json()

      console.log("CREATE_CREATE_APPOINTMENT_ENDPOINT", responseApi["data"])

      const resRelation = await supabase.from("PermisosSujetos").insert({
        sujetoId: obj["pacienteId"],
        doctorId: obj["doctorId"]
      }).select();

      if (resRelation.error) return new SpecialistsFailure(specialistsFailuresEnum.serverError);

      return responseApi.data ?? {};
    } catch (error) {
        const exception = error as any;
        return new SpecialistsFailure(specialistsFailuresEnum.serverError);
    }
  }
}
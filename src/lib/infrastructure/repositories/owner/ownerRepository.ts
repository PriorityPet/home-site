import { IOwner } from "@/lib/domain/core/entities/ownerEntity";
import { supabase } from "../../config/supabase/supabase-client";
import { ICreateOwnerResponse, IEditOwnerResponse, IGetOwnerResponse, IGetOwnersResponse } from "@/lib/domain/core/response/ownerResponse";
import { OwnerFailure, ownerFailuresEnum } from "@/lib/domain/core/failures/owner/ownerFailure";
import { ISubject } from "@/lib/domain/core/entities/subjectEntity";
import { fromSubjectSupabaseDocumentData } from "@/lib/domain/mappers/subject/subjectSupabaseMapper";
import { ownerSupabaseToMap } from "@/lib/domain/mappers/owner/supabase/ownerSupabaseMapper";

export default interface IOwnerRepository {
    getOwners(obj: { 
        skip?: number  | null; 
        sort?: any; 
        limit?: number | null; 
        searchQuery?: any; 
        dni?: string | null;
    }): Promise<IGetOwnersResponse | OwnerFailure>;
    getOwnerById(obj: { 
        ownerId: number;
    }): Promise<IGetOwnerResponse | OwnerFailure>;
    createOwner(obj: { 
        owner: IOwner;
    }): Promise<ICreateOwnerResponse | OwnerFailure>;
}

export class OwnerRepository implements IOwnerRepository {
    async getOwners(obj: { 
        skip?: number | string | null; 
        sort?: any; 
        limit?: number | null; 
        searchQuery?: any | null; 
        dni?: string | null;
    }): Promise<IGetOwnersResponse | OwnerFailure> {
      try {
        let query = supabase.from("Sujetos").select("*", { count: "exact" }).limit(1);

        if (obj.sort) {
            query = query.order(obj.sort.field, {
                ascending: obj.sort.ascending
            });
        }

        if (obj.searchQuery) {
            query = query.textSearch(obj.searchQuery.field, obj.searchQuery.query);
        }

        if (obj.dni) {
          query = query.eq("curp", obj.dni)
        }

        if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
        }

        if (obj.limit) {
            query = query.limit(obj.limit);
        }

        const res = await query;

        const owners: IOwner[] = [];

        if (res.data && res.data.length > 0) {
            await Promise.all(res.data.map(async (data: any) => {
                const ownerMap: IOwner = ownerSupabaseToMap(data);
    
                owners.push(ownerMap);
            }));
        }        

        const response: IGetOwnersResponse = {
            data: owners,
            metadata: {
                total: res.count ?? 0,
                limit: obj.limit ?? 0,
            }
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new OwnerFailure(ownerFailuresEnum.serverError);
      }
    }

    async getOwnerById(obj: { 
        ownerId: number;
    }): Promise<IGetOwnerResponse | OwnerFailure> {
      try {
        const res = await supabase.from("Sujetos").select("*").eq("id", obj.ownerId).limit(1);

        let owner: IOwner = {} as IOwner;

        if (res.data && res.data.length > 0) owner = ownerSupabaseToMap(res.data[0]);

        const response: IGetOwnerResponse = {
            data: owner,
            metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new OwnerFailure(ownerFailuresEnum.serverError);
      }
    }

    async createOwner(obj: { 
        owner: IOwner;
    }): Promise<ICreateOwnerResponse | OwnerFailure> {
      try {
        const resUsers = await supabase.from("Usuarios").insert({
          email: obj.owner.email,
        }).select().limit(1);

        if (resUsers.error) return new OwnerFailure(ownerFailuresEnum.serverError);

        const subject: ISubject = {
          subjectId: 0,
          name: obj.owner.firstName,
          lastName: obj.owner.lastName,
          motherLastName: "",
          curp: obj.owner.dni,
          email: obj.owner.email,
          sex: obj.owner.sex,
          gender: obj.owner.gender,
          phoneNumber: obj.owner.phoneNumber,
          country: "",
          state: 0,
          address: "",
          city: "",
          userId: resUsers.data ? resUsers.data[0].id : "",
          type: "OWNER",
          pictureUrl: "",
          isPatient: false,
          birthDate: obj.owner.birthDate ? obj.owner.birthDate?.toISOString() : "",
          createdOn: new Date(),
          updatedOn: null,
          deletedOn: null
        }

        const resSubjects = await supabase.from("Sujetos").insert(fromSubjectSupabaseDocumentData(subject)).select().limit(1);

        if (resSubjects.error) return new OwnerFailure(ownerFailuresEnum.serverError);

        obj.owner.subjectId = resSubjects.data ? resSubjects.data[0].id : "";
        obj.owner.id = resSubjects.data ? resSubjects.data[0].id : "";

        // const res = await supabase.from("Dueños").insert(fromOwnerSupabaseDocumentData(obj.owner)).select().limit(1);

        // obj.owner.id = res.data ? res.data[0].id : "";

        const response: ICreateOwnerResponse = {
            data: obj.owner,
            metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new OwnerFailure(ownerFailuresEnum.serverError);
      }
    }
}

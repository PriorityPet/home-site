import { nanoid } from "nanoid";
import { supabase } from "../../config/supabase/supabase-client";
import { IPet } from "@/lib/domain/core/entities/petEntity";
import { ICreatePetResponse } from "@/lib/domain/core/response/petResponse";
import { PetFailure, petFailuresEnum } from "@/lib/domain/core/failures/pet/petFailure";
import { SubjectFailure, subjectFailuresEnum } from "@/lib/domain/core/failures/subject/subjectFailure";
import { ISubject } from "@/lib/domain/core/entities/subjectEntity";
import { fromSubjectSupabaseDocumentData } from "@/lib/domain/mappers/subject/subjectSupabaseMapper";
import { fromPetSupabaseDocumentData } from "@/lib/domain/mappers/pet/supabase/petSupabaseMapper";
import { IGetSpeciesResponses } from "@/lib/domain/core/response/specieResponses";
import { SpecieFailure, specieFailuresEnum } from "@/lib/domain/core/failures/specie/specieFailures";
import { ISpecie } from "@/lib/domain/core/entities/specieEntity";
import { specieSupabaseDataToEntity } from "@/lib/domain/mappers/specie/supabase/specieSupabaseMapper";
import { IGetBreedsResponses } from "@/lib/domain/core/response/breedResponses";
import { BreedFailure, breedFailuresEnum } from "@/lib/domain/core/failures/breed/breedFailures";
import { IBreed } from "@/lib/domain/core/entities/breedEntity";
import { breedSupabaseDataToEntity } from "@/lib/domain/mappers/breed/supabase/breedSupabaseMapper";

export default interface IPetRepository {
    createPet(obj: { 
        pet: IPet;
    }): Promise<ICreatePetResponse | PetFailure>; 
    createSubjectRelation(obj: {
        subjectId: any, 
        userId: any, 
        typeUser: number, 
        providerId: any
    }): Promise<any | SubjectFailure>;
    getSpecies(obj: { 
        skip?: number  | null; 
        sort?: any; 
        limit?: number | null; 
        searchQuery?: string | null; 
    }): Promise<IGetSpeciesResponses | SpecieFailure>;
    getBreeds(obj: { 
        specieId?: number | null;
        skip?: number  | null; 
        sort?: any; 
        limit?: number | null; 
        searchQuery?: string | null; 
    }): Promise<IGetBreedsResponses | BreedFailure>;
}

export class PetRepository implements IPetRepository {
    async createPet(obj: { 
        pet: IPet;
    }): Promise<ICreatePetResponse | PetFailure> {
      try {
        if (obj.pet.file?.name) {
            const id = nanoid(11);
            const fileName = `${id}-${obj.pet.file.name}`;

            const { data, error } = await supabase.storage
                .from("pets")
                .upload(`media/${fileName}`, obj.pet.file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (error) return new PetFailure(petFailuresEnum.uploadPictureError);

            const res = supabase.storage.from("pets").getPublicUrl(data.path);
        
            obj.pet.pictureUrl = res.data.publicUrl;
        }

        const subject: ISubject = {
            subjectId: 0,
            subjectParentId: obj.pet.ownerId,
            name: obj.pet.name,
            lastName: "",
            motherLastName: "",
            curp: "",
            email: "",
            sex: obj.pet.sex,
            gender: 0,
            phoneNumber: "",
            country: "",
            state: 0,
            address: "",
            city: "",
            pictureUrl: obj.pet.pictureUrl,
            isPatient: false,
            type: "PET",
            birthDate: obj.pet.birthDate ? obj.pet.birthDate?.toISOString() : "",
            createdOn: new Date(),
            updatedOn: null,
            deletedOn: null
        }

        const resSubjects = await supabase.from("Sujetos").insert(fromSubjectSupabaseDocumentData(subject)).select().limit(1);

        if (resSubjects.error) return new PetFailure(petFailuresEnum.serverError);

        obj.pet.subjectId = resSubjects.data ? resSubjects.data[0].id : "";

        const res = await supabase.from("Mascotas").insert(fromPetSupabaseDocumentData(obj.pet)).select().limit(1);

        obj.pet.id = res.data ? res.data[0].id : "";

        const response: ICreatePetResponse = {
            data: obj.pet,
            metadata: {}
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new PetFailure(petFailuresEnum.serverError);
      }
    }

    async createSubjectRelation(obj : {subjectId: any, userId: any, typeUser: number, providerId: any}): Promise<any | SubjectFailure> {
        try {
            const resExist = await supabase.from("PermisosSujetos").select().eq("sujetoId", obj.subjectId).eq("propietarioId", obj.providerId).eq("tipoPropietario", obj.typeUser).limit(1);
            
            if(resExist.data && resExist.data.length > 0) return resExist.status;

            const res = await supabase.from("PermisosSujetos").insert({
                sujetoId: obj.subjectId,
                doctorId: obj.userId,
                tipoPropietario: obj.typeUser,
                propietarioId: obj.providerId,
            }).select().limit(1);

            console.log(res)
    
            if (res.error) return new SubjectFailure(subjectFailuresEnum.serverError);
    
            return res.status;
        } catch (error) {
            const exception = error as any;
            return new SubjectFailure(subjectFailuresEnum.serverError);
        }
    }

    async getSpecies(obj: { 
        skip?: number | string | null; 
        sort?: any; 
        limit?: number | null; 
        searchQuery?: any | null; 
    }): Promise<IGetSpeciesResponses | SpecieFailure> {
      try {
        let query = supabase.from("Especies").select();

        if (obj.sort) {
            query = query.order(obj.sort.field, {
                ascending: obj.sort.ascending
            });
        }

        if (obj.searchQuery) {
            query = query.textSearch(obj.searchQuery.field, obj.searchQuery.query);
        }

        if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
        }

        if (obj.limit) {
            query = query.limit(obj.limit);
        }

        const snapshots = await query;

        const species: ISpecie[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
            await Promise.all(snapshots.data.map(async (snapshot: any) => {
                const specieMap: ISpecie = specieSupabaseDataToEntity(snapshot);
    
                species.push(specieMap);
            }));
        }

        const response: IGetSpeciesResponses = {
            data: species,
            metadata: {
                total: (await query).count ?? 0,
                limit: obj.limit ?? null,
            }
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new SpecieFailure(specieFailuresEnum.serverError);
      }
    }

    async getBreeds(obj: { 
        specieId?: number | null;
        skip?: number | string | null; 
        sort?: any; 
        limit?: number | null; 
        searchQuery?: any | null; 
    }): Promise<IGetBreedsResponses | BreedFailure> {
      try {
        let query = supabase.from("Razas").select();

        if (obj.sort) {
            query = query.order(obj.sort.field, {
                ascending: obj.sort.ascending
            });
        }

        if (obj.specieId) {
            query = query.eq("especieId", obj.specieId);
        }

        if (obj.searchQuery) {
            query = query.textSearch(obj.searchQuery.field, obj.searchQuery.query);
        }

        if (obj.skip && typeof obj.skip === "number" && obj.limit) {
            query = query.range(obj.skip, obj.skip + obj.limit);
        }

        if (obj.limit) {
            query = query.limit(obj.limit);
        }

        const snapshots = await query;

        const breeds: IBreed[] = [];

        if (snapshots.data && snapshots.data.length > 0) {
            await Promise.all(snapshots.data.map(async (snapshot: any) => {
                const breedMap: IBreed = breedSupabaseDataToEntity(snapshot);
    
                breeds.push(breedMap);
            }));
        }

        const response: IGetBreedsResponses = {
            data: breeds,
            metadata: {
                total: (await query).count ?? 0,
                limit: obj.limit ?? null,
            }
        }

        return JSON.parse(JSON.stringify(response));
      } catch (error) {
        const exception = error as any;
        return new BreedFailure(breedFailuresEnum.serverError);
      }
    }
}

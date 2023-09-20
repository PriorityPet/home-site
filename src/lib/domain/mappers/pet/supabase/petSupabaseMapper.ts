import { IOwner } from "@/lib/domain/core/entities/ownerEntity";
import { IPet } from "@/lib/domain/core/entities/petEntity";

export function petSupabaseToMap(dataSubject: any, dataPet: any): IPet {
    return {
        id: dataPet?.id ?? 0,
        name: dataSubject?.nombres ?? "",
        subjectId: dataPet?.sujetoId ?? 0,
        specieId: dataPet?.especieId ?? "",
        breedId: dataPet?.razaId ?? "",
        chip: dataPet?.chip ?? "",
        sex: dataSubject?.sexo ?? 0,
        ownerId: dataSubject?.sujetoPadreId ?? 0,
        age: dataSubject?.fechaNacimiento ? getPetAge(new Date(dataSubject.fechaNacimiento)) : null,
        ageType: dataSubject?.fechaNacimiento ? getPetAgeType(new Date(dataSubject.fechaNacimiento)) : null,
        owner: {} as IOwner,
        pictureUrl: dataSubject?.avatar ?? "",
        birthDate: dataSubject?.fechaNacimiento ?? "",
        createdAt: dataSubject?.fechaRegistro ? new Date(dataSubject.fechaRegistro) : new Date()
    } as IPet;
}

function getPetAgeMonths(birthDate: Date): number {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    age = age * 12 + m;

    return age;
}

function getPetAge(birthDate: Date): number {
  var diff_ms = Date.now() - birthDate.getTime();
  var age_dt = new Date(diff_ms); 

  if (Math.abs(age_dt.getUTCFullYear() - 1970) <= 0) return getPetAgeMonths(birthDate);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function getPetAgeType(birthDate: Date): string {
  var diff_ms = Date.now() - birthDate.getTime();
  var age_dt = new Date(diff_ms); 

  if (Math.abs(age_dt.getUTCFullYear() - 1970) <= 0) return "months"

  return "years"
}


export function fromPetSupabaseDocumentData(pet: IPet): any {
    const documentData = {
      especieId: pet.specieId,
      razaId: pet.breedId,
      chip: null,
      sujetoId: pet.subjectId,
    } as any;
  
    return documentData;
}
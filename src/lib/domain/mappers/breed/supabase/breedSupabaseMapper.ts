import { IBreed } from "@/lib/domain/core/entities/breedEntity";


export function breedSupabaseDataToEntity(data: any): IBreed {
  return {
    breedId: data?.id ?? 0,
    specieId: data?.especieId ?? 0,
    name: data?.nombre ?? "",
  } as IBreed;
}


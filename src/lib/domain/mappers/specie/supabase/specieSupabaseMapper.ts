import { ISpecie } from "@/lib/domain/core/entities/specieEntity";

export function specieSupabaseDataToEntity(data: any): ISpecie {
  return {
    specieId: data?.id ?? 0,
    name: data?.nombre ?? "",
  } as ISpecie;
}


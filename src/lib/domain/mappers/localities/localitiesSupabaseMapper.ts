import { IAdressPeru, ILocality } from "../../core/entities/localityEntity";

export function localityFromSupabaseToMap(data: any): ILocality {
    return {
        id: data["id"] ?? 0,
        name: data["nombre"] ?? "",
        code: data["consultorio"] ?? "",
        type: data["tipo"] ?? "",
        address: mapLocalityAdressPeru(data),
        is_public: data["esPublico"] ?? false,
        is_virtual: data["esVirtual"] ?? false,
        image_url: data["fotoUrl"] ?? "",
        latitude: data["latitud"] ?? 0,
        longitude: data["longitud"] ?? 0,
    } as ILocality;
}

function mapLocalityAdressPeru(data:any){
    return{
        department: data["departamento"] ?? "",
        province: data["provincia"] ?? "",
        district: data["distrito"] ?? "",
        city: data["ciudad"] ?? "",
        street: data["calle"] ?? "",
        reference: data["referencia"] ?? "",
        postal_code: data["codigoPostal"] ?? ""
    } as IAdressPeru
}
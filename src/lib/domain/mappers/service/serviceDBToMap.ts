import { ILocality } from "../../core/entities/localityEntity";
import { IService, IServiceCategory } from "../../core/entities/serviceEntity";

export function serviceDBToMap(data: any): IService {
  return {
    id: data["id"] ?? 0,
    name: data["nombre"] ?? "",
    service_category_id: data["categoriaServicioId"] ?? "",
    service_category: {} as IServiceCategory,
    image_url: data["fotoUrl"] ?? "",
    description: data["descripcion"] ?? "",
    conditions: data["condiciones"] ?? "",
    status: data["estado"] ?? 0,
    base_price: data["precioBase"] ?? 0,
    location: {} as ILocality,
    location_id: data["localidadId"] ?? 0
  } as IService;
}
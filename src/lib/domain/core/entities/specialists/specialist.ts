export interface Specialist {
    userId: string;
    accountId: string;
    names: string;
    firstName: string;
    lastName: string;
    status: boolean;
    email: string;
    curp: string;
    birthDate: string;
    sex: number;
    websiteUrl: string;
    phone: string;
    personType: number;
    avatar: string;
    address: string;
    aboutMe: string;
    shortDescription: string;
    country: string;
    pwaProfressionId: number | null;
    professionalLicense: number | null;
    professionalLicenseInstitution: string | null;
    specialities: any[];
    role: string;
    createdOn: any | null;
    provider: IProvider | null;
}

export interface IProvider {
    id: number;
    userId: number;
    avatar: string;
    name: string;
    email?: string | null;
    phoneNumber?: string | null;
    role: string;
    createdOn: any | null;
    address?: string | null;
    personType: string | null;
    ruc?: string | null;
    servicesSummary?: string | null;
    shortDescription?: string | null;
    providerTypeId?: string | number;
}
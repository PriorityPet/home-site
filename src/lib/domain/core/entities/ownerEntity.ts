export interface IOwner {
    id: number;
    subjectId: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    birthDate?: Date | null;
    gender: number;
    sex: number;
    dni: string;
    createdAt: Date;
}
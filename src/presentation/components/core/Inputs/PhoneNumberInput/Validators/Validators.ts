export type ErrorValidatorType = {
    isValid: boolean;
    error?: {
        es: string;
    } | null;
}

export const validatedPhoneNumber = (obj: { countryCode: string, phoneNumber: string }): ErrorValidatorType | null => {
    switch (obj.countryCode) {
        case "ve":
            return validatedVEPhoneNumber(obj.phoneNumber);
        case "mx":
            return validatedMXPhoneNumber(obj.phoneNumber);
    
        default:
            return validatedDefaultPhoneNumber(obj.phoneNumber);
    }
}

const validatedVEPhoneNumber = (phoneNumber: string): ErrorValidatorType | null => {
    let error: ErrorValidatorType = {
        isValid: true,
        error: null,
    }

    if (phoneNumber.trimEnd().length === 0) {
        error.isValid = false;
        error.error = {
            es: "Debe escribir un número de teléfono",
        };
        return error;
    }

    if (!/^\d+$/.test(phoneNumber.trimEnd())) {
        error.isValid = false;
        error.error = {
            es: "Debe escribir un número de teléfono válido",
        };
        return error;
    }

    if (phoneNumber.trimEnd().length < 10) {
        error.isValid = false;
        error.error = {
            es: "El teléfono debe contener mínimo 10 carácteres",
        };
        return error;
    }

    return null;
}

const validatedMXPhoneNumber = (phoneNumber: string): ErrorValidatorType | null => {
    let error: ErrorValidatorType = {
        isValid: true,
        error: null,
    }

    if (phoneNumber.trimEnd().length === 0) {
        error.isValid = false;
        error.error = {
            es: "Debe escribir un número de teléfono",
        };
        return error;
    }

    if (!/^\d+$/.test(phoneNumber.trimEnd())) {
        error.isValid = false;
        error.error = {
            es: "Debe escribir un número de teléfono válido",
        };
        return error;
    }

    if (phoneNumber.trimEnd().length < 10) {
        error.isValid = false;
        error.error = {
            es: "El teléfono debe contener mínimo 10 carácteres",
        };
        return error;
    }

    return !error.isValid ? error : null;
}

const validatedDefaultPhoneNumber = (phoneNumber: string): ErrorValidatorType | null => {
    let error: ErrorValidatorType = {
        isValid: true,
        error: null,
    }

    if (phoneNumber.trimEnd().length === 0) {
        error.isValid = false;
        error.error = {
            es: "Debe escribir un número de teléfono",
        };
        return error;
    }

    if (!/^\d+$/.test(phoneNumber.trimEnd())) {
        error.isValid = false;
        error.error = {
            es: "Debe escribir un número de teléfono válido",
        };
        return error;
    }

    if (phoneNumber.trimEnd().length < 10) {
        error.isValid = false;
        error.error = {
            es: "El teléfono debe contener mínimo 10 carácteres",
        };
        return error;
    }

    return null;
}

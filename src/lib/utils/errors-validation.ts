export function VALIDATE_EMAIL(email: string) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
}

export function VALIDATE_STRING(text: string) {
    return text.match(/\d+/g);
}
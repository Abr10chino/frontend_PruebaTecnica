// Validacion para campos que deben ser números (enteros o decimales)
export const validateNumbers = (field) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(field);
};
 
// Mensaje de error para campos que deben ser números
export const validateNumbersMessage = "El campo debe ser un número válido";
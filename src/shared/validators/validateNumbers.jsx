export const validateNumbers = (field) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(field);
};
  
export const validateNumbersMessage = "El campo debe ser un número válido";
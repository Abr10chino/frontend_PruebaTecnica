// Validacion para campos que no deben estar vacíos
export const validateField = (field) => {
    const regex = /\S+/;
    return regex.test(field);
};

// Mensaje de error para campos vacíos
export const validateFieldMessage = "No deje el campo vacío";
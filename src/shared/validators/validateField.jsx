export const validateField = (field) => {
    const regex = /\S+/;
    return regex.test(field);
};
  
export const validateFieldMessage = "No deje el campo vacío";
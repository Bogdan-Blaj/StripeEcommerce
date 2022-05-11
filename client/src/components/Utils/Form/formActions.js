export const validate = (element, formData = []) => {
    let error = [true, ''];

    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.confirm){
        //used for password comfirmation when registering, check register.js state for more info
        const valid = element.value.trim() === formData[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.required){
        //false if empty
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        
        //if not valid, send the message from above
        error = !valid ? [valid, message] : error;
    }
    return error;
}

export const update = (element, formData, formName) => {
    const newFormData = { ...formData};
    const newElement = {
        ...newFormData[element.id]
    }

    newElement.value = element.event.target.value; 

    if(element.blur){
        let validData = validate(newElement, formData);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];
    }

    newElement.touched = element.blur;

    //add new element to formData
    newFormData[element.id] = newElement;

    return newFormData;
}

export const generateData = (formData, formName) => {
    let dataToSubmit = {};

    for(let key in formData){
        if(key !== 'confirmPassword')
            {dataToSubmit[key] = formData[key].value;}
    }
    return dataToSubmit;
}

export const isFormValid = (formData, formName) => {
    let isValid = true;

    for(let key in formData){
        isValid = formData[key].valid && isValid;
    }
    return isValid;
}

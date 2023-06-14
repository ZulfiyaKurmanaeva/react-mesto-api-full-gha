import { useState, useCallback, useRef, useEffect } from "react";

function useFormValidation(initialValues = {}) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const formRef = useRef(null);

    useEffect(() => {
        setIsValid(formRef.current.checkValidity());
    }, [values]);

    const handleChange = (evt) => {
        const { name, value, validationMessage } = evt.target;
        setValues((initValues) => ({ ...initValues, [name]: value }));
        setErrors((initErrors) => ({ ...initErrors, [name]: validationMessage }));
    };

    const setValue = useCallback((name, value) => {
        setValues((initValues) => ({ ...initValues, [name]: value }));
    }, []);

    const reset = (initialValues = {}) => {
        setValues(initialValues);
        setErrors({});
    };

    return { values, errors, isValid, formRef, handleChange, setValue, reset };
}

export default useFormValidation;
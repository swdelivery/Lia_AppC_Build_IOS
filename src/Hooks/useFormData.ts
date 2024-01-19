/* eslint-disable no-param-reassign */
import { validateEmail } from "@Constant/Utils";
import { isEqual } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function useFormData<T = any>(
  initialValues: T,
  onSubmit?: (values: T) => void,
  options?: {
    /** deprecated */
    validate?: (values: T) => boolean;
    validates?: Partial<Record<keyof T, (value: any, values: T) => string>>;
  }
) {
  const [values, setInternalValues] = useState(initialValues);
  const valuesRef = useRef(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const savedSubmit = useRef<any>();

  useEffect(() => {
    savedSubmit.current = onSubmit;
  }, [onSubmit]);

  const isValid = useMemo(() => {
    if (options && options.validates) {
      return Object.keys(options.validates).every((key: string) => {
        // @ts-ignore
        const value = values[key];
        // @ts-ignore
        const validator = options.validates[key];
        return validator ? !validator(value, values) : true;
      });
    }
    if (options && options.validate) {
      return options.validate(values);
    }
    return true;
  }, [values]);

  const setValue = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    if (isEqual(valuesRef.current[key], value)) {
      return;
    }
    valuesRef.current = {
      ...valuesRef.current,
      [key]: value,
    };
    setInternalValues(valuesRef.current);
  }, []);

  const validate = useCallback(
    (field: keyof T) => () => {
      const validateFn = options?.validates && options?.validates[field];
      if (validateFn) {
        const error = validateFn(valuesRef.current[field], valuesRef.current);
        if (error) {
          setErrors((prev) => ({
            ...prev,
            [field]: error,
          }));
        }
      }
    },
    [options?.validates]
  );

  const updateValue = useCallback(
    <K extends keyof T>(key: K, shouldValidate = false) =>
      (value: T[K]) => {
        setValue(key, value);
        if (shouldValidate) {
          validate(key);
        }
      },
    [setValue, validate]
  );

  const checkUpdate = useCallback(<K extends keyof T>(data: Partial<T>) => {
    const updatedKeys = Object.keys(data) as K[];
    let isUpdated = false;
    for (let i = 0; i < updatedKeys.length; i += 1) {
      const key = updatedKeys[i];
      if (valuesRef.current[key] !== data[key]) {
        isUpdated = true;
        break;
      }
    }
    return isUpdated;
  }, []);

  const setValues = useCallback((data: Partial<T>) => {
    if (!checkUpdate(data)) {
      return;
    }
    valuesRef.current = {
      ...valuesRef.current,
      ...data,
    };
    setInternalValues(valuesRef.current);
  }, []);

  const submit = useCallback(
    (ignoreCheck = false) => {
      if (savedSubmit.current && (ignoreCheck || isValid)) {
        savedSubmit.current(valuesRef.current);
      } else {
        throw new Error(
          "You should pass onSubmit callback to use this function"
        );
      }
    },
    [isValid]
  );

  const clearError = useCallback(
    (field: keyof T) => () => {
      delete errors[field];
      setErrors({ ...errors });
    },
    [errors]
  );

  const reset = useCallback(() => {
    valuesRef.current = initialValues;
    setInternalValues(valuesRef.current);
  }, []);

  return {
    values,
    updateValue,
    setValue,
    setValues,
    submit,
    isValid,
    validate,
    errors,
    clearError,
    reset,
  };
}

export function requiredField(value: any) {
  let valid = !!value;
  if (typeof value === "string") {
    valid = value.trim() !== "";
  }
  if (Array.isArray(value)) {
    valid = value.length > 0;
  }
  if (!valid) {
    return "This is required field";
  }
  return "";
}

export function emailField(value: string) {
  const isValid = validateEmail(value);
  if (!isValid) {
    return "Email is not valid";
  }
  return "";
}

export function booleanField(value?: boolean) {
  if (!value) {
    return "This is required field";
  }
  return "";
}

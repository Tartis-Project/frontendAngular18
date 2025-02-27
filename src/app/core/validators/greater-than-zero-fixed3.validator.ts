import { AbstractControl, ValidatorFn } from '@angular/forms';

// Validador personalizado para verificar que el valor sea mayor que 0 y con máximo 3 decimales (ejemplo 0.123)
export function greaterThanZeroValidatorFixed3(minValue: number = 0.001): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value === null || value === undefined || value <= 0 || value < minValue) {
      return { greaterThanZero: { value: control.value, minValue } };
    }
    if (value < minValue) {
      return { maxDecimals: { value: control.value } };
    }
    const decimalPart = (value.toString().split('.')[1] || '').length;
    if (decimalPart > 3) {
      return { maxDecimals: { value: control.value } };
    }
    return null; 
  };
}
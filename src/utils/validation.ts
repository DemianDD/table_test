export class ValidationResult{
    public isValid: boolean;
    public errorMessage?: string;

    constructor(isValid: boolean = true, errorMessage?: string) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
    }
};

const isPhoneValid = (phone: string): boolean => {
    const stringifyPhone = phone.toString().replace(/\D/g, '');

    return stringifyPhone.length === 10
};

const isAgeValid = (age: number): boolean => {
    return Number.isInteger(age) && age >= 21;
};

const isExperienceValid = (experience: number, age: number): boolean => {
    return !isNaN(experience) && experience >= 0 && experience <= (age - 21);
};

const isYearlyIncomeValid = (income: number): boolean => {
    const isNumber = !isNaN(income) && isFinite(income);
  
    const hasTwoDecimalPlaces = income.toString().split(".")[1].length == 2;
  
    const isLessThanOneMillion = income <= 1000000;
  
    return isNumber && hasTwoDecimalPlaces && isLessThanOneMillion;
};

const isHasChildrenValid = (hasChildren?: boolean): boolean => {
    if (hasChildren === undefined ||
        hasChildren === true ||
        hasChildren === false ||
        hasChildren === null) return true;

    return false;
};

const isLicenceStateValid = (licenceState: string): boolean => {
    const states = licenceState.split('|');

    return states.every(state => licenceState.includes(state));
};

const isDateValid = (date: string): boolean => {
    const regexYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/;
    const regexMMDDYYYY = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!(regexYYYYMMDD.test(date) || regexMMDDYYYY.test(date))) {
        return false;
    }

    const parsedDate = new Date(date);

    return !isNaN(parsedDate.getTime()) && parsedDate >= new Date();
};

const isLicenceNumberValid = (licenceNumber: string): boolean => {
    if (licenceNumber.length !== 6) {
        return false;
    }

    const validCharsRegex = /^[0-9a-zA-Z]+$/;
    return validCharsRegex.test(licenceNumber);
};

const hasSpaces = (user: any, field: string) => {
    var has = user[field][0] === ' ' || user[field][user[field].lenght - 1] === ' '
    if (has) return new ValidationResult(has, "No spaces are allowed on beggining or end")

    return new ValidationResult()
}

const isValidNumber = (user: any, field: string) => {
    var has = user[field] > 0;
    if (has) return new ValidationResult(has, "Invalid number")

    return new ValidationResult()
}

export const isRequiredField = (user: any) => {
    if(user['Phone'] === undefined || user['Phone'] === null || user['Phone'].toString().lenght === 0 ||
        user['FullName'] === undefined || user['FullName'] === null || user['FullName'].toString().lenght === 0 ||
        user['Email'] === undefined || user['Email'] === null || user['Email'].toString().lenght === 0)
        return new ValidationResult(false);

    return new ValidationResult(true);
}

export const validationDictionary: {[key: string] : ((user: any) => ValidationResult)[]} = {
    'Phone': [
        (user) => !isPhoneValid(user['Phone']) ? 
            new ValidationResult(false, 'Invalid phone number format.') : 
            new ValidationResult(),
    ],
    'FullName': [
        (user) => user['FullName'] === undefined || user['FullName'] === null ? 
            new ValidationResult(false, 'Full Name are required field.') : 
            new ValidationResult(),

        (user) => hasSpaces(user, "FullName")
    ],
    'Email': [
        (user) => user['Email'] === undefined || user['Email'] === null ? 
            new ValidationResult(false, 'Email are required field.') : 
            new ValidationResult(),

        (user) => hasSpaces(user, "Email")
    ],
    'Age': [
        (user) => !isAgeValid(user['Age']) ? 
            new ValidationResult(false, 'Age must be an integer and at least 21 years.') : 
            new ValidationResult(),

        (user) => isValidNumber(user, "Age")
    ],
    'Experience': [
        (user) => !isExperienceValid(user['Experience'], user['Age']) ? 
            new ValidationResult(false, 'Experience must be a non-negative integer and less than or equal to (Age - 21).') : 
            new ValidationResult(),

        (user) => isValidNumber(user, "Experience")
    ],
    'YearlyIncome': [
        (user) => !isYearlyIncomeValid(user['YearlyIncome']) ? 
            new ValidationResult(false, 'Invalid yearly income format or exceeds one million.') : 
            new ValidationResult(),

        (user) => isValidNumber(user, "YearlyIncome")
    ],
    'HasChildren': [
        (user) => !isHasChildrenValid(user['HasChildren']) ? 
            new ValidationResult(false, 'Incorrect format') : 
            new ValidationResult(),
    ],
    'LicenceState': [
        (user) => !isLicenceStateValid(user['LicenceState']) ? 
            new ValidationResult(false, 'Invalid licence state(s).') : 
            new ValidationResult(),

        (user) => hasSpaces(user, "LicenceState")
    ],
    'Date': [
        (user) => !isDateValid(user['Date']) ? 
            new ValidationResult(false, 'Invalid date format or earlier than the current date.') : 
            new ValidationResult(),
    ],
    'LicenseNumber': [
        (user) => !isLicenceNumberValid(user['LicenseNumber']) ? 
            new ValidationResult(false, 'Invalid licence number format.') : 
            new ValidationResult(),
    ]
}

export const validateUser = (user: any, field: string): ValidationResult => {
    var validations = validationDictionary[field]

    if (validations === undefined) return new ValidationResult()

    for (let i = 0; i < validations.length; i++) {
        var validationResult = validations[i](user)
        if (validationResult.isValid === false) return validationResult
    }

    return new ValidationResult()
};
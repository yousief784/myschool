export const isEgyptianNationalIDValid = (nationalID: string): boolean => {
    // Verify the length
    if (nationalID.length !== 14) {
        return false;
    }

    // Extract the birthdate digits
    const birthdateDigits = nationalID.slice(0, 7);

    // Validate the birthdate
    const day = parseInt(birthdateDigits.slice(0, 2));
    const month = parseInt(birthdateDigits.slice(2, 4));
    const year = parseInt(birthdateDigits.slice(4, 7));
    if (
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year < 1900 ||
        year > 2099
    ) {
        return false;
    }

    // Validate the governorate code
    const governorateCode = parseInt(nationalID.slice(7, 9));
    if (governorateCode < 1 || governorateCode > 27) {
        return false;
    }

    // Validate the gender
    const genderDigit = parseInt(nationalID[11]);
    if (genderDigit % 2 !== 0 && genderDigit % 2 !== 1) {
        return false;
    }

    // Perform checksum validation
    const checksumDigit = parseInt(nationalID[13]);
    let sum = 0;
    for (let i = 0; i < 13; i++) {
        const digit = parseInt(nationalID[i]);
        sum += i % 2 === 0 ? digit * 2 : digit;
    }
    const calculatedChecksum = (10 - (sum % 10)) % 10;
    if (calculatedChecksum !== checksumDigit) {
        return false;
    }

    // All validations passed, ID is valid
    return true;
};

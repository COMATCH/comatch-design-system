const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

/**
 * ^ represents starting character of the string.
 * (?=.*[0-9]) represents a digit must occur at least once.
 * (?=.*[a-z]) represents a lower case alphabet must occur at least once.
 * (?=.*[A-Z]) represents an upper case alphabet that must occur at least once.
 * (?=.*[@#$%^&-+=()] represents a special character that must occur at least once.
 * (?=\\S+$) white spaces don’t allowed in the entire string.
 * .{8, 20} represents at least 8 characters and at most 20 characters.
 * $ represents the end of the string.
 */
const PASSWORD_REGEX = {
    START_OF_STRING: '^',
    AT_LEAST_ONE_DIGIT: '(?=.*[0-9])',
    AT_LEAST_ONE_LOWER_CASE: '(?=.*[a-z])',
    AT_LEAST_ONE_UPPER_CASE: '(?=.*[A-Z])',
    AT_LEAST_ONE_SPECIAL_CHARACTER: '(?=.*[@#$%^&-+=()])',
    NO_WHITE_SPACE: '(?=\\S+$)',
    AT_LEAST_EIGHT_CHARACTERS: '.{8,}',
    END_OF_STRING: '$',
};

export { EMAIL_REGEX, PASSWORD_REGEX };
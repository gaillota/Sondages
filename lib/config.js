// Overriding underscorejs with lodash
_ = lodash;

// SimpleSchema error messages overridden
SimpleSchema.messages({
    required: "[label] is required",
    minString: "[label] must be at least [min] caracters",
    maxString: "[label] can't exceed [max] caracters",
    minNumber: "[label] must be at least [min]",
    maxNumber: "[label] can't exceed [max]",
    minDate: "[label] can't be before [min]",
    maxDate: "[label] can't be after [max]",
    badDate: "[label] is not a valid date",
    noDecimal: "[label] must be an integer",
    notAllowed: "[value] is not allowed",
    notUnique: "[value] is already used",
    notValid: "[label] is not valid",
    passwordMismatch: "Passwords don't match",
    regEx: [
        {
            exp: SimpleSchema.RegEx.Email, msg: "[label] must be valid e-mail address"
        }
    ]
});

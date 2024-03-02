import { useState } from "react";

const noError = { error: false, message: null }
const stringError = (filed, length) => ({ error: true, message: `${filed} should consist of ${length} litters at least` })

export default function useLocationFormValidation() {

    const [nameValidationState, setNameValidationState] = useState(noError);
    const [numberValidationState, setNumberValidationState] = useState(noError);
    const [countryValidationState, setCnountryValidationState] = useState(noError);
    const [cityValidationState, setCityValidationState] = useState(noError);
    const [streetValidationState, setStreetValidationState] = useState(noError);

    const validLength = (param, length) => param.length >= length;

    function handleNameField() {
        let value = document.getElementById("theNameField").value;
        if (validLength(value, 4)) {
            setNameValidationState(noError);
            return value;
        } else {
            setNameValidationState(stringError("the name", 4));
            return false;
        }
    }

    function handlePhoneNumperField() {
        let value = document.getElementById("phoneNumperField").value;
        let isNumber = value.split("").every((num) => !isNaN(parseInt(num)));
        isNumber = value.length > 0 ? isNumber : false;

        if (isNumber) {
            setNumberValidationState(noError);
            return value;
        } else {
            setNumberValidationState({ error: true, message: "Phone number should consist of digits" });
            return false;
        }
    }

    function handleCountryField() {
        let value = document.getElementById("countryField").value;
        if (validLength(value, 3)) {
            setCnountryValidationState(noError);
            return value;
        } else {
            setCnountryValidationState(stringError("country name", 3));
            return false;
        }
    }

    function handleCityField() {
        let value = document.getElementById("cityField").value;
        if (validLength(value, 3)) {
            setCityValidationState(noError);
            return value;
        } else {
            setCityValidationState(stringError("city name", 3));
            return false;
        }
    }

    function handleStreetField() {
        let value = document.getElementById("streetField").value;
        if (validLength(value, 3)) {
            setStreetValidationState(noError);
            return value;
        } else {
            setStreetValidationState(stringError("street name", 4));
            return false;
        }
    }

    return {
        handleStreetField,
        handleCityField,
        handleCountryField,
        handlePhoneNumperField,
        handleNameField,
        nameValidationState,
        numberValidationState,
        countryValidationState,
        cityValidationState,
        streetValidationState
    }
}

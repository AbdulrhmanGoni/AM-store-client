import { useState } from 'react';

export default function useCreditCardFormValidation() {

    const [isLoading, setIsLoading] = useState(false);
    const [nameValidationState, setNameValidationState] = useState({ error: false, message: null });
    const [cardNumberValidationState, setCardNumberValidationState] = useState({ error: false, message: null });
    const [dateValidationState, setDateValidationState] = useState({ error: false, message: null });
    const [cvvValidationState, setCvvValidationState] = useState({ error: false, message: null });

    function isValidNumber(param) {
        if (param.split("").every((num) => !isNaN(parseInt(num)))) {
            return true
        } else {
            return false
        }
    }

    function isValidCardNumber(number) {
        if (isValidNumber(number)) {
            const length = number.toString().length
            if (length > 9 && length < 20) {
                return true
            }
        }
        return false
    }

    function isExpiredDate(expiredDate) {
        const now = new Date();
        if (expiredDate > now) {
            return false;
        } else {
            return true;
        }
    }

    function handleCardName() {
        let value = document.getElementById("cridet-cart-name").value;
        if (value.length > 5) {
            setNameValidationState({ error: false, message: null });
            return value;
        } else {
            setNameValidationState({ error: true, message: "The name should consist of 5 letters at least" });
            return false;
        }
    }

    function handleCardNumber() {
        let value = document.getElementById("cridet-cart-number").value;
        if (isValidCardNumber(value)) {
            setCardNumberValidationState({ error: false, message: null });
            return value;
        } else {
            setCardNumberValidationState({ error: true, message: "Card number should consist between 10 and 19 digits" });
            return false;
        }
    }

    function handleCartExpirationDate() {
        let value = document.getElementById("cridet-cart-expiration-date").value;
        const expiredDate = new Date(value)
        if (isExpiredDate(expiredDate)) {
            setDateValidationState({ error: true, message: "Invalid date !" });
            return false;
        } else {
            setDateValidationState({ error: false, message: null });
            return expiredDate.toISOString();
        }
    }

    function handleCvvNumber() {
        let value = document.getElementById("cridet-cart-cvv").value;
        if (isValidNumber(value, 3)) {
            setCvvValidationState({ error: false, message: null });
            return value;
        } else {
            setCvvValidationState({ error: true, message: "CVV number should consist of 3 digits" });
            return false;
        }
    }

    return {
        isLoading,
        setIsLoading,
        nameValidationState,
        cardNumberValidationState,
        dateValidationState,
        cvvValidationState,
        handleCardName,
        handleCardNumber,
        handleCartExpirationDate,
        handleCvvNumber
    }
}

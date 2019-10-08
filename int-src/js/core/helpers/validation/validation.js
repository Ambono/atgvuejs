// takes the form field value and returns true on valid number
export const cardValidate = (value) => {
    
    // accept only digits, dashes or spaces
      if (/[^0-9-\s]+/.test(value)) return false;

      // Do not allow all zeros (with or without spaces)
        if (/^[0\s]+/.test(value)) return false;
  
      // The Luhn Algorithm.
      let nCheck = 0; 
      let bEven = false;
      
      // Replace spaces
      value = value.replace(/\D/g, "");
    
      // Loop though the numbers in reverse
      for (var n = value.length - 1; n >= 0; n--) {
        
        // Get the current digit
        const cDigit = value.charAt(n);
        
        // Get the next digit
        let nDigit = parseInt(cDigit, 10);
        
        // If the number is even
        if (bEven) {  
            // If the next digit *= 2 is > 9
            if ((nDigit *= 2) > 9) {
                nDigit -= 9;
            }
        }
        
        // Add the next digit
        nCheck += nDigit;

        // Reverse bEven
        bEven = !bEven;
      }
      
      // Return if the card is valid
      return (nCheck % 10) == 0;
};
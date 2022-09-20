/**
 * Example
 *
 * Simple example component to model real components from.
 */

import ntc from '../vendor/ntc.js';

const GenerateSwatch = ( () => {
  $( document ).ready( () => {

    /**
     * Submit event for the swatch generation form.
     */
    $( '#generate-swatch' ).submit( (e) => {
      e.preventDefault();

      // Get the name and color values from the form.
      const name = $( '#name' ).val();
      const hexColor = $( '#color' ).val();

      // Generate the RGB and CMYK values from the form's hex value.
      const rbgColor = hexToRgb( hexColor );
      const cmykColor = hexToCmyk( hexColor );
      
      // Add the values generated above to the front-end display.
      $( '.color-swatch' ).css( 'backgroundColor', hexColor );
      $( '.color-name' ).text( name );
      $( '.color-hex').text( hexColor );
      $( '.color-rgb' ).text( rbgColor );
      $( '.color-cmyk' ).text( cmykColor );

      // Show the color swatch!
      $( '#swatch' ).show();

      // Also show the download button, now that we have a swatch.
      $( '#download' ).show();
    } );


    /**
     * Change event for the color selector.
     */
    $( '#color' ).change( (e) => {
      ntc.init();

      // Get the hex value of the selected color.
      const color = $( '#color' ).val();

      // Use the NTC library to generate a color name.
      const ntcName = color ? ntc.name( color ) : '';

      // If a name was generated, populate it in the name input field.
      if ( ntcName ) {
        $( '#name' ).val( ntcName[1] );
      }

      // Change the site background color to this color, just for fun.
      $( 'body' ).css( 'backgroundColor', color );

      // Hide the previous color swatch, if there is one.
      $( '#swatch' ).hide();
    } );


    /**
     * Click event for the download button.
     * 
     * Reference: https://html2canvas.hertzen.com/
     */
    $( '#download' ).click( (e) => {
      e.preventDefault();

      // Get the color name to use as the file name. If there is no color name,
      // default to 'color'.
      let colorName = $( '#name' ).val();
      if ( !colorName ) { colorName = 'color' };
      colorName.replace( ' ', '' );

      // This does not like it when I use jQuery, so native JS it is!
      html2canvas( document.getElementById( 'swatch' ) ).then(
        function (canvas) {			
          var anchorTag = document.createElement( 'a' );
          document.body.appendChild( anchorTag );
          document.getElementById( 'swatch-download' ).appendChild( canvas );
          anchorTag.download = colorName + '.jpg';
          anchorTag.href = canvas.toDataURL();
          anchorTag.target = '_blank';
          anchorTag.click();
		    }
      );
    } );


    /**
     * hexToRgbValues()
     * 
     * Utility function to separate the passed-in hex value (string) into
     * an array containing its individual red, green, and blue values.
     */
    function hexToRgbValues( hex ) {
      // Separate out the passed-in hex value into its 3 color values (array).
      const separatedHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec( hex );

      // Return null if there are no results from the separation.
      if ( !separatedHex ) return null;

      // If the separation worked, return an array with the red, green, and 
      // blue values.
      return [ 
        parseInt(separatedHex[1], 16), 
        parseInt(separatedHex[2], 16), 
        parseInt(separatedHex[3], 16)
      ];
    }


    /**
     * hexToRgb()
     * 
     * Convert the passed-in hex value to a RGB value. Returns a string 
     * representing that RGB value.
     */
    function hexToRgb( hex ) {
      // Separate out the passed-in hex value into its 3 color values (array).
      const rgbValues = hexToRgbValues( hex );

      // If we get results, return this color as a RGB-formatted color.
      // Otherwise, return nothing.
      return rgbValues ? 'RBG: ' + rgbValues[0] + ', ' + rgbValues[1] + ', ' + rgbValues[2] : null;
    }


    /**
     * hexToCmyk()
     * 
     * Convert the passed-in hext value to a CMYK value. Returns a string 
     * representing that CMYK value.
     */
    function hexToCmyk( hex ) {
      // First, convert the hex to RGB values.
      const rgbValues = hexToRgbValues( hex );

      // Get RGB values from array
      const r = rgbValues['0'];
      const g = rgbValues['1'];
      const b = rgbValues['2'];

      // Then convert to CMYK.
      let cyan    = 1 - ( r / 255 );
      let magenta = 1 - ( g / 255 );
      let yellow  = 1 - ( b / 255 );

      let black = Math.min( cyan, magenta, yellow );

      cyan    = ( black != 1 ) ? Math.round( (cyan    - black) / (1 - black) * 100 ) : 0;
      magenta = ( black != 1 ) ? Math.round( (magenta - black) / (1 - black) * 100 ) : 0;
      yellow  = ( black != 1 ) ? Math.round( (yellow  - black) / (1 - black) * 100 ) : 0;

      black = Math.round( black * 100 );

      return 'CMYK: ' + cyan + ', ' + magenta + ', ' + yellow + ', ' + black;
    }

  } );
})();

export default GenerateSwatch;

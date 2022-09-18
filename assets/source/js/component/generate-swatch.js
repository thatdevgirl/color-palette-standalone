/**
 * Example
 *
 * Simple example component to model real components from.
 */

const GenerateSwatch = ( () => {
  $( document ).ready( () => {

    $( '#generate-swatch' ).submit( (e) => {
      e.preventDefault();

      const color = $( '#color' ).val();
      
      $( '.color-swatch' ).css( 'backgroundColor', color );
      $( '.color-name' ).text( 'Color' );
      $( '.color-hex').text( color );
    } );

  } );
})();

export default GenerateSwatch;

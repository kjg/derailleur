// ==========================================================================
// Project:   Derailleur.Torrent
// Copyright: ©2009 Kevin Glowacz
// ==========================================================================

/*
 *   Converts file & folder byte size values to more
 *   readable values (bytes, KB, MB, GB or TB).
 *
 *   @param integer bytes
 *   @returns string
 */
Math.formatBytes = function(bytes) {
    var size;
    var unit;

    // Terabytes (TB).
    if ( bytes >= 1099511627776 ) {
        size = bytes / 1099511627776;
		unit = '_TB';

    // Gigabytes (GB).
    } else if ( bytes >= 1073741824 ) {
        size = bytes / 1073741824;
		unit = '_GB';

    // Megabytes (MB).
    } else if ( bytes >= 1048576 ) {
        size = bytes / 1048576;
		unit = '_MB';

    // Kilobytes (KB).
    } else if ( bytes >= 1024 ) {
        size = bytes / 1024;
		unit = '_KB';

    // The file is less than one KB
    } else {
        size = bytes;
		unit = '_bytes';
    }

	// Single-digit numbers have greater precision
	var precision = 1;
	if (size < 10) {
	    precision = 2;
	}
	size = Math.roundWithPrecision(size, precision);

	// Add the decimal if this is an integer
	if ((size % 1) == 0 && unit != '_bytes') {
		size = size + '.0';
	}

    return size + ' ' + unit.loc();
};

/*
 *   Round a float to a specified number of decimal
 *   places, stripping trailing zeroes
 *
 *   @param float floatnum
 *   @param integer precision
 *   @returns float
 */
Math.roundWithPrecision = function(floatnum, precision) {
    return Math.round ( floatnum * Math.pow ( 10, precision ) ) / Math.pow ( 10, precision );
};

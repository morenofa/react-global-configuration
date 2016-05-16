/**
 * Gulp tasks
 *
 * Check out the /gulp directory for all of the available top level gulp tasks and /lib/gulpTaskGenerators for the
 * various generators that are in use here (and also exported).
 *
 */

require('babel/register');

require('./gulp/test');
require('./gulp/lint');
require('./gulp/build');

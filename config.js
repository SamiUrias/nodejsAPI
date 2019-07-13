/**
 *  Create and export configuration variables
 * 
 */

 // Container for all the environments
 let environments = {}


 // Container (default) environment
 environments.staging = {
     port: 3000, 
     envName: 'staging'
 };


 // Production environment
 environments.production = {
    port: 5000,
    envName: 'production'
 };

 // Determine which environment was passed as a command-line argumet
 let currentEnvironmet = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : '';

 // Check that the current environment is one of the environments above, if not, default ot staging
 let environmentToExport = typeof(environments[currentEnvironmet]) =='object' ? environments[currentEnvironmet] : environments.staging;

 // Export the module
 module.exports = environmentToExport;
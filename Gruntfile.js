module.exports = function(grunt) {

    // config
    grunt.initConfig({
        jasmine: {
            tests: {
                src: 'app.js',
                options: {
                    specs: '*.spec.js',
                    helpers: 'bower_components/angular-mocks/angular-mocks.js',
                    vendor: ['bower_components/angular/angular.js']
                }
            }
        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // tasks
    grunt.registerTask('test', ['jasmine']);
};

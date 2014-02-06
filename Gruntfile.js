module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bump: {
            options: {
                commit: true,
                commitMessage: 'Bumped version to v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        },
        
        jasmine: {
            pivotal: {
                src: 'app/scripts/**/*.js',
                options: {
                    specs: 'spec/*Spec.js'
                }
            }
        },

        jshint: {
            all: ['app/scripts/**/*.js']
        },
        
        watch: {
            files: ['app/scripts/**/*.js', 'spec/*Spec.js'],
            tasks: ['jshint', 'jasmine']
        }

    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', [
        'jshint',
        'jasmine'
    ]);
    
    grunt.registerTask('run', [
        'watch'
    ]);
};
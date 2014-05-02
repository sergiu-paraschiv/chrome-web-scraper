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


        jshint: {
            all: ['components/scripts/**/*.js']
        },
        
        watch: {
            files: ['components/scripts/**/*.js'],
            tasks: ['jshint']
        }

    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('test', [
        'jshint'
    ]);
    
    grunt.registerTask('run', [
        'watch'
    ]);
};
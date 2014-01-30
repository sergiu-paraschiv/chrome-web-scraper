module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            beforeBuild: {
                src: ['build']
            },

            afterBuild: {
                src: ['.tmp', 'build/scripts/templates.js']
            }
        },
        
        ngtemplates: {
            WebScraper: {
                cwd: '',
                src: 'app/views/**/*.html',
                dest: '.tmp/concat/scripts/templates.js'
            }
        },
        
        concat: {
            addTemplates: {
                src: ['.tmp/concat/scripts/app.js', '.tmp/concat/scripts/templates.js'],
                dest: '.tmp/concat/scripts/app.js'
            }
        },
        
        useminPrepare: {
            html: 'popup.html',
            options: {
                root: '.',
                dest: 'build'
            }
        },
  
        usemin: {
            html: 'build/popup.html',
            options: {
                dest: 'build'
            }
        },

        copy: {
            beforeBuild: {
                files: [
                    { expand: true, flatten: true, src: ['app/views/*'], dest: 'build/views/' },
                    { expand: true, flatten: true, src: ['popup.html', 'blank.html', 'icon.24.png', 'manifest.json', 'dom.js'], dest: 'build'}
                ]
            },

            afterBuild: {
                files: [
                    { expand: true, flatten: true, src: ['app/images/*'], dest: 'build/images/' },
                    { expand: true, flatten: true, src: ['.tmp/concat/scripts/*'], dest: 'build/scripts/' }
                ]
            }
        },

        jshint: {
            all: ['app/scripts/**/*.js']
        },
        
        qunit: {
            all: ['tests/**/*.html']
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', [
        'jshint',
        'qunit'
    ]);
    
    grunt.registerTask('build', [
        'clean:beforeBuild',
        'copy:beforeBuild',
        'useminPrepare',
        'usemin',
        'concat:generated',
        'cssmin',
        'ngtemplates',
        'concat:addTemplates',
        'copy:afterBuild',
        'clean:afterBuild'
    ]);
};
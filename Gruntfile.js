module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({

        compile_dir: 'dist',

        timeoflores: [

            '../phaser/plugins/TilemapWalker.js',

            'source/src/Boot.js',
            'source/src/Preloader.js',
            'source/src/MainMenu.js'

        ],

        clean: ['<%= compile_dir %>'],

        concat: {

            timeoflores: {
                src: ['<%= timeoflores %>'],
                dest: '<%= compile_dir %>/timeoflores.js'
            },

        },

        uglify: {

            timeoflores: {
                options: {
                    banner: '/* Time of Lores by Photon Storm */\n'
                },
                src: ['<%= concat.timeoflores.dest %>'],
                dest: '<%= compile_dir %>/timeoflores.min.js'
            },

        },

        copy: {
            main: {
                files: [
                    { src: ['dist/timeoflores.min.js'], dest: 'source/js/timeoflores.min.js' },
                    { src: ['../phaser/dist/phaser-arcade-physics.min.js'], dest: 'source/js/phaser-arcade-physics.min.js' }
                ]
            }
        }

    });

    grunt.registerTask('default', ['concat', 'uglify', 'copy']);
    grunt.registerTask('OLDdefault', ['clean', 'concat', 'uglify', 'copy']);

};

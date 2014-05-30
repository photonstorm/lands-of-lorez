module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({

        compile_dir: 'dist',

        timeoflores: [

            '../phaser-plugins/TilemapWalker/TilemapWalker.js',

            'source/src/Boot.js',
            'source/src/Preloader.js',
            'source/src/Credits.js',
            'source/src/Help.js',
            'source/src/MainMenu.js',
            'source/src/Character.js',
            'source/src/CharacterSelect.js',
            'source/src/Enemy.js',
            'source/src/enemies/Bat.js',
            'source/src/enemies/Duck.js',
            'source/src/enemies/Frog.js',
            'source/src/enemies/Plotop.js',
            'source/src/enemies/Snake.js',
            'source/src/Map.js',
            'source/src/MiniMap.js',
            'source/src/FightScreen.js',
            'source/src/UI.js',
            'source/src/Game.js',
            'source/src/GameOver.js',
            'source/src/WellDone.js'

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
                    banner: '/* Time of Lores by Photon Storm. Made with Phaser http://phaser.io */\n'
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

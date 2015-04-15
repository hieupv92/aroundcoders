module.exports = function(grunt) {
 grunt.initConfig({
     concat: {
        css: {
           src: [
              'css/raw/css/*.css',
              '!css/raw/css/modules.css',
           ],
           dest: 'css/raw/css/nightfury.css'
        },
        js: {
          src: [
            'js/raw/global.js',
            'js/raw/services/*.js',
            'js/raw/modules/*.js',
            'js/raw/template.js',
            'js/raw/routes.js',
            'js/raw/filters.js',
            'js/raw/controllers/*.js',
          ],
          dest: 'js/nightfury.js'
        }
     },
     watch: {
       css: {
         files: ['css/raw/css/*.css'],
         tasks: ['concat:css'],
         options: {
           spawn: false,
         },
       },
       js: {
         files: [
          'js/raw/global.js',
          'js/raw/services/*.js',
          'js/raw/modules/*.js',
          'js/raw/template.js',
          'js/raw/routes.js',
          'js/raw/filters.js',
          'js/raw/controllers/*.js',
         ],
         tasks: ['concat:js'],
         options: {
           spawn: false,
         },
       },
     },
 });

 grunt.loadNpmTasks('grunt-contrib-concat');
 grunt.loadNpmTasks('grunt-contrib-watch');

 grunt.registerTask('default', ['concat', 'watch']);
};
module.exports = function(grunt) {
  grunt.initConfig({
    lesslint: {
      src: [
        'assets/less/includes.less'  
      ],
      options: {
        imports: [
          'assets/less/styles.less'
        ]
      }
    },
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          'assets/build/css/styles.css': 'assets/less/includes.less',
        }
      }
    },
   autoprefixer: {
      options: {
        cascade: true
      },
      development: {
        browsers: ['> 2 %', 'last 2 version', 'BB 7', 'BB 10', 'Android 2', 'Android 3', 'Android 4', 'Android 5', 'Firefox ESR'],
        expand: true,
        flatten: true,
        src: 'assets/build/css/*.css',
        dest: 'assets/build'
      }
    },
    bowercopy: {
        options: {
            destPrefix: 'assets/scripts/',
            srcPrefix: 'bower_components/'
        },
        vendor: {
            files: {
            'vendor/jquery/jquery.min.js' : 'jquery/jquery.min.js',
            //'vendor/isotope/isotope.pkgd.min.js' : 'isotope/dist/isotope.pkgd.min.js',
            'vendor/jquery-unveil/jquery.unveil.min.js' : 'jquery-unveil/jquery.unveil.min.js'
            }
        },

    },
    modernizr: {
        dist: {
            // [REQUIRED] Path to the build you're using for development.
            "devFile" : "assets/scripts/vendor/modernizr/modernizr.dev.js",

            // [REQUIRED] Path to save out the built file.
            "outputFile" : "assets/build/js/modernizer/modernizr-custom.min.js",

            // Based on default settings on http://modernizr.com/download/
            "extra" : {
                "shiv" : true,
                "printshiv" : false,
                "load" : true,
                "mq" : false,
                "cssclasses" : true
            },
            // Based on default settings on http://modernizr.com/download/
            "extensibility" : {
                "addtest" : false,
                "prefixed" : false,
                "teststyles" : false,
                "testprops" : false,
                "testallprops" : false,
                "hasevents" : false,
                "prefixes" : false,
                "domprefixes" : false
            },

            // By default, source is uglified before saving
            "uglify" : true,

            // Define any tests you want to implicitly include.
            "tests" : [],

            // By default, this task will crawl your project for references to Modernizr tests.
            // Set to false to disable.
            "parseFiles" : true,

            // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
            // You can override this by defining a "files" array below.
            // "files" : {
                // "src": []
            // },

            // When parseFiles = true, matchCommunityTests = true will attempt to
            // match user-contributed tests.
            "matchCommunityTests" : false,

            // Have custom Modernizr tests? Add paths to their location here.
            "customTests" : []
        }

    },
    watch: {
      styles: {
        files: ['assets/less/**/*.less', '*.html'],
        tasks: ['less', 'autoprefixer', 'modernizr'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['assets/scripts/*.js'],
        tasks: [],
        options: {
          livereload: true
        }
      },
      configFiles: {
        files: [ 'gruntfile.js' ],
        options: {
          reload: true
        }
      },
      dependencies: {
        files: ['bower.json'],
        tasks: ['bowercopy'],
        options: {
          livereload: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-lesslint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};
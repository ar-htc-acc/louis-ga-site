module.exports = function (grunt) {

    // https://github.com/sindresorhus/time-grunt
    require('time-grunt')(grunt);

    grunt.initConfig({
        // tasks
        pkg: grunt.file.readJSON('package.json'),
        less: {
            prod: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['> 1%', 'ie 9', 'last 2 versions']}),
                        new (require('less-plugin-clean-css'))({advanced: true, compatibility: 'ie9'})
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets/',
                    src: ['**/*.less', '!lib/**/*.less'], // don't compile Less lib
                    dest: 'public/build/css/',
                    ext: '.min.css'
                }]
            },
            dev: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets/',
                    src: ['**/*.less', '!lib/**/*.less'], // don't compile Less lib
                    dest: 'public/tmp/css/',
                    ext: '.css'
                }]
            }
        },
        browserify: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/javascripts/',
                    src: ['**/*.js', '!modules/**/*.js'], // do not browserify modules in the 'modules' directory
                    dest: 'public/tmp/js/',
                    ext: '.js'
                }]
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                //mangle: true // obfuscating might create some bugs, e.g., "var A = ...;", "var B = ...;" all becomes "var a = ..."
                mangle: false
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/tmp/js/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'public/build/js/',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            options: { livereload: true },
            scripts: {
                files: ['public/javascripts/**/*.js'],
                tasks: ['browserify']
            },
            styles: {
                files: ['public/stylesheets/**/*.less'],
                tasks: ['less:dev']
            },
            ejs: {
                files: ['views/**/*.ejs']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch'); // watch and execute tasks

    // personal:
    grunt.registerTask('prod-done-message', 'Print this when it is done.', function () {
        grunt.log.writeln('* Done running PRODUCTION Grunt tasks! *');
    });

    // dev
    grunt.registerTask('default', ['browserify', 'less:dev']); // npm run grunt

    grunt.registerTask('less-compile', ['less:dev']); // just run less

    // prod
    // Whenever this "alias task" is run, every specified task in taskList will be run, in the order specified. The taskList argument must be an array of tasks.
    grunt.registerTask('build', ['browserify', 'uglify', 'less:prod', 'prod-done-message']); // npm run grunt build
};
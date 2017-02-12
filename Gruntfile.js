module.exports = function (grunt) {

    grunt.initConfig({
        // tasks
        pkg: grunt.file.readJSON('package.json'),
        less: {
            prod: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 9 versions"]}),
                        new (require('less-plugin-clean-css'))({ compatibility: '*' })
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
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 9 versions"]})
                    ]
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
                    src: ['**/*.js', '!module-*.js'], // module-*.js are modules that are used by other JS files, don't include them
                    dest: 'public/tmp/js/',
                    ext: '.js'
                }]
            }
        },
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
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
            scripts: {
                files: ['public/javascripts/**/*.js'],
                tasks: ['browserify', 'uglify'] // the order matters?
            },
            styles: {
                files: ['public/stylesheets/**/*.less'],
                tasks: ['less:dev']
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
    grunt.registerTask('build', ['browserify','uglify', 'less:prod', 'prod-done-message']); // npm run grunt build
};
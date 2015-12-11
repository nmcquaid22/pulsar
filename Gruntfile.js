module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({

        pkg:     grunt.file.readJSON('package.json'),
        pulsar:  grunt.file.readJSON('pulsar.json'),
        secrets: grunt.file.readJSON('secrets.json'),

        mailgun: {
            cmsDetail: {
                options: {
                    key: '<%= secrets.mailgun.api_key %>',
                    sender: '<%= secrets.mailgun.sender %>',
                    recipient: '<%= secrets.mailgun.recipient %>',
                    subject: 'Test Pulsar Email Template',
                    preventThreading: true,
                    hideRecipient: true
                },
                src: ['emails/dist/*.html']
            }
        },

        browserify: {
            dev: {
                files: {
                    'dist/js/bundle.js': ['js/index.js'],
                    'dist/js/test.js': ['tests/js/index.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'pulsar'
                    }
                }
            },
            dist: {
                files: {
                    'dist/js/bundle.js': ['js/index.js'],
                    'dist/js/test.js': ['tests/js/index.js']
                },
                options: {
                    browserifyOptions: {
                        standalone: 'pulsar'
                    },
                    transform: ['uglifyify']
                }
            }
        },

        phpunit: {
            classes: {
                dir: 'tests/unit/'
            },
            options: {
                bin: 'vendor/bin/phpunit',
                bootstrap: 'tests/unit/bootstrap.php',
                colors: true
            }
        },

        sass: {
            dev: {
                options: {
                    style: 'nested',
                    sourceMap: true
                },
                files: [{
                    cwd:    'stylesheets/',
                    dest:   'css/',
                    expand: true,
                    ext:    '.css',
                    extDot: 'first',
                    src:    '*.scss'
                }]
            },
            dist_modern: {
                options: {
                    outputStyle: 'compressed'
                },
                files: [{
                    cwd:    'stylesheets/',
                    dest:   'dist/css/',
                    expand: true,
                    flatten: true,
                    ext:    '.css',
                    extDot: 'first',
                    src:    ['pulsar.scss', 'documentation.scss']
                }]
            },
            dist_ie: {
                options: {
                    outputStyle: 'nested'
                },
                files: [{
                    cwd:    'stylesheets/',
                    dest:   'dist/css/',
                    expand: true,
                    flatten: true,
                    ext:    '.css',
                    extDot: 'first',
                    src:    'pulsar-ie*.scss'
                }]
            },
            email: {
                options: {
                    style: 'nested',
                    sourceMap: true
                },
                files: [{
                    cwd:    'emails/stylesheets/',
                    dest:   'emails/css/',
                    expand: true,
                    ext:    '.css',
                    extDot: 'first',
                    src:    '*.scss'
                }]
            }
        },

        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 version', 'ie 7', 'ie 8', 'ie 9']
                },
                expand: true,
                src:    'css/*.css'
            }
        },

        watch: {
            css: {
                files: ['stylesheets/**/*.scss'],
                tasks: ['sass:dev', 'autoprefixer'],
                options: {
                    livereload: true,
                },
            },
            emails: {
                files: ['emails/**/*'],
                tasks: ['emailBuilder']
            },
            js: {
                files: ['js/**/*.js', 'tests/js/**/*', 'package.json'],
                tasks: ['browserify']
            }
        },

        jshint: {
            options: {
            jshintrc: '.jshintrc'
            },
            all: ['js/**/*.js']
        },

        mocha: {
            test: {
                src: ['tests/**/*.html'],
                options: {
                    reporter: 'Nyan',
                    run: true
                }
            },
        },

        uglify: {
            concat: {
                options: {
                    banner: '<%= pkg.banner %>',
                    beautify: true
                },
                files: {
                    'dist/js/<%= pkg.name %>.js': ['js/**/*.js']
                }
                },
                minify: {
                options: {
                    banner: '<%= pkg.banner %>',
                    compress: true,
                    report: 'min'
                },
                files: {
                    'dist/js/<%= pkg.name %>.min.js': ['js/**/*.js']
                }
            }
        },

        asciify: {
            banner:{
            text: '<%= pkg.name %>',
            options: {
                font: 'univers',
                log: true
            }
            },
        },

        copy: {
          dist: {
            files: [{
                    expand: true,
                    cwd: '',
                    src: [
                        'fonts/**/*',
                        'images/**/*',
                        'libs/**/*',
                        'views/pulsar/**/*',
                        'src/**/*'
                    ],
                    dest: 'dist/'
                }]
            }
        },

        clean: {
            dist: ['dist'],
            smoketest: ['tmp/failures/*']
        },

        bump: {
            options: {
            updateConfigs: ['pkg'],
            files: ['pulsar.json', 'package.json', 'composer.json', 'bower.json', 'VERSION'],
            commit: true,
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['-a'],
            createTag: true,
            tagName: '%VERSION%',
            push: true,
            pushTo: 'origin'
            }
        },

        emailBuilder: {
            inline: {
                files : [{
                    expand: true,
                    flatten: true,
                    src: ['emails/src/**/*.html'],
                    dest: 'emails/dist/'
                }]
            },
            options: {
                encodeSpecialChars: true
            }
        },

        exec: {
            phantomcss: {
                cmd: 'phantomjs tests/css/testsuite.js'
            },
            updateComposer: {
                cmd: 'sudo php composer.phar update'
            },
            updateBrew: {
                cmd: 'brew update && brew upgrade'
            },
            updateBower: {
                cmd: 'bower update'
            },
            updateGems: {
                cmd: 'sudo gem update'
            },
            updateNpm: {
                cmd: 'sudo npm install'
            }
        }

    });

    grunt.config.set('leadingIndent.indentation', 'spaces');

    grunt.config.set('leadingIndent.files', {
        src : [
            'docs/**/*.md',
            'docs/**/*.php',
            'css/**/*',
            'js/**/*',
            'lexicon/**/*',
            'src/**/*',
            'stylesheets/**/*',
            'tests/**/*',
            'views/**/*'
        ]
    });

    grunt.registerTask('default', [
        'copy',
        'sass:dev',
        'browserify',
        'watch',
        'email-build'
    ]);

    grunt.registerTask('post-merge', ['sass:dev', 'browserify', 'email-build']);

    grunt.registerTask('build', [
        'sass:dist_modern',
        'sass:dist_ie',
        'browserify:dist',
        'copy:dist',
        'emailBuilder'
    ]);

    grunt.registerTask('email-build', [
        'sass:email',
        'emailBuilder'
    ]);

    grunt.registerTask('email-test', [
        'email-build',
        'mailgun'
    ]);

    grunt.registerTask('pre-commit', [
        'asciify',
        'phpunit'
    ]);

    grunt.registerTask('smoketest', [
        'clean:smoketest',
        'exec:phantomcss'
    ]);

    grunt.registerTask('update', [
        'exec:updateComposer',
        'exec:updateBrew',
        'exec:updateBower',
        'exec:updateGems',
        'exec:updateNpm'
    ]);

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};

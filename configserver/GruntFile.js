module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        typescript: {
            base: {
                src: ['lib/**/*.ts', 'js/**/*.ts'],
                options: {
                    module: 'commonjs',
                    target: 'es5'
                }
            }
        },
        
        watch: {
            files: '**/*.ts',
            tasks: ['typescript'],
        },
		
    });
 
    grunt.registerTask('default', ['watch']);
 
}
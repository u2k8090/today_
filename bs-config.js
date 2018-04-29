// php
// module.exports = {
//     proxy: "http://XXXXXXX.dev",
//     files: ["./wordpress/wp-content/themes/meme/assets/**/*","./wordpress/wp-content/themes/meme/**/*.php"],
//     open: 'external',
//     notify: true
// }

// html
module.exports = {
    files: ["./dist/css/**/*.css", "./dist/js/**/*.js", "./**/*.html"],
    server: {
        "baseDir": "./"
    },
    startpath: 'index.html',
    open: 'external',
    notify: true,
}

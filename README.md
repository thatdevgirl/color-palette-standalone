# Static Website Base

This repository is my personal standard base for any static website.  It can and will be modified to suit a particular project.

## Getting Started
1. Fork or clone this repository.
2. In the repository directory, run `npm install`.
3. Run the `gulp` script to build the CSS and Javascript files.

## Asset Directories

Directory | Description
--- | ---
`/assets/source/scss/` | Location of all `.scss` files. SCSS files are divided into `base/`, `layout/`, and `component/` directories. The Gulp script will compile the files, as they are listed in `styles.scss` and minify the compiled result.
`/assets/source/js/` | Location of all Javascript files. Javascript files are divided into `base/` and `component/` directories. Reusable code goes into the `base/` directory. The Gulp script will compile, minify, and concatenate all files (along with jQuery, from npm) into a single `scripts.min.js` file.  You will need to update `gulpfile.js` as you add additional JS files.
`/assets/build/css/` | Location of the compiled CSS file, `styles.min.css`.
`/assets/build/js/` | Location of the compiled Javascript file, `scripts.min.js`.

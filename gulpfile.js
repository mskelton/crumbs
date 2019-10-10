const { src, dest, watch } = require('gulp')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const ts = require('gulp-typescript')
const jest = require('gulp-jest')

const tsProject = ts.createProject({
  declaration: true,
})

function build() {
  return src('packages/*/src/*.{ts,tsx}', { sourcemaps: true })
    .pipe(
      babel({
        presets: [
          '@babel/preset-typescript',
          '@babel/preset-env',
          '@babel/preset-react',
        ],
      }),
    )
    .pipe(
      rename(path => {
        path.dirname = path.dirname.replace('/src', '/lib')
      }),
    )
    .pipe(dest('packages', { sourcemaps: '.' }))
}

function test() {
  return src('packages/*/test/*.spec.js').pipe(jest())
}

exports.build = build
exports.test = test

var identifiers = {
  comments: {
    regexes: [
      /[^https*:]\/\/.*[^\n]+/g, // C-style
      // /#.*[^\n]+/g // Python, shell.
    ]
  },
  functions: {
    regexes: [
      /function\s*.*\(.*\).*[^\n]/g, // JS
      /fn\s*.*\(.*\).*[^\n]/g, // Rust
      /func\s*.*\(.*\).*[^\n]/g, // Swift
      /def\s\w+\(.*\):/g // Python
    ]
  }
};

module.exports = {
  identifiers: identifiers
};
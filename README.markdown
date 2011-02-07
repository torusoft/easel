# Easel Guide

Easel runs on [SASS][1]

To install: `gem install sass --pre`

Once installed: `sass --watch assets/styles/screen.scss`

To set up the standard set of scripts in your project:

1. Copy Rakefile.example from this submodule to the project's root directory and rename it `Rakefile`
2. In the newly named `Rakefile`, change the following values, if necessary:
    * `easel_dir`: should point to (this) easel submodule's directory
    * `script_dir`: should point to the site's scripts/ directory
3. Run `rake` from that same directory on the command line

[1]: http://sass-lang.com/
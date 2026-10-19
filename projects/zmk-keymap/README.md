# zmk-keymap

Landing page for [plasma-zmk-keymap](https://github.com/nirokato/plasma-zmk-keymap),
a KDE Plasma 6 widget that reads the keymap off a ZMK keyboard over ZMK Studio
and draws every layer as auto-arranged tiles.

**Live:** [zmk-keymap.apps.andymolenda.com](https://zmk-keymap.apps.andymolenda.com)

A *just for fun* project (see Project classes in the root CLAUDE.md): the
widget repo has Issues and pull requests off, and is MIT licensed for forks.

## Tech

Single static page. The download button points at the widget repo's latest
release asset (`releases/latest/download/com.nirokato.zmkkeymap.plasmoid`), so
new widget releases need no change here. `tiles.png` is rendered by the widget
repo's `tools/preview.sh` in this site's palette at 2x.

# CSS Style

This style guide is based on Nicholas Gallagher's [idiomatic css](https://github.com/necolas/idiomatic-css), which was inspired by Rick Waldron's [idiomatic.js](https://github.com/rwldrn/idiomatic.js).


## Table of contents

1. [General principles](#general-principles)
2. [Whitespace](#whitespace)
3. [Comments](#comments)
4. [Format](#format)
5. [Naming](#naming)
6. [Practical example](#example)
7. [Organization](#organization)
8. [Build and deployment](#build-and-deployment)

[Acknowledgements](#acknowledgements)


<a name="general-principles"></a>
## 1. General principles

> "Part of being a good steward to a successful project is realizing that
> writing code for yourself is a Bad Idea™. If thousands of people are using
> your code, then write your code for maximum clarity, not your personal
> preference of how to get clever within the spec." - Idan Gazit

* All code in any code-base should look like a single person typed it, no
  matter how many people contributed.
* Strictly enforce the agreed upon style.
* If in doubt, use existing, common patterns.


<a name="whitespace"></a>
## 2. Whitespace

Only one style should exist across the entire source of your project. Always be
consistent in your use of whitespace. Use whitespace to improve readability.

* _Never_ mix spaces and tabs for indentation.
* Use **soft indents (2 spaces).**
* To ensure that you are removing whitespace, consider the following options:
  * Work with the "show invisibles" setting turned on.
  * Set up a macro/command that automatically removes the spaces on Save
  * Incorporate a pre-commit hook that automatically removes the spaces on commit


<a name="comments"></a>
## 3. Comments

Well commented code is extremely important. Take time to describe components,
how they work, their limitations, and the way they are constructed. Don't leave
others in the team guessing as to the purpose of uncommon or non-obvious
code.

Comment style should be simple and consistent within a single code base.

* Place comments on a new line above their subject.
* Avoid end of line comments.
* Keep line-length to a sensible maximum, e.g., 80 columns.
* Make liberal use of comments to break CSS code into discrete sections.
* Use "sentence case" comments and consistent text indentation.

Tip: configure your editor to provide you with shortcuts to output agreed-upon
comment patterns.

#### CSS example:

```css
/* ==========================================================================
   Section comment block
   ========================================================================== */

/* Sub-section comment block
   ========================================================================== */

/*
 * Group comment block.
 * Ideal for multi-line explanations and documentation.
 */

/* Basic comment */
```

#### SCSS example:

```scss
// ==========================================================================
// Section comment block
// ==========================================================================

// Sub-section comment block
// ==========================================================================

//
// Group comment block
// Ideal for multi-line explanations and documentation.
//

// Basic comment
```


<a name="format"></a>
## 4. Format

The chosen code format must ensure that code: is easy to read; is easy to clearly
comment; minimizes the chance of accidentally introducing errors; and results
in useful diffs and blames.

1. One discrete selector per line in multi-selector rulesets.
2. A single space before the opening brace of a ruleset.
3. One declaration per line in a declaration block.
4. One level of indentation for each declaration.
5. A single space after the colon of a declaration.
6. Always include a semi-colon at the end of the last declaration in a
   declaration block.
7. Place the closing brace of a ruleset in the same column as the first
   character of the ruleset.
8. Separate each ruleset by a blank line.

```css
.selector-1,
.selector-2,
.selector-3 {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  color: #333;
  background: #fff;
}
```

#### Declaration order

* Group related properties together
* Declare structurally important properties (e.g. positioning and box-model)
    before typographic, background, and color properties.

```css
.selector {
  position: relative;
  display: block;
  width: 50%;
  height: 100px;
  padding: 10px;
  border: 0;
  margin: 10px;
  color: #fff
  background: #000;
}
```

#### Exceptions and slight deviations

Large blocks of single declarations can use a slightly different, single-line
format. In this case, a space should be included after the opening brace and
before the closing brace.

```css
.selector-1 { width: 10%; }
.selector-2 { width: 20%; }
.selector-3 { width: 30%; }
```

Long, comma-separated property values such as collections of gradients or
shadows can be arranged across multiple lines in an effort to improve
readability and produce more useful diffs. There are various formats that could
be used; one example is shown below.

```css
.selector {
  box-shadow: 1px 1px 1px #000,
              2px 2px 1px 1px #ccc inset;
  background-image: linear-gradient(#fff, #ccc),
                      linear-gradient(#f3c, #4ec);
}
```

#### Misc

* Use lowercase hex values: `#aaa`.
* Omit quotes for background images:
  `background-image: url(/path/to/image.png)`.
* Use double quotes for generated content:
  `content: ""`.
* Always quote attribute values in selectors: e.g., `input[type="checkout"]`.
* _Where allowed_, avoid specifying units for zero-values: `margin: 0`.

### SCSS: additional format considerations

* Limit nesting to 2 levels deep. Reassess any nesting more than 2 levels deep.
  This prevents overly specific CSS selectors.
* Avoid large numbers of nested rules. Break them up when readability starts to
  be affected. Preference: avoid nesting that spreads over more than 20
  lines.
* Always place `@extend` statements on the first lines of a declaration
  block.
* Where possible, group `@include` statements at the top of a declaration
  block, after any `@extend` statements.
* Consider prefixing custom functions with `x-` or another namespace. This
  helps to avoid any potential to confuse your function with a native CSS
  function, or to clash with functions from libraries.

```scss
.selector-1 {
  @extend .other-rule;
  @include clearfix();
  @include box-sizing(border-box);
  width: 100%;
  // other declarations
}
```

* Place nested rules **after** all of the current element's declarations
* Place rules referring to the same element before those referring to
  descendant elements.

```scss
.selector-1 {
  position: relative;

  &.selector-2 {
    display: none;
  }

  &:before {
    content: " X ";
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
  }

  .descendant-1 {
    float: left;
  }
}
```

<a name="naming"></a>
## 5. Naming

You are not a human code compiler/compressor, so don't try to be one.

Use clear and thoughtful names for HTML classes. Pick an understandable and
consistent naming pattern that makes sense both within HTML files and CSS
files.

```scss
// Using SCSS-style comments...

// Example of code with bad names

.s-scr {
    overflow: auto;
}

.cb {
    background: #000;
}

// Example of code with better names

.is-scrollable {
    overflow: auto;
}

.column-body {
    background: #000;
}
```


<a name="organization"></a>
## 6. Organization

Code organization is an important part of any CSS code base, and crucial for
large code bases.

* Logically separate distinct pieces of code.
* Use separate files (concatenated by SCSS @import rules) to help break up code for
  distinct components.
* Using SCSS, abstract common code into mixins and variables for color,
  typography, etc.


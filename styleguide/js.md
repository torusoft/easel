# JavaScript Style

This style guide is based on Rick Waldron's [idiomatic.js](https://github.com/rwldrn/idiomatic.js).


## All code at Fusionary should look like a single person typed it, no matter how many people contributed.

> ### "Part of being a good steward to a successful project is realizing that writing code for yourself is a Bad Idea™. If thousands of people are using your code, then write your code for maximum clarity, not your personal preference of how to get clever within the spec."
>_Idan_ _Gazit_


## Table of Contents

 * [Whitespace](#whitespace)
 * [Beautiful Syntax](#spacing)
 * [Type Checking (Courtesy jQuery Core Style Guidelines)](#type)
 * [Conditional Evaluation](#cond)
 * [Naming](#naming)
 * [Misc](#misc)
 * [Comments](#comments)


------------------------------------------------


## Preface

The following sections outline a _reasonable_ style guide for modern JavaScript development and are not meant to be construed as *the one, true way*. However, it is a set of guidelines that we at Fusionary have decided to follow, so within the context of work at Fusionary, these guidelines are law.


## Idiomatic Style Manifesto


1. <a name="whitespace">Whitespace</a>
  - _Never_ mix spaces and tabs for indentation.
  - Use **soft indents (2 spaces).**
  - **Remove all end-of-line and blank-line whitespace**. This enforces consistency and makes commits and diffs easier to read. To ensure that you are removing whitespace, consider the following options:
    - Work with the "show invisibles" setting turned on.
    - Set up a macro/command that automatically removes the spaces on Save
    - Incorporate a pre-commit hook that automatically removes the spaces on commit

2. <a name="spacing">Beautiful Syntax</a>

    A. Parens, Braces, Linebreaks

    ```javascript

    // if/else/for/while/try always have spaces, braces and span multiple lines
    // this encourages readability

    // 2.A.1.1
    // Examples of really cramped syntax

    if(condition) doSomething();

    while(condition) iterating++;

    for(var i=0;i<100;i++) someIterativeFn();


    // 2.A.1.1
    // Use whitespace to promote readability

    if ( condition ) {
      // statements
    }

    while ( condition ) {
      // statements
    }

    for ( var i = 0; i < 100; i++ ) {
      // statements
    }

    // Even better:

    var i,
        length = 100;

    for ( i = 0; i < length; i++ ) {
      // statements
    }


    var prop;

    for ( prop in object ) {
      // statements
    }


    if ( true ) {
      // statements
    } else {
      // statements
    }
    ```


    B. Assignments, Declarations, Functions ( Named, Expression, Constructor )

    ```javascript

    // 2.B.1.1
    // Variables
    var foo = "bar",
        num = 1,
        undef;

    // Literal notations:
    var array = [],
        object = {};


    // 2.B.1.2
    // Using only one `var` per scope (function) promotes readability
    // and keeps your declaration list free of clutter (also saves a few keystrokes)

    // Bad
    var foo = "";
    var bar = "";
    var qux;

    // Good
    var foo = "",
        bar = "",
        quux;


    // 2.B.1.3
    // var statements should always be in the beginning of their respective scope (function).

    // Bad
    function foo() {

      // some statements here

      var bar = "",
          qux;
    }

    // Good
    function foo() {
      var bar = "",
          qux;

      // all statements after the variables declarations.
    }
    ```

    ```javascript

    // 2.B.2.1
    // Named Function Declaration
    function foo( arg1, argN ) {

    }

    // Usage
    foo( arg1, argN );


    // 2.B.2.2
    // Named Function Declaration
    function square( number ) {
      return number * number;
    }

    // Usage
    square( 10 );

    // Really contrived continuation passing style
    function square( number, callback ) {
      callback( number * number );
    }

    square( 10, function( square ) {
      // callback statements
    });


    // 2.B.2.3
    // Function Expression
    var square = function( number ) {
      // Return something valuable and relevant
      return number * number;
    };

    // Function Expression with Identifier
    // This preferred form has the added value of being
    // able to call itself and have an identity in stack traces:
    var factorial = function factorial( number ) {
      if ( number < 2 ) {
        return 1;
      }

      return number * factorial( number-1 );
    };


    // 2.B.2.4
    // Constructor Declaration
    function FooBar( options ) {

      this.options = options;
    }

    // Usage
    var fooBar = new FooBar({ a: "alpha" });

    fooBar.options;
    // { a: "alpha" }

    ```


    C. Exceptions, Slight Deviations

    ```javascript

    // 2.C.1.1
    // Functions with callbacks
    foo(function() {
      // Note there is no extra space between the first paren
      // of the executing function call and the word "function"
    });

    // Function accepting an array, no space
    foo([ "alpha", "beta" ]);

    // 2.C.1.2
    // Function accepting an object, no space
    foo({
      a: "alpha",
      b: "beta"
    });

    // Single argument string literal, no space
    foo("bar");

    // Inner grouping parens, no space
    if ( !("foo" in obj) ) {

    }

    ```

    D. Consistency Always Wins

    In sections 2.A-2.C, the whitespace rules are set forth as a recommendation with a simpler, higher purpose: consistency.
    It's important to note that formatting preferences, such as "inner whitespace" should be considered optional, but only one style should exist across the entire source of your project.

    ```javascript

    // 2.D.1.1

    if (condition) {
      // statements
    }

    while (condition) {
      // statements
    }

    for (var i = 0; i < 100; i++) {
      // statements
    }

    if (true) {
      // statements
    } else {
      // statements
    }

    ```

    E. Quotes

    Whether you prefer single or double shouldn't matter; there is no difference in how JavaScript parses them. What **ABSOLUTELY MUST** be enforced is consistency.

    At Fusionary, we use **single quotes** in JavaScript.

3. <a name="type">Type Checking (Courtesy jQuery Core Style Guidelines)</a>

    A. Actual Types

    String:

        typeof variable === "string"

    Number:

        typeof variable === "number"

    Boolean:

        typeof variable === "boolean"

    Object:

        typeof variable === "object"

    Array:

        Array.isArray( arrayLikeObject )
        (wherever possible)

    Node:

        elem.nodeType === 1

    null:

        variable === null

    null or undefined:

        variable == null

    undefined:

      Global Variables:

        typeof variable === "undefined"

      Local Variables:

        variable === undefined

      Properties:

        object.prop === undefined
        object.hasOwnProperty( prop )
        "prop" in object

    B. Coerced Types

    Consider the implications of the following...

    Given this HTML:

    ```html

    <input type="text" id="foo-input" value="1">

    ```


    ```javascript

    // 3.B.1.1

    // `foo` has been declared with the value `0` and its type is `number`
    var foo = 0;

    // typeof foo;
    // "number"
    ...

    // Somewhere later in your code, you need to update `foo`
    // with a new value derived from an input element

    foo = document.getElementById("foo-input").value;

    // If you were to test `typeof foo` now, the result would be `string`
    // This means that if you had logic that tested `foo` like:

    if ( foo === 1 ) {

      importantTask();

    }

    // `importantTask()` would never be evaluated, even though `foo` has a value of "1"


    // 3.B.1.2

    // You can preempt issues by using smart coercion with unary + or - operators:

    foo = +document.getElementById("foo-input").value;
    //    ^ unary + operator will convert its right side operand to a number

    // typeof foo;
    // "number"

    if ( foo === 1 ) {

      importantTask();

    }

    // `importantTask()` will be called
    ```

    Here are some common cases along with coercions:


    ```javascript

    // 3.B.2.1

    var number = 1,
      string = "1",
      bool = false;

    number;
    // 1

    number + "";
    // "1"

    string;
    // "1"

    +string;
    // 1

    +string++;
    // 1

    string;
    // 2

    bool;
    // false

    +bool;
    // 0

    bool + "";
    // "false"
    ```


4. <a name="cond">Conditional Evaluation</a>

    ```javascript

    // 4.1.1
    // When only evaluating that an array has length,
    // instead of this:
    if ( array.length > 0 ) ...

    // ...evaluate truthiness, like this:
    if ( array.length ) ...


    // 4.1.2
    // When only evaluating that an array is empty,
    // instead of this:
    if ( array.length === 0 ) ...

    // ...evaluate truthiness, like this:
    if ( !array.length ) ...


    // 4.1.3
    // When only evaluating that a string is not empty,
    // instead of this:
    if ( string !== "" ) ...

    // ...evaluate truthiness, like this:
    if ( string ) ...


    // 4.1.4
    // When only evaluating that a string _is_ empty,
    // instead of this:
    if ( string === "" ) ...

    // ...evaluate falsy-ness, like this:
    if ( !string ) ...


    // 4.1.5
    // When only evaluating that a reference is true,
    // instead of this:
    if ( foo === true ) ...

    // ...evaluate like you mean it, take advantage of built in capabilities:
    if ( foo ) ...


    // 4.1.6
    // When evaluating that a reference is false,
    // instead of this:
    if ( foo === false ) ...

    // ...use negation to coerce a true evaluation
    if ( !foo ) ...

    // ...Be careful: this will also match: 0, "", null, undefined, NaN
    // If you _MUST_ test for a boolean false, then use
    if ( foo === false ) ...


    // 4.1.7
    // When only evaluating a ref that might be null or undefined, but NOT false, "" or 0,
    // instead of this:
    if ( foo === null || foo === undefined ) ...

    // ...take advantage of == type coercion, like this:
    if ( foo == null ) ...

    // Remember, using == will match a `null` to BOTH `null` and `undefined`
    // but not `false`, "" or 0
    null == undefined

    ```
    ALWAYS evaluate for the best, most accurate result - the above is a guideline, not a dogma.

    ```javascript

    // 4.2.1
    // Type coercion and evaluation notes

    // Prefer `===` over `==` (unless the case requires loose type evaluation)

    // === does not coerce type, which means that:

    "1" === 1;
    // false

    // == does coerce type, which means that:

    "1" == 1;
    // true


    // 4.2.2
    // Booleans, Truthies & Falsies

    // Booleans:
    true, false

    // Truthy:
    "foo", 1

    // Falsy:
    "", 0, null, undefined, NaN, void 0

    ```


5. <a name="naming">Naming</a>

    A. You are not a human code compiler/compressor, so don't try to be one.

    The following code is an example of egregious naming:

    ```javascript

    // 5.A.1.1
    // Example of code with poor names

    function q(s) {
      return document.querySelectorAll(s);
    }
    var i,a=[],els=q("#foo");
    for(i=0;i < els.length; i++){a.push(els[i]);}
    ```

    Here's the same piece of logic, but with kinder, more thoughtful naming (and a readable structure):

    ```javascript

    // 5.A.2.1
    // Example of code with improved names

    function query( selector ) {
      return document.querySelectorAll( selector );
    }

    var i,
        elements = [],
        matches = query("#foo"),
        length = matches.length;

    for ( i = 0 ; i < length; i++ ) {
      elements.push( matches[ i ] );
    }

    ```

    A few additional naming pointers:

    ```javascript

    // 5.A.3.1
    // Naming strings

    `dog` is a string


    // 5.A.3.2
    // Naming arrays

    `dogs` is an array of `dog` strings


    // 5.A.3.3
    // Naming functions, objects, instances, etc

    camelCase; function and var declarations


    // 5.A.3.4
    // Naming constructors, prototypes, etc.

    PascalCase; constructor function


    // 5.A.3.5
    // Naming regular expressions

    rDesc = /foo/;


    // 5.A.3.6
    // From the Google Closure Library Style Guide

    functionNamesLikeThis;
    variableNamesLikeThis;
    methodNamesLikeThis;
    ConstructorNamesLikeThis;

    ```


6. <a name="misc">Misc</a>

    This section will serve to illustrate ideas and concepts that should not be considered dogma, but instead exists to encourage questioning practices in an attempt to find better ways to do common JavaScript programming tasks.

    A. Using `switch` should be avoided; modern method tracing will blacklist functions with switch statements

    ```javascript

    // 6.A.1.1
    // An example switch statement

    switch( foo ) {
      case "alpha":
        alpha();
        break;
      case "beta":
        beta();
        break;
      default:
        // something to default to
        break;
    }

    // 6.A.1.2
    // A alternate approach that supports composability and reusability is to
    // use an object to store "cases" and a function to delegate:

    var cases, delegator;

    // Example returns for illustration only.
    cases = {
      alpha: function() {
        // statements
        // a return
        return [ "Alpha", arguments.length ];
      },
      beta: function() {
        // statements
        // a return
        return [ "Beta", arguments.length ];
      },
      _default: function() {
        // statements
        // a return
        return [ "Default", arguments.length ];
      }
    };

    delegator = function() {
      var args, key, delegate;

      // Transform arguments list into an array
      args = [].slice.call( arguments );

      // shift the case key from the arguments
      key = args.shift();

      // Assign the default case handler
      delegate = cases._default;

      // Derive the method to delegate operation to
      if ( cases.hasOwnProperty( key ) ) {
        delegate = cases[ key ];
      }

      // The scope arg could be set to something specific,
      // in this case, |null| will suffice
      return delegate.apply( null, args );
    };

    // 6.A.1.3
    // Put the API in 6.A.1.2 to work:

    delegator( "alpha", 1, 2, 3, 4, 5 );
    // [ "Alpha", 5 ]

    // Of course, the `case` key argument could easily be based
    // on some other arbitrary condition.

    var caseKey, someUserInput;

    // Possibly some kind of form input?
    someUserInput = 9;

    if ( someUserInput > 10 ) {
      caseKey = "alpha";
    } else {
      caseKey = "beta";
    }

    // or...

    caseKey = someUserInput > 10 ? "alpha" : "beta";

    // And then...

    delegator( caseKey, someUserInput );
    // [ "Beta", 1 ]

    // And of course...

    delegator();
    // [ "Default", 0 ]


    ```

    B. Early returns promote code readability with negligible performance difference

    ```javascript

    // 6.B.1.1
    // Bad:
    function returnLate( foo ) {
      var ret;

      if ( foo ) {
        ret = "foo";
      } else {
        ret = "quux";
      }
      return ret;
    }

    // Good:

    function returnEarly( foo ) {

      if ( foo ) {
        return "foo";
      }
      return "quux";
    }

    ```


7. <a name="comments">Comments</a>

* Place comments on a new line above their subject.
* Avoid end of line comments.
* Keep line-length to a sensible maximum, e.g., 80 columns.
* Use "sentence case" comments and consistent text indentation.


### Comma First.

Any project that cites this document as its base style guide will not accept comma first code formatting, unless explicitly specified otherwise by that project's author.
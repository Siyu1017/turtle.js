# Changelog

## v1.3.1 ( 2024-07-07 )

### Fixed
- Calling `turtle.home()` but doesn't work

## v1.3.0 ( 2024-07-07 )

### Fixed
- When the canvas's size is not specified in any form of CSS, its size will be infinitely enlarged.

## v1.2.1 ( 2024-07-06 )

### Fixed
- Changelog.md syntax
- Fix npm not publishing issue

## v1.2.0 ( 2024-07-06 )

### Changed
- Functions used to get the turtle's state will not return a value, they return a Promise object, you can use `.then()` to get the return value.
- Now you can use `.then()` after all the available functions of turtle

    ```js
    // method is a function available in the current version
    turtle.method().then(res => {
        // Do something...
    })
    ```
> Some functions may not return a value

### Fixed
- When using `turtle.left()`, `turtle.right()`, the turtle's heading changes, but the direction does not change.
- Can not get turtle's state ( `turtle.position()`, `turtle.xcor`, `turtle.ycor`... )
- When the transition duration is less than 100ms, the turtle's movement will be uncontrolled

## v1.1.0 ( 2024-07-04 )

### Added 
- turtle and other shapes
- turtle motion transition
- `turtle.setlinecap()`
- `turtle.setlinejoin()`
- `turtle.seteasing()`
- `turtle.setduration()`
- `turtle.showturtle()`
- `turtle.hideturtle()`
- `turtle.isvisible()`
- `turtle.shape()`
- Short functions
- `turtle.version`

## v1.0.0 ( 2024-07-01 )
first release

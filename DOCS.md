# Docs of [turtle.js](https://github.com/Siyu1017/turtle.js)

## Table of contents

### Turtle methods

- Turtle motion
    - Move and draw
        - [forward()](#turtleforwarddistance) | fd()
        - [backward()](#turtlebackwarddistance) | bk() | back()
        - [right()](#turtlerightangle) | rt()
        - [left()](#turtleleftangle) | lt()
        - [goto()](#turtlegotox-y) | setpos() | setposition()
        - [teleport()](#turtleteleportx-y)
        - [setx()](#turtlesetxx)
        - [sety()](#turtlesetyy)
        - [setheading()](#turtlesetheadingangle) | seth()
        - [home()](#turtlehome)
        - [circle()](#turtlecircleradius-startangle0-endangle360)
        - [dot()](#turtledotsize-color)
        - stamp()
        - clearstamp()
        - clearstamps()
        - undo()
        - speed()
    - Tell Turtle’s state
        - [position()](#turtleposition) | pos()
        - towards()
        - [xcor()](#turtlexcor)
        - [ycor()](#turtleycor)
        - [heading()](#turtleheading)
        - distance()
    - Setting and measurement
        - degrees()
        - radians()
- Pen control
    - Drawing state
        - [pendown()](#turtlependown) | pd() | down()
        - [penup()](#turtlepenup) | pu() | up()
        - [pensize()](#turtlepensizewidthnone) | width()
        - pen()
        - [isdown()](#turtleisdown)
    - Color control
        - [pencolor()](#turtlepencolorcolor)
        - [fillcolor()](#turtlefillcolorcolor)
        - [color()](#turtlecolorcolor)
    - Filling
        - [filling()](#turtlefilling)
        - [begin_fill()](#turtlebegin_fill)
        - [end_fill()](#turtleend_fill)
    - More drawing control
        - [reset()](#turtlereset)
        - clear()
        - [write()](#turtlewritearg-movefalse-alignleft-font)
- Turtle state
    - Visibility
        - showturtle() | st()
        - hideturtle() | ht()
        - isvisible()
    - Appearance
        - shape()
        - resizemode()
        - shapesize() | turtlesize()
        - shearfactor()
        - settiltangle()
        - tiltangle()
        - tilt()
        - shapetransform()
        - get_shapepoly()
- Using events
    - onclick()
    - onrelease()
    - ondrag()
- Special Turtle methods
    - begin_poly()
    - end_poly()
    - get_poly()
    - clone()
    - getturtle() | getpen()
    - getscreen()
    - setundobuffer()
    - undobufferentries()
### Methods of TurtleScreen/Screen
- Window control
    - bgcolor()
    - bgpic()
    - clearscreen()
    - resetscreen()
    - screensize()
    - setworldcoordinates()
- Animation control
    - delay()
    - tracer()
    - update()
- Using screen events
    - listen()
    - onkey() | onkeyrelease()
    - onkeypress()
    - onclick() | onscreenclick()
    - ontimer()
    - mainloop() | done()
- Settings and special methods
    - mode()
    - colormode()
    - getcanvas()
    - getshapes()
    - register_shape() | addshape()
    - turtles()
    - window_height()
    - window_width()
- Input methods
    - textinput()
    - numinput()

## Methods of RawTurtle/Turtle and corresponding functions

Most of the examples in this section refer to a Turtle instance called `turtle`.

> [!WARNING]
> Functions with $\textcolor{#FD5E53}{\normalsize{\textsf{Red text}}}$ indicate that the function exists in [Python Turtle](https://docs.python.org/3/library/turtle.html), but is not supported by the current version of [turtle.js](https://github.com/Siyu1017/turtle.js).

### Turtle motion

#### turtle.forward(_distance_)
- `Parameters:` **distance** – a number (integer or float)
- Move the turtle forward by the specified `distance`, in the direction the turtle is headed.

#### turtle.backward(_distance_)
- `Parameters:` **distance** – a number
- Move the turtle backward by `distance`, opposite to the direction the turtle is headed. Do not change the turtle’s heading.

#### turtle.right(_angle_)
- `Parameters:` **angle** – a number (integer or float)
- Turn turtle right by `angle` units. (Units are by default degrees, but can be set via the $\textcolor{#FD5E53}{\normalsize{\textsf{degrees()}}}$ and $\textcolor{#FD5E53}{\normalsize{\textsf{radians()}}}$ functions.) Angle orientation depends on the turtle mode, see $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$.

#### turtle.left(_angle_)
- `Parameters:` **angle** – a number (integer or float)
- Turn turtle left by `angle` units. (Units are by default degrees, but can be set via the $\textcolor{#FD5E53}{\normalsize{\textsf{degrees()}}}$ and $\textcolor{#FD5E53}{\normalsize{\textsf{radians()}}}$ functions.) Angle orientation depends on the turtle mode, see $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$.

#### turtle.goto(_x_, _y_)
- `Parameters:` 
    - **x** – a number
    - **y** – a number
- Move turtle to an absolute position. If the pen is down, draw line. Do not change the turtle’s orientation.

#### turtle.teleport(_x_, _y_)
- `Parameters:` 
    - **x** – a number
    - **y** – a number
- Move turtle to an absolute position. Unlike [goto(x, y)](#turtlegotox-y), a line will not be drawn. The turtle’s orientation does not change.

#### turtle.setx(_x_)
- `Parameters:` **x** – a number (integer or float)
- Set the turtle’s first coordinate to `x`, leave second coordinate unchanged.

#### turtle.sety(_y_)
- `Parameters:` **y** – a number (integer or float)
- Set the turtle’s second coordinate to `y`, leave first coordinate unchanged.

#### turtle.setheading(_angle_)
- `Parameters:` **angle** – a number (integer or float)
- Set the orientation of the turtle to `angle`. Here are some common directions in degrees:
    | Directions | East | South | West | North |
    | :--------: | :--: | :---: | :--: | :---: |
    | Degrees    | 0    | 90    | 180  | 270   |

#### turtle.home()
- Move turtle to the origin – coordinates (0,0) – and set its heading to its start-orientation (which depends on the mode, see $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$).

#### turtle.circle(_radius_, _startAngle=0_, _endAngle=360_)
- `Parameters:`
    - **radius** – a number
    - **startAngle** – a number
    - **endAngle** – a number
- Draws a circle with `radius` specified. The center of the circle is at the position of the turtle; the difference between `startAngle` and `endAngle` is an angle, which is used to determine the part of the circle to be drawn. If `startAngle` and `endAngle` are not specified, the entire circle is drawn.

#### turtle.dot(_size_, _color_)
- `Parameters:`
    - **size** – a positive number
    - **color** – a colorstring or a color code
- Draw a circular dot with diameter `size`, using `color`. If `size` is not given, the maximum of penSize+4 and penSize*2 is used.

### Tell Turtle’s state

#### turtle.position()
- Return the turtle’s current location (x,y) (as an object).

#### turtle.xcor()
- Return the turtle’s x coordinate.

#### turtle.ycor()
- Return the turtle’s y coordinate.

#### turtle.heading()
- Return the turtle’s current heading (value depends on the turtle mode, see $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$).

### Pen control
Drawing state

#### turtle.pendown()
- Pull the pen down – drawing when moving.

#### turtle.penup()
- Pull the pen up – no drawing when moving.

#### turtle.pensize(_width=None_)
- `Parameters:` **width** – a positive number
- Set the line thickness to `width` or return it. If no argument is given, the current penSize is returned.

#### turtle.isdown()
- Return True if pen is down, False if it’s up.

Color control

#### turtle.pencolor(_color_)
- `Parameters:` **color** – a colorstring or a numeric color code
- Return or set the pencolor.

#### turtle.fillcolor(_color_)
- `Parameters:` **color** – a colorstring or a numeric color code
- Return or set the fillcolor.

#### turtle.color(_color_)
- `Parameters:` 
    - **color** – a colorstring or a numeric color code
- Set pencolor and fillcolor to `color` or return them. If no argument is given, the current pencolor and fillcolor are returned. 

Filling

> [!NOTE]
> The fill methods ( [turtle.filling()](#turtlefilling)、[turtle.begin_fill()](#turtlebegin_fill)、[turtle.end_fill()](#turtleend_fill) ) are not yet unavailable

#### turtle.filling()
- Return fillstate (True if filling, False else).

#### turtle.begin_fill()
- To be called just before drawing a shape to be filled.

#### turtle.end_fill()
- Fill the shape drawn after the last call to [begin_fill()](#turtlebegin_fill).

More drawing control

#### turtle.reset()
- Delete the turtle’s drawings from the screen, re-center the turtle and set variables to the default values.

#### turtle.write(arg, move=false, align='left', font)
- `Parameters:`
    - arg – object to be written to the TurtleScreen
    - $\textcolor{#FD5E53}{\normalsize{\textsf{move}}}$ – True/False ( unavailable )
    - align – one of the strings `left`, `center` or `right`
    - font – a string using the same syntax as the CSS font property


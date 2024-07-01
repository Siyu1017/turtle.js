# [turtle.js](https://github.com/Siyu1017/turtle.js) 的文檔

## 目錄

### Turtle 方法

- Turtle 動作
    - 移動和繪製
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
    - 獲取 turtle 的狀態
        - [position()](#turtleposition) | pos()
        - towards()
        - [xcor()](#turtlexcor)
        - [ycor()](#turtleycor)
        - [heading()](#turtleheading)
        - distance()
    - 設置與度量單位
        - degrees()
        - radians()
- 畫筆控制
    - 繪圖狀態
        - [pendown()](#turtlependown) | pd() | down()
        - [penup()](#turtlepenup) | pu() | up()
        - [pensize()](#turtlepensizewidthnone) | width()
        - pen()
        - [isdown()](#turtleisdown)
    - 顏色控制
        - [pencolor()](#turtlepencolorcolor)
        - [fillcolor()](#turtlefillcolorcolor)
        - [color()](#turtlecolorcolor)
    - 填充
        - [filling()](#turtlefilling)
        - [begin_fill()](#turtlebegin_fill)
        - [end_fill()](#turtleend_fill)
    - 更多繪圖控制
        - [reset()](#turtlereset)
        - clear()
        - [write()](#turtlewritearg-movefalse-alignleft-font)
- Turtle 狀態
    - 可見性
        - showturtle() | st()
        - hideturtle() | ht()
        - isvisible()
    - 外觀
        - shape()
        - resizemode()
        - shapesize() | turtlesize()
        - shearfactor()
        - settiltangle()
        - tiltangle()
        - tilt()
        - shapetransform()
        - get_shapepoly()
- 使用事件
    - onclick()
    - onrelease()
    - ondrag()
- 特殊 Turtle 方法
    - begin_poly()
    - end_poly()
    - get_poly()
    - clone()
    - getturtle() | getpen()
    - getscreen()
    - setundobuffer()
    - undobufferentries()
### TurtleScreen/Screen 方法
- 窗口控制
    - bgcolor()
    - bgpic()
    - clearscreen()
    - resetscreen()
    - screensize()
    - setworldcoordinates()
- 動畫控制
    - delay()
    - tracer()
    - update()
- 使用螢幕事件
    - listen()
    - onkey() | onkeyrelease()
    - onkeypress()
    - onclick() | onscreenclick()
    - ontimer()
    - mainloop() | done()
- 設定與特殊方法
    - mode()
    - colormode()
    - getcanvas()
    - getshapes()
    - register_shape() | addshape()
    - turtles()
    - window_height()
    - window_width()
- 輸入方法
    - textinput()
    - numinput()

## RawTurtle/Turtle 方法和對應函數

本節中的大部分示例都使用 Turtle 類的一個實例，命名為 `turtle`。

> [!WARNING] 
> 使用 $\textcolor{#FD5E53}{\normalsize{\textsf{紅色文字}}}$ 的函數代表 [Python Turtle](https://docs.python.org/3/library/turtle.html) 支持該函數，但目前版本 [turtle.js](https://github.com/Siyu1017/turtle.js) 並不支持

### Turtle 方法

#### turtle.forward(_distance_)
- `Parameters:` **distance** – 一個數值 ( 整數或浮點型 )
- 移動 turtle 前進指定 `distance` 距離，方向為 turtle 的朝向。

#### turtle.backward(_distance_)
- `Parameters:` **distance** – 一個數值
- 移動 turtle 後退指定 `distance` 距離，方向與 turtle 的朝向相反。不改變 turtle 的方向。

#### turtle.right(_angle_)
- `Parameters:` **angle** – 一個數值 ( 整數或浮點型 )
-  turtle 右轉 `angle` 個單位。( 單位預設為角度，但可透過 $\textcolor{#FD5E53}{\normalsize{\textsf{degrees()}}}$ 和 $\textcolor{#FD5E53}{\normalsize{\textsf{radians()}}}$ 函數改變設定。) 角度的正負由 turtle 模式決定，參見 $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$。

#### turtle.left(_angle_)
- `Parameters:` **angle** – 一個數值 ( 整數或浮點型 )
- turtle 左轉 `angle` 個單位。 ( 單位預設為角度，但可透過 $\textcolor{#FD5E53}{\normalsize{\textsf{degrees()}}}$ 和 $\textcolor{#FD5E53}{\normalsize{\textsf{radians()}}}$ 函數改變設定。) 角度的正負由 turtle 模式決定，參見 $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$。

#### turtle.goto(_x_, _y_)
- `Parameters:` 
    - **x** – 一個數值
    - **y** – 一個數值
- 將 turtle 移動到絕對位置。若已下筆則會畫線。不改變 turtle 的方向。

#### turtle.teleport(_x_, _y_)
- `Parameters:` 
    - **x** – 一個數值
    - **y** – 一個數值
- 將 turtle 移動到絕對位置。與 [goto(x, y)](#turtlegotox-y) 不同，不會畫出一條線。 turtle 的方向不會改變。

#### turtle.setx(_x_)
- `Parameters:` **x** – 一個數值 ( 整數或浮點型 )
- 將 turtle 的第一個座標設定為 `x`，並保持第二個座標不變。

#### turtle.sety(_y_)
- `Parameters:` **y** – 一個數值 ( 整數或浮點型 )
- 將 turtle 的第二個座標設定為 `y`，並保持第一個座標不變。

#### turtle.setheading(_angle_)
- `Parameters:` **angle** – 一個數值 ( 整數或浮點型 )
- 將 turtle 的方向設定為 `angle`。以下是一些常見的度數方向：
    | 方向 | 東  | 南  | 西   | 北   |
    | :--: | :-: | :-: | :--: | :--: |
    | 度數 | 0   | 90  | 180  | 270  |

#### turtle.home()
- 將 turtle 移到原點 – 座標(0,0) – 並將其 heading 設為起始方向 ( 這取決於模式，請參閱 $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$ )。

#### turtle.circle(_radius_, _startAngle=0_, _endAngle=360_)
- `Parameters:`
    - **radius** – 一個數值
    - **startAngle** – 一個數值
    - **endAngle** – 一個數值
- 繪製指定 `radius` 的圓。圓心在烏龜的位置；`startAngle` 和 `endAngle` 之間的差異是一個角度，用於確定要繪製圓的部分。若未指定 `startAngle` 和 `endAngle`，則繪製整個圓。

#### turtle.dot(_size_, _color_)
- `Parameters:`
    - **size** – 一個正數
    - **color** – 一個顏色字串或顏色代碼
- 使用 `color` 繪製直徑為 `size` 的點。如果未給出 `size` ，則使用 penSize+4 和 penSize*2 中的最大值。

### 獲取 turtle 的狀態

#### turtle.position()
- 傳回 turtle 目前的座標(x,y) ( 為一個Object )。

#### turtle.xcor()
- 傳回 turtle 的 x 座標。

#### turtle.ycor()
- 傳回 turtle 的 y 座標。

#### turtle.heading()
- 返回 turtle 目前的朝向 ( 數值受 turtle 模式影響，參見 $\textcolor{#FD5E53}{\normalsize{\textsf{mode()}}}$ ).

### 畫筆控制
繪圖狀態

#### turtle.pendown()
- 下筆 – 移動時畫線。

#### turtle.penup()
- 提筆 – 移動時不畫線。

#### turtle.pensize(_width=None_)
- `Parameters:` **width** – 一個正數
- 設定筆畫線條的粗細為 `width` 或傳回該值。如未指定參數，則傳回目前的penSize。

#### turtle.isdown()
- 如果下筆則返回True，反之則返回False。

顏色控制

#### turtle.pencolor(_color_)
- `Parameters:` **color** – 一個顏色字串或顏色代碼
- 返回或設定畫筆顏色。

#### turtle.fillcolor(_color_)
- `Parameters:` **color** – 一個顏色字串或顏色代碼
- 返回或設定填滿顏色。

#### turtle.color(_color_)
- `Parameters:` 
    - **color** – 一個顏色字串或顏色代碼
- 將 pencolor 和 fillcolor 設定為 `color` 或返回它們。如果未給予參數，則傳回目前的畫筆顏色和填滿顏色。

填充

> [!NOTE]
> 填充方法 ( [turtle.filling()](#turtlefilling)、[turtle.begin_fill()](#turtlebegin_fill)、[turtle.end_fill()](#turtleend_fill) ) 暫不可用

#### turtle.filling()
- 返回填充狀態 ( 正在填充為True，反之為False )。

#### turtle.begin_fill()
- 在繪製要填滿的形狀之前調用。

#### turtle.end_fill()
- 填滿上次呼叫 [begin_fill()](#turtlebegin_fill) 之後繪製的形狀

更多繪圖控制

#### turtle.reset()
- 從螢幕中刪除 turtle 的繪圖， turtle 回到原點並設定所有變數為預設值。

#### turtle.write(arg, move=false, align='left', font)
- `Parameters:`
    - arg – 要書寫到 TurtleScreen 的對象
    - $\textcolor{#FD5E53}{\normalsize{\textsf{move}}}$ – True/False ( 不可用 )
    - align – 為 `left` 、 `center` 或 `right` 字串中的一個
    - font – 使用與 CSS font 屬性相同語法的字串

    
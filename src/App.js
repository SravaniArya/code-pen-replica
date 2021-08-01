import React, { useEffect, useState } from "react";
import Editor from "./Editor";


function App() {
  const [html, setHtml] = useState("")
  const [css, setCss] = useState("")
  const [javascript, setJavascript] = useState("")
  const [srcDoc, setSrcDoc] = useState('')
  const [htmlexpand, setHtmlExpand] = useState(true)
  const [cssexpand, setCssExpand] = useState(true)
  const [jsexpand, setJsExpand] = useState(true)
  const [htmlclick, setHtmlClick] = useState(false)
  const [cssclick, setCssClick] = useState(false)
  const [jsclick, setJsClick] = useState(false)
  const [topHeight, setTopHeight] = useState()
  const topRef = React.createRef();
  const containerRef = React.createRef();
  const mouseYPosition = React.useRef(null);

  React.useEffect(() => {
    if (!topHeight) {
      setTopHeight(topRef.current.clientHeight);
      topRef.current.style.flex = "none";
      return;
    }
    topRef.current.style.height = `${topHeight}px`;
    console.log("set topRef", topHeight)
  }, [topHeight, topRef])

  const onMouseDown = (e) => {
    mouseYPosition.current = e.clientY
    console.log("mouse down", mouseYPosition.current)
  }

  const onMouseMove = (e) => {
    console.log("mouse move")
    // console.log(mouseYPosition)
    // console.log(e)
    if (!mouseYPosition.current) {
      return;
    }
    var calHeight = topHeight + e.clientY - mouseYPosition.current
    mouseYPosition.current = e.clientY
    // console.log("calHeight,  " + calHeight)
    // console.log(e)
    if (calHeight <= 0) {
      return topHeight !==0 && setTopHeight(0)
    }
    // console.log("mouse move, containerRef")
    // console.log(containerRef)
    if (containerRef.current) {
      var maxWindowHeight = containerRef.current.clientHeight
      if (calHeight >= maxWindowHeight) {
        return topHeight !== maxWindowHeight && setTopHeight(maxWindowHeight);
      }
    }
    setTopHeight(calHeight)

  }

  const onMouseUp = (e) => {
    mouseYPosition.current = null
    console.log("mouse up", topHeight)
  }

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `<html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${javascript}</script>
      </html>`
      )
    }, 250)
    return () => {
      clearTimeout(timeout)
    }
  }, [html, css, javascript])

  useEffect(() => {
    if (htmlclick && !cssclick && !jsclick) {
      setCssExpand(false)
      setJsExpand(false)
    } else if (!htmlclick && cssclick && !jsclick) {
      setHtmlExpand(false)
      setJsExpand(false)
    } else if (!htmlclick && !cssclick && jsclick) {
      setHtmlExpand(false)
      setCssExpand(false)
    } else {
      setHtmlExpand(true)
      setCssExpand(true)
      setJsExpand(true)
      setHtmlClick(false)
      setCssClick(false)
      setJsClick(false)
    }
  }, [htmlclick, cssclick, jsclick])

  return (
    <div className="container" ref={containerRef}>
      <div className="top sub-container" ref={topRef}>
        <Editor
          language="xml"
          editorName="HTML"
          value={html}
          setVal={setHtml}
          expand={htmlexpand}
          setClick={setHtmlClick}
          clicked={htmlclick} />
        <Editor
          language="css"
          editorName="CSS"
          value={css}
          setVal={setCss}
          expand={cssexpand}
          setClick={setCssClick}
          clicked={cssclick} />
        <Editor
          language="javascript"
          editorName="JS"
          value={javascript}
          setVal={setJavascript}
          expand={jsexpand}
          setClick={setJsClick}
          clicked={jsclick} />
      </div>
      <div className="resizer-horizontal"
        onMouseDown={onMouseDown}></div>
      <div className="bottom sub-container">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder="1"
        />
      </div>
    </div>
  );
}

export default App;

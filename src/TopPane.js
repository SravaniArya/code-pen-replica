import Editor from "./Editor";
import React, { useEffect, useState } from "react";
import useStorageState from "./useStorageState";

export default function TopPane(props) {
  const { topRef, setSrcDoc } = props;
  const [html, setHtml] = useStorageState('html',"")
  const [css, setCss] = useStorageState('css',"")
  const [javascript, setJavascript] = useStorageState('js',"")
  const [htmlexpand, setHtmlExpand] = useState(true)
  const [cssexpand, setCssExpand] = useState(true)
  const [jsexpand, setJsExpand] = useState(true)
  const [htmlclick, setHtmlClick] = useState(false)
  const [cssclick, setCssClick] = useState(false)
  const [jsclick, setJsClick] = useState(false)
  const htmlRef = React.createRef()
  const cssRef = React.createRef()
  const jsRef = React.createRef()
  const htmlRefWidth = React.useRef(null)
  const [htmlWidth, setHtmlWidth] = useState('')
  // useEffect(() => {
  //   console.log("set htmlRef 1", htmlWidth)
  //   console.log(htmlRefWidth)
  //   if (!htmlWidth) {
  //     setHtmlWidth(htmlRef.current.clientWidth)
  //     htmlRef.current.style.flex="none"
  //     return
  //   }
  //   htmlRef.current.style.width=`${htmlWidth}px`
  //   console.log("set htmlRef", htmlWidth)
  // }, [htmlWidth, htmlRef])

  // const onHtmlMoveDown = (e) => {
  //   console.log("html down")
  //   console.log(e)
  //   htmlRefWidth.current = e.clientX;
  // }

  // const onHtmlMouseMove = (e) => {
  //   console.log("html move")
  //   console.log(111)
  //   console.log(htmlRefWidth)
  //   if (!htmlRefWidth.current) {
  //     return
  //   }
  //   console.log(112)
  //   var newHtmlWidth = htmlWidth + htmlRefWidth.current - e.clientX
  //   if (newHtmlWidth < 0) {
  //     setHtmlWidth(0)
  //     return
  //   }
  //   console.log(113)
  //   var maxWidth = topRef.current?.clientWidth
  //   if(newHtmlWidth>=maxWidth){
  //     setHtmlWidth(maxWidth)
  //     return
  //   }
  //   setHtmlWidth(newHtmlWidth)
  // }

  // const onHtmlMouseUp = (e) => {
  //   htmlRefWidth.current = null
  // }

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
  }, [html, css, javascript, setSrcDoc])

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
    console.log(htmlclick, cssclick, jsclick)
  }, [htmlclick, cssclick, jsclick])

  return (
    <div className="top sub-container" ref={topRef}>
      <div className="tap-vertical" onDoubleClick={() => setHtmlClick(prevalue => !prevalue)}></div>
      <Editor
        language="xml"
        editorName="HTML"
        value={html}
        setVal={setHtml}
        expand={htmlexpand}
        setClick={setHtmlClick}
        clicked={htmlclick}
        reference={htmlRef} />
      <div className="mid-one resizer-vertical tap-vertical" onDoubleClick={() => setCssClick(prevalue => !prevalue)}></div>
      <Editor
        language="css"
        editorName="CSS"
        value={css}
        setVal={setCss}
        expand={cssexpand}
        setClick={setCssClick}
        clicked={cssclick}
        reference={cssRef} />
      <div className="mid-two resizer-vertical tap-vertical" onDoubleClick={() => setJsClick(prevalue => !prevalue)}></div>
      <Editor
        language="javascript"
        editorName="JS"
        value={javascript}
        setVal={setJavascript}
        expand={jsexpand}
        setClick={setJsClick}
        clicked={jsclick}
        reference={jsRef} />
      <div className="tap-vertical" onDoubleClick={() => setJsClick(prevalue => !prevalue)}></div>
    </div>
  )
}
import Editor from "./Editor";
import React, { useEffect, useState } from "react";

export default function TopPane(props) {
    const { topRef,setSrcDoc } = props;
    const [html, setHtml] = useState("")
    const [css, setCss] = useState("")
    const [javascript, setJavascript] = useState("")
    const [htmlexpand, setHtmlExpand] = useState(true)
    const [cssexpand, setCssExpand] = useState(true)
    const [jsexpand, setJsExpand] = useState(true)
    const [htmlclick, setHtmlClick] = useState(false)
    const [cssclick, setCssClick] = useState(false)
    const [jsclick, setJsClick] = useState(false)

    useEffect(() =>{
        console.log("top pane --- ")
        console.log(topRef)
    },[topRef])

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
      }, [html, css, javascript,setSrcDoc])
    
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
    )
}
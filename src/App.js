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
  const [topHeight,setTopHeight] = useState()
  const topRef = React.createRef();

  // React.useEffect(() => {
  //   if (!topHeight) {
  //     setTopHeight(topRef.current.clientHeight);
  //     topRef.current.style.flex = "none";
  //     return;
  //   }
  //   console.log(topHeight)
  //   topRef.current.style.height = `${topHeight}px`;
  // },[topHeight])

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
    if(htmlclick && !cssclick && !jsclick){
      setCssExpand(false)
      setJsExpand(false)
    } else if (!htmlclick && cssclick && !jsclick) {
      setHtmlExpand(false)
      setJsExpand(false)
    }else if(!htmlclick && !cssclick && jsclick){
      setHtmlExpand(false)
      setCssExpand(false)
    }else{
      setHtmlExpand(true)
      setCssExpand(true)
      setJsExpand(true)
      setHtmlClick(false)
      setCssClick(false)
      setJsClick(false)
    }
  }, [htmlclick,cssclick,jsclick])

  return (
    <div className="container">
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
      {/* <div className="resizer-horizontal"></div> */}
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

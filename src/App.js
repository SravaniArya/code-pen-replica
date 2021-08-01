import React, { useEffect, useState } from "react";
import TopPane from "./TopPane";

function App() {

  const [topHeight, setTopHeight] = useState()
  const topRef = React.createRef();
  const containerRef = React.createRef();
  const mouseYPosition = React.useRef(null);
  const [srcDoc, setSrcDoc] = useState('')


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
    if (!mouseYPosition.current) {
      return;
    }
    var calHeight = topHeight + e.clientY - mouseYPosition.current
    mouseYPosition.current = e.clientY
    if (calHeight <= 0) {
      return topHeight !==0 && setTopHeight(0)
    }

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

  return (
    <div className="container" ref={containerRef}>
      <TopPane 
        topRef={topRef}
        setSrcDoc={setSrcDoc}/>
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

import { Controlled as ControllerEditor } from "react-codemirror2";
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'
import { FiMaximize, FiMinimize } from "react-icons/fi";
import { IconContext } from "react-icons"

export default function Editor(props) {
    const {
        language,
        editorName,
        value,
        setVal,
        expand,
        setClick,
        clicked,
        reference
    } = props

    function handleChange(editor, data, value) {
        setVal(value)
    }

    function clickChange(){
        setClick(preValue => !preValue)
    }

    return (
        <div className={`code-editor ${expand ? '' : 'collapsed'}`} ref={reference}>
            <div className="title">
                {expand?editorName:''}
                <button className="max-button" onClick={() => clickChange()}>
                    <IconContext.Provider value={{ style: { color: "#FFF" } }}>
                    {!clicked?<FiMaximize />:<FiMinimize/>}
                    </IconContext.Provider>
                </button>

            </div>
            <ControllerEditor
                value={value}
                onBeforeChange={handleChange}
                className="code-mirror-wrapper"
                options={{
                    mode: language,
                    theme: 'material',
                    lineWrapping: true,
                    lint: true,
                    lineNumbers: true
                }}
            />
        </div>
    )

}
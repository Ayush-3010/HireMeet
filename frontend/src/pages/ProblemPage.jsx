import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { PROBLEMS } from "../data/problems"
import Navbar from "../components/Navbar"
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
import ProblemDescription from "../components/ProblemDescription"
import OutputPanel from "../components/OutputPanel"
import CodeEditorPanel from "../components/CodeEditorPanel"
import { executeCode } from "../lib/piston"
import toast from "react-hot-toast"
import comfetti from "canvas-confetti"
import confetti from "canvas-confetti"

function ProblemPage() {

    const {id} = useParams()
    const navigate = useNavigate()

    const [currentProblemId,setCurrentProblemId] = useState("two-sum")
    const [selectedLanguage,setSelectedLanguage] = useState("javascript")
    const [code,setCode] = useState(PROBLEMS[currentProblemId].starterCode.javascript)
    const [output,setOutput] = useState(null)
    const [isRunning,setIsRunning] = useState(false)

    const currentProblem = PROBLEMS[currentProblemId]

    useEffect(()=>{
        if(id && PROBLEMS[id]){
            setCurrentProblemId(id)
            setCode(PROBLEMS[id].starterCode[selectedLanguage])
            setOutput(null)
        }
    },[id,selectedLanguage])

    const handleLanguageChange = (e) => {
        const newLang = e.target.value
        setSelectedLanguage(newLang)
        setCode(currentProblem.starterCode[newLang])
        setOutput(null)
    }

    const handleProblemChange = (newProblemID) => {
        navigate(`/problem/${newProblemID}`)
    }

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: {x: 0.2, y: 0.6}
        })

        confetti({
            particleCount: 80,
            spread: 250,
            origin: {x: 0.8, y: 0.6}
        })
    }

    const normaliseOutput = (output) => {
        return output.trim().split("\n").map((line) => line.trim().replace(/\[\s+/g, "[").replace(/\s+\]/g, "]").replace(/\s*,\s*/g, ",")).filter((line) => line.length > 0).join("\n");
    }

    const checkIfTestPassed = (actualOutput,expectedOutput) => {
        const normalizedActual = normaliseOutput(actualOutput);
        const normalizedExpected = normaliseOutput(expectedOutput);
        return normalizedActual == normalizedExpected
    }

    const handleRunCode = async () => {
        setIsRunning(true)
        setOutput(null)
        const result = await executeCode(selectedLanguage,code)
        setOutput(result)
        setIsRunning(false)

        console.log(result);

        if(result.success){
            const expectedOutput = currentProblem.expectedOutput[selectedLanguage]
            const testPassed = checkIfTestPassed(result.output,expectedOutput)

            if(testPassed){
                triggerConfetti()
                toast.success("All test passed! Great job!")
            }
            else{
                toast.error("Test failed. Check your output!")
            }
        }
        else{
            toast.error("Code execution failed!")
        }
    }

  return (
    <div className="h-screen bg-base-100 flex flex-col">
        <Navbar />
        <div className="flex-1">
            <PanelGroup direction="horizontal">

                <Panel defaultSize={40} minSize={30}>
                    <ProblemDescription problem={currentProblem} currentProblemId={currentProblemId} onProblemChange={handleProblemChange} allProblems={Object.values(PROBLEMS)} />
                </Panel>

                <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary  transition-colors cursor-col-resize" />

                <Panel defaultSize={60} minSize={30}>
                    <PanelGroup direction="vertical">

                        <Panel defaultSize={40} minSize={30}>
                            <CodeEditorPanel selectedLanguage={selectedLanguage} code={code} isRunning={isRunning} onLanguageChange={handleLanguageChange} onRunCode={handleRunCode} onCodeChange={setCode} />
                        </Panel>

                        <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary  transition-colors cursor-row-resize" />

                        <Panel defaultSize={60} minSize={20}>
                            <OutputPanel output={output} />
                        </Panel>

                    </PanelGroup>
                </Panel>

            </PanelGroup>
        </div>
    </div>
  )
}

export default ProblemPage
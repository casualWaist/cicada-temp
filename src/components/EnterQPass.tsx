import {useContext, useState} from "react"
import {AppContext} from "@/components/AppState"

export default function EnterQPass() {
    const [appState, setAppState] = useContext(AppContext)
    const [inputValue, setInputValue] = useState('' as string)
    const questString = `quest${appState.pwToEnter.quest}` as
        'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
    const subQString = `subQ${appState.pwToEnter.subQ}` as 'subQ1' | 'subQ2' | 'subQ3'
    const pwString = `pw${appState.pwToEnter.subQ}` as 'pw1' | 'pw2' | 'pw3'
    const password = appState[questString][pwString]
    const nextQuestString = appState.pwToEnter.quest === 10
        ? 'quest10'
        : `quest${appState.pwToEnter.quest + 1}` as
        'quest1' | 'quest2' | 'quest3' | 'quest4' | 'quest5' | 'quest6' | 'quest7' | 'quest8' | 'quest9' | 'quest10'
    const nextSubQString = appState.pwToEnter.subQ === 3
        ? 'subQ3'
        : `subQ${appState.pwToEnter.subQ + 1}` as 'subQ1' | 'subQ2' | 'subQ3'

    return <div className="fixed top-0 w-screen h-screen flex justify-center items-center">
        <div className="absolute bg-teal-400 flex flex-col items-center justify-center w-3/4 h-3/4 max-w-[300px] max-h-[600px]">
            <h1 className="text-5xl">Enter Password</h1>
            <h2 className="text-2xl">{
                `Password for Quest ${appState.hintToBuy.quest} Page ${appState.hintToBuy.subQ}`
            }</h2>
            <div className="absolute top-0 w-full">
                <button className="absolute right-0 p-4" onClick={() => setAppState({
                    enteringPassword: false
                })}>
                    X
                </button>
            </div>
            <div className="absolute bottom-0 w-full flex flex-row justify-center items-center">
                <form className="flex flex-col items-center justify-center"
                      onSubmit={(event) => {
                            event.preventDefault()
                          if (inputValue === password) {
                              setAppState({
                                  enteringPassword: false,
                                  [questString]: {
                                      ...appState[questString],
                                      status: appState.pwToEnter.subQ === 3
                                          ? 'completed'
                                          : 'started',
                                      [subQString]: 'completed',
                                      [nextSubQString]: subQString === nextSubQString
                                          ? 'completed'
                                          : 'started'
                                  }
                              })
                          } else {
                              setAppState({
                                  userLives: appState.userLives - 1 as 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0,
                                  enteringPassword: appState.userLives - 1 > 0
                              })
                          }
                      }}>
                    <input type="text"
                           onChange={(event) =>
                               setInputValue(event.target.value)}
                           className="p-4 w-3/4 text-black"
                           placeholder="Enter Password"/>
                    <button className="p-6 bg-red-400 rounded-3xl">
                        Enter
                    </button>
                </form>
            </div>
        </div>
    </div>
}

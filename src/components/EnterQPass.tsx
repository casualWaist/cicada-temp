import {useContext, useState} from "react"
import {AppContext} from "@/components/AppState"
import XButton, {XFlourish} from "@/components/XButton"

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
        <div className="absolute p-[2px] goldShine w-3/4 h-3/4 max-w-[300px] max-h-[500px]">
            <div className="darkFade w-full h-full">
                <XFlourish className="absolute left-0 top-0 w-full h-[100px]"/>
                <h1 className="w-full h-[40px] flex pl-4 items-center text-2xl">
                    {`Password for Quest ${appState.hintToBuy.quest} Page ${appState.hintToBuy.subQ}`}
                </h1>
                <div className="absolute right-0 top-0 w-full">
                    <XButton className="absolute right-0"
                             onClick={() => setAppState({enteringPassword: false})}/>
                </div>
                <XFlourish className="absolute left-0 bottom-0 w-full h-[100px]"
                           style={{transform: 'scaleX(-1)'}}/>
                <div className="absolute bottom-0 w-full">
                    <div className="w-full pb-[1vh] lg:pb-[2vh] h-[40px] flex flex-row items-center">
                        <p className="text-4xl md:text-5xl xl:text-8xl text-red-500 pl-4">
                            {appState.userLives}
                        </p>
                        <p className="text-3xl md:text-4xl xl:text-7xl pl-1">
                            Lives Left
                        </p>
                    </div>
                    <form className=""
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
                                      },
                                      notify: true,
                                      noteText: `Password Accepted!`,
                                      noteStyle: 'success'
                                  })
                              } else {
                                  setAppState({
                                      userLives: appState.userLives - 1 as 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0,
                                      enteringPassword: appState.userLives - 1 > 0,
                                      notify: true,
                                      noteText: `Password Incorrect!`,
                                      noteStyle: 'fail'
                                  })
                              }
                          }}>
                        <input type="text"
                               onChange={(event) =>
                                   setInputValue(event.target.value)}
                               className="relative left-[-2px] p-4 w-full text-black text-4xl"
                               style={{outlineColor: '#dab655'}}
                               placeholder="Enter Password"/>
                        <div className="w-fit rounded-2xl p-[1px] m-4 goldShine">
                            <button className="p-4 darkFade bg-red-400 rounded-2xl text-2xl">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

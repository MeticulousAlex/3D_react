import * as React from "react"

export interface IntroModuleProps {
    isModuleLoaded: boolean
    setIsModuleLoaded: (loaded: boolean) => void
    isCompact: boolean
}

declare const IntroModule: React.FC<IntroModuleProps>

export default IntroModule
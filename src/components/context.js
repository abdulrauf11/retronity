import React, { createContext, useContext, useState } from "react"

const WindowContext = createContext(null)

const WindowContextProvider = ({ children }) => {
  const [loaded, setLoaded] = useState({
    mirage: false,
    bulge: false,
    slider: false,
  })

  return (
    <WindowContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </WindowContext.Provider>
  )
}

export default WindowContextProvider

export const useWindowContext = () => useContext(WindowContext)

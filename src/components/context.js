import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from "react"

const WindowContext = createContext(null)

const WindowContextProvider = ({ children }) => {
  const [loaded, setLoaded] = useState({
    mirage: false,
    bulge: false,
    slider: false,
  })

  const [isScrolling, setScrolling] = useState(false)
  const [windowSize, setWindowSize] = useState(false)

  // useEffect(() => {
  //   console.log(loaded)
  // }, [loaded])

  useLayoutEffect(() => {
    function updateSize() {
      setWindowSize(true)
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  useEffect(() => {
    let scrollTimer = -1
    const handleScroll = () => {
      setScrolling(true)
      if (scrollTimer !== -1) clearTimeout(scrollTimer)
      scrollTimer = window.setTimeout(handleScrollStop, 500)
    }
    const handleScrollStop = () => {
      setScrolling(false)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <WindowContext.Provider
      value={{ isScrolling, setScrolling, windowSize, loaded, setLoaded }}
    >
      {children}
    </WindowContext.Provider>
  )
}

export default WindowContextProvider

export const useWindowContext = () => useContext(WindowContext)

import { useEffect, useState } from "react"

export default function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)() // assurer bali function type ta3ha generic type T 
      } else {
        return initialValue
      }
    } else {
      return JSON.parse(jsonValue)
    }
  })
// every time value tatbadal ysaviha flocalStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]  // optional
}
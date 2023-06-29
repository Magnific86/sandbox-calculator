import React, { useEffect, useRef, useState } from "react"
import Button from "./Button"
import Backspace from "./Backspace"

export default function Calculator() {
  const [data, setData] = useState("")
  const [first, setFirst] = useState("")
  const [sign, setSign] = useState("")
  const [second, setSecond] = useState("")
  const [prevResult, setPrevResult] = useState("")
  const ref = useRef(null)
  const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const toogleSignHandler = () => {
    if (!first) return
    if (data.substring(0, 1) === "-") {
      setData(prev => prev.substring(1))
      setFirst(prev => prev.substring(1))
    } else {
      setData(prev => "-" + prev)
      setFirst(prev => "-" + prev)
    }
  }

  useEffect(() => {
    ref.current?.focus()
  }, [data, first, second, sign])

  const calcDataHandler = e => {
    e.preventDefault()
    if (first && sign && second) {
      const firstNum = Number(first)
      const secNum = Number(second)
      if (sign === "+") {
        const result = (firstNum + secNum).toString()
        setData(result)
        setFirst(result)
      } else if (sign === "-") {
        const result = (firstNum - secNum).toString()
        setData(result)
        setFirst(result)
      } else if (sign === "X" || sign === "*") {
        const result = (firstNum * secNum).toString()
        setData(result)
        setFirst(result)
      } else if (sign === "/") {
        const result = (firstNum / secNum).toString()
        setData(result)
        setFirst(result)
      }
      setSign("")
      setSecond("")
      setPrevResult(first + sign + second)
    }
  }

  const deleteHandler = () => {
    const lastEl = data.substring(data.length - 1, data.length)
    const isNum = nums.includes(lastEl)
    if (!second && !sign) {
      setFirst(prev => prev.substring(0, prev.length - 1))
    } else if (!isNum && !second && sign) {
      setSign("")
    } else if (first && sign && isNum) {
      setSecond(prev => prev.substring(0, prev.length - 1))
    }
    setData(prev => prev.substring(0, prev.length - 1))
  }

  const addDotHandler = () => {
    if (!first) return
    if (!sign && !second) {
      setFirst(prev => prev + ".")
    } else if (first && sign) {
      setSecond(prev => prev + ".")
    }
    setData(prev => prev + ".")
  }

  const numHandler = val => {
    if (!sign && !second) {
      setFirst(prev => prev + val)
    } else if (first && sign) {
      setSecond(prev => prev + val)
    }
    setData(prev => prev + val)
  }

  const signHandler = val => {
    if (!sign && !second) {
      if (val === "*") {
        setSign(val)
        setData(prev => prev + "X")
      } else {
        setSign(val)
        setData(prev => prev + val)
      }
    }
  }

  const inputHandler = e => {
    const val = e.target.value
    const lastEl = val.substring(val.length - 1, val.length)
    const isDeleteEvent = e.nativeEvent.inputType === "deleteContentBackward"
    const isNum = nums.includes(lastEl)
    console.log("isNum", isNum)
    if (!sign && !second && isNum && !isDeleteEvent) {
      setData(val)
      setFirst(val)
    } else if (!isNum && !sign && !isDeleteEvent) {
      setData(val)
      setSign(lastEl)
    } else if (sign && first && !isDeleteEvent) {
      setData(prev => prev + lastEl)
      setSecond(prev => prev + lastEl)
    } else if (isDeleteEvent) {
      const toDelete = data.substring(data.length - 1, data.length)
      const isNumToDelete = nums.includes(toDelete)
      if (!sign && !second && isNumToDelete) {
        setFirst(prev => prev.substring(0, prev.length - 1))
      } else if (sign && !second && !isNumToDelete) {
        setSign("")
      } else if (sign && second && isNumToDelete) {
        setSecond(prev => prev.substring(0, prev.length - 1))
      }
      setData(prev => prev.substring(0, prev.length - 1))
    }
  }

  const allClearDataHandler = () => {
    setData("")
    setFirst("")
    setSign("")
    setSecond("")
    setPrevResult("")
  }

  const dataArr = [
    {
      label: "AC",
      onClick: allClearDataHandler,
    },
    {
      label: "",
    },
    {
      label: "",
    },
    {
      label: <Backspace />,
      onClick: deleteHandler,
    },
    {
      label: "1",
      onClick: numHandler,
    },
    {
      label: "2",
      onClick: numHandler,
    },
    {
      label: "3",
      onClick: numHandler,
    },
    {
      label: "+",
      onClick: signHandler,
    },
    {
      label: "4",
      onClick: numHandler,
    },
    {
      label: "5",
      onClick: numHandler,
    },
    {
      label: "6",
      onClick: numHandler,
    },
    {
      label: "-",
      onClick: signHandler,
    },
    {
      label: "7",
      onClick: numHandler,
    },
    {
      label: "8",
      onClick: numHandler,
    },
    {
      label: "9",
      onClick: numHandler,
    },
    {
      label: "X",
      onClick: () => signHandler("*"),
    },
    {
      label: "+/-",
      onClick: toogleSignHandler,
    },
    {
      label: "0",
      onClick: numHandler,
    },
    {
      label: ".",
      onClick: addDotHandler,
    },

    {
      label: "/",
      onClick: signHandler,
    },
  ]

  return (
    <form onSubmit={e => calcDataHandler(e)} className="container px-10 items-center justify-center flex flex-col w-1/3 mx-auto py-20">
      <div className="input_container">
        <label htmlFor="myInput">{prevResult}</label>
        <input name="myInput" ref={ref} value={data} onChange={e => inputHandler(e)} />
      </div>
      <div className="container grid grid-cols-4">
        {dataArr.map(({ label, onClick }, index) => (
          <Button key={index} text={label} onClick={() => onClick(label)} />
        ))}
      </div>
      <button className="w-full text-4xl px-8 py-4 bg-yellow-400 text-slate-700" type="submit">
        =
      </button>
    </form>
  )
}

import React from 'react'


const Move = React.forwardRef( ( {item, doFocus, index} , ref ) =>{
    return(
        <>
        <div ref={ref} style={{color: "white"}}>
            <p> {item.name} </p>
        </div>
        </>
    )
})

function MoveCursor({data, length, cursor}){
    const dataRef = React.useRef( new Array(length).fill(0) )
    const actualDataRef = React.useRef(data)

    React.useEffect(() => {
        doFocus()
    }, [cursor])

    const doFocus = () => {
        console.log("YHOO", cursor)
       dataRef.current[cursor].focus()
       console.log(dataRef.current[cursor])
    }

    return (
        <>
        { actualDataRef.current && actualDataRef.current.map((item, index) => <Move item={item} ref = {(n) => dataRef.current[index] = n} 
        dofous = {doFocus}index = {index} />)}
        </>
    )
}

export {MoveCursor}
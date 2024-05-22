

export default function Letter({letter}) {
    if(letter[1] === '') return <p id={letter[0]}>&nbsp;</p>
    return (
        <p id={letter[0]}>{letter[1]}</p>
    )
}
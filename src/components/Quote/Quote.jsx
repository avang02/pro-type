import Letter from "../Letter/Letter"
import './Quote.css'

export default function Quote({word, idx}){
    return (
        <div className="words" id={"word"+idx}>
        {word.map((letter, index) =>(
            <Letter letter={letter} key={index}/>
        ))}
         </div>
    )
}

      

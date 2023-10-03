import { useState, useCallback, useEffect, useRef } from "react";

export default function Password() {
    //create variables
    const [length, setLength] = useState(8);
    const [number, setNumber] = useState(false);
    const [character, setCharacter] = useState(false);
    const [password, setPassword] = useState();



    //ref hook
    const passwordRef=useRef()



    //main function
    const passwordGenerator = useCallback(() => { //create passwordGenerator function , then use useCallback(for optimization)
        let pass = ""; // variable for password

        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //store all alphabates

        if (number === true) {  //when number radio button click then add number with the string
            str = str + "0123456789";
        }

        if (character === true) {  //when character radio button click then add number with the string
            str = str + "!@#$%^&*()}{+_|";
        }

        for (let i = 1; i <=length; i++) {   //main function to generate the password 
            let char = Math.floor(Math.random() * str.length + 1);  // math.floor = make the round figure (1.2=1)
            pass += str.charAt(char);  //adding alphabates untill the loop end
        }

        setPassword(pass);
    }, [length, number, character, setPassword]); 

    
    const copyPasswordToClip = useCallback(() =>{
        passwordRef.current?.select() //show the copy effect
        passwordRef.current?.setSelectionRange(0,3) //select the particular range on the clipBoard
        window.navigator.clipboard.writeText(password) //copy on the clipboard
    } ,[password])

    // passwordGenerator()
    useEffect(()=>{
        passwordGenerator()
    },[length,number,character,passwordGenerator])
    return (
        <>
            <h1 className="text-center text-4xl font-serif font-bold">
                Password Generator
            </h1>

            <div className=" flex place-content-center">
                <div className="w-[625px] h-28  shadow-md rounded-lg px-2 py-2 my-8 text-orange-400 bg-green-400">
                    <div className="flex shadow rounded-lg overflow-hidden mb-4"></div>
                    <div className="flex gap-5">
                    <input
                        type="text"
                        value={password}
                        className="outline-none w-full py-1 px-3 rounded-full"
                        placeholder="password"
                        readOnly

                    ref={passwordRef} //give reference of the useref variable 
                    />

                    <button className="bg-white w-28 rounded-full py-2" onClick={copyPasswordToClip}>Copy</button>
                    </div>

                    <div className="mt-4 flex gap-8 text-black">
                        <div className="flex items-center gap-x-1">
                            <input type="range" 
                            min={6} //lower value of the slider
                            max={100} //uppervalue of the slider
                            value={length} //show the length
                            className="cursor-pointer "
                            onChange={(e)=>{setLength(e.target.value)}}//take the length when the slider slides
                             />
                             <label className="text-lg text-black">length: {length}</label>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" defaultChecked={number}
                            onChange={()=>{
                                // setNumber((prev)=>!prev)
                                setCharacter((prev)=>!prev) //change the 0 to 1 || 1 to 0 (change the state)
                            }} />
                            <label>Characters</label>
                        </div>

                        <div className="flex gap-2">
                            <input type="checkbox" defaultChecked={number}
                            onChange={()=>{
                                setNumber((prev)=>!prev) 
                                // setCharacter((prev)=>!prev)
                            }} />
                            <label>Numbers</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

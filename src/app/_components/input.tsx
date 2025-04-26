"use client"

import { useState } from "react";

export default function Input({ onSubmit }: {onSubmit: (input: string) => void}) {
    const [input, setInput] = useState("");

    function handleSubmit() {
        onSubmit(input);
        setInput("");
    }

    function handleKeyDown(keyDown: React.KeyboardEvent<HTMLInputElement>) {
        if (keyDown.key === "Enter") {
            handleSubmit();
        }
    }

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value);
    };

    return <input value={input} onChange={handleChange} onKeyDown={handleKeyDown} className=""/>
}
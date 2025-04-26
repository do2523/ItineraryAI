"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const colors = {
    white: "bg-white hover:bg-slate-100 text-slate-700",
    green: "bg-green-200 hover:bg-green-300 text-slate-700",
    cyan:  "bg-cyan-200  hover:bg-cyan-300  text-slate-700",
    stone: "bg-stone-200 hover:bg-stone-300 text-slate-700",
    amber: "bg-amber-200 hover:bg-amber-300 text-slate-700",  
}

interface RedirectButtonProps {
    color?: "white" | "green" | "cyan" | "stone" | "amber";
    children: React.ReactNode;
    href: string
}

export default function RedirectButton({ color = "white", children, href }: RedirectButtonProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname().slice(1);

    function handleButton(e: React.MouseEvent<HTMLButtonElement>) {
        const button = e.target as HTMLElement;

        const queryParamString = new URLSearchParams();
        searchParams.forEach((name, value) => {
            queryParamString.append(value, name);
        })

        queryParamString.append(pathName, button.innerText);

        router.push(`/${href}?${queryParamString.toString()}`);
    }

    return(
        <button className= {`rounded-[2rem] h-full w-full ${colors[color]} shadow-lg text-3xl font-bold`} onClick={handleButton}>{children}</button>
    )
}


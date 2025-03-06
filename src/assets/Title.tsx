import { useEffect } from "react";

interface TitleProps {
    title: string;
}

function Title({ title }: TitleProps) {
    useEffect(() => {
        document.title = title + " - VibeCart";
    }, [title]);
    return null;
}

export default Title;

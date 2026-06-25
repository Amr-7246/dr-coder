import Contact from "./Contact";
import StarsCanvas from "./Stars";

export default function Page() {
    return (
        <div className="w-full relative min-h-screen pt-25 z-0">
            <Contact/>
            <StarsCanvas/>
        </div>
    );
}
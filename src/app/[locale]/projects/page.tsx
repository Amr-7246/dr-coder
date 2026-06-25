import LayerMask from "../../components/LayerMask";
import Projects from "../../components/projects/Projects";
import Tech from "../../components/projects/Tech";

export default function Page() {
    return (
        <div className='page pt-[100px]'>
            {/* <LayerMask/> */}
            <Projects />
            <Tech />
        </div>
    );
}
import { About, Hero } from '../components'
import LayerMask from '../components/LayerMask'
import PinedProjects from '../components/home/selectedProjects/PinedProjects'

export default function Home() {
  return (
    <div className=''>
      <LayerMask/>
      <Hero />
      <PinedProjects />
      <About />
    </div>
  );
}

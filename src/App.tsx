import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Moments from './pages/Moments'
import Journal from './pages/Journal'
import Timeline from './pages/Timeline'
import ScentOfTheSoul from './pages/ScentOfTheSoul'
import FindYourSoul from './pages/FindYourSoul'
import UchiMate from './pages/UchiMate'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="moments" element={<Moments />} />
        <Route path="journal" element={<Journal />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="scent-of-the-soul" element={<ScentOfTheSoul />} />
        <Route path="find-your-soul" element={<FindYourSoul />} />
        <Route path="uchiMate" element={<UchiMate />} />
      </Route>
    </Routes>
  )
}

export default App

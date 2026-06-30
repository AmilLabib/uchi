import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Moments from './pages/Moments'
import Journal from './pages/Journal'
import Timeline from './pages/Timeline'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="collection" element={<Collection />} />
        <Route path="moments" element={<Moments />} />
        <Route path="journal" element={<Journal />} />
        <Route path="timeline" element={<Timeline />} />
      </Route>
    </Routes>
  )
}

export default App

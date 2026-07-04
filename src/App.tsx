import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ScentOfTheSoul from './pages/ScentOfTheSoul'
import FindYourSoul from './pages/FindYourSoul'
import MyStory from './pages/MyStory'
import UchiMate from './pages/UchiMate'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="find-your-soul" element={<FindYourSoul />} />
        <Route path="scent-of-the-soul" element={<ScentOfTheSoul />} />
        <Route path="my-story" element={<MyStory />} />
        <Route path="uchiMate" element={<UchiMate />} />
      </Route>
    </Routes>
  )
}

export default App

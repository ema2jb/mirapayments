
import Card from './components/Card'
import ChartData from './components/Chart'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = '/' element={<Card />} />
        <Route path="/chart" element={<ChartData />} />
      </Routes>
    </Router> 
  );
}

export default App;

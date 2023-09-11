import logo from './logo.svg';
import './App.css';
import { Counter } from './views/Counter';
import { ProductList } from './views/Product/ProductList';
import { ProductAdd } from './views/Product/ProductAdd';

function App() {
  return (
    <div className="App">
      <h1>Redux Sample</h1>
      <Counter />
      <hr />
      <ProductList />
      <hr/>
      <ProductAdd />
    </div>
  );
}

export default App;

import CreateTodoModal from "./components/CreateModal"
import Layouts from "./components/Layouts"
import Todos from "./components/Todos"

function App() {
  return (
    <Layouts>
      <CreateTodoModal />
      <Todos />
    </Layouts>
  )
}

export default App

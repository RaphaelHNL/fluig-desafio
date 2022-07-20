interface list {
  title: string,
  id: number
}

interface tasks {
  title: string,
  listId: number,
  taskConclusion: boolean,
  id: number
}

const mockList: list = {
    title: "Mercado",
    id: 1
  }
  

  const mockTasks: tasks = {
    title: "Comprar caneta",
    listId: 2,
    taskConclusion: false,
    id: 14
  }
  


const mockArray = [mockList, mockTasks];

export { mockList, mockTasks, mockArray, list, tasks};
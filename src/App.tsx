import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todos, fetchTodo } from './api';
import { useQuery } from '@tanstack/react-query';

function App() {
  // 2번 문제
  const { data, isPending, error } = useQuery({ queryKey: ['todos'], queryFn: fetchTodo });

  const doingList: Todos = [];
  const doneList: Todos = [];

  // 비싼/무거운 연산이 아니기 때문에, filter 메서드로 각각 배열을 생성해도 됩니다.
  // `?.`은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환합니다.
  data?.forEach((todoItem) =>
    todoItem.isDone ? doneList.push(todoItem) : doingList.push(todoItem),
  );

  if (isPending) return <p>로딩 중..!</p>;
  if (error) return <p>오류 발생..!</p>;

  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-screen-xl px-4 pb-8 sm:px-6">
          <TodoForm />
          <h2 className="mt-6 py-3 text-xl font-bold text-gray-900 sm:text-2xl dark:text-slate-400">
            오늘 할 일
          </h2>
          <TodoList todos={doingList} />
          <h2 className="mt-6 py-3 text-xl font-bold text-gray-900 sm:text-2xl dark:text-slate-400">
            완료한 일
          </h2>
          <TodoList todos={doneList} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;

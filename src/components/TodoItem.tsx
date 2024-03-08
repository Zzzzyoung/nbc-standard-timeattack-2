import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo, deleteTodo, toggleIsDone } from '../api';

export function TodoItem({ todo }: { todo: Todo }) {
  const { title, content, isDone, createdAt } = todo;
  const date = new Intl.DateTimeFormat('ko', { timeStyle: 'medium' }).format(new Date(createdAt));

  const queryClient = useQueryClient();
  const toggle = useMutation({
    mutationFn: toggleIsDone,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
  const remove = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <section className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <b className="card-title text-xl">{title}</b>
        <p className="text-sm">{content}</p>
        <div className="">{date}</div>
        {/* 3번 문제 */}
        <div className="flex justify-end gap-2">
          <button className="btn btn-outline btn-primary" onClick={() => toggle.mutate(todo)}>
            {isDone ? '취소' : '완료'}
          </button>
          <button className="btn btn-outline" onClick={() => remove.mutate(todo)}>
            삭제
          </button>
        </div>
      </div>
    </section>
  );
}

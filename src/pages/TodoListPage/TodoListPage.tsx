import { useState } from 'react'
import type { FormEvent } from 'react'
import useAppStore from '../../store/useAppStore'
import ConfirmModal from '../../modals/ConfirmModal/ConfirmModal'
import './todoListPage.scss'

function TodoListPage() {
  const user = useAppStore((s) => s.user)
  const todosByUser = useAppStore((s) => s.todosByUser)
  const addTodo = useAppStore((s) => s.addTodo)
  const toggleTodo = useAppStore((s) => s.toggleTodo)
  const removeTodo = useAppStore((s) => s.removeTodo)
  const clearCompletedTodos = useAppStore((s) => s.clearCompletedTodos)
  const clearAllTodos = useAppStore((s) => s.clearAllTodos)
  const [text, setText] = useState('')
  const [confirm, setConfirm] = useState<'completed' | 'all' | null>(null)

  const todos = user ? (todosByUser[user] ?? []) : []

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    addTodo(value)
    setText('')
  }

  const doneCount = todos.filter((t) => t.completed).length

  const runConfirm = () => {
    if (confirm === 'completed') clearCompletedTodos()
    else if (confirm === 'all') clearAllTodos()
    setConfirm(null)
  }

  return (
    <div className="todo-page">
      <div className="todo-page__card">
        <h3 className="todo-page__title">Todo List</h3>
        <p className="todo-page__progress">
          Выполнено: {doneCount} из {todos.length}
        </p>

        <form className="todo-page__form" onSubmit={handleSubmit}>
          <input
            className="todo-page__input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Новая задача…"
          />
          <button type="submit" className="todo-page__add">
            Добавить
          </button>
        </form>

        <ul className="todo-page__list">
          {todos.length === 0 && (
            <li className="todo-page__empty">Список пуст</li>
          )}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-page__item${todo.completed ? ' todo-page__item--done' : ''}`}
            >
              <label className="todo-page__check">
                <input
                  type="checkbox"
                  className="todo-page__checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-page__checkmark" />
              </label>
              <span className="todo-page__text">{todo.text}</span>
              <button
                type="button"
                className="todo-page__remove"
                onClick={() => removeTodo(todo.id)}
                aria-label="Удалить"
              >
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="todo-page__panel">
          <button
            type="button"
            className="todo-page__clean"
            onClick={() => setConfirm('completed')}
            disabled={doneCount === 0}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
            Очистить выполненные
          </button>
          <button
            type="button"
            className="todo-page__clean"
            onClick={() => setConfirm('all')}
            disabled={todos.length === 0}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
            </svg>
            Очистить все
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirm !== null}
        title={confirm === 'all' ? 'Очистить все' : 'Очистить выполненные'}
        message={
          confirm === 'all'
            ? 'Вы уверены, что хотите удалить все задачи?'
            : 'Вы уверены, что хотите удалить все выполненные задачи?'
        }
        onConfirm={runConfirm}
        onCancel={() => setConfirm(null)}
      />
    </div>
  )
}

export default TodoListPage

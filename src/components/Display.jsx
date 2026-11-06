import { useSelector } from 'react-redux'
import { selectCount } from '../store/counterReducer'

export default function Display() {
  const count = useSelector(selectCount)

  return (
    <div className="display">
      <span>Count</span>
      <strong>{count}</strong>
    </div>
  )
}

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { increment, decrement, reset } from '../store/counterReducer'

export default function Setter() {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('0')

  // Empty / invalid input counts as 0
  const amountValue = Number(amount) || 0

  const handlePlus = () => dispatch(increment(amountValue))
  const handleMinus = () => dispatch(decrement(amountValue))
  const handleReset = () => dispatch(reset())

  return (
    <div className="setter">
      <div className="row">
        <button type="button" onClick={handleMinus}>−</button>
        <input
          type="number"
          aria-label="Amount to plus/minus"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="button" onClick={handlePlus}>+</button>
      </div>
      <button type="button" className="reset" onClick={handleReset}>Reset</button>
    </div>
  )
}

# Counter with Redux

用 **React + Redux** 寫的簡單計數器，是 Redux 官方教學 *Redux Fundamentals* 第 1、2 章的練習作業。

- [Part 1: Redux Overview](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [Part 2: Redux Concepts and Data Flow](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow)

## 作業需求

> Write a simple counter program with Redux, there is a slight difference from the tutorial.
>
> - Create 2 components: one for **Display**, one for **Setter**.
> - The **Display** shows the current count.
> - The **Setter** contains:
>   - 2 buttons for plus/minus the count.
>   - An input box for setting values to plus/minus, default is 0.
>   - A button for resetting count.
> - The state should be stored in the Redux store, read and modify globally.

### 和教學範例不一樣的地方

| 項目 | 教學範例 | 本作業 |
| --- | --- | --- |
| UI 結構 | 單一 HTML 頁面，直接操作 DOM | 拆成 `Display` 和 `Setter` 兩個 React 元件 |
| 每次加減的量 | 固定 ±1 | 由輸入框決定，預設為 0 |
| 重設 | 無 | 有 Reset 按鈕，把 count 歸零 |
| 讀寫 store | `store.subscribe` 加手動 render | `react-redux` 的 `useSelector` / `useDispatch` |

## 需求對照實作

| 需求 | 實作位置 |
| --- | --- |
| Display 顯示目前的 count | `src/components/Display.jsx`：用 `useSelector(selectCount)` 讀取 |
| plus / minus 兩個按鈕 | `src/components/Setter.jsx`：dispatch `increment(amount)` / `decrement(amount)` |
| 加減量輸入框，預設 0 | `Setter.jsx`：local state `amount`，初始值為 `'0'` |
| Reset 按鈕 | `Setter.jsx`：dispatch `reset()` |
| State 存在 Redux store、全域讀寫 | `src/store/`：單一 store，由 `src/main.jsx` 用 `<Provider>` 提供給整個 app |

## 技術棧

- [React 19](https://react.dev/)
- [Redux 5](https://redux.js.org/)（core，**沒有**用 Redux Toolkit）
- [React Redux 9](https://react-redux.js.org/)
- [Vite 8](https://vite.dev/)

## 快速開始

```bash
npm install
npm run dev       # 啟動開發伺服器
npm run build     # 打包 production 版本到 dist/
npm run preview   # 在本機預覽打包結果
```

## 專案結構

```
Counter-with-Redux/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx                # 進入點：用 <Provider store={store}> 包住 <App />
    ├── App.jsx                 # 組合 Display 和 Setter
    ├── index.css
    ├── components/
    │   ├── Display.jsx         # 只讀：顯示 count
    │   └── Setter.jsx          # 只寫：加 / 減 / 重設，加上加減量輸入框
    └── store/
        ├── index.js            # createStore(counterReducer)
        └── counterReducer.js   # action types、action creators、selector、reducer
```

## Redux 資料流

```
┌──────────────┐  dispatch(action)  ┌─────────┐  reducer(state, action)  ┌──────────────┐
│ Setter (UI)  │ ─────────────────▶ │  Store  │ ───────────────────────▶ │  new state   │
└──────────────┘                    └─────────┘                          └──────┬───────┘
                                                                                │
┌──────────────┐  useSelector 重新取值並 re-render                              │
│ Display (UI) │ ◀──────────────────────────────────────────────────────────────┘
└──────────────┘
```

1. 使用者在 `Setter` 點 **+** / **−** / **Reset**。
2. `Setter` dispatch 一個 action，例如 `{ type: 'counter/incremented', payload: 5 }`。
3. Store 呼叫 `counterReducer(state, action)`，得到新的 state。
4. `Display` 透過 `useSelector` 訂閱 store，值變了就自動 re-render。

### Store 設計

**State**

```js
{ value: 0 }
```

**Actions**（命名採教學建議的 `domain/eventName`）

| Action type | Payload | 效果 |
| --- | --- | --- |
| `counter/incremented` | `amount: number` | `value + amount` |
| `counter/decremented` | `amount: number` | `value - amount` |
| `counter/reset` | 無 | `value` 歸零 |

**Selector**

```js
selectCount = (state) => state.value
```

## 設計決策

- **加減量放在 local state，不放進 store。** 輸入框的值只有 `Setter` 自己用，屬於 UI 暫存狀態；只有 `count` 需要全域共享，所以只有它放進 Redux store。
- **`Display` 只讀、`Setter` 只寫。** 兩個元件之間不傳 props，完全透過 store 溝通，對應「state 全域讀寫」的需求。
- **Reducer 是純函式，而且不可變更新。** 只依賴 `state` 和 `action`，每次都回傳新物件（`{ ...state, value }`），不直接修改原本的 state。
- **使用 core Redux，而不是 Redux Toolkit。** 照教學第 1、2 章的寫法手寫 action types、action creators 和 reducer，方便理解 Redux 的基本概念。使用 `legacy_createStore` 只是為了避開 `createStore` 的棄用提示，行為和教學裡的 `createStore` 完全一樣。
- **輸入框空白或不合法時，加減量當作 0。** 用 `Number(amount) || 0` 處理，避免 dispatch 出 `NaN`。
- **加減量預設為 0。** 這是作業規定，所以剛開啟頁面時按 + / − 不會改變 count，要先在輸入框填入數值。
- **Reset 只把 count 歸零。** 輸入框裡的加減量會保留，方便繼續操作。

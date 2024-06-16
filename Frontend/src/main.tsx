import ReactDOM from 'react-dom/client'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Pages/LayoutPage/LayoutPage'
import './index.scss'
import { store } from './store/Store'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
	// <React.StrictMode>
	<>
		<ReactNotifications />
		<Provider store={store}>
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		</Provider>
	</>
	// </React.StrictMode>
)

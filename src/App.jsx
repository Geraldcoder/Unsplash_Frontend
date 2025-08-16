import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import Canvas from './components/Canvas'
import Pagination from './components/Pagination'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ProfilePage from './components/ProfilePage'

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={
						<>
							<Canvas />
							<Pagination />
						</>
					}
				/>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />}></Route>
				<Route path='/profile' element={<ProfilePage />} />
			</Routes>
		</>
	)
}

export default App

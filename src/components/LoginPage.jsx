import React from 'react'
import loginImage from '../images/welcome.avif'
import { useGlobalContext } from '../context'

const LoginPage = () => {
	const { handleChangeLogin, handleLogin } = useGlobalContext()

	return (
		<div className='flex justify-between'>
			<div className='flex flex-col items-center m-auto'>
				<h1 className='text-center'>Login</h1>
				<form className='flex flex-col' onSubmit={handleLogin}>
					<input
						name='email'
						onChange={handleChangeLogin}
						className='min-w-[50vh] mb-[1rem] font-[800] text-amber-200 focus:border-amber-100 placeholder:font-[100] text-amber-400 border-[0.1rem] border-amber-200 border-solid p-[0.3rem] rounded-[0.3rem]'
						type='email'
						placeholder='your email here...'
					/>
					<input
						name='password'
						onChange={handleChangeLogin}
						className='min-w-[50vh] mb-[1rem] font-[800] text-amber-200 focus:border-amber-100 placeholder:font-[100] text-amber-400 border-[0.1rem] border-amber-200 border-solid p-[0.3rem] rounded-[0.3rem]'
						type='password'
						placeholder='Choose a secure password...'
					/>
					<button
						onClick={handleLogin}
						className='w-[6rem] p-[.4rem] rounded-[.3rem] self-center text-[1rem] mt-[1rem] text-amber-400 bg-amber-50 border-[.1rem] border-solid border-amber-50 transition-all hover:bg-amber-500 hover:text-amber-50'>
						Login
					</button>
				</form>
				<p className='pt-[9rem] text-amber-500'>
					New User? Click{' '}
					<a className='text-amber-800' href='/register'>
						Here
					</a>
					to Sign Up
				</p>
			</div>
			<div className='h-[100vh] max-w-[50%]'>
				<img className='hidden sm:block h-[100%]' src={loginImage} />
			</div>
		</div>
	)
}

export default LoginPage

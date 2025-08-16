import React from 'react'
import Logo from '../images/Logo.svg'
import { useGlobalContext } from '../context'

const Navbar = () => {
	const {
		handleSubmit,
		handleChange,
		refNol,
		isModalOpen,
		setIsModalOpen,
		isMenuOpen,
		setIsMenuOpen,
		modals,
		firstDiv,
		changeInputTo,
		navigate,
		token,
		removeToken,
	} = useGlobalContext()

	return (
		<header className='sticky top-0 z-40 bg-white'>
			<nav className='flex justify-between mx-2.5'>
				<img
					src={Logo}
					alt='Logo'
					className='h-12 pt-3.5'
					onClick={() => navigate('/')}
				/>

				<div className='flex self-center'>
					<div className='px-4'>
						{token ? (
							<button
								className='relative'
								onClick={() => setIsMenuOpen(!isMenuOpen)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 24 24'
									fill='currentColor'
									className='size-10'>
									<path
										fillRule='evenodd'
										d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
										clipRule='evenodd'
									/>
								</svg>
								<ul
									className={`${
										isMenuOpen
											? 'absolute w-[10rem] translate-x-[-5rem] bg-white border border-gray-100 rounded-[.25rem] z-10 transition-all duration-300 shadow-2xl p-[2rem]'
											: 'hidden'
									}`}>
									<li onClick={() => navigate('/profile')}>view profile</li>
									<li className='pt-4 text-gray-500' onClick={removeToken}>
										logout
									</li>
								</ul>
							</button>
						) : (
							<a
								href='#'
								className='!no-underline px-2 !text-gray-500 text-sm hover:!text-black font-medium '
								onClick={() => navigate('/login')}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke-width='1.5'
									stroke='currentColor'
									class='size-6'>
									<path
										stroke-linecap='round'
										stroke-linejoin='round'
										d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
									/>
								</svg>
							</a>
						)}
					</div>

					<button
						onClick={() => setIsModalOpen(!isModalOpen)}
						className='relative'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='size-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
							/>
						</svg>

						<ul
							className={` ${
								isModalOpen
									? 'flex absolute w-fit translate-x-[-29rem] bg-white border border-gray-100 rounded-[.25rem] z-10 transition-all duration-300 shadow-2xl p-[2rem]'
									: 'hidden'
							}`}>
							{modals.map((modal) => {
								const { id, title, icon, subtitles } = modal
								return (
									<div key={id} className='block px-3.5'>
										<div className='flex justify-center'>
											{icon}
											<h6 className='px-1 !text-sm'>{title}</h6>
										</div>
										{subtitles &&
											subtitles.map((subs) => {
												const { subId, subLink, subTitle } = subs
												return (
													<div key={subId} className='block px-3.5'>
														<li className='py-2'>
															<a
																className='!no-underline px-2 hover:!text-black transition !text-gray-500 text-sm'
																href={subLink}>
																{subTitle}
															</a>
														</li>
													</div>
												)
											})}
									</div>
								)
							})}
						</ul>
					</button>
				</div>
			</nav>

			<div className='mx-5 bg-white'>
				<div className='relative flex flex-grow items-center '>
					<form className='w-[100%]' onSubmit={handleSubmit}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='absolute left-3 top-3.5 w-5 h-5 text-gray-400'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
							/>
						</svg>
						<div className='flex flex-grow'>
							<input
								ref={refNol}
								onChange={handleChange}
								type='search'
								placeholder='Search photos and illustrations...'
								className='bg-gray-200 w-[100%] rounded-2xl my-auto h-10/12 pl-10 pr-4 py-2'
							/>
						</div>
					</form>
				</div>
			</div>
			{/* -------------------- first div items --------------------- */}

			<div className='flex border-b pt-3 cursor-pointer border-gray-300 bg-white z-10'>
				<div className='whitespace-nowrap pb-1.5 hide-scrollbar'>
					<ul className='flex'>
						{firstDiv.map((first) => {
							const { id, title } = first
							return (
								<li key={id}>
									<p
										className='!no-underline px-2 !text-gray-500 hover:!text-black font-medium text-sm inline-flex'
										onClick={() => changeInputTo(title)}>
										{title}
									</p>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Navbar

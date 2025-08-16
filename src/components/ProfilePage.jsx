import React from 'react'
import { useGlobalContext } from '../context'

const ProfilePage = () => {
	const {
		user,
		decodeToken,
		likedImage,
		canvas,
		toggleLikedImage,
		disLikePicture,
	} = useGlobalContext()

	decodeToken()

	if (!user) {
		return <p>You must be logged in to view this page.</p>
	}
	return (
		<div>
			<h1 className='text-center text-5xl font-bold p-15'>{user.name}</h1>
			<button className='pt-4 flex p-4'>
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
						d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
					/>
				</svg>

				<h6 className=''>Likes</h6>
			</button>
			<div className='b border-b'></div>
			<div className='mx-4'>
				<div className='block columns-1 sm:columns-3 sm:gap-3 mt-12'>
					{canvas.map((item) => {
						const { _id, description, imageUrl } = item
						return (
							<div className='mb-3 parent'>
								<div className='overlay'>
									<button
										className='absolute self-center p-3'
										onClick={() => {
											disLikePicture(_id)
											toggleLikedImage(_id)
										}}>
										{likedImage.includes(item._id) ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='size-6 text-white transition hover:scale-150'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
												/>
											</svg>
										) : (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='currentColor'
												className='size-6 text-white transition hover:scale-150'>
												<path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
											</svg>
										)}
									</button>
								</div>

								<div className='mb-3 parent' key={_id}>
									<img src={imageUrl} alt={description} />
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default ProfilePage

import React, { useState } from 'react'
import { useGlobalContext } from '../context'

const Canvas = () => {
	const {
		items,
		downloadImage,
		handleImageLoad,
		loadedImages,
		token,
		likePicture,
		likedImage,
		toggleLikedImage,
	} = useGlobalContext()

	return (
		<div className='mx-4'>
			<div className='block columns-1 sm:columns-3 sm:gap-3'>
				{items.map((item) => {
					const { id, alt_description, thumb, regular, user } = item
					const { first_name, last_name, profile_image } = user

					return (
						<div className='mb-3 parent' key={id}>
							{token && (
								<div className='overlay'>
									<button
										className='absolute self-center p-3'
										onClick={() => {
											likePicture(item)
											toggleLikedImage(item.id)
										}}>
										{likedImage.includes(item.id) ? (
											<svg
												xmlns='http://www.w3.org/2000/svg'
												viewBox='0 0 24 24'
												fill='currentColor'
												className='size-6 text-white transition hover:scale-150'>
												<path d='m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z' />
											</svg>
										) : (
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
										)}
									</button>
								</div>
							)}
							{/* Load thumbnail first, then fade in high-res image */}
							<img
								src={loadedImages[id] ? regular : thumb}
								alt={alt_description}
								className={`w-full transition-opacity duration-500 ${
									loadedImages[id] ? 'opacity-100' : 'opacity-0'
								}`}
								onLoad={() => handleImageLoad(id)}
							/>
							<div className='overlay'>
								<div className='flex justify-between relative w-[90%] justify-self-center bottom-12 mb-[-2rem]'>
									<div className='flex items-center'>
										<img
											src={profile_image.small}
											className='rounded-[50%] w-8 h-8'
										/>
										<h6 className='!text-gray-200 px-2'>
											{first_name} {last_name}
										</h6>
									</div>
									<button
										onClick={() => downloadImage(regular, `${alt_description}`)}
										className='inline-flex rounded-[.5rem]'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='size-8 transition text-white hover:scale-150'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z'
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Canvas

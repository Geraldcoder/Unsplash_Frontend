import React from 'react'
import { useGlobalContext } from '../context'
import Canvas from './Canvas'

const Accordion = () => {
	const { pageCounts, setPageCounts, items, totalPages } = useGlobalContext()
	return (
		<Canvas /> && (
			<footer className='flex justify-center'>
				{pageCounts > 1 && (
					<button
						className='bg-amber-950 m-1 text-xs p-1 rounded-[.2rem] text-white'
						onClick={() => setPageCounts(pageCounts - 1)}>
						Prev
					</button>
				)}
				<h6 className='bg-amber-950 m-1 text-xs p-1 rounded-[.2rem] text-white'>
					{items && pageCounts}
				</h6>
				{pageCounts < totalPages && (
					<button
						className='bg-amber-950 m-1 text-xs p-1 rounded-[.2rem] text-white'
						onClick={() => setPageCounts(pageCounts + 1)}>
						Next
					</button>
				)}
			</footer>
		)
	)
}

export default Accordion

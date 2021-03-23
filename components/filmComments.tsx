import { FilmCommentsData } from '../interfaces'

type FilmCommentsProps = FilmCommentsData

const FilmComments = (data: FilmCommentsProps) => (
  	<div className="">
		  	<h4 className="text-3xl font-roboto text-mainText font-normal block mt-4 mb-6">
                Отзывы
            </h4>
			<div className="space-y-4">
				{data.comments.map((comment, i) => {    
					return <div className="bg-cardBackground" key={i}>
						<a href="#" className="text-xs text-xl hover:text-gray-900 ml-7 block mt-3">
							<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline">
								<rect width="19" height="19" fill="#B82424"/>
								<path d="M9.5 11.625C11.8472 11.625 13.75 9.72221 13.75 7.375C13.75 5.02779 11.8472 3.125 9.5 3.125C7.15279 3.125 5.25 5.02779 5.25 7.375C5.25 9.72221 7.15279 11.625 9.5 11.625Z" stroke="#E87E7E" strokeWidth="2" strokeMiterlimit="10"/>
								<path d="M3.05786 15.3431C3.71101 14.2126 4.65016 13.2739 5.78097 12.6212C6.91178 11.9686 8.19444 11.625 9.50007 11.625C10.8057 11.625 12.0884 11.9686 13.2192 12.6213C14.35 13.274 15.2891 14.2127 15.9422 15.3433" stroke="#E87E7E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
							<h4 className="text-xs font-roboto text-mainText font-normal inline ml-2">
								{comment.username}
							</h4>
						</a>
						<h4 className="text-base font-roboto text-mainText font-normal block ml-7 mt-2 opacity-70 pb-5">
							{comment.comment}
						</h4>
					</div>
				})}
	 	 	</div>
			<div className="mt-8 space-x-6">
				<button className="bg-orange hover:bg-orange text-mainText font-bold py-2 px-4 rounded">
					Оставить отзыв
				</button>
        	</div>
	</div>
)

export default FilmComments


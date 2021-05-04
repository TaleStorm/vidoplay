import { CommentsData } from '../interfaces'

type CommentsProps = CommentsData

const Comments = (data: CommentsProps) => (
  	<div className="ml-8">
		  	<h4 className="text-sm font-roboto text-mainText font-normal block mt-4 opacity-80">
                Комментарии
            </h4>
		  {data.comments.map((comment, i) => {    
            return (
				<div className="" key={i}>
					<a href={`${comment.url}`} className="text-base block mt-5">
						<div className={`flex items-center`}>
						<div className={`w-8 h-8 p-1 bg-user-bg rounded-full mr-2`}>
						<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
							<path d="M9.5 11.625C11.8472 11.625 13.75 9.72221 13.75 7.375C13.75 5.02779 11.8472 3.125 9.5 3.125C7.15279 3.125 5.25 5.02779 5.25 7.375C5.25 9.72221 7.15279 11.625 9.5 11.625Z" stroke="#DADADA" strokeWidth="2" strokeMiterlimit="10" />
							<path d="M3.05786 15.3431C3.71101 14.2126 4.65016 13.2739 5.78097 12.6212C6.91178 11.9686 8.19444 11.625 9.50007 11.625C10.8057 11.625 12.0884 11.9686 13.2192 12.6213C14.35 13.274 15.2891 14.2127 15.9422 15.3433" stroke="#DADADA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						</div>
						<h4 className="font-roboto text-mainText font-normal inline text-h2-mobile">
							{comment.username}
						</h4>
						</div>

					<h4 className="text-xs font-roboto text-mainText font-normal block mt-2 opacity-80 pr-2">
						{comment.comment}
					</h4>
					<h4 className="text-xs font-roboto text-mainText font-normal block mt-3 text-h2-mobile">
						{comment.film}
					</h4>
					</a>
				</div>
				
			)
          })}
	</div>
)

export default Comments

